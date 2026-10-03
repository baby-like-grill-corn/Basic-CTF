# Là gì XML?

XML (Extensible Markup Language) là một ngôn ngữ đánh dấu được phát triển từ SGML (Standard Generalized Markup Language), cùng một tiêu chuẩn mà HTML dựa trên đó. XML thường được các ứng dụng sử dụng để lưu trữ và truyền tải dữ liệu ở định dạng vừa dễ đọc đối với con người vừa dễ phân tích đối với máy tính. Đây là một định dạng linh hoạt và được sử dụng rộng rãi để trao đổi dữ liệu giữa các hệ thống và ứng dụng khác nhau. XML bao gồm các phần tử, thuộc tính và dữ liệu ký tự, được sử dụng để biểu diễn dữ liệu một cách có cấu trúc và có tổ chức.

# Cú pháp và cấu trúc XML
Các phần tử XML được biểu diễn bằng thẻ, được bao quanh bởi dấu ngoặc nhọn (<>). Thẻ thường đi theo cặp, với thẻ mở đứng trước nội dung và thẻ đóng đứng sau nội dung. Ví dụ:

```
<?xml version="1.0" encoding="UTF-8"?>
<user id="1">
   <name>John</name>
   <age>30</age>
   <address>
      <street>123 Main St</street>
      <city>Anytown</city>
   </address>
</user>
```
Thẻ này `<name>John</name>` đại diện cho một phần tử có tên là "name" với nội dung là "John". Các thuộc tính cung cấp thông tin bổ sung về các phần tử và được chỉ định trong thẻ mở. Thẻ này `<user id="1">` chỉ định thuộc tính "id" với giá trị "1" cho phần tử "user". Dữ liệu ký tự đề cập đến nội dung bên trong các phần tử, chẳng hạn như "John".

Ví dụ trên cho thấy một tài liệu XML đơn giản với các phần tử, thuộc tính và dữ liệu ký tự. `<?xml version="1.0" encoding="UTF-8"?>` Khai báo thẻ cho biết phiên bản XML, và phần tử chứa nhiều phần tử con và thuộc tính khác nhau đại diện cho dữ liệu người dùng.

# Các trường hợp sử dụng phổ biến trong ứng dụng web

XML được sử dụng rộng rãi trong các ứng dụng web để trao đổi, lưu trữ và cấu hình dữ liệu. Nó thường được sử dụng cho các dịch vụ web và API, chẳng hạn như SOAP và REST, để trao đổi dữ liệu giữa các hệ thống. XML cũng được sử dụng cho các tệp cấu hình, chẳng hạn như cấu hình máy chủ web hoặc cài đặt ứng dụng.

# XSLT là gì?

XSLT (Extensible Stylesheet Language Transformations) là một ngôn ngữ được sử dụng để chuyển đổi và định dạng các tài liệu XML. Mặc dù XSLT chủ yếu được sử dụng để chuyển đổi và định dạng dữ liệu, nó cũng có liên quan đáng kể đến các cuộc tấn công XXE (XML External Entities).

XSLT có thể được sử dụng để tạo điều kiện cho các cuộc tấn công XXE theo nhiều cách:

Trích xuất dữ liệu : XSLT có thể được sử dụng để trích xuất dữ liệu nhạy cảm từ tài liệu XML, sau đó có thể được sử dụng trong một cuộc tấn công XXE. Ví dụ, một bảng định kiểu XSLT có thể trích xuất thông tin đăng nhập của người dùng hoặc các thông tin nhạy cảm khác từ một tệp XML.

Mở rộng thực thể : XSLT có thể mở rộng các thực thể được định nghĩa trong tài liệu XML, bao gồm cả các thực thể bên ngoài. Điều này có thể cho phép kẻ tấn công chèn các thực thể độc hại, dẫn đến lỗ hổng XXE.

Thao tác dữ liệu : XSLT có thể thao tác dữ liệu trong tài liệu XML, tiềm ẩn nguy cơ cho phép kẻ tấn công chèn dữ liệu độc hại hoặc sửa đổi dữ liệu hiện có để khai thác lỗ hổng XXE.

Tấn công XXE mù : XSLT có thể được sử dụng để thực hiện các cuộc tấn công XXE mù, trong đó kẻ tấn công chèn các thực thể độc hại mà không nhìn thấy phản hồi của máy chủ.

# DTD là gì?

DTD (Document Type Definitions) định nghĩa cấu trúc và các ràng buộc của một tài liệu XML. Chúng chỉ định các phần tử, thuộc tính được cho phép và các mối quan hệ giữa chúng. DTD có thể nằm bên trong tài liệu XML hoặc bên ngoài trong một tệp riêng biệt.

### Mục đích và cách sử dụng của DTD:

Xác thực : DTD xác thực cấu trúc XML để đảm bảo nó đáp ứng các tiêu chí cụ thể trước khi xử lý, điều này rất quan trọng trong môi trường mà tính toàn vẹn dữ liệu là yếu tố then chốt.

Khai báo thực thể : DTD định nghĩa các thực thể có thể được sử dụng trong toàn bộ tài liệu XML, bao gồm cả các thực thể bên ngoài, vốn là yếu tố quan trọng trong các cuộc tấn công XXE.
Các DTD nội bộ được chỉ định bằng cách sử dụng `<!DOCTYPE` khai báo, trong khi các DTD bên ngoài được tham chiếu bằng từ khóa SYSTEM.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE config [
<!ELEMENT config (database)>
<!ELEMENT database (username, password)>
<!ELEMENT username (#PCDATA)>
<!ELEMENT password (#PCDATA)>
]>
<config>
<!-- configuration data -->
</config>
```

Ví dụ trên cho thấy một DTD nội bộ định nghĩa cấu trúc của một tệp cấu hình. Các khai báo <!ELEMENT chỉ định các phần tử được cho phép và mối quan hệ giữa chúng.

# DTD và XXE

DTD đóng vai trò quan trọng trong tấn công XXE, vì chúng có thể được sử dụng để khai báo các thực thể bên ngoài. Các thực thể bên ngoài có thể tham chiếu đến các tệp hoặc URL bên ngoài, dẫn đến việc chèn dữ liệu hoặc mã độc hại.

# Các thực thể XML

Các thực thể XML là các phần giữ chỗ cho dữ liệu hoặc mã có thể được mở rộng trong tài liệu XML. Có năm loại thực thể: thực thể nội bộ, thực thể bên ngoài, thực thể tham số, thực thể chung và thực thể ký tự.

Ví dụ về thực thể bên ngoài:

```
<?xml version="1.0" encoding="UTF-8"?>
<!ENTITY external SYSTEM "http://example.com/test.dtd">
<config>
&external;
</config>
```

Điều này cho thấy một thực thể bên ngoài tham chiếu đến một URL. `&external;` Tham chiếu trong tài liệu XML sẽ được mở rộng thành nội dung của URL được tham chiếu.

## Các loại thực thể

1. Các thực thể nội bộ về cơ bản là các biến được sử dụng trong tài liệu XML để định nghĩa và thay thế nội dung có thể lặp lại nhiều lần. Chúng được định nghĩa trong DTD (Định nghĩa kiểu tài liệu) và có thể đơn giản hóa việc quản lý thông tin lặp lại. Ví dụ:

```
<!DOCTYPE note [
<!ENTITY inf "This is a test.">
]>
<note>
        <info>&inf;</info>
</note>
```

Trong ví dụ này, `&inf;` thực thể được thay thế bằng giá trị của nó ở bất cứ nơi nào nó xuất hiện trong tài liệu.

2. Các thực thể bên ngoài tương tự như các thực thể bên trong, nhưng nội dung của chúng được tham chiếu từ bên ngoài tài liệu XML, chẳng hạn như từ một tệp hoặc URL riêng biệt. Tính năng này có thể bị khai thác trong các cuộc tấn công XXE (XML External Entity) nếu bộ xử lý XML được cấu hình để giải quyết các thực thể bên ngoài. Ví dụ:

```
<!DOCTYPE note [
<!ENTITY ext SYSTEM "http://example.com/external.dtd">
]>
<note>
        <info>&ext;</info>
</note>
```
Ở đây, `&ext;` nội dung được lấy từ URL được chỉ định, điều này có thể gây ra rủi ro bảo mật nếu URL đó bị kẻ tấn công kiểm soát.

3. Các thực thể tham số là các loại thực thể đặc biệt được sử dụng trong DTD để định nghĩa các cấu trúc có thể tái sử dụng hoặc để bao gồm các tập con DTD bên ngoài. Chúng đặc biệt hữu ích cho việc phân chia DTD thành các mô-đun và để duy trì các ứng dụng XML quy mô lớn. Ví dụ:

```
<!DOCTYPE note [
<!ENTITY % common "CDATA">
<!ELEMENT name (%common;)>
]>
<note>
        <name>John Doe</name>
</note>
```
Trong trường hợp này, `%common;` nó được sử dụng trong DTD để định nghĩa kiểu dữ liệu mà namephần tử đó nên chứa.

4. Các thực thể tổng quát tương tự như các biến và có thể được khai báo nội bộ hoặc bên ngoài. Chúng được sử dụng để định nghĩa các phép thay thế có thể được sử dụng trong phần thân của tài liệu XML. Không giống như các thực thể tham số, các thực thể tổng quát được dùng trong nội dung tài liệu. Ví dụ:

```
<!DOCTYPE note [
<!ENTITY author "John Doe">
]>
<note>
        <writer>&author;</writer>
</note>
```
Thực thể này` &author;` là một thực thể chung được sử dụng để thay thế tên tác giả ở bất cứ nơi nào tên tác giả được nhắc đến trong tài liệu.

5. Các thực thể ký tự được sử dụng để đại diện cho các ký tự đặc biệt hoặc dành riêng mà không thể sử dụng trực tiếp trong tài liệu XML. Các thực thể này ngăn trình phân tích cú pháp hiểu sai cú pháp XML. Ví dụ:

`&lt;` đối với ký hiệu nhỏ hơn ( <)
`&gt;` đối với ký hiệu lớn hơn ( >)
`&amp;` đối với dấu và ( &)
```
<note>
        <text>Use &lt; to represent a less-than symbol.</text>
</note>
```

Cách sử dụng này đảm bảo rằng các ký tự đặc biệt được trình phân tích cú pháp XML xử lý chính xác mà không làm phá vỡ cấu trúc của tài liệu.

Hình ảnh bên dưới minh họa các loại thực thể trong cấu trúc DOM:
<img width="1000" height="800" alt="image" src="https://github.com/user-attachments/assets/99b01240-a2ea-480a-ada3-7ecaaab61190" />

Tránh các cấu hình sai
Các lỗi cấu hình trongXMLCài đặt trình phân tích cú pháp là một nguyên nhân phổ biến gây raXXE-các lỗ hổng liên quan. Điều chỉnh các cài đặt này có thể giảm đáng kể nguy cơ bị tấn công XXE. Dưới đây là hướng dẫn chi tiết và các phương pháp hay nhất cho một số ngôn ngữ lập trình và framework phổ biến.

Các nguyên tắc thực hành tốt nhất chung
1. Vô hiệu hóa các thực thể và DTD bên ngoài : Theo thông lệ tốt nhất, hãy vô hiệu hóa việc xử lý các thực thể và DTD bên ngoài trong trình phân tích cú pháp XML của bạn. Hầu hết các lỗ hổng XXE đều phát sinh từ các DTD độc hại.
2. Sử dụng định dạng dữ liệu đơn giản hơn : Nếu có thể, hãy cân nhắc sử dụng các định dạng dữ liệu đơn giản hơn như...JSON, điều này không cho phép chỉ định các thực thể bên ngoài.
3. Kiểm tra tính hợp lệ của dữ liệu đầu vào : Xác thực tất cả dữ liệu đến dựa trên một lược đồ nghiêm ngặt xác định các kiểu dữ liệu và mẫu dự kiến. Loại trừ hoặc mã hóa các ký tự đặc thù của XML như <, >, &, ', và ". Các ký tự này rất quan trọng trong cú pháp XML và có thể dẫn đến các cuộc tấn công chèn mã nếu sử dụng sai.
   
# Các kỹ thuật giảm thiểu rủi ro trong ngôn ngữ phổ thông

## Java

Sử dụng DocumentBuilderFactoryvà vô hiệu hóa DTD:

```
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
dbf.setXIncludeAware(false);
dbf.setExpandEntityReferences(false);
DocumentBuilder db = dbf.newDocumentBuilder();
```

## .NET

Cấu hình trình đọc XML để bỏ qua DTD và các thực thể bên ngoài:

```
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;
XmlReader reader = XmlReader.Create(stream, settings);
```

## PHP

Vô hiệu hóa việc tải các thực thể bên ngoài bằng libxml:

```
libxml_disable_entity_loader(true);
```

## Python

Hãy sử dụng `defusedxml` thư viện được thiết kế để giảm thiểu các lỗ hổng bảo mật XML:

```
from defusedxml.ElementTree import parse
et = parse(xml_input)
```

Cập nhật và vá lỗi thường xuyên

Cập nhật phần mềm : Luôn cập nhật tất cả các bộ xử lý và thư viện XML. Các nhà cung cấp thường xuyên vá các lỗ hổng bảo mật đã biết.
Vá lỗi bảo mật : Thường xuyên áp dụng các bản vá lỗi bảo mật cho các ứng dụng web và môi trường của chúng.

Nhận thức về bảo mật và đánh giá mã nguồn

Tiến hành rà soát mã nguồn : Thường xuyên rà soát mã nguồn để phát hiện các lỗ hổng bảo mật, đặc biệt là mã xử lý đầu vào và phân tích cú pháp XML.
Thúc đẩy đào tạo về bảo mật : Đảm bảo các nhà phát triển nhận thức được các thực tiễn lập trình an toàn, bao gồm cả các rủi ro liên quan đến việc phân tích cú pháp XML.
