# KHÁI NIỆM

Tường lửa là bộ lọc phần mềm hoặc phần cứng giám sát lưu lượng mạng và so sánh nó với một tập hợp các quy tắc trước khi cho phép hoặc chặn nó. Một ví dụ đơn giản là người bảo vệ hoặc người gác cổng ở lối vào một sự kiện. Người gác cổng này có thể kiểm tra danh tính của các cá nhân so với một tập hợp các quy tắc trước khi cho phép họ vào (hoặc ra).

Trước khi đi sâu hơn vào chi tiết về tường lửa, điều hữu ích là nhớ lại nội dung của một gói tin IP vàTCPphân đoạn. Hình dưới đây cho thấy các trường mà chúng ta mong đợi tìm thấy trong tiêu đề IP. Nếu hình dưới đây trông phức tạp, bạn không cần phải lo lắng vì chúng ta chỉ quan tâm đến một vài trường. Các loại tường lửa khác nhau có khả năng kiểm tra nhiều trường gói tin khác nhau; tuy nhiên, tường lửa cơ bản nhất cũng phải có khả năng kiểm tra ít nhất các trường sau:
1. Giao thức
2. Địa chỉ nguồn
3. Địa chỉ đích
<img width="1282" height="928" alt="image" src="https://github.com/user-attachments/assets/4839f7bb-4449-46d0-b8c8-90053b6b43ad" />
Tùy thuộc vào trường giao thức, dữ liệu trong gói dữ liệu IP có thể là một trong nhiều tùy chọn. Ba giao thức phổ biến là:

1. TCP
2. UDP
3. ICMP

Đối với TCP hoặc UDP, tường lửa ít nhất phải có khả năng kiểm tra các tiêu đề TCP và UDP để tìm:

1. Số cổng nguồn
2. Số cảng đích

Hình dưới đây hiển thị phần tiêu đề TCP. Chúng ta nhận thấy có nhiều trường mà tường lửa có thể hoặc không thể phân tích; tuy nhiên, ngay cả những tường lửa có chức năng hạn chế nhất cũng nên cho phép người quản trị tường lửa kiểm soát việc cho phép hoặc chặn các số cổng nguồn và đích.
<img width="1282" height="848" alt="image" src="https://github.com/user-attachments/assets/9d8ff430-f46d-4b26-836a-ecfd82405db5" />

Nguyên tắc thiết kế của tường lửa truyền thống là số cổng sẽ xác định dịch vụ và giao thức. Trong tường lửa truyền thống, tức là tường lửa lọc gói, mọi thứ được cho phép và chặn chủ yếu dựa trên các yếu tố sau:

1. Giao thức, chẳng hạn như TCP, UDP và ICMP
2. Địa chỉ nguồn IP
3. Địa chỉ IP đích
4. Số cổng TCP hoặc UDP nguồn
5. Số cổng TCP hoặc UDP đích

# CÁC LOẠI TƯỜNG LỬA

#### Có nhiều cách để phân loại tường lửa. Một trong những cách phân loại tường lửa là dựa trên việc chúng có phải là thiết bị độc lập hay không.

1. Tường lửa Phần cứng (Tường lửa thiết bị): Như tên gọi, tường lửa thiết bị là một phần cứng riêng biệt mà lưu lượng mạng phải đi qua. Ví dụ bao gồm Cisco ASA (Adaptive Security Appliance), WatchGuard Firebox và thiết bị Netgate pfSense Plus.
2. Tường lửa phần mềm: Đây là một phần mềm được cài đặt sẵn trong máy tính.Hệ điều hành Hoặc bạn có thể cài đặt nó như một dịch vụ bổ sung. Hệ điều hành MS Windows có tường lửa tích hợp sẵn, Windows Defender Firewall, hoạt động cùng với các dịch vụ hệ điều hành và ứng dụng người dùng khác. Một ví dụ khác là Linuxiptables và firewalld.

#### Chúng ta cũng có thể phân loại tường lửa thành:

1. Tường lửa cá nhân: Tường lửa cá nhân được thiết kế để bảo vệ một hệ thống duy nhất hoặc một mạng nhỏ, ví dụ như một số ít thiết bị và hệ thống trong mạng gia đình. Rất có thể bạn đang sử dụng tường lửa cá nhân ở nhà mà không cần để ý nhiều. Ví dụ, nhiều điểm truy cập không dây được thiết kế cho gia đình có tường lửa tích hợp sẵn. Một ví dụ là Bitdefender BOX. Một ví dụ khác là tường lửa đi kèm với nhiều điểm truy cập không dây và bộ định tuyến gia đình từ Linksys và Dlink.
2. Tường lửa thương mại: Tường lửa thương mại bảo vệ các mạng có quy mô vừa và lớn. Do đó, bạn có thể kỳ vọng độ tin cậy và sức mạnh xử lý cao hơn, cùng với khả năng hỗ trợ băng thông mạng lớn hơn. Rất có thể, bạn đang đi qua một tường lửa như vậy khi truy cập Internet từ bên trong trường đại học hoặc công ty của mình.
Từ góc nhìn của nhóm tấn công (red team), tiêu chí phân loại quan trọng nhất sẽ dựa trên khả năng kiểm tra của tường lửa. Cần xem xét khả năng của tường lửa theo các lớp ISO/OSI được thể hiện trong hình dưới đây. Trước khi phân loại tường lửa dựa trên khả năng của chúng, cần nhớ rằng tường lửa tập trung vào lớp 3 và 4, và ở mức độ thấp hơn là lớp 2. Tường lửa thế hệ tiếp theo cũng được thiết kế để bao phủ các lớp 5, 6 và 7. Tường lửa càng có thể kiểm tra nhiều lớp, nó càng trở nên tinh vi hơn và càng cần nhiều sức mạnh xử lý hơn.

<img width="1150" height="700" alt="image" src="https://github.com/user-attachments/assets/c4a34456-4067-4d10-9f7e-67a596cc107f" />

#### Dựa trên khả năng của tường lửa, chúng ta có thể liệt kê các loại tường lửa sau:

1. Tường lửa lọc gói: Lọc gói là loại tường lửa cơ bản nhất. Loại tường lửa này kiểm tra giao thức, địa chỉ IP nguồn và đích, và cổng nguồn và đích trong trường hợp...TCP Và UDP các gói dữ liệu. Nó là một tường lửa kiểm tra không trạng thái.
2. Cổng cấp mạch: Bên cạnh các tính năng được cung cấp bởi tường lửa lọc gói, cổng cấp mạch có thể cung cấp thêm các khả năng khác, chẳng hạn như kiểm tra quá trình bắt tay ba bước TCP so với các quy tắc của tường lửa.
3. Tường lửa kiểm tra trạng thái (Stateful Inspection Firewall): So với các loại trước, loại tường lửa này cung cấp thêm một lớp bảo vệ vì nó theo dõi các phiên TCP đã thiết lập. Do đó, nó có thể phát hiện và chặn bất kỳ gói TCP nào nằm ngoài phiên TCP đã thiết lập.
4. Tường lửa Máy chủ proxy: Tường lửa proxy còn được gọi là Tường lửa ứng dụng (AF) và Tường lửa ứng dụng web (WAF). Nó được thiết kế để giả mạo máy khách ban đầu và thực hiện các yêu cầu thay mặt cho máy khách đó. Quá trình này cho phép tường lửa proxy kiểm tra nội dung của phần dữ liệu gói tin thay vì chỉ giới hạn ở phần tiêu đề gói tin. Nói chung, điều này được sử dụng cho các ứng dụng web và không hoạt động với tất cả các giao thức.
5. Tường lửa thế hệ tiếp theo (NGFW): NGFW cung cấp khả năng bảo vệ tường lửa cao nhất. Nó có thể giám sát hầu hết các lớp mạng, từ lớp OSI 2 đến lớp OSI 7. Nó có khả năng nhận biết và điều khiển ứng dụng. Ví dụ bao gồm dòng sản phẩm Juniper SRX và Cisco Firepower.
6. Tường lửa đám mây hoặc Tường lửa dưới dạng dịch vụ (FWaaS): FWaaS thay thế tường lửa phần cứng trong môi trường đám mây. Các tính năng của nó có thể tương đương với NGFW, tùy thuộc vào nhà cung cấp dịch vụ; tuy nhiên, nó được hưởng lợi từ khả năng mở rộng của kiến ​​trúc đám mây. Một ví dụ là Cloudflare Magic Firewall, một tường lửa cấp mạng. Một ví dụ khác là Juniper vSRX; nó có các tính năng tương tự như NGFW nhưng được triển khai trên đám mây. Cũng cần đề cập đến...AWSWAF để bảo vệ ứng dụng web và AWS Shield choTấn công DDoS sự bảo vệ.









