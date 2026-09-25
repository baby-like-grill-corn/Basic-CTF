<h1> ORIENTING IN A CODEBASE </h1>

Khi mở một kho lưu trữ không quen thuộc, theo bản năng chúng ta sẽ bắt đầu đọc các tệp một cách ngẫu nhiên. Điều đó sẽ lãng phí mười phút đầu tiên, mười phút quý giá và hữu ích nhất mà chúng ta có. Có một trình tự đọc giúp chúng ta từ chỗ không biết gì đến chỗ định hướng trước khi tìm kiếm bất kỳ lỗi nào, và nó hiệu quả vì các danh mục giống nhau trong mọi framework ngay cả khi tên tệp thay đổi.

<h2>Thứ tự đọc</h2>

1.	README và tài liệu	-> Ứng dụng này làm gì, cách thức hoạt động ra sao, và sử dụng framework nào. <br>
2.	Biểu thức phụ thuộc	-> Thư viện và phiên bản, bề mặt tấn công của bên thứ ba <br>
3.	Tệp cấu hình	-> Cờ gỡ lỗi, thông tin bí mật, chuỗi cơ sở dữ liệu <br>
4.	Định tuyến / điểm vào	-> Danh sách đầy đủ các phương thức xâm nhập, bản đồ bề mặt tấn công của chúng tôi <br>
5.	middleware và decorator xác thực	-> Những tuyến đường nào được bảo vệ, những tuyến đường nào không. <br>
6.	Lớp cơ sở dữ liệu / mô hình-> Dữ liệu được lưu trữ ở đâu và cách thức xây dựng các truy vấn
Các xử lý viên tuyến đường cá nhân	-> Lý do đằng sau mỗi điểm truy cập <br>

<h2>Các bản khai phụ thuộc</h2>

Tệp kê khai liệt kê mọi thư viện bên thứ ba và, nếu may mắn, phiên bản được ghim của nó. Trong Python, đó là requirements.txt(hoặc pyproject.toml), trong Java pom.xmllà , trong .NET là một .csprojtệp. Phiên bản rất quan trọng vì một bản phát hành cũ được ghim có thể chứa một lỗ hổng CVE đã biết mà chúng ta có thể tra cứu trực tiếp. Một phiên bản được ghim ở đây là một manh mối mà chúng ta có thể hành động ngay lập tức: tìm kiếm nó trong cơ sở dữ liệu CVE và chúng ta có thể tìm thấy một lỗ hổng đã biết trước khi đọc bất kỳ dòng mã nào của ứng dụng. Một bước kiểm tra bổ sung nhanh chóng là pip-audit, công cụ này so sánh tệp kê khai với cơ sở dữ liệu lỗ hổng, nhưng hãy coi đó là một bước kiểm tra phụ, không phải là trọng tâm của việc xem xét mã.

<h2>Cấu hình đầu tiên</h2>

Các tệp cấu hình là nơi các nhà phát triển thường mắc lỗi trước khi bất kỳ yêu cầu nào được xử lý. Chúng ta đang tìm kiếm các cờ gỡ lỗi vẫn được bật ( DEBUG = True), khóa bí mật được viết dưới dạng chuỗi ký tự, chuỗi kết nối cơ sở dữ liệu có mật khẩu được nhúng và các kiểm tra bảo mật bị vô hiệu hóa. Trong một dự án Flask, nơi thường chứa những thứ này là config.py. Hãy đọc nó sớm, vì một DEBUG = Truelỗi ở đây sẽ thay đổi cách hoạt động của mọi lỗi sau này. Chuỗi kết nối cơ sở dữ liệu là một phần thưởng thường xuyên, vì nó thường chứa tên người dùng và mật khẩu, và một chuỗi kết nối đã được cam kết là một thông tin xác thực hoạt động, chứ không chỉ là một gợi ý. <br>
DEBUG = True là một cách để kích hoạt chế độ debug (kiểm tra lỗi) trong một chương trình, thường được sử dụng trong lập trình. Khi biến DEBUG được đặt thành True, các thông báo debug (như log, thông báo lỗi, hoặc các câu lệnh in ra thông tin chi tiết) sẽ được hiển thị, giúp người lập trình dễ dàng theo dõi và phát hiện lỗi trong quá trình chạy chương trình.

