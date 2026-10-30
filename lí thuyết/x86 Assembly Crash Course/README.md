# GIỚI THIỆU
Ngôn ngữ hợp ngữ là ngôn ngữ cấp thấp nhất mà con người có thể đọc được. Nó cũng là ngôn ngữ cấp cao nhất mà một mã nhị phân có thể được dịch ngược một cách đáng tin cậy. Khi học kỹ thuật đảo ngược mã độc, việc nắm vững kiến ​​thức cơ bản về ngôn ngữ hợp ngữ là rất cần thiết. Điều này là bởi vì khi chúng ta nhận được một mẫu mã độc để phân tích, rất có thể đó là một mã nhị phân đã được biên dịch. Chúng ta không thể xem mã C/C++ hoặc mã ngôn ngữ khác của mã nhị phân này vì chúng ta không có sẵn thông tin đó. Tuy nhiên, điều chúng ta có thể làm là dịch ngược mã bằng cách sử dụng trình dịch ngược hoặc trình phân tích mã. Vấn đề với việc dịch ngược là rất nhiều thông tin trong mã được viết sẽ bị loại bỏ trong quá trình biên dịch thành mã nhị phân; do đó, chúng ta sẽ không thấy tên biến, tên hàm, v.v., như khi chúng ta viết mã. Vì vậy, mã đáng tin cậy nhất mà chúng ta có cho một mã nhị phân đã biên dịch là mã hợp ngữ của nó. Trong khóa học này, chúng ta sẽ học những kiến ​​thức cơ bản về ngôn ngữ hợp ngữ mà chúng ta có thể sử dụng trong các phòng phân tích mã độc để hiểu mã nhị phân đang làm gì khi xem mã hợp ngữ của nó.

# Mã lệnh và toán hạng

Mã lệnh của một chương trình, được ghi trên đĩa và được hiểu bởi CPU là 1 mã nhị phân được biểu diễn dưới dạng hệ nhị phân. Điều này có nghĩa là mã thực tế là một chuỗi các số 1 và 0. Để dễ hiểu hơn, chúng ta thường gộp một chuỗi 8 bit thành các chữ số thập lục phân, được gọi là byte. Ví dụ, nếu ta có số nhị phân 10100101, 4 bit đầu tiên có thể được chuyển đổi thành A trong hệ thập lục phân và 4 bit tiếp theo thành 5 trong hệ thập lục phân, tạo thành số nhị phân A5 trong hệ thập lục phân, cũng được viết là 0xA5 để biểu thị rằng đó là một số thập lục phân. Vì vậy, các lệnh mà máy tính thực thi sẽ chỉ là một chuỗi các số ngẫu nhiên trong hệ thập lục phân đối với con người. Trong số các số ngẫu nhiên này có mã lệnh (opcode) và toán hạng (operand). Mã lệnh biểu thị hệ thập lục phân cho các thao tác thực tế, và toán hạng là các thanh ghi hoặc vị trí bộ nhớ mà trên đó các thao tác được thực hiện.

## Mã lệnh

Mã lệnh (opcode) là các dãy số tương ứng với các lệnh được CPU thực thi. Khi chúng ta sử dụng trình dịch ngược mã (disassembler) (chúng ta sẽ tìm hiểu về trình dịch ngược mã trong các bài học tiếp theo) để dịch ngược một chương trình, nó sẽ đọc các mã lệnh. Nó dịch chúng thành các lệnh hợp ngữ để làm cho chúng dễ đọc hơn đối với con người. Ví dụ, lệnh để di chuyển giá trị 0x5F đến thanh ghi eax là:

`mov eax, 0x5f`

Khi xem xét nó trong trình dịch ngược, ta sẽ thấy:
`040000:    b8 5f 00 00 00    mov eax, 0x5f`

Ở đây, `040000:`tương ứng với địa chỉ nơi lệnh được đặt. `b8`đề cập đến mã lệnh (opcode) của lệnh mov eax, và 5F 00 00 00chỉ ra toán hạng còn lại 0x5f. Xin lưu ý rằng do thứ tự byte (endianness) , toán hạng 0x5f được viết là 5f 00 00 00, thực chất là 00 00 00 5fnhưng ở dạng little-endian. Tương tự, có một mã lệnh (opcode) cho mỗi lệnh trong ngôn ngữ assembly. Có các tài liệu tham khảo để chuyển đổi mã lệnh thành lệnh assembly. Tuy nhiên, trừ khi chúng ta đang viết một trình dịch ngược mã (disassembler), chúng ta sẽ không cần đến chúng, vì trình dịch ngược mã thực hiện công việc đó khá tốt. Tuy nhiên, việc hiểu những gì đang xảy ra bên trong sẽ giúp có cái nhìn tổng quan tốt hơn.

Chúng ta thấy rằng trong thao tác trên, chúng ta có ba phần: một lệnh movvà hai toán hạng, eaxvà 0x5f. Trong lệnh cụ thể này, giá trị 0x5fđược chuyển vào eax; tuy nhiên, chúng ta cũng có thể có các loại toán hạng khác trong ngôn ngữ hợp ngữ.







