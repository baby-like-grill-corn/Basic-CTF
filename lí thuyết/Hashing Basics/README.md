# Hàm băm
## Hàm băm là gì?

Hàm băm khác với mã hóa. Không có khóa, và việc đi từ đầu ra trở lại đầu vào là gần như không thể (hoặc về mặt tính toán là không khả thi).

Hàm băm nhận dữ liệu đầu vào bất kỳ kích thước nào và tạo ra một bản tóm tắt hoặc bản tổng hợp của dữ liệu đó. Đầu ra có kích thước cố định. Rất khó để dự đoán đầu ra cho bất kỳ đầu vào nào và ngược lại. Các thuật toán băm tốt sẽ có tốc độ tính toán tương đối nhanh và tốc độ đảo ngược cực kỳ chậm, tức là, từ đầu ra, ta có thể xác định đầu vào. Bất kỳ thay đổi nhỏ nào trong dữ liệu đầu vào, thậm chí chỉ một bit, cũng sẽ gây ra sự thay đổi đáng kể trong đầu ra.

Hãy xem một ví dụ. Trong cửa sổ terminal bên dưới, ta thấy hai tập tin; tập tin thứ nhất chứa chữ T, trong khi tập tin thứ hai chứa chữ U. Nếu bạn tra cứu T và U trong bảng mã ASCII hoặc sử dụng lệnh `hexdump`, bạn sẽ nhận thấy hai chữ cái này khác nhau ở một bit duy nhất.

Chữ T được biểu diễn 54 dưới dạng hệ thập lục phân, tức là 01010100 hệ nhị phân.
Chữ U được biểu 55 diễn dưới dạng hệ thập lục phân, tức là 01010101 hệ nhị phân.

Do đó, hai tập tin sau đây chỉ khác nhau ở một bit. Tuy nhiên, nếu so sánh mã băm MD5 (Message-Digest Algorithm 5), mã băm SHA1 (Secure Hash Algorithm 1) hoặc mã băm SHA-256 (Secure Hash Algorithm 256) của chúng, ta sẽ thấy chúng hoàn toàn khác nhau. Chúng tôi khuyên bạn nên tự mình thử các lệnh bên dưới. Các tập tin nằm trong thư mục `~/Hashing-Basics/Task-2/`

```
strategos@g5000 ~> cat file1.txt 
T⏎
strategos@g5000 ~> cat file2.txt 
U⏎   
strategos@g5000 ~> hexdump -C file1.txt 
00000000  54                                                |T|
00000001
strategos@g5000 ~> hexdump -C file2.txt 
00000000  55                                                |U|
00000001
strategos@g5000 ~> md5sum *.txt
b9ece18c950afbfa6b0fdbfa4ff731d3  file1.txt
4c614360da93c0a041b22e537de151eb  file2.txt
strategos@g5000 ~> sha1sum *.txt
c2c53d66948214258a26ca9ca845d7ac0c17f8e7  file1.txt
b2c7c0caa10a0cca5ea7d69e54018ae0c0389dd6  file2.txt
strategos@g5000 ~> sha256sum *.txt
e632b7095b0bf32c260fa4c539e9fd7b852d0de454e9be26f24d0d6f91d069d3  file1.txt
a25513c7e0f6eaa80a3337ee18081b9e2ed09e00af8531c8f7bb2542764027e7  file2.txt
```
Kết quả đầu ra của hàm băm thường là các byte thô, sau đó được mã hóa. Các phương pháp mã hóa phổ biến là base64 hoặc thập lục phân. Các hàm md5sum, sha1sum, sha256sum, và sha512sumtạo ra kết quả đầu ra ở định dạng thập lục phân. Hãy nhớ rằng định dạng thập lục phân in mỗi byte thô dưới dạng hai chữ số thập lục phân.

## Tại sao hàm băm lại quan trọng?