<h2>Định tuyến chính là bản đồ bề mặt tấn công.</h2>

Mỗi route là một điểm vào, và việc liệt kê chúng là điều hữu ích nhất chúng ta làm trước khi đọc logic. Trong Flask, các route được đánh dấu bằng decorator @app.route:
```
@app.route("/files/download")
def download():
    ...
```
Django thu thập chúng trong một urlpatternsdanh sách, Spring sử dụng các chú thích như `<router-name> @GetMapping`. Bất kể cú pháp nào, hãy liệt kê mọi route trước. Danh sách đó là bề mặt tấn công của chúng ta; mọi thứ chúng ta kiểm thử đều nằm trên đó.

<h2>Ranh giới xác thực</h2>

Với danh sách các tuyến đường, hãy đánh dấu những tuyến đường nào yêu cầu xác thực. Trong Flask, điều đó thường có nghĩa là một @login_requireddecorator (hoặc một kiểm tra tùy chỉnh) nằm phía trên tuyến đường. Các tuyến đường thú vị là những tuyến đường xử lý dữ liệu nhạy cảm nhưng thiếu decorator đó, và những tuyến đường kiểm tra vai trò bằng cách sử dụng giá trị do client cung cấp.

<h2>Tiếp cận một khuôn khổ chưa quen thuộc</h2>

Chúng ta sẽ gặp những framework mà mình chưa từng sử dụng. Cách làm luôn giống nhau: đọc README để tìm tên framework, xác nhận trong manifest phụ thuộc, sau đó áp dụng thứ tự đọc như trên. Từ vựng có thể khác nhau, nhưng các danh mục thì không. Một file cấu hình vẫn là một file cấu hình dù nó là config.py, application.properties, hay appsettings.json.

<h2>Lập bản đồ nguồn Vaultkeeper</h2>

Mở mã nguồn của ứng dụng mục tiêu, một công cụ Flask nhỏ có tên là Vaultkeeper. Chúng ta có thể đọc nó theo hai cách: trong trình xem trên trình duyệt tại http://10.113.147.204, hiển thị từng tệp bên cạnh ứng dụng đang chạy, hoặc qua SSH trên chính máy đó, nơi mã nguồn nằm trong ~/vaultkeeper. Áp dụng thứ tự đọc: mở tệp manifest, sau đó config.py, rồi tìm mọi @app.routevà ghi lại danh sách. Khi hoàn thành bước 4, chúng ta sẽ có một bản đồ một trang của ứng dụng, và chúng ta chưa chạy nó lần nào.

<h1> SOURCE-TO-SINK ANALYSIS </h1>

Hầu hết các lỗi trong ứng dụng web đều có cùng một dạng: dữ liệu do người dùng kiểm soát được truyền đến một thao tác mà kẻ tấn công không bao giờ được phép nhập vào. Kiểm thử hộp trắng biến dạng đó thành một quy trình. Tìm xem dữ liệu đi vào từ đâu, tìm xem nó đến đâu, và quyết định xem có điều gì an toàn xảy ra ở giữa hay không. Chúng ta gọi điểm vào là nguồn , điểm đến nguy hiểm là đích , và đường đi giữa chúng là luồng dữ liệu.

<h2>Nguồn</h2>

Nguồn dữ liệu là bất kỳ nơi nào dữ liệu do người dùng kiểm soát được đưa vào ứng dụng. Trong Flask, các nguồn dữ liệu phổ biến đều gắn liền với requestđối tượng:

```
request.args        # query string parameters
request.form        # POST form fields
request.json        # JSON request body
request.cookies     # cookie values
request.headers     # request headers
request.files       # uploaded files
```

