# GIỚI THIỆU
Ngôn ngữ hợp ngữ là ngôn ngữ cấp thấp nhất mà con người có thể đọc được. Nó cũng là ngôn ngữ cấp cao nhất mà một mã nhị phân có thể được dịch ngược một cách đáng tin cậy. Khi học kỹ thuật đảo ngược mã độc, việc nắm vững kiến ​​thức cơ bản về ngôn ngữ hợp ngữ là rất cần thiết. Điều này là bởi vì khi chúng ta nhận được một mẫu mã độc để phân tích, rất có thể đó là một mã nhị phân đã được biên dịch. Chúng ta không thể xem mã C/C++ hoặc mã ngôn ngữ khác của mã nhị phân này vì chúng ta không có sẵn thông tin đó. Tuy nhiên, điều chúng ta có thể làm là dịch ngược mã bằng cách sử dụng trình dịch ngược hoặc trình phân tích mã. Vấn đề với việc dịch ngược là rất nhiều thông tin trong mã được viết sẽ bị loại bỏ trong quá trình biên dịch thành mã nhị phân; do đó, chúng ta sẽ không thấy tên biến, tên hàm, v.v., như khi chúng ta viết mã. Vì vậy, mã đáng tin cậy nhất mà chúng ta có cho một mã nhị phân đã biên dịch là mã hợp ngữ của nó. Trong khóa học này, chúng ta sẽ học những kiến ​​thức cơ bản về ngôn ngữ hợp ngữ mà chúng ta có thể sử dụng trong các phòng phân tích mã độc để hiểu mã nhị phân đang làm gì khi xem mã hợp ngữ của nó.

# Mã lệnh và toán hạng

Mã lệnh của một chương trình, được ghi trên đĩa và được hiểu bởi CPU là 1 mã nhị phân được biểu diễn dưới dạng hệ nhị phân. Điều này có nghĩa là mã thực tế là một chuỗi các số 1 và 0. Để dễ hiểu hơn, chúng ta thường gộp một chuỗi 8 bit thành các chữ số thập lục phân, được gọi là byte. Ví dụ, nếu ta có số nhị phân 10100101, 4 bit đầu tiên có thể được chuyển đổi thành A trong hệ thập lục phân và 4 bit tiếp theo thành 5 trong hệ thập lục phân, tạo thành số nhị phân A5 trong hệ thập lục phân, cũng được viết là 0xA5 để biểu thị rằng đó là một số thập lục phân. Vì vậy, các lệnh mà máy tính thực thi sẽ chỉ là một chuỗi các số ngẫu nhiên trong hệ thập lục phân đối với con người. Trong số các số ngẫu nhiên này có mã lệnh (opcode) và toán hạng (operand). Mã lệnh biểu thị hệ thập lục phân cho các thao tác thực tế, và toán hạng là các thanh ghi hoặc vị trí bộ nhớ mà trên đó các thao tác được thực hiện.

## Mã lệnh

Mã lệnh (opcode) là các dãy số tương ứng với các lệnh được CPU thực thi. Khi chúng ta sử dụng trình dịch ngược mã (disassembler) (chúng ta sẽ tìm hiểu về trình dịch ngược mã trong các bài học tiếp theo) để dịch ngược một chương trình, nó sẽ đọc các mã lệnh. Nó dịch chúng thành các lệnh hợp ngữ để làm cho chúng dễ đọc hơn đối với con người. Ví dụ, lệnh để di chuyển giá trị 0x5F đến thanh ghi eax là:

`mov eax, 0x5f`

Khi xem xét nó trong trình dịch ngược, ta sẽ thấy:
`040000:    b8 5f 00 00 00    mov eax, 0x5f`

Ở đây, `040000:`tương ứng với địa chỉ nơi lệnh được đặt. `b8`đề cập đến mã lệnh (opcode) của lệnh `mov eax`, và `5F 00 00 00`chỉ ra toán hạng còn lại `0x5f`  . Xin lưu ý rằng do thứ tự byte (endianness) , toán hạng `0x5f` được viết là `5f 00 00 00`, thực chất là `00 00 00 5f` nhưng ở dạng little-endian. Tương tự, có một mã lệnh (opcode) cho mỗi lệnh trong ngôn ngữ assembly. Có các tài liệu tham khảo để chuyển đổi mã lệnh thành lệnh assembly. Tuy nhiên, trừ khi chúng ta đang viết một trình dịch ngược mã (disassembler), chúng ta sẽ không cần đến chúng, vì trình dịch ngược mã thực hiện công việc đó khá tốt. Tuy nhiên, việc hiểu những gì đang xảy ra bên trong sẽ giúp có cái nhìn tổng quan tốt hơn.

