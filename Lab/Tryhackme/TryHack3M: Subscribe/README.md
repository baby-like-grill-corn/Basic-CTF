# 1. Trinh sát hệ thống (Port Enumeration)
Mục tiêu: Quét toàn bộ các cổng mạng để xác định các dịch vụ đang mở trên máy chủ mục tiêu.

Thực hiện: Chạy quét cổng toàn diện (Nmap) để phát hiện các dịch vụ quan trọng:

Port 80 (HTTP): Giao diện web chính của ứng dụng.

Port 8000: Giao diện SIEM Splunk (dùng cho giai đoạn phân tích log cuối bài).

Port 8089: Cổng quản lý ngầm của Splunkd.

Port 8191: Dịch vụ NoSQL/MongoDB phụ trợ.

Port 4009: Cổng trả về mã lỗi 403 Forbidden (bảo vệ thư mục).

# 2. Vượt qua mã mời (Invite Code Bypass)
Vấn đề: Trang đăng ký (Sign up) yêu cầu một Invite Code hợp lệ mà người dùng bình thường không có.

Tư duy chuyên gia (Client-Side Logic Flaw): Logic kiểm tra và cấp mã mời bị viết trực tiếp ở mã nguồn phía client (tệp JavaScript invite.js).

Cách giải quyết: Đọc mã nguồn JavaScript để tìm endpoint PHP xử lý sinh mã. Tiến hành gửi yêu cầu HTTP đúng ngữ cảnh nguồn (Domain/Origin) để đánh lừa hệ thống, từ đó lấy được mã mời, đăng ký thành công và đăng nhập bằng tài khoản guest.

# 3. Leo thang đặc quyền (Privilege Escalation & Web Shell)
Thay đổi trạng thái Session (Cookie Manipulation):

Tài khoản guest không thể truy cập các nội dung VIP. Khi kiểm tra bộ nhớ trình duyệt, hệ thống lưu biến trạng thái VIP: false.

Chuyên gia tiến hành sửa trực tiếp giá trị này thành VIP: true để mở khóa giao diện VIP phía client.

Khai thác Web Shell & Lộ tệp cấu hình:

Do nút bấm kích hoạt phòng lab bị lỗi giao diện iframe, chuyên gia trích xuất đường dẫn tệp PHP ẩn bên trong (advanced_timing.php) và truy cập trực tiếp để mở một Terminal dòng lệnh thu nhỏ trên web.

Đọc tệp cấu hình config.php thông qua terminal bị giới hạn này để thu thập Access Token quản trị và đường dẫn đến trang quản trị viên (Admin panel).
# 4. Khai thác lỗ hổng SQL Injection (SQLmap Automation)
Bắt gói tin (Request Capture): Sử dụng Proxy để chặn gói tin POST tại trang đăng nhập admin và lưu thành tệp request.txt.

Thực thi lệnh khai thác tự động:
```
Bash
sqlmap -r request.txt --dump
```
Giải thích lệnh:

`-r request.txt`: Nạp gói tin HTTP thô chứa toàn bộ header, cookie và tham số cần kiểm tra mà không cần cấu hình thủ công.
`--dump`: Tự động tìm kiếm điểm tiêm nhiễm SQLi và trích xuất toàn bộ cơ sở dữ liệu, các bảng, cột cùng dữ liệu người dùng (tài khoản/mật khẩu quản trị).

Kết quả: Trích xuất thành công cơ sở dữ liệu hackme và lấy được thông tin đăng nhập tài khoản quản trị (admin).