<h2>Bồn rửa</h2>

"Sink" là bất kỳ thao tác nào trở nên nguy hiểm khi nhận được đầu vào từ kẻ tấn công. Các "sink" tiêu biểu bao gồm:

    Xây dựng truy vấn SQL ( cursor.execute)
    Thực thi lệnh shell ( os.system, subprocess với shell=True)
    Hiển thị mẫu ( render_template_string)
    Giải mã hóa ( pickle.loads, yaml.load)
    Xây dựng đường dẫn tệp ( open, send_file)
    Đánh giá tùy ý ( eval, exec)

Một cái bồn rửa đứng riêng lẻ không phải là lỗi. Cái bồn rửa được kết nối với một nguồn khác, mà không có bước trung gian an toàn nào giữa chúng, mới là lỗi. 


<h2>Con đường giữa</h2>

Giữa nguồn và đích có thể có quá trình làm sạch, xác thực hoặc ép kiểu để vô hiệu hóa dữ liệu đầu vào, hoặc cũng có thể không có gì cả. Nhiệm vụ của người kiểm thử là đọc đường dẫn đó và quyết định. Việc ép int() kiểu ID trước khi thực thi truy vấn sẽ ngăn chặn tấn công SQL injection. Biểu thức chính quy (regex) từ chối truy vấn ../ trước khi mở đường dẫn sẽ ngăn chặn việc duyệt thư mục trái phép. Hãy đọc đường dẫn; đừng giả định rằng nó tồn tại.

<h2>Vẽ theo hai hướng</h2>

Chúng ta có thể truy vết theo cả hai cách. Bắt đầu từ điểm cuối và làm việc ngược lại sẽ hiệu quả khi các điểm cuối hiếm: tìm điểm cuối cursor.executexây dựng truy vấn của nó bằng chuỗi f, sau đó quay lại để xác nhận giá trị do người dùng điều khiển. Bắt đầu từ nguồn và theo dõi nó về phía trước phù hợp với trình xử lý mà chúng ta đang đọc từ trên xuống dưới. Cả hai cách đều dẫn đến cùng một câu trả lời, đó là liệu có một đường dẫn sạch từ đầu vào đến điểm nguy hiểm hay không.

<h2>Vì sao việc khử trùng tại nguồn là chưa đủ</h2>

Một giá trị có thể được làm sạch khi vào, lưu trữ, sau đó được truy xuất lại và đưa vào một sink trong một trình xử lý hoàn toàn khác. Đó là kiểu tấn công bậc hai, và nó đánh bại bất kỳ ai chỉ kiểm tra điểm vào. Trường hợp điển hình là tên người dùng được xác thực khi đăng ký, lưu trữ, sau đó được nối vào một truy vấn thô bởi một báo cáo quản trị viên vài tuần sau đó. Tấn công XSS lưu trữ hoạt động theo cách tương tự. Khi chúng ta theo dõi, chúng ta theo dõi dữ liệu vào cơ sở dữ liệu và quay trở lại, chứ không chỉ từ yêu cầu đến hàm đầu tiên chạm vào nó.

<h3>Một ví dụ minh họa</h3>

```
@app.route("/greet")
def greet():
    name = request.args.get("name")
    return render_template_string(f"Hello {name}")
```
Nguồn: request.args.get("name"). Đích: render_template_string, biên dịch đối số của nó thành một mẫu Jinja2. Đường dẫn giữa chúng là một chuỗi f-string được chèn nametrực tiếp vào văn bản mẫu mà không có bất kỳ sự kiểm tra nào. Người dùng kiểm soát cú pháp mẫu, đó là chèn mẫu phía máy chủ (SSTI). So sánh với phiên bản an toàn, trong đó giá trị được truyền dưới dạng dữ liệu vào một mẫu cố định và không bao giờ trở thành mã mẫu:

`return render_template("greet.html", name=name)`

<h2>Vẽ đường viền bằng dụng cụ</h2>

