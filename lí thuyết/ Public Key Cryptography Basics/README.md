# Ứng dụng phổ biến của mã hóa bất đối xứng

Trao đổi khóa cho mã hóa đối xứng là một ứng dụng phổ biến của mật mã bất đối xứng. Mã hóa bất đối xứng tương đối chậm so với mã hóa đối xứng; do đó, chúng ta dựa vào mã hóa bất đối xứng để đàm phán và thống nhất về thuật toán và khóa mã hóa đối xứng.

Nhưng câu hỏi đặt ra là, làm thế nào để bạn thống nhất khóa với máy chủ mà không truyền khóa đó cho những kẻ muốn xem trộm?

## Tương tự (Analogy) :

Hãy tưởng tượng bạn có một mật mã bí mật để liên lạc và hướng dẫn sử dụng mật mã đó. Câu hỏi đặt ra là làm thế nào bạn có thể gửi những hướng dẫn này cho bạn mình mà không ai khác có thể đọc được. Câu trả lời đơn giản hơn bạn nghĩ; bạn có thể hỏi bạn mình một cái khóa. Chỉ có bạn bạn mới có chìa khóa của cái khóa đó, và chúng ta giả sử bạn có một chiếc hộp không thể phá hủy mà bạn có thể dùng chìa khóa đó để khóa lại.

Nếu bạn gửi hướng dẫn trong một chiếc hộp khóa kín cho bạn mình, họ có thể mở khóa khi nhận được và đọc hướng dẫn. Sau đó, bạn có thể liên lạc với họ bằng mật mã bí mật mà không lo bị người khác nghe trộm.

Trong phép ẩn dụ này, mã bí mật đại diện cho một thuật toán mã hóa đối xứng và khóa, ổ khóa đại diện cho khóa công khai của máy chủ, và chìa khóa đại diện cho khóa riêng tư của máy chủ.

Tương tự |	Hệ thống mật mã
Mã bí mật	| Mã hóa đối xứng và khóa
Khóa |	Khóa công khai
Chìa khóa của ổ khóa	| Khóa riêng tư

Do đó, bạn chỉ cần sử dụng mã hóa bất đối xứng một lần để không ảnh hưởng đến tốc độ, sau đó bạn có thể giao tiếp riêng tư bằng mã hóa đối xứng.

## Thế giới thực

Trên thực tế, bạn cần nhiều thuật toán mã hóa hơn để xác minh người bạn đang nói chuyện có đúng là người mà họ tự xưng hay không. Điều này được thực hiện bằng cách sử dụng chữ ký số và chứng chỉ số, mà chúng ta sẽ tìm hiểu thêm sau trong buổi học này.

# RSA

Đây là thuật toán mã hóa khóa công khai cho phép truyền dữ liệu an toàn qua các kênh không an toàn. Với kênh không an toàn, chúng ta dự đoán kẻ thù có thể nghe trộm.

## Nguyên lý toán học giúp RSA bảo mật

RSA dựa trên bài toán khó về mặt toán học là phân tích thừa số của một số lớn. Nhân hai số nguyên tố lớn là một phép toán đơn giản; tuy nhiên, việc tìm thừa số của một số rất lớn đòi hỏi sức mạnh tính toán lớn hơn nhiều.

Nhân hai số nguyên tố với nhau rất đơn giản, thậm chí chỉ cần tính trên giấy, ví dụ 113 × 127 = 14351. Ngay cả với các số nguyên tố lớn hơn, việc này vẫn khả thi, thậm chí có thể thực hiện bằng tay. Hãy xem xét ví dụ số học sau:

```
Số nguyên tố 1: 982451653031
Số nguyên tố 2: 169743212279
Tích của chúng: 982451653031 × 169743212279 = 166764499494295486767649
```
Mặt khác, việc xác định hai số nguyên tố nào nhân với nhau để tạo thành 14351 khá khó khăn , và việc tìm các ước số của 166764499494295486767649 lại càng khó hơn .

