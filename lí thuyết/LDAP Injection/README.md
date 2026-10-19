# STRUCTURE
LDAP, viết tắt của Lightweight Directory Access Protocol (Giao thức truy cập thư mục nhẹ), là một giao thức được sử dụng rộng rãi để truy cập và duy trì các dịch vụ thông tin thư mục phân tán trên mạng Giao thức Internet (IP). LDAP cho phép các tổ chức quản lý người dùng tập trung, cũng như các nhóm và thông tin thư mục khác, thường được sử dụng cho mục đích xác thực và ủy quyền trong các ứng dụng web và nội bộ.

Trong LDAP Các mục trong thư mục được cấu trúc như các đối tượng, mỗi đối tượng tuân theo một lược đồ cụ thể xác định các quy tắc và thuộc tính áp dụng cho đối tượng đó. Cách tiếp cận hướng đối tượng này đảm bảo tính nhất quán và chi phối cách các đối tượng như người dùng hoặc nhóm có thể được biểu diễn và thao tác trong thư mục.

Các dịch vụ sử dụng LDAP :

1. Microsoft Active Directory: Một dịch vụ dành cho mạng miền Windows, sử dụng LDAP như một phần của bộ giao thức cơ bản để quản lý tài nguyên miền.
2. OpenLDAP: Một triển khai mã nguồn mở của LDAP, được sử dụng rộng rãi để quản lý thông tin người dùng và hỗ trợ các cơ chế xác thực trên nhiều nền tảng khác nhau.

Định dạng LDIF

Các mục nhập LDAP có thể được biểu diễn bằng Định dạng Trao đổi Dữ liệu LDAP (LDIF), một định dạng dữ liệu văn bản thuần túy tiêu chuẩn để biểu diễn các mục nhập thư mục LDAP và các thao tác cập nhật. LDIF nhập và xuất nội dung thư mục và mô tả các sửa đổi thư mục như thêm, sửa đổi hoặc xóa các mục nhập.

Kết cấu

Thư mục LDAP tuân theo cấu trúc phân cấp như hệ thống tệp. Cấu trúc cây của nó bao gồm nhiều mục đại diện cho một đối tượng duy nhất, chẳng hạn như người dùng, nhóm hoặc tài nguyên.

<img width="1598" height="428" alt="image" src="https://github.com/user-attachments/assets/8b53417f-456e-4f12-adc6-37c9ed79b496" />

Ở cấp cao nhất của cây LDAP, chúng ta tìm thấy tên miền cấp cao nhất (TLD) , chẳng hạn như `dc=ldap,dc=thm`. Bên dưới TLD, có thể có các tên miền phụ hoặc đơn vị tổ chức (OU) , chẳng hạn như `ou=people` hoặc `ou=groups`, giúp phân loại thêm các mục trong thư mục.

1. Tên phân biệt (DN): Dùng làm mã định danh duy nhất cho mỗi mục trong thư mục, chỉ định đường dẫn từ đỉnh của cây LDAP đến mục đó, ví dụ: cn=John Doe,ou=people,dc=example,dc=com.
2. Tên phân biệt tương đối (RDN): Đại diện cho các cấp độ riêng lẻ trong hệ thống phân cấp thư mục, chẳng hạn như `cn=John Doe`, trong đó `cn` viết tắt của Common Name (Tên thông dụng).
3. Thuộc tính: Xác định các đặc tính của các mục trong thư mục, ví dụ `mail=john@example.com` như địa chỉ email.

# Search Queries

## Truy vấn tìm kiếm

Các truy vấn tìm kiếm là yếu tố cơ bản khi tương tác với các thư mục LDAP, cho phép bạn định vị và truy xuất thông tin được lưu trữ trong thư mục. Hiểu cách xây dựng các truy vấn này là rất quan trọng để sử dụng hiệu quả các dịch vụ LDAP.

Một truy vấn tìm kiếm LDAP bao gồm nhiều thành phần, mỗi thành phần phục vụ một chức năng cụ thể trong quá trình tìm kiếm:

1. Base DN (Tên phân biệt): Đây là điểm bắt đầu tìm kiếm trong cây thư mục.
2. Phạm vi: Xác định độ sâu của tìm kiếm tính từ DN gốc. Có thể là một trong các giá trị sau:
`base`(chỉ tìm kiếm theo DN gốc),
`one`(tìm kiếm các phần tử con trực tiếp của DN gốc),
`sub`(tìm kiếm DN gốc và tất cả các hậu duệ của nó).
3. Bộ lọc: Một tiêu chí phải khớp thì mới được trả về trong kết quả tìm kiếm. Nó sử dụng một cú pháp cụ thể để định nghĩa các tiêu chí này.
4. Thuộc tính: Chỉ định các đặc điểm nào của các mục phù hợp sẽ được trả về trong kết quả tìm kiếm.