Chúng ta có thể tự động hóa quá trình truy vết. Chế độ truy vết của Semgrep theo dõi một giá trị từ nguồn đã khai báo đến đích đã khai báo và báo cáo đường dẫn, giúp mở rộng quy mô kỹ thuật thủ công trên toàn bộ mã nguồn. CodeQL cũng làm điều tương tự với phân tích liên thủ tục sâu hơn. Chúng ta sẽ sử dụng Semgrep trực tiếp trong nhiệm vụ tiếp theo; khái niệm này hoàn toàn giống với những gì chúng ta vừa làm bằng tay.

<h1>GREPPING FOR DANGER</h1>

Việc đọc từng tập tin bằng tay không khả thi đối với các ứng dụng quy mô lớn. Giải pháp là phân loại: một bước sàng lọc nhanh chóng, dựa trên mẫu để xác định các ứng viên tiềm năng, sau đó là xem xét thủ công để xác nhận ứng viên nào là thực sự có khả năng bị tấn công. grep và Semgrep là các công cụ phân loại. Cả hai đều không tìm ra lỗi. Chúng chỉ tìm ra những vị trí đáng để xem xét, và sự khác biệt này rất quan trọng vì một lời gọi hàm không phải là lỗ hổng cho đến khi chúng ta xác nhận đầu vào của nó do kẻ tấn công kiểm soát.

Chúng tôi chạy các công cụ này ngay tại nơi mã nguồn được lưu trữ. Đối với phòng này, máy mục tiêu đã được cài đặt sẵn grep, ripgrep, và Semgrep, với mã nguồn Vaultkeeper đang chờ sẵn trong thư mục chính của tài khoản đánh giá, vì vậy bài thực hành trong Nhiệm vụ 7 yêu cầu chúng ta SSH vào và quét mã nguồn ngay tại chỗ. Nếu muốn làm việc trên máy tính của riêng mình, mã nguồn tương tự có thể được tải xuống từ trình xem tại http://10.113.147.204. Đọc mã nguồn trong trình xem, sau đó chạy các công cụ trên máy của mình.SSH.

<h2>Tìm kiếm các cuộc gọi nguy hiểm</h2>

Hãy bắt đầu với các sink từ nhiệm vụ trước. Một lệnh grep đệ quy duy nhất được giới hạn trong các tệp Python sẽ tìm ra mọi vị trí gọi hàm:

```
$ grep -rn --include="*.py" -E "os\.system|subprocess|eval\(|exec\(|pickle\.loads|render_template_string|cursor\.execute|send_file|open\(" .
./app.py:12:    render_template_string,
./app.py:13:    send_file,
./app.py:86:    heading = render_template_string("Results for: " + q) if q else ""
./app.py:93:        cursor.execute(
./app.py:124:    return send_file(path)
```

<h3>Giải thích về các lá cờ:</h3>

    -r, tìm kiếm đệ quy từ thư mục hiện tại
    -n, in ra số dòng của mỗi kết quả khớp
    --include="*.py"Chỉ tìm kiếm các tệp Python
    -E, hãy sử dụng biểu thức chính quy mở rộng |có nghĩa là "hoặc"

Thêm lệnh này -A 3 -B 3để in ba dòng ngữ cảnh ở mỗi bên của kết quả tìm kiếm, thường là đủ để xem liệu đối số có phải là giá trị yêu cầu hay không. Trên một codebase lớn, ripgrep( rg) là một cách nhanh hơn để thực hiện các tìm kiếm này và bỏ qua bất kỳ thứ gì .gitignore theo mặc định, giúp loại bỏ các gói bên thứ ba được cung cấp ra khỏi kết quả của chúng ta.

<h2>Tìm kiếm các thông tin bí mật và cấu hình bằng lệnh grep.</h2>

Hai lượt quét nữa sẽ cho kết quả ngay lập tức. Lượt quét đầu tiên tìm kiếm các bí mật được mã hóa cứng dựa trên tên biến:

```
$ grep -rnE "(SECRET|KEY|TOKEN|PASSWORD|API_KEY)\s*=\s*['\"]" --include="*.py" .
./config.py:6:SECRET_KEY = "vk_s3cr3t_d0_n0t_sh1p_2026"
````

Các lỗi cấu hình trong lần tìm kiếm thứ hai: chế độ gỡ lỗi vẫn bật, xác thực TLS bị vô hiệu hóa.

```
$ grep -rnE "DEBUG\s*=\s*True|TESTING\s*=\s*True|verify\s*=\s*False" .
./config.py:7:DEBUG = True
```

Một ví dụ hữu ích chỉ dùng một lần là mẫu ID khóa truy cập AWS, có hình dạng cố định mà chúng ta có thể khớp chính xác:

```
$ grep -rE "AKIA[0-9A-Z]{16}" .
# no matches: this codebase contains no AWS keys (grep exits non-zero)
```
<h2>Semgrep để phân loại bệnh nhân dựa trên quy tắc</h2>

grep khớp với văn bản. Semgrep khớp với cấu trúc mã, vì vậy nó hiểu rằng một lệnh gọi vẫn là một lệnh gọi bất kể khoảng cách hay tên biến, và nó cung cấp các bộ quy tắc do cộng đồng viết. Hãy cài đặt nó và trỏ nó đến một bộ quy tắc:

```
$ pip install semgrep        # already installed on the room's machine
$ semgrep --config p/owasp-top-ten .   # registry ruleset, needs internet: run on a connected box, not the offline VM
    app.py
       ❯❱ python.flask.security.injection.tainted-sql-string
              94┆ f"SELECT title, secret FROM vault WHERE owner_id = {uid} AND title LIKE '%{q}%'"
       ❯❱ python.flask.security.audit.avoid_app_run_with_bad_host
             128┆ app.run(host="0.0.0.0", port=5000)
    ┌─────────────────┐
    │ 2 Code Findings │
    └─────────────────┘
```

Cờ này --config chọn bộ quy tắc. p/owasp-top-tenNó ánh xạ các phát hiện tới OWASP categories `p/python`là một bộ quy tắc Python rộng hơn. Cả hai bộ quy tắc đều được lấy từ kho lưu trữ của Semgrep, vì vậy chúng cần truy cập internet, điều này có nghĩa là lệnh trên chạy trên một máy có kết nối (máy của chúng ta hoặc AttackBox với mã nguồn đã tải xuống), chứ không phải trên máy ảo của phòng. Máy ảo đó được thiết kế để ngoại tuyến: Semgrep đã được cài đặt sẵn và một bộ quy tắc sẵn sàng chạy nằm ở đó /opt/review/semgrep-rules, vì vậy khi chúng ta SSH vào để thực hành, chúng ta sẽ quét ngay lập tức mà không cần kết nối, chính xác như những gì chúng ta làm trong Nhiệm vụ 7. Mỗi phát hiện nêu tên một quy tắc, một tệp, một dòng và mức độ nghiêm trọng. Đọc một phát hiện như một ứng cử viên, giống như cách chúng ta đọc một kết quả tìm kiếm grep: Semgrep đã gắn cờ một mẫu, chúng ta vẫn xác nhận đầu vào là do người dùng kiểm soát.

<h2>Một quy tắc tùy chỉnh tối thiểu</h2>

Khi chúng ta muốn tìm kiếm một mẫu mà các quy tắc cộng đồng bỏ sót, một quy tắc Semgrep chỉ cần ba trường là đủ hữu ích:

```
rules:
  - id: render-template-string-usage
    pattern: render_template_string(...)
    message: render_template_string on possible user input, check for SSTI
    severity: WARNING
    languages: [python]