Chúng ta thấy rằng trong thao tác trên, chúng ta có ba phần: một lệnh movvà hai toán hạng, `eax`và `0x5f`. Trong lệnh cụ thể này, giá trị `0x5f`được chuyển vào `eax`; tuy nhiên, chúng ta cũng có thể có các loại toán hạng khác trong ngôn ngữ hợp ngữ.

## Các loại toán hạng
Nhìn chung, có ba loại toán hạng trong ngôn ngữ lập trình hợp ngữ.

Các toán hạng tức thời (Immediate Operand) cũng có thể được coi là hằng số. Chúng là các giá trị cố định như0x5ftrong ví dụ trên.
Các thanh ghi (Registers) cũng có thể là toán hạng. Ví dụ trên cho thấyeaxmột thanh ghi lưu trữ toán hạng tức thời.
Các toán hạng bộ nhớ (Memory operands) được ký hiệu bằng dấu ngoặc vuông và chúng tham chiếu đến các vị trí bộ nhớ. Ví dụ, nếu ta thấy`[eax]`là một toán hạng, điều đó có nghĩa là giá trị trong eax là vị trí bộ nhớ mà phép toán cần được thực hiện. 
Bây giờ chúng ta đã tìm hiểu về toán hạng và mã lệnh, trong bài tập tiếp theo, chúng ta sẽ tìm hiểu về các lệnh hợp ngữ thông dụng.

# General Instructions
Hướng dẫn cho CPU biết Thao tác cần thực hiện là gì? Các lệnh thường sử dụng toán hạng từ thanh ghi, bộ nhớ hoặc toán hạng tức thời để thực hiện các phép toán và sau đó lưu trữ kết quả vào thanh ghi hoặc bộ nhớ. Trong nhiệm vụ này, chúng ta sẽ tìm hiểu các lệnh phổ biến nhất mà chúng ta có thể gặp phải khi phân tích ngược mã độc.

## Lệnh MOV

Lệnh mov di chuyển một giá trị từ vị trí này sang vị trí khác. Cú pháp của nó như sau:
`mov destination, source`

Lệnh mov có thể di chuyển một giá trị cố định đến một thanh ghi, từ một thanh ghi đến một thanh ghi khác, và từ một giá trị trong một vị trí bộ nhớ đến một thanh ghi. Các ví dụ sau đây sẽ giúp giải thích rõ hơn.

Lệnh sau sao chép một giá trị cố định vào một thanh ghi. Trong lệnh cụ thể này, giá trị `0x5f` được ghi vào thanh ghi `eax`:
`mov eax, 0x5f`

Trong trường hợp cụ thể này, giá trị được lưu trữ trong thanh ghi eax đang được chuyển sang thanh ghi ebx:
`mov ebx, eax`

Lệnh sau sao chép giá trị được lưu trữ trong một vị trí bộ nhớ vào một thanh ghi:
`mov eax, [0x5fc53e]`

Như đã thấy ở trên, chúng ta sử dụng dấu ngoặc vuông khi tham chiếu đến vùng nhớ. Tương tự, giả sử chúng ta thấy một thanh ghi trong dấu ngoặc vuông. Trong trường hợp đó, điều đó có nghĩa là giá trị trong thanh ghi đó sẽ được coi là một vị trí bộ nhớ, và giá trị trong vị trí bộ nhớ đó sẽ được di chuyển đến đích. Điều này có nghĩa là ví dụ trên `mov eax, [0x5fc3e]`và ví dụ bên dưới sẽ cho cùng một kết quả.
`mov ebx, 0x5fc53e`
`mov eax, [ebx]`

Chúng ta có thể sử dụng lệnh mov để thực hiện các phép tính số học khi tham chiếu đến địa chỉ bộ nhớ. Ví dụ, lệnh dưới đây tính toán `ebp+4` (thêm một độ lệch 4 byte vào vị trí bộ nhớ) và di chuyển giá trị tại địa chỉ bộ nhớ kết quả vào thanh ghi eax:
`mov eax, [ebp+4]`

## Hướng dẫn của LEA
Lệnh `lea` viết tắt của "load effective address" (tải địa chỉ hiệu lực). Cú pháp của lệnh này như sau:
`lea destination, source`

Trong khi lệnh mov di chuyển dữ liệu tại địa chỉ bộ nhớ nguồn đến địa chỉ đích, lệnh lea di chuyển địa chỉ của nguồn vào đích. Trong ví dụ bên dưới, giá trị `ebp` sẽ được tăng lên bốn và di chuyển đến `eax`. Tuy nhiên, nếu chúng ta sử dụng lệnh mov thay vì lea, nó sẽ di chuyển giá trị tại vị trí bộ nhớ ebp+4.
`lea eax, [ebp+4]`