Trong các ví dụ thực tế, các số nguyên tố sẽ lớn hơn nhiều so với các số trong ví dụ này. Máy tính có thể dễ dàng phân tích thừa số nguyên tố của 166764499494295486767649 ; tuy nhiên, nó không thể phân tích thừa số nguyên tố của một số có nhiều hơn 600 chữ số. Và bạn cũng sẽ đồng ý rằng phép nhân hai số nguyên tố khổng lồ, mỗi số có khoảng 300 chữ số, sẽ dễ dàng hơn việc phân tích thừa số nguyên tố của tích chúng.

## Ví dụ số

<img width="1840" height="1040" alt="image" src="https://github.com/user-attachments/assets/538cd533-4d83-49f8-a684-46da5dfa92b2" />

Trước khi thực hiện các phép tính, đây là một lời nhắc nhanh về toán tử modulo. a mod n là số dư còn lại sau khi chia a cho n. Ví dụ, 17 mod 5 = 2, vì 5 chia hết cho 17 ba lần (15) và còn lại là 2. Đồng hồ hoạt động tương tự: 15:00 hiển thị là 3 trên mặt đồng hồ 12 giờ, vì 15 mod 12 = 3. Một vài bước bên dưới sẽ nâng một số lên lũy thừa và sau đó lấy số dư này.

Trong phòng học về các nguyên lý cơ bản của mật mã học , chúng tôi đã giải thích về phép toán modulo và nói rằng nó đóng vai trò quan trọng trong mật mã học. Trong ví dụ số đơn giản sau đây, chúng ta thấy thuật toán RSA hoạt động như thế nào:

<img width="1523" height="295" alt="image" src="https://github.com/user-attachments/assets/581b3753-e294-45e6-81ee-00c8a001d17e" />

Bằng chứng cho thấy thuật toán trên hoạt động có thể được tìm thấy trong số học modulo và nằm ngoài phạm vi của mô-đun này. Cần nhắc lại rằng trong ví dụ này, chúng ta đã chọn một số nguyên tố có ba chữ số, trong khi trong một ứng dụng thực tế, p và q sẽ là các số nguyên tố có ít nhất 300 chữ số.

## RSA trong CTF

Các phép toán đằng sau RSA xuất hiện khá thường xuyên trong các cuộc thi CTF, yêu cầu bạn tính toán các biến hoặc phá mã dựa trên chúng. Có rất nhiều bài viết hay trên mạng giải thích về RSA, và chúng sẽ cung cấp cho bạn gần như tất cả thông tin cần thiết để hoàn thành các thử thách. Một ví dụ điển hình về thử thách RSA trong CTF là phòng Breaking RSA .

Có một số công cụ tuyệt vời để vượt qua các thử thách RSA trong CTF. Công cụ yêu thích của tôi là RsaCtfTool , nó đã hoạt động rất tốt đối với tôi. Tôi cũng đã đạt được một số thành công với rsatool .

Bạn cần nắm rõ các biến chính của RSA trong CTF: p, q, m, n, e, d và c. Theo ví dụ số của chúng tôi:
```
p và q là các số nguyên tố lớn.
n là tích của p và q
Khóa công khai là n và e
Khóa riêng tư là n và d
m được sử dụng để biểu thị thông điệp gốc, tức là văn bản thuần túy.
c biểu thị văn bản đã mã hóa, tức là văn bản mật mã.
```
Các thử thách Crypto CTF thường đưa ra cho bạn một tập hợp các giá trị này, và bạn cần phải phá vỡ mã hóa và giải mã thông điệp để lấy được cờ.

# Trao đổi khóa Diffie-Hellman

Một trong những thách thức khi sử dụng mã hóa đối xứng là việc chia sẻ khóa bí mật. Giả sử bạn muốn gửi một tài liệu được bảo vệ bằng mật khẩu cho đối tác kinh doanh để thảo luận về các chiến lược kinh doanh bí mật. Làm thế nào bạn có thể chia sẻ mật khẩu với họ? Tốt nhất là bạn nên có một kênh an toàn để gửi mật khẩu, biết rằng kẻ thù không thể đọc hoặc thay đổi nó.