Cú pháp cơ bản cho một truy vấn tìm kiếm LDAP trông như sau:

`(base DN) (scope) (filter) (attributes)`

## Bộ lọc và cú pháp

Bộ lọc là cốt lõi của các truy vấn tìm kiếm LDAP, xác định các điều kiện mà các mục trong thư mục phải đáp ứng để được đưa vào kết quả tìm kiếm. Cú pháp cho các bộ lọc LDAP được định nghĩa trong RFC 4515 , trong đó các bộ lọc được biểu diễn dưới dạng chuỗi có định dạng cụ thể, chẳng hạn như: `(canonicalName=value)`Các bộ lọc LDAP có thể sử dụng nhiều toán tử khác nhau để tinh chỉnh tiêu chí tìm kiếm, bao gồm cả phép so sánh bằng ( `=)`, sự hiện diện ( `=*`), lớn hơn ( `>=`), và nhỏ hơn ( `<=`).

Một trong những toán tử quan trọng nhất trong bộ lọc LDAP là ký tự đại diện. `*`, ký hiệu này biểu thị sự trùng khớp với bất kỳ số lượng ký tự nào. Toán tử này rất quan trọng để thiết lập các điều kiện tìm kiếm trùng khớp rộng hoặc một phần.
### Ví dụ về bộ lọc

#### Bộ lọc đơn giản:

`(cn=John Doe)`

Bộ lọc này nhắm mục tiêu vào các mục có tên chuẩn ( `cn`) hoàn toàn trùng khớp với `"John Doe"`.

#### Các lá bài hoang dã:

(`cn=J*`)

Bộ lọc này áp dụng toán tử ký tự đại diện để khớp với bất kỳ mục nào mà `cn`Bắt đầu bằng chữ "J", bất kể chữ nào theo sau.

#### Bộ lọc phức tạp với các toán tử logic:

Đối với truy vấn tìm kiếm phức tạp hơn, các bộ lọc có thể được sử dụng cùng nhau bằng cách sử dụng các toán tử logic như AND ( `&`), HOẶC ( `|`), và KHÔNG ( `!`).

`(&(objectClass=user)(|(cn=John*)(cn=Jane*)))`

Bộ lọc này tìm kiếm các mục được phân loại là "người dùng" trong lớp đối tượng của chúng với tên chuẩn bắt đầu bằng "John" hoặc "Jane".

Mặc dù không thường được công khai trực tiếp, các dịch vụ LDAP có thể truy cập được qua mạng thông qua cổng 389 (đối với kết nối không mã hóa hoặc StartTLS) và 636 (đối với kết nối SSL/TLS). Khi các dịch vụ LDAP có thể truy cập công khai, các công cụ như... `ldapsearch`Công cụ này, một phần của bộ công cụ OpenLDAP, có thể được sử dụng để tương tác với máy chủ LDAP. Công cụ này cho phép người dùng truy vấn và sửa đổi thư mục LDAP từ dòng lệnh, biến nó thành một nguồn tài nguyên quý giá cho cả các tác vụ quản trị hợp pháp và, tiềm tàng, cho những kẻ tấn công khai thác các lỗ hổng LDAP Injection. Ví dụ:

#### Ví dụ về truy vấn tìm kiếm sử dụng ldapsearch

```           
user@tryhackme$ ldapsearch -x -H ldap://MACHINE_IP:389 -b "dc=ldap,dc=thm" "(ou=People)"
# extended LDIF
#
# LDAPv3
# base <dc=ldap,dc=thm> with scope subtree
# filter: (ou=People)
# requesting: ALL
#

# People, ldap.thm
dn: ou=People,dc=ldap,dc=thm
objectClass: organizationalUnit
objectClass: top
ou: People

# search result
search: 2
result: 0 Success

# numResponses: 2
# numEntries: 1
```
        

Lệnh này sử dụng `ldapsearch`Thực hiện tìm kiếm trên máy chủ LDAP đặt tại máy dễ bị tổn thương trên cổng 389, bắt đầu từ DN cơ sở. `dc=ldap,dc=thm`và sử dụng bộ lọc để tìm kiếm các mục thuộc đơn vị tổ chức Nhân sự. 


