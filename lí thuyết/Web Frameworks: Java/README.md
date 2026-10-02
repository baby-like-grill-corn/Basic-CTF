# Mục tiêu học tập
1. Đọc mã nguồn Spring Boot để xác định các sink dành riêng cho framework.
2. Nhận diện bề mặt bộ truyền động bị hở và lấy thông tin bí mật từ `/actuator/env` và `/actuator/heapdump`
3. Phát hiện lỗ hổng SQL injection vượt qua lớp dữ liệu của Spring thông qua câu lệnh SQL thô được xây dựng bằng chuỗi.
4. Xác định và khai thác việc gán hàng loạt trong bộ điều khiển liên kết toàn bộ thực thể.
5. Nhận diện các điểm đến của quá trình giải mã Java và điều khiển một điểm đến để thực thi mã từ xa bằng ysoserial.

# Lỗi cấu hình bộ truyền động và rò rỉ môi trường

Actuator là hệ thống con quản lý được tích hợp sẵn trong thư viện `spring-boot-starter-actuator` phụ thuộc. Nó cung cấp thông tin về trạng thái hoạt động, số liệu, môi trường, ánh xạ, bản ghi bộ nhớ heap, và nhiều hơn nữa. Không có điểm cuối nào trong số này giúp ích cho người dùng cuối; tất cả đều có lợi cho nhà phát triển hoặc kẻ tấn công. Spring Boot 2.x giới hạn tập hợp các thông tin được cung cấp `health` theo `info` mặc định, và chỉ cần một dòng cấu hình là có thể mở khóa phần còn lại.

## Nhận diện nó ngay trong mã nguồn 

Hãy tưởng tượng ứng dụng của bạn là một tòa nhà. `Actuator` giống như một "phòng kỹ thuật trung tâm" hiển thị toàn bộ sơ đồ điện nước, nhiệt độ, và camera an ninh của tòa nhà đó. Nó sinh ra để giúp người quản lý (developer) theo dõi tòa nhà hoạt động tốt không.Mặc định phòng này bị khóa.

Mở `application.properties` trong trình xem ảnh. Nếu thấy dòng quan trọng là:

`management.endpoints.web.exposure.include=*`

Nó tương đương với việc mở toang cửa phòng kỹ thuật cho bất kỳ ai đi qua cũng vào xem được 

Ký tự `*` đại diện cho phép truy cập mọi điểm cuối Actuator trên cổng riêng của ứng dụng. Các nhóm đã thiết lập chính xác điều này để giám sát hoặc vì họ đã sao chép nó từ một câu trả lời trên diễn đàn. Bên dưới đó, một thuộc tính tùy chỉnh chứa một giá trị mà mã nguồn để trống:

`app.actuatorflag=<REDACTED>`

Hai thông tin từ một tệp: giao diện quản lý hoàn toàn mở, và có một thuộc tính tùy chỉnh đáng đọc từ ứng dụng đang chạy. `/env` Điểm cuối của Actuator che giấu các khóa khớp với danh sách khóa nhạy cảm của nó ( `password`, `secret`, `key`, `token`, `credentials`). Một khóa như `app.actuatorflag` không khớp với bất kỳ khóa nào trong số đó, vì vậy nó được hiển thị dưới dạng văn bản thuần.

Bình thường, Actuator sẽ tự động giấu (che mờ bằng dấu *) các từ nhạy cảm như password, secret, token. Tuy nhiên, nếu lập trình viên tự tạo ra một cái tên lạ tai (ví dụ: app.actuatorflag), Actuator sẽ không nhận diện được đây là đồ nhạy cảm và hiển thị lộ thiên 100% bằng chữ thường (văn bản thuần). Hacker chỉ cần gõ đường dẫn là đọc được mật mã.

## Khai thác ứng dụng Live