## Trao đổi khóa Diffie-Hellman

Trao đổi khóa nhằm mục đích thiết lập một bí mật chung giữa hai bên. Đây là một phương pháp cho phép hai bên thiết lập một bí mật chung trên một kênh liên lạc không an toàn mà không cần có bí mật chung tồn tại từ trước và không cho phép người quan sát có được khóa này. Do đó, khóa chung này có thể được sử dụng để mã hóa đối xứng trong các lần liên lạc tiếp theo.

Hãy xem xét tình huống sau. Alice và Bob muốn nói chuyện một cách an toàn. Họ muốn thiết lập một khóa chung cho mã hóa đối xứng nhưng không muốn sử dụng mã hóa bất đối xứng để trao đổi khóa. Đây là lúc thuật toán trao đổi khóa Diffie-Hellman phát huy tác dụng.

Alice và Bob tạo ra những bí mật một cách độc lập; chúng ta hãy gọi những bí mật này là A và B. Họ cũng có một số thông tin chung công khai; chúng ta hãy gọi thông tin này là C.

Chúng ta cần đưa ra một số giả định. Thứ nhất, bất cứ khi nào chúng ta kết hợp các bí mật, việc tách chúng ra là gần như không thể. Thứ hai, thứ tự kết hợp không quan trọng. Alice và Bob sẽ kết hợp bí mật của họ với tài liệu chung để tạo thành AC và BC. Sau đó, họ sẽ gửi chúng cho nhau và kết hợp phần nhận được với bí mật của mình để tạo ra hai khóa giống hệt nhau, cả hai đều là ABC. Bây giờ, họ có thể sử dụng khóa này để liên lạc.

Nếu dễ hình dung, hãy nghĩ đến việc pha sơn. Alice và Bob mỗi người giữ một màu sơn bí mật và dùng chung một màu nền. Mỗi người trộn màu sơn bí mật của mình vào màu nền và gửi hỗn hợp đó cho người kia. Sau đó, mỗi người lại thêm màu sơn bí mật của mình vào hỗn hợp vừa nhận được. Cả hai đều thu được cùng một màu cuối cùng, và người quan sát chỉ nhìn thấy các hỗn hợp đó không thể tách chúng ra được.

Nếu bạn thấy những đoạn văn trước đó quá trừu tượng, hãy cùng tìm hiểu quy trình cụ thể hơn.

<img width="1522" height="367" alt="image" src="https://github.com/user-attachments/assets/f5de5bc0-3552-4c16-8030-46261d45d3f9" />

<img width="1560" height="1180" alt="image" src="https://github.com/user-attachments/assets/bad2002d-ca85-4e1f-8e02-2cac60e39369" />

Các con số được chọn quá nhỏ để đảm bảo tính bảo mật, và trong các ứng dụng thực tế, chúng ta sẽ xem xét các con số lớn hơn nhiều.

## Tự tính toán

Mỗi câu hỏi dưới đây đều sử dụng một trong hai công thức. Khóa công khai là g^a mod pdành cho Alice và `g^b mod p`khóa chung là dành cho Bob. Khóa chia sẻ là `B^a mod p`dành cho Alice và khóa chung là `A^b mod p`dành cho Bob. Ở đây, `^`có nghĩa là "lũy thừa". Hãy viết công thức trước, sau đó điền số vào.

Một số lũy thừa này có nhiều chữ số hơn mức mà máy tính cơ bản có thể hiển thị chính xác, vì vậy nó làm tròn và phần dư sẽ bị sai. Thay vào đó, hãy sử dụng Python trên AttackBox. Python `pow(base, exponent, modulus)`thực hiện cả phép tính lũy thừa và phần dư trong một bước. Ví dụ, `python3 -c "print(pow(3, 13, 29))"`nó in ra 19, khớp với khóa công khai của Alice trong ví dụ trên.