```

```
pattern: Đây là dạng mã cần khớp, 
message: là nội dung in ra khi tìm thấy kết quả phù hợp
severity: là cách sắp xếp đầu ra.
```
Chỉ cần như vậy là đủ để điều chỉnh một quy tắc hiện có cho mục tiêu của chúng ta; việc viết các quy tắc phức tạp lại là một kỹ năng riêng. Nếu cần một công cụ hoàn toàn mã nguồn mở, Opengrep là phiên bản LGPL của Semgrep và sử dụng cùng cú pháp quy tắc.

<h2>Biết khi nào nên dừng lại</h2>

Rủi ro của việc phân loại ban đầu là sự tự tin sai lầm. grep Nó tìm thấy một kết quả cursor.execute, nhưng không biết liệu chuỗi được truyền vào có đến từ người dùng hay từ một hằng số được mã hóa cứng hai dòng phía trên. Hãy xử lý danh sách các kết quả tiềm năng theo thứ tự mức độ ảnh hưởng, xác nhận từng kết quả bằng cách đọc mã xung quanh, và chỉ sau đó mới coi đó là một phát hiện. Sắp xếp danh sách trước khi bắt đầu: một kết quả khớp với render_template_string hoặc cursor.execute đáng được chú ý hơn một kết quả khớp với open( , điều này thường vô hại hơn nhiều. Một danh sách dài các kết quả tìm kiếm bằng grep là một danh sách việc cần làm, không phải là một báo cáo.

<h1>INJECTION VULNERABILITIES IN CODE</h1>

<h2>SQL Tiêm</h2>

Lỗi này xảy ra khi xây dựng truy vấn bằng cách dán dữ liệu người dùng nhập vào chuỗi SQL, sử dụng chuỗi ký tự đặc biệt (f-string) hoặc phép nối chuỗi, thay vì sử dụng các ký tự giữ chỗ:
```
# Vulnerable: q is formatted straight into the SQL text
q = request.args.get("q")
cursor.execute(f"SELECT * FROM items WHERE name = '{q}'")
```
Mô hình an toàn truyền các giá trị dưới dạng tham số, do đó trình điều khiển cơ sở dữ liệu giữ cho dữ liệu và mã lệnh được tách biệt:
```
# Safe: the ? is a placeholder, q is bound as data
cursor.execute("SELECT * FROM items WHERE name = ?", (q,))
```
Hãy chú ý cả trường hợp bậc hai, trong đó dữ liệu đầu vào được lưu trữ một cách gọn gàng và một truy vấn sau đó đọc lại dữ liệu đó vào một chuỗi f-string. Điểm đích vẫn giống nhau, nguồn là cơ sở dữ liệu.

Tấn công SQL injection hiếm khi chỉ đơn thuần là đọc dữ liệu từ cơ sở dữ liệu. Tùy thuộc vào truy vấn và công cụ tấn công, nó có thể sửa đổi các hàng dữ liệu, bỏ qua bước kiểm tra xác thực hoặc đọc các tập tin cục bộ. Nó cũng có thể ẩn mình bên trong các ORM (Object-Relational Module). OMR Thông thường, SQLAlchemy sẽ tự động xây dựng các truy vấn tham số cho chúng ta, đó là lý do tại sao việc sử dụng chúng mang lại cảm giác an toàn, nhưng ngay khi nhà phát triển sử dụng một phương pháp truy vấn trực tiếp không có cấu trúc rõ ràng, SQLAlchemy sẽ... text()của Django .raw() hoặc .extra()Họ cung cấp cho cơ sở dữ liệu một chuỗi do chính họ tạo ra và mất đi lớp bảo vệ đó, vì vậy sự hiện diện của ORM không đảm bảo rằng truy vấn được tham số hóa. Khi chúng ta tìm thấy một trong những "lối thoát" đó với một chuỗi f bên trong, hãy xử lý nó chính xác như một truy vấn thô. cursor.execute.

<h2>Chèn lệnh</h2>

Lỗi này đưa dữ liệu do người dùng nhập vào vào chuỗi lệnh mà trình thông dịch lệnh sẽ phân tích:

```
# Vulnerable: shell=True means the shell parses the whole string
host = request.args.get("host")
subprocess.run(f"ping -c 1 {host}", shell=True)
```
Một giá trị như `127.0.0.1; cat /etc/passwd` sẽ chạy lệnh thứ hai os.system và os.popenmang cùng một rủi ro. Mẫu an toàn truyền các đối số dưới dạng danh sách và bỏ qua shell, vì vậy đầu vào chỉ có thể là một đối số duy nhất, không bao giờ là cú pháp mới:

```
# Safe: no shell, host is one argument and cannot add commands
subprocess.run(["ping", "-c", "1", host])
```

Công tắc chuyển đổi chính là shell. shell=TrueToàn bộ chuỗi được truyền cho /bin/sh, chương trình này coi `;`, `|`, `&&`, và dấu ngoặc kép ngược là cú pháp để thực hiện. Với một danh sách và không có shell, hệ điều hành sẽ chạy trực tiếp chương trình được đặt tên và mỗi phần tử là một đối số theo nghĩa đen, vì vậy không còn cú pháp nào để kẻ tấn công có thể lén lút đưa vào.

<h2>Chèn mẫu phía máy chủ</h2>

Lỗi này xảy ra khi hiển thị dữ liệu người dùng nhập vào dưới dạng mẫu thay vì truyền trực tiếp vào mẫu đó. render_template_string Nó biên dịch đối số của mình thành mẫu Jinja2 mỗi lần:

```
# Vulnerable: the user controls template syntax
name = request.args.get("name")
return render_template_string("Hello " + name)
```

Vì Jinja2 đánh giá các biểu thức bên trong cùng một tiến trình Python xử lý yêu cầu, nên việc chèn mẫu không chỉ giới hạn ở việc in văn bản; nó có thể dẫn đến việc thực thi mã. Mô hình an toàn giữ nguyên mẫu và truyền giá trị dưới dạng dữ liệu:

```
# Safe: the template is a static file, name is just data
return render_template("hello.html", name=name)
```

Bài kiểm tra sơ bộ (smoke test) là {{7*7}}: nếu phản hồi chứa 49, thì đầu vào đã được đánh giá như một mẫu chứ không phải được xuất ra dưới dạng văn bản. Từ đó, ta cần thực thi mã từ xa bằng cách leo lên biểu đồ đối tượng của Python. Mỗi đối tượng đều hiển thị kiểu của nó thông qua __class__, nguồn gốc của nó thông qua __mro__, và đối với một hàm, không gian tên toàn cục của mô-đun đã định nghĩa nó thông qua __globals__. Theo dõi các thuộc tính đó đủ xa, ta sẽ đến một mô-đun như osvà gọi os.popen. Jinja2 giúp việc leo lên dễ dàng hơn bằng cách để lại một vài công cụ hỗ trợ trông có vẻ vô hại trong phạm vi bên trong mỗi mẫu, cycler, lipsum, và requesttrong số đó, bất kỳ công cụ nào cũng có thể đóng vai trò là bậc thang đầu tiên. Chúng ta sẽ đi từng bước một với một trong những công cụ này trong bài tập 7.

<h2>Giải mã dữ liệu không an toàn</h2>

Lỗi này xảy ra khi giải mã các byte do kẻ tấn công điều khiển bằng một bộ giải mã có thể tạo ra các đối tượng tùy ý. `pickle` là thủ phạm tồi tệ nhất, bởi vì việc giải mã có thể thực thi mã:

```
# Vulnerable: a crafted pickle runs code on load
data = request.cookies.get("prefs")
prefs = pickle.loads(base64.b64decode(data))
```

`yaml.load` Nếu không có trình tải an toàn thì cũng gặp vấn đề tương tự. Các biện pháp khắc phục là sử dụng định dạng chỉ chứa dữ liệu như JSON, hoặc buộc sử dụng trình tải an toàn ( `yaml.safe_load` hoặc `yaml.load(data, Loader=yaml.SafeLoader))`. Một khi kẻ tấn công kiểm soát được những gì được giải mã, chúng thường kiểm soát được những gì được thực thi. Cơ chế là pickle có thể được yêu cầu gọi bất kỳ đối tượng nào trong quá trình tải (thông qua `__reduce__`), do đó một luồng byte được tạo ra sẽ trở thành mã thực thi, chứ không chỉ là một từ điển được xây dựng lại. Không có cách nào an toàn để giải mã dữ liệu mà chúng ta không tin tưởng, vì vậy giải pháp thực sự là không bao giờ sử dụng pickle làm phương tiện truyền tải dữ liệu đầu vào của người dùng.

<h2>Câu hỏi cần đặt ra</h2>

Với mỗi kết quả trong lớp này, hãy tự hỏi hai điều: giá trị đó có do người dùng kiểm soát hay không, và có bất kỳ sự xác thực nào diễn ra trước khi xử lý kết quả hay không? Nếu câu trả lời là "có" rồi "không", thì chúng ta đã tìm ra được kết quả.

<h1>ACCESS CONTROL, PATH, AND SECRET FLAWS IN CODE</h1>


Không phải lỗi nào cũng phù hợp với mô hình tấn công từ nguồn đến đích. Ba trong số những phát hiện phổ biến nhất trong quá trình xem xét mã thực tế đến từ việc thiếu kiểm tra quyền truy cập, xử lý đường dẫn tệp không an toàn và các thông tin bí mật còn sót lại trong cây mã nguồn. Đây thường là những lỗi dễ khắc phục nhất, bởi vì việc phát hiện ra chúng chỉ đơn giản là nhận thấy những gì còn thiếu chứ không phải là theo dõi luồng dữ liệu. Đây là phần thứ hai của thư viện tham khảo của chúng tôi.

<h2>Duyệt đường đi</h2>

Lỗi này xảy ra khi tạo đường dẫn tệp từ dữ liệu người dùng nhập vào mà không kiểm tra xem kết quả có nằm trong thư mục dự định hay không:


# Vulnerable: filename can be ../../etc/passwd
filename = request.args.get("file")
return send_file(os.path.join(UPLOAD_DIR, filename))
os.path.joinNó không bảo vệ chúng ta. Nó chỉ là việc nối chuỗi bằng dấu phân cách, và tệ hơn nữa, nếu filenameđó là đường dẫn tuyệt đối thì nó sẽ loại bỏ UPLOAD_DIRhoàn toàn. ../Chuỗi sẽ đi thẳng ra khỏi thư mục tải lên. Phương pháp an toàn hơn trong Flask là send_from_directory, phương pháp này định tuyến đường dẫn thông qua Werkzeug safe_joinvà trả về lỗi 404 khi đường dẫn được giải quyết thoát khỏi thư mục:


# Safe: send_from_directory rejects paths that escape the directory
return send_from_directory(UPLOAD_DIR, filename)
Bài học cần ghi nhớ trong bất kỳ bài đánh giá nào: send_file(os.path.join(...))hình dạng nguy hiểm nằm ở dữ liệu đầu vào của người dùng, send_from_directoryhình dạng an toàn nằm ở dữ liệu đầu vào. Việc quan sát send_fileđường dẫn người dùng được kết nối là lý do đủ để kiểm tra khả năng duyệt web.

Hậu quả là người dùng ứng dụng có quyền truy cập đọc vào bất kỳ tập tin nào: chính mã nguồn, config.pyvới các thông tin bí mật /etc/passwd, khóa SSH, các tệp tải lên của người dùng khác. Trường hợp đường dẫn tuyệt đối là trường hợp dễ gây ra lỗi, vì os.path.join(UPLOAD_DIR, "/etc/passwd")nó trả về giá trị rỗng /etc/passwd. Một nhà phát triển cẩn thận loại bỏ ../dấu gạch chéo đầu tiên nhưng không bao giờ từ chối nó vẫn có nguy cơ bị tấn công.