Trước tiên hãy liệt kê những gì được hiển thị, sau đó đọc trực tiếp thuộc tính từ `/actuator/env` (Đường dẫn này hiển thị các "biến môi trường" (thông tin cấu hình hệ thống):

`root@TryHackMe:~# curl -s http://MACHINE_IP:8080/actuator | jq '._links | keys'`

Với bộ ký tự đại diện, danh sách sẽ bao gồm `env`, `heapdump`, `mappings`, `configprops`, và nhiều hơn nữa. Đọc trực tiếp thuộc tính tùy chỉnh bằng cách thêm tên của nó vào `/env`đường dẫn:

```
root@TryHackMe:~# curl -s http://MACHINE_IP:8080/actuator/env/app.actuatorflag | jq
{
  "property": {
    "source": "Config resource 'class path resource [application.properties]' ...",
    "value": "THM{...}"
  },
  ...
}
```

Giá trị được hiển thị đầy đủ vì khóa của nó không nằm trong danh sách nhạy cảm của Actuator. Cùng một giao diện đó cung cấp cho chúng ta một tùy chọn thứ hai, mạnh mẽ hơn: `/actuator/heapdump`tải xuống ảnh chụp nhanh nhị phân của toàn bộ vùng nhớ heap của JVM, và `strings`dựa trên đó tìm kiếm bất kỳ thông tin xác thực nào mà ứng dụng đang lưu giữ trong bộ nhớ. Đối với một thuộc tính được đặt tên duy nhất, `/env`đây là công cụ chính xác; để tìm kiếm mật khẩu cơ sở dữ liệu và khóa API không bao giờ xuất hiện trong cấu hình, việc sao lưu vùng nhớ heap là công cụ tìm thấy mọi thứ.

Heapdump là gì? "Heap dump" giống như một ảnh chụp X-quang toàn bộ não bộ của ứng dụng tại một thời điểm. Bất kỳ thứ gì ứng dụng đang xử lý, đang nhớ (user đăng nhập, mật khẩu database, thẻ tín dụng đang thanh toán...) đều nằm trong vùng nhớ này.

Cách hacker lấy: Hacker tải file heapdump này về (một file đuôi .hprof). Sau đó dùng các câu lệnh lọc chữ (strings và grep) hoặc công cụ chuyên dụng để "lục lọi" trong file đó. Dù lập trình viên có giấu mật khẩu kỹ cỡ nào trong file cấu hình, thì khi ứng dụng chạy, nó vẫn phải nạp vào bộ nhớ, và hacker sẽ tìm ra được hết.

```
root@TryHackMe:~# curl -s http://MACHINE_IP:8080/actuator/heapdump -o heap.hprof
root@TryHackMe:~# strings heap.hprof | grep -iE 'password|secret|token' | sort -u | head
```

Việc hiểu về heap dump rất quan trọng vì nó cho thấy những gì cấu hình không bao giờ lưu giữ. Một `.hprof`tập tin là ảnh chụp nhanh của mọi đối tượng đang hoạt động trong JVM: mọi chuỗi được lưu trữ nội bộ, mọi trường trên mọi bean, mọi yêu cầu đang được xử lý. Đặc biệt,cơ chế `@Value("${db.password}")` injection của Spring giữ giá trị dưới dạng tham chiếu mạnh trong suốt vòng đời của ứng dụng, vì vậy nó có trong mọi heap. `strings` là một bước xử lý nhanh ban đầu; VisualVM hoặc Eclipse MAT mở tập tin để duyệt có cấu trúc khi thông tin xác thực được gói trong một đối tượng thay vì chỉ là một chuỗi ký tự đơn thuần.

Phiên bản rất quan trọng trong quá trình xem xét. Spring Boot 1.x mặc `/env` định cho phép truy cập vào và thậm chí cho phép ghi vào đó, điều này dẫn đến thực thi mã từ xa (RCE) thông qua `/refresh`. Spring Boot 2.x hạn chế quyền truy cập vào `health`và `info`, biến chúng thành `/env`chỉ đọc, và là phiên bản mà ký tự đại diện ở trên là dấu hiệu nhận biết. Spring Boot 3.x che giấu `/env`các giá trị theo mặc định, đẩy kẻ tấn công trở lại việc sao chép bộ nhớ heap. Đôi khi các nhà điều hành bọc Actuator bằng Spring Security, nhưng điều đó có thể bị vượt qua khi nhóm chuyển nó sang `management.server.port`và quên thiết lập tường lửa cho cổng đó, hoặc mã hóa cứng `/actuator/**`các đường dẫn mà proxy không bao giờ truy cập được.

Bài học rút ra từ việc xem xét lại này mang tính kỹ thuật: hãy tìm `exposure.include=*`(hoặc bất kỳ ứng dụng phiên bản 1.x nào), và coi giao diện quản lý như một điểm cuối dễ tiết lộ thông tin bí mật. Giải pháp là chỉ để lộ những thông tin mà bộ phận vận hành cần và đặt Actuator sau lớp xác thực trên một cổng riêng biệt, được bảo vệ bởi tường lửa.

# Lỗ hổng SQL Injection bên dưới lớp Spring Data

Spring Data và JPA tham số hóa các truy vấn mà chúng tạo ra, và Spring `JdbcTemplate`cũng tham số hóa khi bạn truyền các đối số riêng biệt. Sự bảo vệ này vẫn duy trì cho đến khi nhà phát triển tự xây dựng chuỗi SQL và chèn dữ liệu đầu vào của người dùng vào đó. Tại thời điểm đó, truy vấn được tạo ra từ văn bản của kẻ tấn công và sự đảm bảo về ràng buộc sẽ biến mất, giống hệt như trường hợp sử dụng JDBC thô.

## Nhận diện nó ngay trong mã nguồn 

Mở `SearchController.java`trong trình xem và đọc nội dung tìm kiếm:

```
String sql = "SELECT id, title, body FROM articles WHERE title = '" + q + "'";
List<Map<String, Object>> rows = jdbc.queryForList(sql);
```

Giá trị do người dùng cung cấp `q`được nối trực tiếp vào chuỗi SQL bên trong dấu ngoặc đơn. Hình thức an toàn truyền giá trị `q`dưới dạng tham số ràng buộc `jdbc.queryForList("... WHERE title = ?", q)`, trong đó giá trị không bao giờ được thoát ra khỏi chuỗi. Trong quá trình xem xét, mẫu cần tìm kiếm chính xác là: một chuỗi SQL được xây dựng bằng `+`hoặc `String.format`trộn lẫn giá trị yêu cầu, sau đó được chuyển cho `queryForList`, `query`, `execute`, hoặc EntityManager `createQuery`.

Giờ đã mở  `Flag.java` trong trình xem. Nó nằm trong cùng một  `model` gói với  `Article` và  `User`, và  `@Table(name = "flags")` chú thích lớp của nó đặt tên trực tiếp cho bảng: `flags`, với một  cột `name` và một  `secret`cột khác, và không có bộ điều khiển nào hiển thị nó. Đây là lợi thế của hộp trắng: bằng cách đọc mô hình, chúng ta khôi phục lược đồ, tên bảng và cột, trước khi gửi một tải trọng duy nhất. Với lược đồ trong tay, chúng ta có thể sử dụng`UNION` để lấy cờ trực tiếp từ truy vấn có thể tiêm.

## Khai thác ứng dụng Live

Truy vấn chọn ba cột ( id, title, body), vì vậy UNION của chúng ta phải trả về ba. Chúng ta đóng dấu ngoặc kép, UNION một câu lệnh select của secret từ `flags`bảng, và bỏ dấu ngoặc kép cuối cùng mà ứng dụng thêm vào:

```
root@TryHackMe:~# curl -s --get http://10.112.147.22:8080/search \
  --data-urlencode "q=' UNION SELECT id, secret, secret FROM flags -- "
{"results":[{"ID":1,"TITLE":"THM{...}","BODY":"THM{...}"}]}
```

Giải thích về các lá cờ:
```
--get: Gửi dữ liệu dưới dạng chuỗi truy vấn trong yêu cầu GET.
--data-urlencode: Mã hóa URL dữ liệu để các dấu ngoặc kép, khoảng trắng và bình luận được giữ nguyên khi truyền tải.
```
Chúng tôi đặt `secret`cả ở vị trí tiêu đề và nội dung để cờ hiển thị ở bất kỳ trường nào mà phản hồi trả về, và phần `--`bình luận sẽ che khuất đoạn trích dẫn mà ứng dụng thêm vào sau khi chúng tôi nhập liệu. Phản hồi trả về hàng từ `flags`bảng ẩn mà không có tuyến đường nào được thiết kế để truy cập.

Cùng một cái bẫy tồn tại ở mọi lớp truy cập dữ liệu của Spring, và mỗi lớp đều có một phiên bản an toàn tương ứng mà người đánh giá nên nhận ra. `JdbcTemplate`Nó an toàn khi có `queryForList(sql, args...)`và không an toàn khi SQL được xây dựng sẵn từ dữ liệu đầu vào. JPA an toàn với `@Query`các tham số được đặt tên hoặc tham số vị trí ( `:title`hoặc `?1`) và không an toàn khi nhà phát triển nối chúng thành một `createQuery`chuỗi. Ngay cả việc tạo tên phương thức của repository cũng an toàn, vì Spring tạo ra SQL tham số hóa từ chữ ký phương thức. Vì vậy, câu hỏi cần xem xét luôn giống nhau: giá trị người dùng có đến được cơ sở dữ liệu dưới dạng tham số ràng buộc hay là một phần của văn bản truy vấn? Khi nó là một phần của văn bản, các lớp thực thể xung quanh sẽ cung cấp cho chúng ta lược đồ, tên bảng và tên cột để trích xuất thông qua lỗ hổng.

Tóm lại rất đơn giản: ORM hay thư viện khác `JdbcTemplate`không phải là bằng chứng về tính an toàn. Ngay khi chúng ta thấy một chuỗi SQL được xây dựng từ dữ liệu đầu vào chứ không phải từ các tham số, điểm cuối đó đã dễ bị tấn công.



