Trao đổi khóa Diffie-Hellman thường được sử dụng cùng với Mật mã RSA khóa công khai. Diffie-Hellman được sử dụng để thỏa thuận khóa, trong khi RSA được sử dụng cho chữ ký số, truyền tải khóa và xác thực, cùng nhiều ứng dụng khác. Ví dụ, RSA giúp chứng minh danh tính của người bạn đang nói chuyện thông qua chữ ký số, vì bạn có thể xác nhận dựa trên khóa công khai của họ. Điều này sẽ ngăn chặn ai đó tấn công kết nối bằng kiểu tấn công trung gian (man-in-the-middle attack) nhắm vào Alice bằng cách giả danh Bob. Tóm lại, Diffie-Hellman và RSA được tích hợp vào nhiều giao thức và tiêu chuẩn bảo mật để cung cấp một giải pháp bảo mật toàn diện.

# SSH 
## Xác thực máy chủ
Nếu bạn đã từng sử dụng một client SSH trước đây, bạn sẽ biết được thông báo xác nhận trong phần đầu ra terminal dưới đây

```
root@TryHackMe# ssh 10.10.244.173
The authenticity of host '10.10.244.173 (10.10.244.173)' can't be established.
ED25519 key fingerprint is SHA256:lLzhZc7YzRBDchm02qTX0qsLqeeiTCJg5ipOT0E/YM8.
This key is not known by any other name.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.244.173' (ED25519) to the list of known hosts. 
```
Trong đoạn hội thoại trên, máy khách SSH xác nhận xem chúng ta có nhận ra dấu vân tay khóa công khai của máy chủ hay không. ED25519 là thuật toán khóa công khai được sử dụng để tạo và xác minh chữ ký số trong ví dụ này. Máy khách SSH của chúng ta không nhận ra khóa này và đang yêu cầu chúng ta xác nhận xem có muốn tiếp tục kết nối hay không. Cảnh báo này xuất hiện vì có khả năng xảy ra tấn công trung gian (man-in-the-middle attack); một máy chủ độc hại có thể đã chặn kết nối và phản hồi, giả vờ là máy chủ mục tiêu.

Trong trường hợp này, người dùng phải xác thực máy chủ, tức là xác nhận danh tính của máy chủ bằng cách kiểm tra chữ ký khóa công khai. Sau khi bạn trả lời "có", ứng dụng SSH sẽ ghi lại chữ ký khóa công khai này cho máy chủ đó. Trong tương lai, nó sẽ kết nối bạn một cách im lặng trừ khi máy chủ này trả lời bằng một khóa công khai khác.

## Xác thực máy khách
Giờ chúng ta đã xác nhận đang kết nối với máy chủ chính xác, chúng ta cần xác định danh tính và được xác thực. Trong nhiều trường hợp, người dùng SSH được xác thực bằng tên người dùng và mật khẩu giống như khi đăng nhập vào máy vật lý. Tuy nhiên, xét đến những vấn đề tiềm ẩn của mật khẩu, cách làm này không nằm trong các biện pháp bảo mật tốt nhất.

Ở một thời điểm nào đó, bạn chắc chắn sẽ gặp phải một máy tính được cấu hình SSH với xác thực bằng khóa. Xác thực này sử dụng các cặp khóa công khai và khóa riêng để chứng minh rằng người dùng là người dùng hợp lệ và được cấp quyền trên máy chủ. Mặc định, các khóa SSH là các khóa RSA. Bạn có thể chọn thuật toán nào để tạo và thêm một mật khẩu để mã hóa khóa SSH.

`ssh-keygen` là chương trình thường được sử dụng để tạo cặp khóa. Nó hỗ trợ nhiều thuật toán khác nhau, như được trình bày trong trang hướng dẫn sử dụng bên dưới.
```
root@TryHackMe# man ssh-keygen
[...]
-t dsa | ecdsa | ecdsa-sk | ed25519 | ed25519-sk | rsa
Specifies the type of key to create. The possible values are “dsa”, “ecdsa”, “ecdsa-sk”, “ed25519”, “ed25519-sk”, or “rsa”.
[...]
```
Thông tin sau đây chỉ mang tính chất tham khảo. Ở giai đoạn này, chúng tôi khuyến nghị bạn chỉ nên biết tên của họ.

