# Mục tiêu học tập
1. Đọc mã nguồn Spring Boot để xác định các sink dành riêng cho framework.
2. Nhận diện bề mặt bộ truyền động bị hở và lấy thông tin bí mật từ /actuator/envđó./actuator/heapdump
3. Phát hiện lỗ hổng SQL injection vượt qua lớp dữ liệu của Spring thông qua câu lệnh SQL thô được xây dựng bằng chuỗi.
4. Xác định và khai thác việc gán hàng loạt trong bộ điều khiển liên kết toàn bộ thực thể.
5. Nhận diện các điểm đến của quá trình giải mã Java và điều khiển một điểm đến để thực thi mã từ xa bằng ysoserial.

# Actuator Misconfiguration and the Environment Leak

Actuator là hệ thống con quản lý được tích hợp sẵn trong thư viện `spring-boot-starter-actuator` phụ thuộc. Nó cung cấp thông tin về trạng thái hoạt động, số liệu, môi trường, ánh xạ, bản ghi bộ nhớ heap, và nhiều hơn nữa. Không có điểm cuối nào trong số này giúp ích cho người dùng cuối; tất cả đều có lợi cho nhà phát triển hoặc kẻ tấn công. Spring Boot 2.x giới hạn tập hợp các thông tin được cung cấp `health` theo `info` mặc định, và chỉ cần một dòng cấu hình là có thể mở khóa phần còn lại.

## Nhận diện nó ngay trong nguồn gốc

Mở `application.properties` trong trình xem ảnh. Dòng quan trọng là:
`management.endpoints.web.exposure.include=*`





























