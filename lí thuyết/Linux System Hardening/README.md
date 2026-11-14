# Physical Security

Một trong những nguyên tắc an ninh là "An ninh nhiều lớp". Do đó, chúng ta nên luôn suy nghĩ theo cách phân tầng an ninh. Một trong những lớp đầu tiên là an ninh vật lý.

Nên ngăn chặn các đối tượng tiềm năng tiếp cận vật lý đến hệ thống máy tính của bạn. Nếu một người xâm nhập có thể tiếp cận vật lý đến văn phòng của bạn, họ có thể dễ dàng tháo rời ổ đĩa cứng và mang đi. Đây là một cuộc tấn công đơn giản và không yêu cầu kỹ năng kỹ thuật cao.

Giả sử bạn đã thực hiện các biện pháp cần thiết để ngăn chặn người xâm nhập lấy ổ đĩa cứng hoặc toàn bộ hệ thống máy tính. Ngoài ra, bạn cũng đã đảm bảo rằng mật khẩu hệ thống của bạn là phức tạp và không thể đoán được. Nếu một người xâm nhập có thể tiếp cận hệ thống một cách vật lý, thì việc sử dụng GRUB, một trình khởi động phổ biến của Linux, để đặt lại mật khẩu tài khoản root là một nhiệm vụ không phức tạp. Vì vậy, chúng ta có câu nói "truy cập khởi động = truy cập root".

Rõ ràng, chúng ta cần đảm bảo an ninh vật lý cho hệ thống máy tính của mình; tuy nhiên, trong trường hợp hiếm hoi an ninh xâm chúng ta cần cung cấp thêm các và firmware UEFI cho thêm mật khẩu này sẽ ngăn không cho người dùng không được phép khởi động hệ thống. Tuy nhiên, điều này chỉ có thể sử dụng cho các hệ thống cá nhân; việc sử dụng nó trên máy chủ sẽ không hợp lý vì điều này yêu cầu ai đó phải có mặt trực tiếp để cung cấp mật khẩu khởi động.

Chúng ta có thể xem xét việc thêm mật khẩu GRUB tùy thuộc vào hệ thống Linux mà chúng ta muốn bảo vệ. Nhiều công cụ hỗ trợ việc này. Một công cụ là grub2-mkpasswd-pbkdf2, sẽ yêu cầu bạn nhập mật khẩu hai lần và tạo ra một mã băm cho bạn. Mã băm kết quả này cần được thêm vào tệp cấu hình phù hợp tùy theo phân phối Linux (ví dụ: Fedora và Ubuntu). Cấu hình này sẽ ngăn không cho người dùng không được phép đặt lại mật khẩu root của bạn. Nó sẽ yêu cầu người dùng phải cung cấp mật khẩu để truy cập các cấu hình khởi động nâng cao thông qua GRUB, bao gồm việc đăng nhập với quyền root.
```
root@AttackBox# grub2-mkpasswd-pbkdf2
Enter password: 
Reenter password: 
PBKDF2 hash of your password is grub.pbkdf2.sha512.10000.534B77859C13DCF094E90B926E26C586F5DC9D00687853487C4BB1500D57EC29E2D6D07A586262E093DCBDFF4B3552742A25700BAB6B76A8206B3BFCB273EEB4.4BA1447590EA8451CD224AA1C5F8623FE85D23F6D34E2026E3F08C5AA79282DB65B330BAB4944E9374EC51BF11EFF418EDA5D66FF4D7AAA86F662F793B92DA61
```

Điều quan trọng cần lưu ý là tính năng thêm mật khẩu cho GRUB không khả dụng đối với các hệ thống được triển khai bằng nhà cung cấp dịch vụ đám mây (chẳng hạn như hệ thống máy ảo Linux của chúng tôi).Việc sử dụng mật khẩu GRUB không có ý nghĩa gì vì bạn không có quyền truy cập vào thiết bị đầu cuối vật lý.

Đảm bảo an ninh vật lý là điều bắt buộc vì kẻ tấn công có quyền truy cập vật lý rất dễ gây ra thiệt hại. Thêm mật khẩu cho GRUB là một biện pháp hợp lý để ngăn chặn người dùng có quyền truy cập vật lý vào bàn phím hệ thống truy cập vào máy. Tuy nhiên, chúng ta cần có kế hoạch trong trường hợp kẻ tấn công tìm cách đánh cắp ổ đĩa.