`DSA (Thuật toán chữ ký số)` là một thuật toán mật mã khóa công khai được thiết kế đặc biệt cho chữ ký số.
`ECDSA (Thuật toán chữ ký số đường cong elip)` là một biến thể của DSA sử dụng mật mã đường cong elip để cung cấp kích thước khóa nhỏ hơn mà vẫn đảm bảo an ninh tương đương.
`ECDSA-SK (ECDSA with Security Key)` là một phần mở rộng của ECDSA. Nó tích hợp các khóa bảo mật dựa trên phần cứng để tăng cường bảo vệ khóa riêng tư.
`Ed25519` là một hệ thống chữ ký khóa công khai sử dụng thuật toán chữ ký số đường cong Edwards (EdDSA) với Curve25519.
`Ed25519-SK (Ed25519 với Khóa Bảo mật)` là một biến thể của Ed25519. Tương tự như ECDSA-SK, nó sử dụng khóa bảo mật dựa trên phần cứng để tăng cường bảo vệ khóa riêng tư.

Hãy tạo một cặp khóa với các tùy chọn mặc định.
```
root@TryHackMe# ssh-keygen -t ed25519
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/strategos/.ssh/id_ed25519): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/strategos/.ssh/id_ed25519
Your public key has been saved in /home/strategos/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:4S4DQvRfp52UuNwg++nTcWlnITEJTbMcCU0N8UYC1do strategos@g5000
The key's random art image is:
+--[ED25519 256]--+
|  .       +XXB.  |
| . .     . oBBo  |
|  . . . = + o=o  |
| .   . * X .o.E  |
|  . . o S +  o . |
|   . . o .. + o  |
|      o +. + o   |
|       +. .      |
|        ..       |
+----[SHA256]-----+
        
```
Trong ví dụ trên, chúng ta không sử dụng mật khẩu để hiển thị nội dung của khóa riêng tư. Hãy xem khóa công khai được tạo ra, `id_ed25519.pub`, và khóa riêng tư được tạo ra, `id_ed25519`.
```
strategos@g5000:~/.ssh$ cat id_ed25519.pub 
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINqNMqNhpXZGt6T8Q8bOplyTeldfWq3T3RyNJTmTMJq9 strategos@g5000
strategos@g5000:~/.ssh$ cat id_ed25519
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACDajTKjYaV2Rrek/EPGzqZck3pXX1qt090cjSU5kzCavQAAAJA+E+ajPhPm
owAAAAtzc2gtZWQyNTUxOQAAACDajTKjYaV2Rrek/EPGzqZck3pXX1qt090cjSU5kzCavQ
AAAEB981T2ngdoNm8gEzRU35bGHofqRMjfo5egxl0/9fap/NqNMqNhpXZGt6T8Q8bOplyT
eldfWq3T3RyNJTmTMJq9AAAACm9xYWJAZzUwMDABAgM=
-----END OPENSSH PRIVATE KEY-----
```
Lưu ý rằng khóa riêng tư được chia sẻ ở trên chỉ nhằm mục đích minh họa và đã bị xóa sau đó. Chia sẻ khóa riêng tư là hành động thiếu an toàn nhất mà bất kỳ ai có thể thực hiện đối với bảo mật của mình. Mặt khác, nếu chúng ta sử dụng -t rsa, các khóa thu được sẽ dài hơn nhiều.

## Khóa riêng SSH
Như đã đề cập, bạn nên coi khóa SSH riêng tư của mình như mật khẩu. Tuyệt đối không bao giờ chia sẻ chúng trong bất kỳ trường hợp nào; chúng được gọi là khóa riêng tư vì lý do đó. Người nào đó có khóa riêng tư của bạn có thể đăng nhập vào các máy chủ chấp nhận nó, tức là có thể thêm nó vào danh sách các khóa được ủy quyền, trừ khi khóa đó được mã hóa bằng mật khẩu.