Ở đây, ta có thể thấy rằng ta đã thực hiện một phép toán số học trên một thanh ghi và lưu kết quả vào một thanh ghi khác bằng một lệnh duy nhất. leaLệnh này thường được các trình biên dịch sử dụng không phải để tham chiếu đến các vị trí bộ nhớ mà để thực hiện một phép toán số học trên một thanh ghi và lưu vào một thanh ghi khác bằng một lệnh duy nhất. Điều này đặc biệt đúng nếu các phép toán số học phức tạp hơn, chẳng hạn như cộng và nhân trong một lệnh duy nhất. Như ta sẽ thấy trong bài tập tiếp theo, việc sử dụng các phép toán số học cho thao tác này sẽ cần nhiều lệnh hơn.

## Hướng dẫn NOP
Lệnh nop viết tắt của `no operation` (không thực hiện thao tác nào). Lệnh này hoán đổi giá trị trong thanh ghi eax với chính nó, dẫn đến không có thao tác nào có ý nghĩa. Do đó, quá trình thực thi chuyển sang lệnh tiếp theo mà không thay đổi bất cứ điều gì. Lệnh nop được sử dụng để tiêu tốn chu kỳ CPU trong khi chờ đợi một thao tác hoặc các mục đích tương tự. Nó có cú pháp như sau:
nop

Lệnh `nop` được các tác giả phần mềm độc hại sử dụng khi chuyển hướng thực thi đến shellcode của chúng. Vị trí chính xác mà quá trình thực thi sẽ chuyển hướng thường không được biết trước, vì vậy tác giả phần mềm độc hại sử dụng một loạt các lệnh `nop` để đảm bảo rằng việc thực thi shellcode không bắt đầu từ giữa. Phần đệm bằng các lệnh `nop` này được gọi là "nop sled".

## Hướng dẫn ca làm việc
CPU sử dụng các lệnh dịch bit để dịch chuyển từng bit trong thanh ghi đến bit liền kề. Có hai lệnh dịch bit để dịch chuyển sang phải hoặc sang trái. Các lệnh dịch bit có cú pháp như sau:
`shr destination, count`
`shl destination, count`

Ở đây, `shr`lệnh này dùng cho phép dịch phải, và lệnh kia `shl`dùng cho phép dịch trái. Lệnh này dịch chuyển các bit trong toán `destination`hạng. Toán `count`hạng quyết định số bit cần dịch chuyển. Các bit bị dịch chuyển ra khỏi vị trí của chúng sẽ được điền bằng số 0. Vì vậy, nếu ta có 00000010 trong thanh ghi eax và dịch chuyển nó sang trái, kết quả sẽ trở thành 00000100.
Cờ nhớ (CF) được sử dụng để tăng giá trị đích, vì nó được điền bởi bit cuối cùng tràn ra khỏi đích. Ví dụ, nếu ta có 00000101 trong thanh ghi eax và dịch chuyển nó sang phải 1 bit, kết quả sẽ có 00000010 trong thanh ghi eax, và cờ nhớ sẽ được đặt, tức là nó sẽ có giá trị là 1.

Các lệnh dịch chuyển được sử dụng thay cho phép nhân và chia cho hai hoặc lũy thừa của hai (2^ n, trong đó n là số lần dịch chuyển trong lệnh dịch chuyển). Điều này giúp tiết kiệm thời gian thực thi bằng cách không phải thao tác các giá trị trong thanh ghi trước khi thực hiện phép nhân hoặc phép chia. Ví dụ, nếu thanh ghi eax có giá trị 00000010, và ta dịch phải 1 bit, ta được 00000001, kết quả tương đương với việc chia eax cho 2. Tương tự, nếu eax có giá trị 00000001, và ta dịch trái 1 bit, kết quả là 00000010, tương đương với việc nhân eax với 2.

## Hướng dẫn xoay
Các lệnh xoay (rotate) tương tự như các lệnh dịch chuyển (shift). Sự khác biệt duy nhất là các bit được xoay ngược trở lại đầu kia của thanh ghi thay vì di chuyển bit tràn vào cờ nhớ (carry flag) hoặc thêm số 0 thay vì dịch chuyển các bit ra ngoài. Lệnh xoay có cú pháp sau:
`ror destination, count`
`rol destination, count`

<img width="2334" height="2334" alt="image" src="https://github.com/user-attachments/assets/f84e5614-abf4-484f-9a41-05fd611ab31c" />

Ở đây, rorlệnh xoay điểm đến sang phải và rolxoay điểm đến sang trái.nghỉ ngơi Cú pháp vẫn giữ nguyên. Ví dụ, nếu ta có 10101010 trong al, và xoay nó sang phải 1 bit, kết quả sẽ là 01010101. Tương tự, xoay kết quả này sang trái 1 bit sẽ lại cho ra 10101010.







































































