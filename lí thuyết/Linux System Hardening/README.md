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

# Phân vùng và mã hóa hệ thống tập tin

Mã hóa khiến dữ liệu không thể đọc được nếu không có khóa giải mã. Trong trường hợp kẻ thù có quyền truy cập vật lý hoàn toàn vào máy tính xách tay của bạn, ví dụ như bằng cách đánh cắp nó, chúng ta cần đảm bảo rằng nó sẽ không có ích gì cho chúng. Một ổ đĩa chứa đầy dữ liệu được mã hóa cũng phải có giá trị tương đương với một ổ đĩa bị hỏng.

Có nhiều hệ thống phần mềm và công cụ cung cấp mã hóa cho hệ điều hành Linux. Vì nhiều phân phối Linux hiện đại đi kèm với LUKS (Linux Unified Key Setup), chúng ta hãy tìm hiểu kỹ hơn về nó

Khi một phân vùng được mã hóa bằng LUKS, bố cục đĩa sẽ trông như hình bên dưới.

<img width="1140" height="70" alt="ee1310ecb1558e550a9bff3a53ece0ff" src="https://github.com/user-attachments/assets/c519b944-0da3-4d5a-a918-82cf5bfc0bdc" />

Chúng tôi có các lĩnh vực sau:

1. LUKS phdr : Viết tắt của LUKS Partition Header (Tiêu đề phân vùng LUKS ).LUKS phdr lưu trữ thông tin về UUID (Universal Unique Identifier), thuật toán mã hóa được sử dụng, chế độ mã độ dài khóa và checksum của khóa chính.
2. KM : KM viết tắt của Key Material (Vật liệu khóa) , trong đó chúng ta có KM1, KM2, …, KM8. Mỗi phần vật liệu khóa được liên kết với một khe khóa, có thể được chỉ định là hoạt động trong LUKS phdr. Khi khe khóa hoạt động, phần vật liệu khóa liên kết sẽ chứa một bản sao của khóa chính được mã hóa bằng mật khẩu của người dùng. Nói cách khác, chúng ta có thể có khóa chính được mã hóa bằng mật khẩu của người dùng thứ nhất và được lưu trong KM1, được mã hóa bằng mật khẩu của người dùng thứ hai và được lưu trong KM2, v.v.
3. Dữ liệu khối : Điều này đề cập đến dữ liệu được mã hóa bằng khóa chính. Khóa chính được lưu trữ và mã hóa bằng mật khẩu của người dùng trong phần vật liệu khóa.

LUKS tái sử dụng các triển khai mã hóa khối hiện có. Mã giả để mã hóa dữ liệu sử dụng cú pháp sau:

enc_data = encrypt(cipher_name, cipher_mode, key, original, original_length)

Như chúng ta thấy, LUKS hoạt động với nhiều thuật toán mã hóa và chế độ mã hóa khác nhau. "Original" đề cập đến dữ liệu văn bản gốc có độ dài là ` original_length` . Mật khẩu do người dùng cung cấp được sử dụng để tạo ra khóa mã hóa; khóa được tạo ra bằng cách sử dụng hàm tạo khóa dựa trên mật khẩu 2 (PBKDF2).

key = PBKDF2(password, salt, iteration_count, derived_key_length)

Việc sử dụng muối (salt) với hàm băm lặp lại một số lần nhất định đảm bảo rằng khóa kết quả đủ an toàn để mã hóa. Để biết thêm thông tin, bạn có thể tham khảo phòng Giới thiệu về Mật mã học .

Tương tự, để giải mã dữ liệu và khôi phục văn bản gốc, LUKS sử dụng cú pháp sau:

original = decrypt(cipher_name, cipher_mode, key, enc_data, original_length)

Hầu hết các bản phân phối Linux cho phép bạn mã hóa ổ đĩa bằng giao diện đồ họa. Tuy nhiên, nếu bạn muốn thiết lập LUKS từ dòng lệnh, các bước thực hiện như sau:

1. Cài đặt `cryptsetup-luks`. (Bạn có thể dùng lệnh `apt install cryptsetup`, `yum install cryptsetup-luks`hoặc `dnf install cryptsetup-luks`đối với Ubuntu/Debian, RHEL/Cent OS và Fedora tương ứng.)
2. Xác nhận tên phân vùng bằng cách sử dụng `fdisk -l`, `lsblk` hoặc `blkid`. (Tạo phân vùng bằng `fdisk` nếu cần.)
3. Thiết lập phân vùng để mã hóa LUKS: `cryptsetup -y -v luksFormat /dev/sdb1`. (Thay thế `/dev/sdb1` bằng tên phân vùng bạn muốn mã hóa.)
4. Tạo một ánh xạ để truy cập phân vùng: `cryptsetup luksOpen /dev/sdb1 EDCdrive`.
5. Xác nhận chi tiết ánh xạ: `ls -l /dev/mapper/EDCdrive`và `cryptsetup -v status EDCdrive`.
6. Ghi đè dữ liệu hiện có bằng số không: `dd if=/dev/zero of=/dev/mapper/EDCdrive`.
7. Định dạng phân vùng: `mkfs.ext4 /dev/mapper/EDCdrive -L "Strategos USB"`.
8. Hãy gắn kết nó và bắt đầu sử dụng như một phân vùng thông thường: `mount /dev/mapper/EDCdrive /media/secure-USB`.




