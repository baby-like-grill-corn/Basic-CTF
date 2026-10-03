# SMB Là gì ?

SMB- Giao thức khối thông báo máy chủ (Server Message Block Protocol - MSB) - là một giao thức truyền thông máy khách-máy chủ được sử dụng để chia sẻ quyền truy cập vào các tệp, máy in, cổng nối tiếp và các tài nguyên khác trên mạng. `https://www.techtarget.com/searchnetworking/definition/Server-Message-Block-Protocol`

Máy chủ cung cấp hệ thống tệp và các tài nguyên khác (máy in, đường dẫn được đặt tên, API) cho các máy khách trên mạng. Máy tính khách có thể có ổ cứng riêng, nhưng chúng cũng muốn truy cập vào hệ thống tệp và máy in được chia sẻ trên máy chủ.

Giao thức SMB này được gọi là giao thức phản hồi-yêu cầu, có nghĩa là nó truyền nhiều thông điệp giữa máy khách và máy chủ để thiết lập kết nối. Máy khách kết nối với máy chủ bằng cách sử dụng TCP/IP (thực ra NetBIOS qua TCP/IP như được quy định trong RFC1001 và RFC1002), NetBEUI hoặc IPX/SPX.

# Làm thế nào SMB công việc?

<img width="534" height="239" alt="image" src="https://github.com/user-attachments/assets/3113fd0b-b6bc-4fdb-b342-38167d503cf6" />

Sau khi thiết lập kết nối, các máy khách có thể gửi lệnh (SMB) đến máy chủ để truy cập các thư mục chia sẻ, mở tập tin, đọc và ghi tập tin, và nói chung là thực hiện tất cả các tác vụ mà bạn muốn làm với máy khách.hệ thống tệpTuy nhiên, trong trường hợp của SMB Những việc này được thực hiện qua mạng.

# Cái gì chạy SMB ?

Hệ điều hành Microsoft Windows kể từ Windows 95 đã bao gồm cả phiên bản máy khách và máy chủ. SMB Hỗ trợ giao thức. Samba, một máy chủ mã nguồn mở hỗ trợ... SMB Giao thức này đã được phát hành cho các hệ thống Unix

Liệt kê

Liệt kê là quá trình thu thập thông tin về mục tiêu nhằm tìm ra các hướng tấn công tiềm tàng và hỗ trợ khai thác.

Quá trình này rất cần thiết để một cuộc tấn công thành công, vì việc lãng phí thời gian vào các khai thác không hiệu quả hoặc có thể làm sập hệ thống sẽ là sự lãng phí năng lượng. Việc liệt kê có thể được sử dụng để thu thập tên người dùng, mật khẩu, thông tin mạng, tên máy chủ, dữ liệu ứng dụng, dịch vụ hoặc bất kỳ thông tin nào khác có thể có giá trị đối với kẻ tấn công.

SMB 

Thông thường, có SMB Chia sẻ ổ đĩa trên máy chủ có thể kết nối và sử dụng để xem hoặc truyền tải tập tin. SMB Những thư mục chia sẻ này thường là điểm khởi đầu tuyệt vời cho kẻ tấn công muốn tìm kiếm thông tin nhạy cảm — bạn sẽ ngạc nhiên về những gì đôi khi được chứa đựng trong đó. 

Quét cổng

Bước đầu tiên của quá trình liệt kê là thực hiện quét cổng, để tìm hiểu càng nhiều thông tin càng tốt về các dịch vụ, ứng dụng, cấu trúc và hệ điều hành của máy tính trong phòng thí nghiệm.

Nếu bạn chưa từng tìm hiểu về quét cổng, tôi khuyên bạn nên xem qua `https://tryhackme.com/room/furthernmap` .

# Enum4Linux

Enum4linux là một công cụ được sử dụng để liệt kê. SMB chia sẻ trên cả Windows và Linux Về cơ bản, nó là một lớp bao bọc xung quanh các công cụ trong gói Samba và giúp dễ dàng trích xuất thông tin nhanh chóng từ mục tiêu liên quan đến... SMB Phần mềm này đã được cài đặt sẵn trên AttackBox, tuy nhiên nếu bạn cần cài đặt nó trên máy tấn công của riêng mình, bạn có thể thực hiện việc đó từ kho lưu trữ GitHub chính thức.(`https://github.com/CiscoCXSecurity/enum4linux`).

Cú pháp của Enum4Linux rất hay và đơn giản: `enum4linux [options] ip`

CHỨC NĂNG THẺ
```
-U lấy danh sách người dùng 
-M lấy danh sách máy
-N lấy bản sao danh sách tên (khác với -U và -M)
-S lấy danh sách chia sẻ
-P lấy thông tin chính sách mật khẩu
-G lấy danh sách nhóm và thành viên
-a tất cả những điều trên (liệt kê cơ bản đầy đủ)
```
Các loại SMB Khai thác

Mặc dù có những lỗ hổng bảo mật như CVE-2017-7494 có thể cho phép thực thi mã từ xa bằng cách khai thác lỗ hổng bảo mật. SMB Trong trường hợp này, bạn sẽ dễ gặp phải tình huống mà cách tốt nhất để xâm nhập vào hệ thống là do cấu hình sai trong hệ thống. Chúng ta sẽ khai thác lỗ hổng bảo mật ẩn danh. SMB Chia sẻ quyền truy cập - một lỗi cấu hình phổ biến có thể cho phép chúng ta thu thập thông tin dẫn đến việc chiếm quyền điều khiển hệ thống.

Phân tích phương pháp

Như vậy, từ giai đoạn thống kê, chúng ta biết được:

    - Cái SMB chia sẻ vị trí
    - Tên của một thứ thú vị SMB chia sẻ

# SMBClient

Vì chúng tôi đang cố gắng truy cập vào một SMB Để chia sẻ thông tin, chúng ta cần một máy khách để truy cập tài nguyên trên máy chủ. Chúng ta sẽ sử dụng SMBClient vì nó là một phần của bộ Samba mặc định. Mặc dù nó đã được cài đặt sẵn trên AttackBox, nhưng nếu bạn cần cài đặt nó trên máy tấn công của riêng mình, bạn có thể tìm tài liệu hướng dẫn tại đây.(`https://www.samba.org/samba/docs/current/man-html/smbclient.1.html`)

Chúng ta có thể truy cập từ xa SMB chia sẻ bằng cú pháp:

Syntax: `smbclient //[IP]/[SHARE] -U [USERNAME] -p [PORT]`

Example: `smbclient //10.10.10.10/secrets -U Anonymous -p 445`

Lệnh SMBClient

Sau khi vào thư mục chia sẻ, bạn có thể xem các lệnh có sẵn bằng cách gõ "help". Các lệnh hữu ích nhất bao gồm:

`ls` hoặc `dir` : Liệt kê các tập tin và thư mục. <br>
`cd [DIR]` : Di chuyển đến thư mục khác <br>
`get [FILE]` : Tải tập tin xuống AttackBox của bạn <br>

