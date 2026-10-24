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

# Né tránh bằng cách kiểm soát địa chỉ MAC/IP/cổng nguồn

Khi quét một máy chủ phía sau tường lửa Thông thường, tường lửa sẽ phát hiện và chặn các cuộc quét cổng. Trong trường hợp này, bạn cần phải điều chỉnh mạng và phương pháp quét cổng của mình để tránh bị tường lửa tấn công. Một phần mềm quét mạng như...Nmap Nó cung cấp một vài tính năng hỗ trợ cho nhiệm vụ này. Trong phần này, chúng tôi chia các kỹ thuật Nmap thành ba nhóm:

1. Né tránh bằng cách kiểm soát địa chỉ MAC/IP/cổng nguồn.
2. Né tránh bằng cách phân mảnh,MTUvà độ dài dữ liệu
3. Trốn thuế bằng cách sửa đổi các trường tiêu đề

Nmap cho phép bạn ẩn hoặc giả mạo nguồn như sau:

1. Mồi nhử
2. Máy chủ proxy
3. Địa chỉ MAC giả mạo
4. Địa chỉ IP nguồn giả mạo
5. Số cổng nguồn cố định
   
Trước khi đi sâu vào từng phương pháp, hãy xem hình ảnh một bản quét Nmap ẩn (SYN) trông như thế nào. Chúng ta đang quét mục tiêu là hệ điều hành MS Windows (với tường lửa tích hợp mặc định), vì vậy chúng ta đã thêm tùy chọn -Pn để buộc quá trình quét tiếp tục ngay cả khi không nhận được phản hồi ping. Tùy chọn -Pn này được sử dụng để bỏ qua việc phát hiện máy chủ và kiểm tra xem máy chủ có đang hoạt động hay không. Hơn nữa, để tăng tốc độ quét, chúng ta đã giới hạn bản thân chỉ quét 100 cổng phổ biến nhất bằng cách sử dụng -F tùy chọn. Quá trình quét được thực hiện bằng lệnh sau nmap -sS -Pn -F MACHINE_IP: .

Ảnh chụp màn hình sau đây cho thấy Wireshark đã thu thập được các gói tin thăm dò của Nmap. Wireshark đang chạy trên cùng hệ thống với Nmap.

<img width="915" height="825" alt="image" src="https://github.com/user-attachments/assets/5bdd1aff-6670-4acd-999d-1d638811d859" />

Chúng ta có thể đi sâu vào tất cả các chi tiết được nhúng trong từng gói; tuy nhiên, đối với bài tập này, chúng ta muốn lưu ý những điểm sau:

1. Địa chỉ IP của chúng tôi 10.14.17.226 đã tạo và gửi khoảng 200 gói tin. -F Tùy chọn này giới hạn việc quét chỉ trong 100 cổng phổ biến nhất; hơn nữa, mỗi cổng sẽ nhận được gói tin SYN thứ hai nếu nó không phản hồi gói tin đầu tiên.
2. Số cổng nguồn được chọn ngẫu nhiên. Trong ảnh chụp màn hình, bạn có thể thấy đó là 37710.
3. Tổng chiều dài của gói tin IP là 44 byte. Trong đó, 20 byte dành cho phần tiêu đề IP, còn lại 24 byte cho phần nội dung.TCP Tiêu đề. Không có dữ liệu nào được gửi qua TCP.
4. Thời gian để sống (TTL) là 42.
5. Không có lỗi nào được đưa vào trong mã kiểm tra.
Trong các phần và bài tập tiếp theo, chúng ta sẽ tìm hiểu cách Nmap cung cấp nhiều tùy chọn khác nhau để vượt qua tường lửa và các giải pháp bảo mật mạng khác.

