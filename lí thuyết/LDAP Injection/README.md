# STRUCTURE
LDAP, viết tắt của Lightweight Directory Access Protocol (Giao thức truy cập thư mục nhẹ), là một giao thức được sử dụng rộng rãi để truy cập và duy trì các dịch vụ thông tin thư mục phân tán trên mạng Giao thức Internet (IP). LDAP cho phép các tổ chức quản lý người dùng tập trung, cũng như các nhóm và thông tin thư mục khác, thường được sử dụng cho mục đích xác thực và ủy quyền trong các ứng dụng web và nội bộ.

Trong LDAP Các mục trong thư mục được cấu trúc như các đối tượng, mỗi đối tượng tuân theo một lược đồ cụ thể xác định các quy tắc và thuộc tính áp dụng cho đối tượng đó. Cách tiếp cận hướng đối tượng này đảm bảo tính nhất quán và chi phối cách các đối tượng như người dùng hoặc nhóm có thể được biểu diễn và thao tác trong thư mục.

## Các dịch vụ sử dụng LDAP :

1. Microsoft Active Directory: Một dịch vụ dành cho mạng miền Windows, sử dụng LDAP như một phần của bộ giao thức cơ bản để quản lý tài nguyên miền.
2. OpenLDAP: Một triển khai mã nguồn mở của LDAP, được sử dụng rộng rãi để quản lý thông tin người dùng và hỗ trợ các cơ chế xác thực trên nhiều nền tảng khác nhau.

## Định dạng LDIF

Các mục nhập LDAP có thể được biểu diễn bằng Định dạng Trao đổi Dữ liệu LDAP (LDIF), một định dạng dữ liệu văn bản thuần túy tiêu chuẩn để biểu diễn các mục nhập thư mục LDAP và các thao tác cập nhật. LDIF nhập và xuất nội dung thư mục và mô tả các sửa đổi thư mục như thêm, sửa đổi hoặc xóa các mục nhập.

## Kết cấu

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

# Injection Fundamentals

## Nguyên lý cơ bản về tiêm

Tấn công injection là một lỗ hổng bảo mật nghiêm trọng xảy ra khi dữ liệu người dùng nhập vào không được xử lý đúng cách trước khi được đưa vào các truy vấn LDAP. Sự sơ suất này cho phép kẻ tấn công thao túng các truy vấn, dẫn đến việc truy cập trái phép hoặc thao túng dữ liệu thư mục LDAP.

Tấn công LDAP Injection khai thác cách các ứng dụng web xây dựng các truy vấn LDAP. Khi dữ liệu người dùng được đưa trực tiếp vào các truy vấn này mà không được xác thực hoặc mã hóa đúng cách, kẻ tấn công có thể chèn các câu lệnh LDAP độc hại. Điều này có thể dẫn đến việc truy cập trái phép vào thông tin nhạy cảm, sửa đổi dữ liệu thư mục hoặc vượt qua các cơ chế xác thực.

Quá trình này tương tự như SQL Tấn công Injection là kiểu tấn công chèn các câu lệnh SQL độc hại vào truy vấn để thao túng hoạt động cơ sở dữ liệu. Trong tấn công LDAP Injection, mã độc nhắm mục tiêu vào các truy vấn LDAP. 

## Các phương thức tấn công phổ biến

1. Tấn công vượt qua xác thực: Sửa đổi các truy vấn xác thực LDAP để đăng nhập với tư cách người dùng khác mà không cần biết mật khẩu của họ.
2. Truy cập dữ liệu trái phép: Thay đổi các truy vấn tìm kiếm LDAP để truy xuất thông tin nhạy cảm mà kẻ tấn công không được phép truy cập.
3. Thao tác dữ liệu: Chèn các truy vấn nhằm sửa đổi thư mục LDAP, chẳng hạn như thêm hoặc sửa đổi thuộc tính người dùng.

## Quá trình tiêm

Việc thực hiện một cuộc tấn công LDAP Injection bao gồm một số bước quan trọng, từ việc xác định điểm tấn công đến việc khai thác thành công lỗ hổng. 

<img width="1302" height="1008" alt="image" src="https://github.com/user-attachments/assets/ffcf82fb-988a-4ff5-8bf3-85c666a52ad0" />

Sơ đồ này minh họa sự tương tác giữa kẻ tấn công, ứng dụng web và máy chủ LDAP trong một cuộc tấn công LDAP Injection. Kẻ tấn công gửi dữ liệu độc hại vào biểu mẫu đăng nhập của ứng dụng web, ứng dụng sẽ xây dựng một truy vấn LDAP kết hợp dữ liệu này. Sau đó, máy chủ LDAP thực thi truy vấn đã bị sửa đổi, dẫn đến khả năng truy cập trái phép hoặc tiết lộ thông tin, tùy thuộc vào bản chất của dữ liệu được chèn vào. 

