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



