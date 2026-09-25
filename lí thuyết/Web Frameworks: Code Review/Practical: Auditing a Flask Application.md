Đã đến lúc chạy toàn bộ phương pháp trên mục tiêu đã triển khai. Vaultkeeper là một công cụ lưu trữ thông tin xác thực nhỏ được viết bằng Flask, được cung cấp cho chúng tôi với quyền truy cập mã nguồn đầy đủ như một phần của hoạt động kiểm thử hộp xám. Chúng tôi có một phiên bản đang chạy tại http://10.114.141.196:8080, mã nguồn được mở trong trình xem tại http://10.114.141.196, và quyền truy cập SSH vào máy để chạy các công cụ. Cùng một thông tin đăng nhập, analyst/ vaultkeeper, được dùng để đăng nhập vào cả ứng dụng web và tài khoản xem xét SSH. Các tuyến web được xác thực cần phiên đó, vì vậy hãy đăng nhập trước. Nhiệm vụ của chúng tôi là lập bản đồ ứng dụng, phân loại nó, sau đó xác nhận và khai thác các phát hiện để lấy ba cờ.

## Bước 1: Lập bản đồ bề mặt tấn công

Kết nối SSH vào tài khoản xem xét trên máy đích, nơi nguồn và các công cụ đã được thiết lập sẵn, sau đó áp dụng thứ tự đọc của Nhiệm vụ 2. Chúng ta có thể đọc cùng các tệp đó trong trình xem trên trình duyệt khi `http://10.114.141.196`thực hiện.

```
$ ssh analyst@10.114.141.196        # password: vaultkeeper
analyst@thm:~$ cd ~/vaultkeeper
analyst@thm:~/vaultkeeper$ ls
app.py  config.py  init_db.py  requirements.txt  templates  uploads
```

Từ đó ~/vaultkeeper, mở tệp kê khai phụ thuộc, đọc `onfig.py`và liệt kê mọi mục @app.route. Chúng ta sẽ tìm kiếm các lỗi cấu hình trước, sau đó là các điểm truy cập đáng để kiểm tra:

```
$ grep -rnE "DEBUG\s*=\s*True|SECRET_KEY\s*=" --include="*.py" .
./config.py:6:SECRET_KEY = "vk_s3cr3t_d0_n0t_sh1p_2026"
./config.py:7:DEBUG = True
$ grep -rn "@app.route" --include="*.py" .
./app.py:50:@app.route("/")
./app.py:55:@app.route("/login", methods=["GET", "POST"])
./app.py:73:@app.route("/logout")
./app.py:79:@app.route("/search")
./app.py:105:@app.route("/vault/<int:item_id>")
./app.py:117:@app.route("/files/download")
```

Đến cuối bước này, chúng ta sẽ thấy các giá trị được mã hóa cứng `SECRET_KEY`và `DEBUG = True`trong config.py, cùng với danh sách tuyến đường bao gồm điểm cuối tìm kiếm ( /search), điểm cuối tải xuống tệp ( /files/download) và điểm cuối kho lưu trữ cho mỗi bản ghi ( /vault/<id>).

## Bước 2: Phân loại kết quả bằng Grep và Semgrep

Hãy tìm ra những lỗi nghiêm trọng và để Semgrep kiểm tra chéo:

```
$ grep -rn --include="*.py" -E "cursor\.execute|render_template_string|send_file|os\.path\.join" .
./init_db.py:13:DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vaultkeeper.db")
./app.py:12:    render_template_string,
./app.py:13:    send_file,
./app.py:22:DB_PATH = os.path.join(BASE_DIR, "vaultkeeper.db")
./app.py:23:UPLOAD_DIR = os.path.join(BASE_DIR, UPLOAD_DIRNAME)
./app.py:86:    heading = render_template_string("Results for: " + q) if q else ""
./app.py:93:        cursor.execute(
./app.py:121:    path = os.path.join(UPLOAD_DIR, filename)
./app.py:124:    return send_file(path)
$ semgrep --config /opt/review/semgrep-rules .

┌─────────────────┐
│ 4 Code Findings │
└─────────────────┘

    app.py
    ❯❱ opt.review.semgrep-rules.vk-ssti-render-template-string
          ❰❰ Blocking ❱❱
          render_template_string on possibly user-controlled input can allow server-side
          template injection (SSTI).

           86┆ heading = render_template_string("Results for: " + q) if q else ""

   ❯❯❱ opt.review.semgrep-rules.vk-sqli-fstring-execute
          ❰❰ Blocking ❱❱
          SQL query built with an f-string passed to execute(); use parameterised queries instead.

           93┆ cursor.execute(
           94┆     f"SELECT title, secret FROM vault WHERE owner_id = {uid} AND title LIKE '%{q}%'"
           95┆ )

   ❯❯❱ opt.review.semgrep-rules.vk-path-traversal-send-file
          ❰❰ Blocking ❱❱
          A path-joined or user-controlled value flows into send_file(); can allow path
          traversal. Prefer send_from_directory.

          124┆ return send_file(path)

    config.py
    ❯❱ opt.review.semgrep-rules.vk-hardcoded-secret
          ❰❰ Blocking ❱❱
          Hardcoded secret assigned in source; load it from the environment instead.

            6┆ SECRET_KEY = "vk_s3cr3t_d0_n0t_sh1p_2026"
```
Các kết quả tìm kiếm bằng grep bao gồm cả nhiễu (các dòng nhập khẩu, các DB_PATHphép nối), đó chính là điểm mấu chốt: một kết quả tìm kiếm bằng grep chỉ là một ứng viên, chứ không phải là một kết quả đã được tìm thấy. Semgrep thu hẹp kết quả xuống còn bốn kết quả quan trọng.

Máy này cung cấp Semgrep với một bộ quy tắc có sẵn tại /opt/review/semgrep-rules, vì vậy quá trình quét này chạy ngoại tuyến; nếu có truy cập internet, chúng ta sẽ trỏ --configđến một bộ quy tắc công khai như p/owasp-top-tenthay vào đó. Đọc từng kết quả tìm kiếm trong ngữ cảnh. Danh sách ứng viên sẽ thu hẹp lại thành một truy vấn SQL thô được xây dựng bằng chuỗi f trong trình xử lý tìm kiếm, cùng một trình xử lý đó sẽ phản hồi lại truy vấn thông qua render_template_string, và một trình xử lý tải xuống kết hợp đầu vào của người dùng với send_file.






























