# Exploiting LDAP

Khai thác LDAP

Tấn công LDAP Injection có thể đặc biệt nguy hiểm khi bị khai thác trong các cơ chế xác thực. Kẻ tấn công có thể thao túng các truy vấn LDAP để xác thực người dùng nhằm vượt qua các biện pháp kiểm soát bảo mật, từ đó giành được quyền truy cập trái phép vào các ứng dụng.

Ví dụ, dưới đây là một ví dụ đơn giản hóa. PHP Đoạn mã được sử dụng trong một ứng dụng web để xác thực người dùng với máy chủ LDAP: 

```
<?php
$username = $_POST['username'];
$password = $_POST['password'];

$ldap_server = "ldap://localhost";
$ldap_dn = "ou=People,dc=ldap,dc=thm";
$admin_dn = "cn=tester,dc=ldap,dc=thm";
$admin_password = "tester"; 

$ldap_conn = ldap_connect($ldap_server);
if (!$ldap_conn) {
    die("Could not connect to LDAP server");
}

ldap_set_option($ldap_conn, LDAP_OPT_PROTOCOL_VERSION, 3);

if (!ldap_bind($ldap_conn, $admin_dn, $admin_password)) {
    die("Could not bind to LDAP server with admin credentials");
}

// LDAP search filter
$filter = "(&(uid=$username)(userPassword=$password))";

// Perform the LDAP search
$search_result = ldap_search($ldap_conn, $ldap_dn, $filter);

// Check if the search was successful
if ($search_result) {
    // Retrieve the entries from the search result
    $entries = ldap_get_entries($ldap_conn, $search_result);
    if ($entries['count'] > 0) {
        foreach ($entries as $entry) {
            if (is_array($entry)) {
                if (isset($entry['cn'][0])) {
                    $message = "Welcome, " . $entry['cn'][0] . "!\n";
                }
            }
        }
    } else {
        $error = true;
    }
} else {
    $error = "LDAP search failed\n";
}
?>
```
Đoạn mã này dễ bị tấn công vì nó trực tiếp chèn dữ liệu do người dùng cung cấp (` $username` Và `$password`) vào truy vấn LDAP mà không được làm sạch hoặc mã hóa đúng cách. Kẻ tấn công có thể khai thác điều này để chèn các bộ lọc LDAP độc hại.

Để khai thác lỗ hổng này, kẻ tấn công có thể gửi một tên người dùng có chứa bộ lọc LDAP độc hại. Ví dụ, kẻ tấn công có thể sử dụng tên người dùng như sau: `*`Khi được chèn vào truy vấn LDAP, điều này sẽ biến truy vấn thành một điều kiện luôn luôn đúng, bỏ qua quá trình xác thực.

Truy vấn này sẽ xác thực thành công nếu có bất kỳ người dùng nào trong thư mục LDAP, theo điều kiện được đưa vào. `uid=*`Luôn được đánh giá là đúng. 

## Các kỹ thuật vượt qua xác thực

### Tiêm dựa trên Tautology (Tautology-Based Injection)

Tấn công chèn dựa trên phép lặp lại (tautology-based injection) liên quan đến việc chèn các điều kiện vốn dĩ đúng vào một truy vấn LDAP, do đó đảm bảo truy vấn luôn trả về kết quả tích cực, bất kể logic dự định là gì. Phương pháp này đặc biệt hiệu quả đối với các truy vấn LDAP được xây dựng bằng dữ liệu đầu vào của người dùng chưa được làm sạch đúng cách. Ví dụ, hãy xem xét một truy vấn xác thực LDAP trong đó tên người dùng và mật khẩu được chèn trực tiếp từ dữ liệu đầu vào của người dùng:

`(&(uid={userInput})(userPassword={passwordInput}))`

Kẻ tấn công có thể cung cấp đầu vào dựa trên phép lặp lại, chẳng hạn như `*)(|(&` vì `{userInput}` Và `pwd)` vì `{passwordInput}`Điều này biến đổi truy vấn thành:

`(&(uid=*)(|(&)(userPassword=pwd)))`

Truy vấn này thực chất bỏ qua bước kiểm tra mật khẩu nhờ cách sử dụng các toán tử logic trong bộ lọc. Truy vấn bao gồm hai phần, được kết hợp bằng toán tử AND ( `&`) toán tử.

1. (uid=*)Phần này của bộ lọc khớp với bất kỳ mục nào có dấu ngoặc đơn. `uid`thuộc tính, về cơ bản là tất cả người dùng, bởi vì ký tự đại diện `*`Phù hợp với bất kỳ giá trị nào.