## Mồi nhử
Che giấu hoạt động quét của bạn bằng các địa chỉ IP giả. Sử dụng địa chỉ IP giả sẽ khiến địa chỉ IP của bạn lẫn với các địa chỉ IP "giả" khác. Do đó, tường lửa và máy chủ mục tiêu sẽ khó xác định được nguồn gốc của hoạt động quét cổng. Hơn nữa, điều này có thể làm hao phí thời gian của nhóm phòng thủ khi phải điều tra từng địa chỉ IP nguồn.

Sử dụng -D tùy chọn này, bạn có thể thêm các địa chỉ IP nguồn giả để đánh lừa mục tiêu. Hãy xem xét lệnh sau: nmap -sS -Pn -D 10.10.10.1,10.10.10.2,ME -F MACHINE_IP. Hình ảnh thu thập được từ Wireshark được hiển thị trong hình bên dưới.

<img width="915" height="825" alt="0123f32d7cc90fca50a3d565824955b1" src="https://github.com/user-attachments/assets/35308e17-3786-4066-8efa-c14662117446" />

Mục tiêu MACHINE_IP cũng sẽ thấy các bản quét đến từ 10.10.10.1 và 10.10.10.2 khi chỉ có một địa chỉ IP nguồn, ME, đang thực hiện quét. Lưu ý rằng nếu bạn bỏ qua mục MEnhập trong lệnh quét, Nmap sẽ đặt địa chỉ IP thực của bạn, tức là ME, vào một vị trí ngẫu nhiên.

Bạn cũng có thể thiết lập Nmap để sử dụng địa chỉ IP nguồn ngẫu nhiên thay vì chỉ định rõ ràng. Bằng cách chạy `nmap -sS -Pn -D RND,RND,ME -F MACHINE_IP` lệnh này, Nmap sẽ chọn hai địa chỉ IP nguồn ngẫu nhiên để sử dụng làm mồi nhử. Nmap sẽ sử dụng các địa chỉ IP ngẫu nhiên mới mỗi khi bạn chạy lệnh này. Trong ảnh chụp màn hình bên dưới, chúng ta thấy cách Nmap chọn hai địa chỉ IP ngẫu nhiên ngoài địa chỉ IP của chúng ta, 10.14.17.226.

<img width="915" height="825" alt="2fb8362a71b22cdbe9e60fd638c1813c" src="https://github.com/user-attachments/assets/56922914-4326-4092-9c96-ab83f95ed12d" />

## Máy chủ proxy
Sử dụng proxy HTTP/SOCKS4. Việc chuyển tiếp quá trình quét cổng thông qua proxy giúp giữ cho địa chỉ IP của bạn không bị máy chủ mục tiêu phát hiện. Kỹ thuật này cho phép bạn giữ địa chỉ IP của mình được ẩn trong khi mục tiêu ghi lại địa chỉ IP của máy chủ proxy. Bạn có thể thực hiện theo cách này bằng cách sử dụng tùy chọn Nmap `--proxies PROXY_URL`. Ví dụ, `nmap -sS -Pn --proxies PROXY_URL -F MACHINE_IP` lệnh này sẽ gửi tất cả các gói tin của nó thông qua máy chủ proxy mà bạn chỉ định. Lưu ý rằng bạn có thể kết nối nhiều proxy bằng cách sử dụng danh sách được phân tách bằng dấu phẩy.

## Địa chỉ MAC giả mạo
Giả mạo địa chỉ MAC nguồn. Nmap cho phép bạn giả mạo địa chỉ MAC của mình bằng tùy chọn `--false` `--spoof-mac MAC_ADDRESS`. Kỹ thuật này khá phức tạp; việc giả mạo địa chỉ MAC chỉ hoạt động nếu hệ thống của bạn nằm trên cùng một phân đoạn mạng với máy chủ mục tiêu. Hệ thống mục tiêu sẽ phản hồi lại một địa chỉ MAC giả mạo. Nếu bạn không nằm trên cùng một phân đoạn mạng, không dùng chung mạng Ethernet, bạn sẽ không thể thu thập và đọc các phản hồi. Điều này cho phép bạn khai thác bất kỳ mối quan hệ tin cậy nào dựa trên địa chỉ MAC. Hơn nữa, bạn có thể sử dụng kỹ thuật này để che giấu các hoạt động quét của mình trên mạng. Ví dụ, bạn có thể làm cho các lần quét của mình trông như thể đến từ một máy in mạng.