Điều rất quan trọng cần lưu ý là mật khẩu dùng để giải mã khóa riêng không hề xác định danh tính của bạn với máy chủ; nó chỉ dùng để giải mã khóa riêng SSH. Mật khẩu này không bao giờ được truyền đi và không bao giờ rời khỏi hệ thống của bạn.

Sử dụng các công cụ như John the Ripper, bạn có thể tấn công khóa SSH được mã hóa để cố gắng tìm ra mật khẩu, điều này nhấn mạnh tầm quan trọng của việc sử dụng mật khẩu phức tạp và giữ bí mật khóa riêng tư của bạn.

Khi tạo khóa SSH để đăng nhập vào máy từ xa, hãy tạo cặp khóa trên máy của bạn. Sau đó, `ssh-copy-id` chỉ sao chép khóa công khai sang máy từ xa. Bằng cách này, khóa riêng tư sẽ không bao giờ tồn tại trên máy từ xa. Tuy nhiên, điều này không quá quan trọng đối với các khóa tạm thời được tạo để truy cập vào các máy chủ CTF.

Bạn phải thiết lập quyền truy cập chính xác để sử dụng khóa SSH riêng tư; nếu không, trình khách SSH của bạn sẽ bỏ qua tệp và hiển thị cảnh báo. Chỉ chủ sở hữu mới được phép đọc hoặc ghi vào khóa riêng tư ( `600`hoặc quyền nghiêm ngặt hơn). `ssh -i privateKeyFileName user@host` Đây là cách bạn chỉ định khóa cho trình khách OpenSSH tiêu chuẩn của Linux.

### Các khóa được máy chủ từ xa tin cậy
Thư mục này `~/.ssh` là nơi mặc định để lưu trữ các khóa cho OpenSSH. `authorized_keys` Tệp (lưu ý cách viết tiếng Anh Mỹ) trong thư mục này chứa các khóa công khai được phép truy cập vào máy chủ nếu xác thực bằng khóa được bật. Theo mặc định trên nhiều bản phân phối Linux, xác thực bằng khóa được bật vì nó an toàn hơn so với việc sử dụng mật khẩu để xác thực. Chỉ nên chấp nhận xác thực bằng khóa nếu bạn muốn cho phép người dùng root truy cập SSH.

## Sử dụng khóa SSH để có được "quyền truy cập tốt hơn"

Trong các cuộc thi CTF, kiểm thử xâm nhập và diễn tập tấn công giả lập, khóa SSH là một cách tuyệt vời để "nâng cấp" một shell đảo ngược, giả sử người dùng đã bật tính năng đăng nhập. Lưu ý rằng tài khoản www-data thường không cho phép điều này, nhưng người dùng thông thường và người dùng root thì được. Để lại khóa SSH trong `authorized_keys` tệp trên máy có thể là một cửa hậu hữu ích, và bạn không cần phải đối phó với bất kỳ vấn đề nào của shell đảo ngược không ổn định như nhấn tổ hợp phím Control-C hoặc thiếu tính năng tự động hoàn thành bằng phím Tab.

Đây là cách nó hoạt động trong thực tế. Bạn có một shell đảo ngược với tư cách là người dùng thông thường, nhưng nó dễ bị phá vỡ. Trên máy tính của bạn, hãy chạy lệnh `ssh-keygen` để tạo một cặp khóa. Thông qua shell đảo ngược, hãy thêm nội dung của `.pubtệp` của bạn vào `~/.ssh/authorized_keys` thư mục chính của người dùng đó. Nếu `~/.ssh` thư mục chưa tồn tại, hãy tạo nó trước bằng lệnh ` mkdir -p ~/.ssh.`. Sau đó kết nối bằng lệnh ` ssh -i id_ed25519 user@MACHINE_IP,`, thay thế user`<username>` bằng tên người dùng của mục tiêu. Bây giờ bạn đã có một shell ổn định với tính năng tự động hoàn thành bằng phím Tab, và tổ hợp phím Control-C không còn tắt nó nữa.