2. `(|(&)(userPassword=pwd))`: ( `|`) toán tử OR, có nghĩa là bất kỳ điều kiện nào trong hai điều kiện được bao quanh đều phải đúng thì bộ lọc mới hoạt động. Trong LDAP, một AND rỗng ( `(&)`Điều kiện ) luôn được coi là đúng. Điều kiện còn lại kiểm tra xem liệu `userPassword`thuộc tính khớp với giá trị pwd, điều này có thể thất bại nếu người dùng không sử dụng `pwd`dùng làm mật khẩu của họ.

Tóm lại, phần thứ hai của bộ lọc là... `(|(&)(userPassword=pwd))`sẽ luôn được đánh giá là đúng vì lý do đó `(&)`điều kiện. Toán tử OR chỉ cần một trong các điều kiện bên trong nó đúng, và vì vậy `(&)`Điều này luôn đúng, toàn bộ điều kiện OR đều đúng bất kể `(userPassword=pwd)`Đúng hay sai?

Do đó, điều này dẫn đến việc trả về kết quả truy vấn thành công cho bất kỳ người dùng nào mà không cần xác minh mật khẩu chính xác, bỏ qua cơ chế kiểm tra mật khẩu.

## Tiêm ký tự đại diện

Ký tự đại diện ( `*`Ký tự đại diện (wildcard) được sử dụng trong các truy vấn LDAP để khớp với bất kỳ chuỗi ký tự nào, biến chúng thành công cụ mạnh mẽ cho các tìm kiếm rộng. Tuy nhiên, khi dữ liệu đầu vào của người dùng chứa ký tự đại diện không được xử lý đúng cách, nó có thể dẫn đến kết quả truy vấn không mong muốn, chẳng hạn như bỏ qua xác thực bằng cách khớp với nhiều hoặc tất cả các mục. Ví dụ, nếu truy vấn tìm kiếm có dạng:

`(&(uid={userInput})(userPassword={passwordInput}))`

Kẻ tấn công có thể sử dụng ký tự đại diện làm đầu vào trong cả hai trường hợp: uid và userPassword. Sử dụng `*` thay vì `{userInput}`có thể buộc truy vấn bỏ qua các tên người dùng cụ thể và tập trung vào mật khẩu. Tuy nhiên, vì ký tự đại diện cũng có mặt trong `{passwordInput}`Nó không kiểm tra tính hợp lệ của nội dung trường mật khẩu so với một giá trị dự kiến ​​cụ thể. Thay vào đó, nó chỉ kiểm tra sự hiện diện của... `userPassword`thuộc tính, bất kể nội dung của nó là gì.

Điều này có nghĩa là truy vấn sẽ trả về kết quả khớp với bất kỳ người dùng nào mà không cần xác minh rằng mật khẩu được cung cấp trong quá trình xác thực có khớp với mật khẩu đã lưu trữ hay không. Kết quả là, điều này giúp bỏ qua cơ chế kiểm tra mật khẩu một cách hiệu quả.

## Ví dụ về cách vượt qua xác thực

Để minh họa một cuộc tấn công LDAP Injection đơn giản, hãy truy cập http://MACHINE_IP/normal.php . Dựa trên đoạn mã trên, ứng dụng xây dựng một truy vấn LDAP để xác thực dựa trên dữ liệu người dùng nhập vào mà không qua quá trình lọc dữ liệu thích hợp.

Kẻ tấn công có thể khai thác lỗ hổng này bằng cách nhập tên người dùng và mật khẩu có chứa ký tự mà ứng dụng không lường trước được, chẳng hạn như dấu sao (*) cho giá trị thuộc tính uid và userPassword. Điều này khiến điều kiện luôn được đánh giá là đúng, từ đó bỏ qua bước kiểm tra mật khẩu một cách hiệu quả:

### Tên người dùng và mật khẩu đã được chèn:


`username=*&password=*`

<img width="2328" height="704" alt="image" src="https://github.com/user-attachments/assets/de83a301-fe0a-47b0-929b-0cc5de5b7e19" />

### Thành phần truy vấn LDAP kết quả:

`(&(uid=*)(userPassword=*))`

<img width="2350" height="888" alt="image" src="https://github.com/user-attachments/assets/2a9a1354-f5d4-48fa-a48c-3057dd10a896" />

Việc chèn lệnh này luôn làm cho điều kiện của truy vấn LDAP trở thành đúng. Tuy nhiên, chỉ sử dụng... `*`Nó sẽ luôn lấy kết quả đầu tiên trong truy vấn. Để nhắm mục tiêu vào dữ liệu bắt đầu bằng một ký tự cụ thể, kẻ tấn công có thể sử dụng một payload như sau: `f*`, tìm kiếm một uid bắt đầu bằng chữ f.

<img width="2308" height="872" alt="image" src="https://github.com/user-attachments/assets/51f1625d-d5d5-4079-9578-d1782088ee38" />

Kết quả hiển thị lá cờ