## Địa chỉ IP giả mạo
Giả mạo địa chỉ IP nguồn. Nmap cho phép bạn giả mạo địa chỉ IP của mình bằng cách sử dụng lệnh `-S IP_ADDRESS`. Việc giả mạo địa chỉ IP rất hữu ích nếu hệ thống của bạn nằm trên cùng một mạng con với máy chủ mục tiêu; nếu không, bạn sẽ không thể đọc được các phản hồi được gửi lại. Lý do là máy chủ mục tiêu sẽ trả lời địa chỉ IP giả mạo, và trừ khi bạn có thể thu thập được các phản hồi, bạn sẽ không thu được lợi ích gì từ kỹ thuật này. Một công dụng khác của việc giả mạo địa chỉ IP là khi bạn kiểm soát hệ thống có địa chỉ IP cụ thể đó. Do đó, nếu bạn nhận thấy rằng mục tiêu bắt đầu chặn địa chỉ IP giả mạo, bạn có thể chuyển sang một địa chỉ IP giả mạo khác thuộc về một hệ thống mà bạn cũng kiểm soát. Kỹ thuật quét này có thể giúp bạn duy trì sự hiện diện bí mật; hơn nữa, bạn có thể sử dụng kỹ thuật này để khai thác các mối quan hệ tin cậy trên mạng dựa trên địa chỉ IP.

## Số cổng nguồn cố định
Sử dụng số cổng nguồn cụ thể. Quét từ một số cổng nguồn cụ thể có thể hữu ích nếu bạn phát hiện ra rằng tường lửa cho phép các gói tin đến từ các số cổng nguồn cụ thể, chẳng hạn như cổng 53 hoặc 80. Nếu không kiểm tra nội dung gói tin, các gói tin từ cổng TCP nguồn 80 hoặc 443 trông giống như các gói tin từ máy chủ web, trong khi các gói tin từ cổng UDP 53 trông giống như phản hồi cho các truy vấn DNS. Bạn có thể đặt số cổng của mình bằng cách sử dụng các tùy chọn `-g` hoặc `--source-port`.

Ảnh chụp màn hình Wireshark dưới đây hiển thị kết quả quét Nmap với số cổng TCP nguồn cố định là 8080. Chúng tôi đã sử dụng lệnh Nmap sau: `nmap -sS -Pn -g 8080 -F MACHINE_IP`. Bạn có thể thấy trong ảnh chụp màn hình rằng tất cả các kết nối TCP đều được gửi từ cùng một số cổng TCP.

<img width="915" height="825" alt="a0307f9e74e7f110b546dc7b423a288e" src="https://github.com/user-attachments/assets/f13e0cc7-a821-4517-855f-f3c70f189edb" />

## Đây là bản tóm tắt nhanh các tùy chọn Nmap đã được thảo luận trong nhiệm vụ này.
#### Phương pháp né tránh	                                  Đối số Nmap <br>
Che giấu quá trình quét bằng các mục tiêu giả mạo.	          -D DECOY1_IP1,DECOY_IP2,ME <br>
Che giấu quá trình quét bằng các mục tiêu giả ngẫu nhiên.	 -D RND,RND,ME <br>
Sử dụng proxy HTTP/SOCKS4 để chuyển tiếp kết nối.	          --proxies PROXY_URL <br>
Địa chỉ MAC nguồn giả mạo	                                  --spoof-mac MAC_ADDRESS <br>
Giả mạo địa chỉ IP nguồn	                                  -S IP_ADDRESS <br>
Sử dụng số cổng nguồn cụ thể	                               -g PORT_NUM hoặc--source-port PORT_NUM <br>

































