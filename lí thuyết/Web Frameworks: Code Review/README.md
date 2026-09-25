<b> ORIENTING IN A CODEBASE </b>

Khi mở một kho lưu trữ không quen thuộc, theo bản năng chúng ta sẽ bắt đầu đọc các tệp một cách ngẫu nhiên. Điều đó sẽ lãng phí mười phút đầu tiên, mười phút quý giá và hữu ích nhất mà chúng ta có. Có một trình tự đọc giúp chúng ta từ chỗ không biết gì đến chỗ định hướng trước khi tìm kiếm bất kỳ lỗi nào, và nó hiệu quả vì các danh mục giống nhau trong mọi framework ngay cả khi tên tệp thay đổi.

Thứ tự đọc

1	README và tài liệu	-> Ứng dụng này làm gì, cách thức hoạt động ra sao, và sử dụng framework nào. <br>
2	Biểu thức phụ thuộc	-> Thư viện và phiên bản, bề mặt tấn công của bên thứ ba <br>
3	Tệp cấu hình	-> Cờ gỡ lỗi, thông tin bí mật, chuỗi cơ sở dữ liệu <br>
4	Định tuyến / điểm vào	-> Danh sách đầy đủ các phương thức xâm nhập, bản đồ bề mặt tấn công của chúng tôi <br>
5	middleware và decorator xác thực	-> Những tuyến đường nào được bảo vệ, những tuyến đường nào không. <br>
6	Lớp cơ sở dữ liệu / mô hình-> Dữ liệu được lưu trữ ở đâu và cách thức xây dựng các truy vấn
Các xử lý viên tuyến đường cá nhân	-> Lý do đằng sau mỗi điểm truy cập <br>

Các bản khai phụ thuộc

Tệp kê khai liệt kê mọi thư viện bên thứ ba và, nếu may mắn, phiên bản được ghim của nó. Trong Python, đó là requirements.txt(hoặc pyproject.toml), trong Java pom.xmllà , trong .NET là một .csprojtệp. Phiên bản rất quan trọng vì một bản phát hành cũ được ghim có thể chứa một lỗ hổng CVE đã biết mà chúng ta có thể tra cứu trực tiếp. Một phiên bản được ghim ở đây là một manh mối mà chúng ta có thể hành động ngay lập tức: tìm kiếm nó trong cơ sở dữ liệu CVE và chúng ta có thể tìm thấy một lỗ hổng đã biết trước khi đọc bất kỳ dòng mã nào của ứng dụng. Một bước kiểm tra bổ sung nhanh chóng là pip-audit, công cụ này so sánh tệp kê khai với cơ sở dữ liệu lỗ hổng, nhưng hãy coi đó là một bước kiểm tra phụ, không phải là trọng tâm của việc xem xét mã.

Cấu hình đầu tiên

Các tệp cấu hình là nơi các nhà phát triển thường mắc lỗi trước khi bất kỳ yêu cầu nào được xử lý. Chúng ta đang tìm kiếm các cờ gỡ lỗi vẫn được bật ( DEBUG = True), khóa bí mật được viết dưới dạng chuỗi ký tự, chuỗi kết nối cơ sở dữ liệu có mật khẩu được nhúng và các kiểm tra bảo mật bị vô hiệu hóa. Trong một dự án Flask, nơi thường chứa những thứ này là config.py. Hãy đọc nó sớm, vì một DEBUG = Truelỗi ở đây sẽ thay đổi cách hoạt động của mọi lỗi sau này. Chuỗi kết nối cơ sở dữ liệu là một phần thưởng thường xuyên, vì nó thường chứa tên người dùng và mật khẩu, và một chuỗi kết nối đã được cam kết là một thông tin xác thực hoạt động, chứ không chỉ là một gợi ý. <br>
DEBUG = True là một cách để kích hoạt chế độ debug (kiểm tra lỗi) trong một chương trình, thường được sử dụng trong lập trình. Khi biến DEBUG được đặt thành True, các thông báo debug (như log, thông báo lỗi, hoặc các câu lệnh in ra thông tin chi tiết) sẽ được hiển thị, giúp người lập trình dễ dàng theo dõi và phát hiện lỗi trong quá trình chạy chương trình.

Định tuyến chính là bản đồ bề mặt tấn công.

Mỗi route là một điểm vào, và việc liệt kê chúng là điều hữu ích nhất chúng ta làm trước khi đọc logic. Trong Flask, các route được đánh dấu bằng decorator @app.route:
```
@app.route("/files/download")
def download():
    ...
```
Django thu thập chúng trong một urlpatternsdanh sách, Spring sử dụng các chú thích như `<router-name> @GetMapping`. Bất kể cú pháp nào, hãy liệt kê mọi route trước. Danh sách đó là bề mặt tấn công của chúng ta; mọi thứ chúng ta kiểm thử đều nằm trên đó.

Ranh giới xác thực

Với danh sách các tuyến đường, hãy đánh dấu những tuyến đường nào yêu cầu xác thực. Trong Flask, điều đó thường có nghĩa là một @login_requireddecorator (hoặc một kiểm tra tùy chỉnh) nằm phía trên tuyến đường. Các tuyến đường thú vị là những tuyến đường xử lý dữ liệu nhạy cảm nhưng thiếu decorator đó, và những tuyến đường kiểm tra vai trò bằng cách sử dụng giá trị do client cung cấp.

Tiếp cận một khuôn khổ chưa quen thuộc

Chúng ta sẽ gặp những framework mà mình chưa từng sử dụng. Cách làm luôn giống nhau: đọc README để tìm tên framework, xác nhận trong manifest phụ thuộc, sau đó áp dụng thứ tự đọc như trên. Từ vựng có thể khác nhau, nhưng các danh mục thì không. Một file cấu hình vẫn là một file cấu hình dù nó là config.py, application.properties, hay appsettings.json.

Lập bản đồ nguồn Vaultkeeper

Mở mã nguồn của ứng dụng mục tiêu, một công cụ Flask nhỏ có tên là Vaultkeeper. Chúng ta có thể đọc nó theo hai cách: trong trình xem trên trình duyệt tại http://10.113.147.204, hiển thị từng tệp bên cạnh ứng dụng đang chạy, hoặc qua SSH trên chính máy đó, nơi mã nguồn nằm trong ~/vaultkeeper. Áp dụng thứ tự đọc: mở tệp manifest, sau đó config.py, rồi tìm mọi @app.routevà ghi lại danh sách. Khi hoàn thành bước 4, chúng ta sẽ có một bản đồ một trang của ứng dụng, và chúng ta chưa chạy nó lần nào.

SOURCE-TO-SINK ANALYSIS









