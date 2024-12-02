// Mảng chứa các sản phẩm (lấy từ phía Admin)
export let productItemArray = [
  {
    number: 1,
    id: "APh00001",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    brand: "CeraVe",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 200000,
    desc: `<b>EFFACLAR DUO+ M </b>từ <b>La Roche-Posay</b> là kem dưỡng chuyên biệt dành cho da mụn, giúp giảm mụn và ngăn ngừa tái phát. Sản phẩm chứa các thành phần nổi bật như Niacinamide (Vitamin B3) giúp làm dịu da và giảm viêm, LHA và Salicylic Acid có tác dụng tẩy tế bào chết nhẹ nhàng, ngăn ngừa tình trạng bí tắc lỗ chân lông, cùng Procerad hỗ trợ giảm thâm và làm sáng da. <b>EFFACLAR DUO+ M</b> không chỉ giúp kiểm soát dầu nhờn mà còn cải thiện các vấn đề da mụn nhạy cảm. Bạn nên sử dụng sản phẩm 1-2 lần mỗi ngày, thoa một lớp mỏng lên vùng da bị mụn để đạt hiệu quả tốt nhất.`,
    quantity: 15,
    discountQuantity: 10,
    discountPercent: 20,
    originQuantity: 15
  },
  {
    number: 2,
    id: "APh00002",
    src: "./assets/images/facewash-image-2.jpg",
    name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
    brand: "Simple",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 150000,
    desc: `Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml là sản phẩm dịu nhẹ, giúp làm sạch sâu da mà vẫn giữ được độ ẩm tự nhiên, không gây khô căng. Với công thức không chứa hương liệu, không phẩm màu và không chất gây kích ứng, sản phẩm phù hợp với mọi loại da, đặc biệt là da nhạy cảm. Thành phần chính gồm Vitamin B5 và Vitamin E giúp làm dịu và nuôi dưỡng làn da, loại bỏ bụi bẩn, dầu thừa một cách nhẹ nhàng. Với kết cấu dạng gel mịn, sữa rửa mặt này mang đến cảm giác tươi mát và sạch thoáng cho da sau mỗi lần sử dụng, giúp duy trì làn da mềm mại và khỏe mạnh.`,
    quantity: 3,
    discountQuantity: 0,
    discountPercent: 0,
    originQuantity: 10
  },
  {
    number: 3,
    id: "APh00003",
    src: "./assets/images/acnecream-image-1.jpg",
    name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
    brand: "La Roche-Posay",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 400000,
    desc: `<b>EFFACLAR DUO+ M </b>từ <b>La Roche-Posay</b> là kem dưỡng chuyên biệt dành cho da mụn, giúp giảm mụn và ngăn ngừa tái phát. Sản phẩm chứa các thành phần nổi bật như Niacinamide (Vitamin B3) giúp làm dịu da và giảm viêm, LHA và Salicylic Acid có tác dụng tẩy tế bào chết nhẹ nhàng, ngăn ngừa tình trạng bí tắc lỗ chân lông, cùng Procerad hỗ trợ giảm thâm và làm sáng da. <b>EFFACLAR DUO+ M</b> không chỉ giúp kiểm soát dầu nhờn mà còn cải thiện các vấn đề da mụn nhạy cảm. Bạn nên sử dụng sản phẩm 1-2 lần mỗi ngày, thoa một lớp mỏng lên vùng da bị mụn để đạt hiệu quả tốt nhất.`,
    quantity: 2,
    discountQuantity: 5, 
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 4,
    id: "APh00004",
    src: "./assets/images/acnecream-image-2.jpg",
    name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
    brand: "Gamma Chemicals",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 235000,
    desc: `<b>Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g</b> là sản phẩm chuyên biệt giúp điều trị mụn và giảm thâm, hỗ trợ làn da sáng mịn và đều màu. Sản phẩm chứa các thành phần nổi bật như Azelaic Acid có tác dụng kháng viêm, giảm vi khuẩn gây mụn và kiểm soát dầu nhờn, cùng AHA (Glycolic Acid) giúp tẩy tế bào chết nhẹ nhàng, thúc đẩy tái tạo da và làm mờ thâm mụn. Với kết cấu dạng gel mỏng nhẹ, Megaduo Plus dễ dàng thẩm thấu, không gây nhờn rít, phù hợp với da dầu, da mụn, và da nhạy cảm. Sản phẩm có thể được sử dụng 1-2 lần mỗi ngày, thoa trực tiếp lên vùng da có mụn và thâm để cải thiện tình trạng da.`,
    quantity: 1,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 5,
    id: "APh00005",
    src: "./assets/images/acnecream-image-3.jpg",
    name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
    brand: "CeraVe",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 212000,
    desc: `<b>Gel Giảm Mụn Alcom Derma Forte Advanced</b> là sản phẩm điều trị mụn hiệu quả, giúp làm giảm mụn và ngăn ngừa thâm sau mụn. Sản phẩm chứa các thành phần chính như Niacinamide (Vitamin B3) giúp làm dịu da và kháng viêm, Azelaic Acid có tác dụng giảm vi khuẩn gây mụn, kiểm soát bã nhờn, và Vitamin E giúp dưỡng ẩm, làm mềm da. Gel này còn hỗ trợ làm đều màu da và ngăn ngừa sẹo thâm sau mụn, phù hợp cho các loại da, đặc biệt là da dầu và da mụn. Bạn nên thoa một lớp mỏng lên vùng da mụn 1-2 lần mỗi ngày để đạt hiệu quả tối ưu.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 6,
    id: "APh00006",
    src: "./assets/images/face-washimage-3.jpg",
    name: "Sữa rửa mặt dịu nhẹ Cetaphil Gentle Skin Cleanser(500ml)",
    brand: "Galderma Laboratories",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 200000,
    desc: `<b>Sữa rửa mặt dịu nhẹ Cetaphil Gentle Skin Cleanser</b>  là dòng sữa rửa mặt làm sạch và chăm sóc da đến từ thương hiệu Cetaphil - thuộc công ty dược nổi tiếng Galderma Laboratories. Sản phẩm có thành phần an toàn, dịu nhẹ, không chứa xà phòng, vô cùng lành tính dành cho mọi loại da, kể cả những làn da nhạy cảm nhất.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 7,
    id: "APh00007",
    src: "./assets/images/face-washimage-4.jpg",
    name: "Sữa Rửa Mặt Nivea Men Bùn Khoáng Sạch Nhờn Mát Lạnh 100G",
    brand: "Nivea",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 250000,
    desc: `<b>Sữa Rửa Mặt Nivea Men Bùn Khoáng Sạch Nhờn Mát Lạnh 100G</b> chứa công thức mát lạnh vượt trội cho da sạch sâu, tạo cảm giác mát lạnh , làm dịu nhiệt trên da và kiểm soát nhờn giúp thu nhỏ lỗ chân lông cho làn da săn chắc, mịn màng. Dạng bùn khoáng giúp sạch sâu từ trong chân lông, cho làn da nam giới sáng khỏe tự tin.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 8,
    id: "APh00008",
    src: "./assets/images/face-washimage-5.jpg",
    name: "Sữa Rửa Mặt Simple Detox Purifying Face Wash 150ml",
    brand: "Simple",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 275000,
    desc: `<b>Sữa Rửa Mặt Simple Detox Purifying Face Wash 150ml</b> là dòng gel rửa mặt dịu nhẹ dành cho da dầu mụn, giúp làm sạch bụi bẩn, bã nhờn, làm thông thoáng lỗ chân lông, không chỉ giúp cho làn da của bạn lấy đi được những bụi bẩn mà còn lấy đi cả các lớp trang điểm trên da mặt, đồng thời detox, thanh lọc giúp làn da tươi mới và khỏe khoắn hơn. `,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 9,
    id: "APh00009",
    src: "./assets/images/acnecream-image-4.jpg",
    name: "Gel giảm mụn và thâm Gamma SANTAGIFT (20g)",
    brand: "Gamma SANTAGIFT",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 212000,
    desc: `<b>Gel giảm mụn và thâm Gamma SANTAGIFT (20g)</b> là sản phẩm gel bôi da chuyên biệt được thiết kế với các thành phần cải tiến liên tục phù hợp với da nhạy cảm, dễ bị thâm mụn, đang bị thâm. Với công thức độc quyền kết hợp các thành phần tự nhiên và công nghệ tiên tiến, sản phẩm này hỗ trợ giảm thâm, ngăn ngừa sẹo rỗ.
Ngoài ra với phiên bản mới, Santagift được bổ sung tinh chất chống nắng 30 SPF nghiên cứu dành riêng cho da mụn, bảo vệ da không bị thâm do mụn.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 10,
    id: "APh00010",
    src: "./assets/images/acnecream-image-5.png",
    name: "Kem giảm mụn ngừa thâm sẹo Sakura Acne Clearing Cream",
    brand: "Sahura",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 212000,
    desc: `<b>Kem giảm mụn ngừa thâm sẹo Sakura Acne Clearing Cream</b> là một trong những sản phẩm thuộc thương hiệu danh tiếng của Nhật Bản được rất được nhiều người lựa chọn, là bí quyết loại bỏ mụn, thâm mụn và sẹo mụn hiệu quả hàng đầu hiện nay. Kết cấu gel trong suốt nên bạn có thể sử dụng an tâm. Không kích ứng, lành tính nên thích hợp cho cả nam và nữ `,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 11,
    id: "APh00011",
    src: "./assets/images/toner-imag1.jpg",
    name: "Klairs Supple Preparation Unscented",
    brand: "Klairs",
    category: "toner",
    categoryID: "toner",
    price: 352000,
    desc: `<b>Klairs Supple Preparation Unscented</b> là sản phẩm từ thương hiệu Klairs, nổi bật với công thức dịu nhẹ không chứa hương liệu, thích hợp cho cả làn da nhạy cảm. Với thành phần từ Sodium Hyaluronate và Phyto-Oligo, toner này giúp cấp nước, cân bằng độ pH và làm dịu làn da, hỗ trợ các bước dưỡng da tiếp theo thẩm thấu tốt hơn.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 12,
    id: "APh00012",
    src: "./assets/images/toner-imag2.png",
    name: "Acleon Clarifying Toning Lotion cấp ẩm cho da dầu ",
    brand: "ANACIS",
    category: "toner",
    categoryID: "toner",
    price: 299000,
    desc: `<b>Acleon Clarifying Toning Lotion </b> Sở hữu cho mình một màu tím mộng mơ, thương hiệu ANACIS đến từ Hàn Quốc này luôn biết cách tạo nên điểm nhấn cho các sản phẩm dưỡng da của mình. Dòng sản phẩm toner cho da dầu mụn Acleon Clarifying Toning Lotion không chỉ có thiết kế sang trọng mà còn đạt đến gần 70% kiểm soát lượng dầu thừa với người da dầu mụn chỉ sau 2 tuần sử dụng.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 13,
    id: "APh00013",
    src: "./assets/images/toner-imag3.jpg",
    name: "Paula’s Choice Pore Reducing là toner cho da dầu, da mụn ",
    brand: "Paula’s Choice ",
    category: "toner",
    categoryID: "toner",
    price: 279000,
    desc: `<b>Paula’s Choice Pore Reducing </b> là nước cân bằng da chuyên biệt từ thương hiệu Paula’s Choice của Mỹ. Sản phẩm được thiết kế đặc biệt cho da dầu và hỗn hợp dầu, giúp làm sạch sâu, điều tiết dầu, se khít lỗ chân lông và làm dịu các vùng da kích ứng. Được chiết xuất từ Niacinamide, rễ ngưu bàng và hyaluronic acid, toner mang lại hiệu quả làm sáng da, dưỡng ẩm và giảm thâm sạm, mang đến làn da khỏe mạnh và mịn màng.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 14,
    id: "APh00014",
    src: "./assets/images/toner-imag4.jpg",
    name: "Bioderma Hydrabio Tonique toner cho da dầu mụn lỗ chân lông to",
    brand: "Bioderma",
    category: "toner",
    categoryID: "toner",
    price: 299000,
    desc: `<b>Bioderma Hydrabio Tonique toner </b> à sản phẩm đến từ thương hiệu dược mỹ phẩm hàng đầu Pháp – Bioderma, nổi bật với công thức giàu Glycerin và Aquagenium giúp cấp ẩm sâu và phục hồi độ ẩm tự nhiên cho da. Sản phẩm phù hợp với mọi loại da, đặc biệt là da khô và nhạy cảm, giúp làn da luôn tươi mới, mềm mại.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 15,
    id: "APh00015",
    src: "./assets/images/toner-imag5.png",
    name: "Toner La Roche Posay Không Cồn Cho Da Nhạy Cảm 200ml",
    brand: "La Roche Posay",
    category: "toner",
    categoryID: "toner",
    price: 349000,
    desc: `<b>Toner La Roche Posay Không Cồn Cho Da Nhạy Cảm 200ml </b> là sản phẩm cấp ẩm và tăng cường sức đề kháng cho da, đặc biệt phù hợp với mọi loại da, cũng như các vấn đề da thường gặp. Nước hoa hồng La Roche Posay được khuyên dùng bởi 25.000 chuyên gia da liễu trên toàn thế giới, với tác động nuôi dưỡng và chăm sóc da chuyên sâu, khoa học.Toner La Roche Posay hiện có 2 dòng sản phẩm tương thích với các đặc điểm riêng của da, không chỉ giúp da được cấp ẩm toàn diện mà còn hỗ trợ ngừa mụn, trị lỗ chân lông to hiệu quả.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 16,
    id: "APh00016",
    src: "./assets/images/tay-trang-imag1.jpg",
    name: "Nước Tẩy Trang Garnier Dành Cho Da Dầu Và Mụn 400ml",
    brand: "Garnier",
    category: "Tẩy trang",
    categoryID: "tay-trang",
    price: 299000,
    desc: `<b>Nước Tẩy Trang Garnier Dành Cho Da Dầu Và Mụn 400ml </b> là dòng sản phẩm tẩy trang nổi tiếng đến từ thương hiệu Garnier của Pháp, sử dụng công nghệ Micelles (Micellar Technology) có chứa các phân tử mi-xen hoạt động theo cơ chế nam châm giúp nhẹ nhàng làm sạch da và lấy đi bụi bẩn, cặn trang điểm và dầu thừa sâu bên trong lỗ chân lông mà không gây khô da.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 17,
    id: "APh00017",
    src: "./assets/images/tay-trang-imag2.jpg",
    name: "tẩy trang L'Oreal Micellar Water 3-in-1 cho da dầu nhạy cảm",
    brand: " L'Oreal",
    category: "Tẩy trang",
    categoryID: "tay-trang",
    price: 341000,
    desc: `<b>tẩy trang L'Oreal Micellar Water 3-in-1 cho da dầu nhạy cảm</b> là sản phẩm tẩy trang đến từ thương hiệu L'Oreal Paris, được ứng dụng công nghệ Micellar dịu nhẹ giúp làm sạch da, lấy đi bụi bẩn, dầu thừa và cặn trang điểm chỉ trong một bước, mang lại làn da thông thoáng mà không hề khô căng. Đồng thời, sản phẩm giúp làm dịu da nhờ thành phần nước khoáng từ những ngọn núi ở Pháp, mang lại làn da tươi tắn hơn sau khi tẩy trang.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 18,
    id: "APh00018",
    src: "./assets/images/tay-trang-imag3.jpg",
    name: "Bioderma Sebium H20 của Pháp (500ml)",
    brand: "Bioderma",
    category: "Tẩy trang",
    categoryID: "tay-trang",
    price: 340000,
    desc: `<b>Bioderma Sebium H20 của Pháp (500ml)</b> Slà ‘sản phẩm cây đinh’ của thương hiệu dược – mỹ phẩm Bioderma. Từ các makeup artists đến các siêu mẫu đều sử dụng. Đó là nhờ khả năng tẩy cực sạch mà hoàn toàn không gây kích ứng. Nhẹ dịu như nước, và nếu bạn vội thì không cần rửa lại với nước luôn. Tẩy trang cho vùng mặt và vùng mắt. Khả năng làm dịu kích ứng cho làn da nhạy cảm. Làm sạch da tuyệt đối và không cần rửa lại nước.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 19,
    id: "APh00019",
    src: "./assets/images/tay-trang-imag4.jpeg",
    name: "Tẩy Trang Simple Làm Sạch Bụi Bẩn Và Lớp Trang Điểm 200ml",
    brand: "Simple",
    category: "Tẩy trang",
    categoryID: "tay-trang",
    price: 310000,
    desc: `<b>Tẩy Trang Simple Làm Sạch Bụi Bẩn Và Lớp Trang Điểm 200ml </b> được mệnh danh là ""best seller"" của Simple kể từ khi ra mắt, được rất rất nhiều tín đồ làm đẹp ưa thích nhờ vào khả năng làm sạch, loại bỏ mọi bụi bẩn bã nhờn cùng lớp makeup mà không gây kích ứng da, kể cả những vùng da nhạy cảm như mắt và môi. Mang đến cho bạn làn da tươi mới, thông thoáng lỗ chân lông và tràn đầy sức sống.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 20,
    id: "APh00020",
    src: "./assets/images/tay-trang-imag5.png",
    name: "Nước tẩy trang Hada Labo Micellar Water Acne Care",
    brand: "Hada Labo",
    category: "Tẩy trang",
    categoryID: "tay-trang",
    price: 289000,
    desc: `<b>Nước tẩy trang Hada Labo Micellar Water Acne Care</b> không chỉ giúp làm sạch phấn phủ, kem nền, son môi, phấn mắt,… mà không làm mất đi lớp dầu bảo vệ tự nhiên của da mà còn giúp cân bằng độ pH, giữ da luôn trong tình trạng tốt, mịn màng, sáng khỏe. Trong bài viết hôm nay, hãy cùng FADO tìm hiểu về những sản phẩm nước tẩy trang Hada Labo được yêu thích nhất nhé!`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 21,
    id: "APh00021",
    src: "./assets/images/serum-image-1.jpg",
    name: "Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)",
    brand: "THE ORDINARY",
    category: "Serum",
    categoryID: "serum",
    price: 289000,
    desc: `<b>Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)</b> là sản phẩm giúp cấp ẩm, điều trị mụn, làm sáng da, chống lão hóa.Dưỡng ẩm: Hyaluronic Acid 2% + B5 là sản phẩm nổi bật, cung cấp độ ẩm sâu cho da, giúp da căng mọng và mịn màng.Điều trị mụn: Niacinamide 10% + Zinc 1% là lựa chọn phổ biến cho da dầu mụn, giúp kiểm soát dầu thừa, giảm viêm và thu nhỏ lỗ chân lông. Azelaic Acid Suspension 10% cũng là một lựa chọn tốt cho da mụn viêm.Làm sáng da: Vitamin C Suspension 23% + HA Spheres 2% giúp làm sáng da, mờ thâm nám, đồng thời chống oxy hóa bảo vệ da. Alpha Arbutin 2% + HA cũng có tác dụng làm sáng da hiệu quả.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 22,
    id: "APh00022",
    src: "./assets/images/serum-image-2.jpg",
    name: "Serum La Roche-Posay - Hyalu B5 Serum - 30 ml",
    brand: "La Roche-Posay",
    category: "Serum",
    categoryID: "serum",
    price: 235000,
    desc: `<b>Serum La Roche-Posay - Hyalu B5 Serum - 30 ml</b> là sản phẩm giúp Cấp ẩm sâu: Hyaluronic Acid có khả năng giữ nước gấp hàng ngàn lần trọng lượng của nó, giúp cấp ẩm sâu cho da, làm đầy các rãnh nhăn và tăng cường độ đàn hồi. Phục hồi da: Vitamin B5 (Panthenol) có tác dụng làm dịu da, thúc đẩy quá trình tái tạo tế bào da, giúp da nhanh chóng phục hồi sau các tổn thương. Làm dịu da: Sản phẩm phù hợp với mọi loại da, kể cả da nhạy cảm, giúp làm dịu da bị kích ứng và giảm đỏ. Kết cấu nhẹ nhàng: Serum có kết cấu mỏng nhẹ, thẩm thấu nhanh vào da, không gây nhờn rít. Không chứa paraben, không gây mụn: An toàn cho làn da nhạy cảm.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 23,
    id: "APh00023",
    src: "./assets/images/serum-image-3.jpg",
    name: "Serum Torriden Dive In Cấp Ẩm Phục Hồi Da",
    brand: "Torriden",
    category: "Serum",
    categoryID: "serum",
    price: 289000,
    desc: `<b>Serum Torriden Dive In Cấp Ẩm Phục Hồi Da</b> là sản phẩm tiêu biểu làm nên tên tuổi của Torriden đó chính là Serum Torriden Dive In Cấp Ẩm Phục Hồi Da với khả năng cung cấp độ ẩm và phục hồi da hiệu quả, đặc biệt phù hợp cho làn da dầu và ngăn chặn tình trạng bít tắc lỗ chân lông. Serum Torriden có thiết kế dạng ống drop giúp dễ dàng điều chỉnh lượng serum sử dụng. Tuy nhiên, nàng nên lưu ý vệ sinh chai serum thường xuyên do phần silicone màu trắng khá dễ bám bẩn. Với kết cấu hơi sệt, màu xanh dương nhạt mát mắt, serum thấm sâu vào da mà không gây cảm giác nhờn rít. Đặc biệt, sản phẩm không có mùi, không chứa các hương liệu hoá học, phù hợp với nhiều loại da kể cả da nhạy cảm.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 24,
    id: "APh00024",
    src: "./assets/images/serum-image-4.jpeg",
    name: "Serum Dưỡng Sáng Da, Mờ Thâm Mụn & Nám Loreal Paris Glycolic Melasyl 8% ",
    brand: "Loreal",
    category: "Serum",
    categoryID: "serum",
    price: 289000,
    desc: `<b>Serum Dưỡng Sáng Da, Mờ Thâm Mụn & Nám Loreal Paris Glycolic Melasyl 8% </b> là một trong những sản phẩm được nhiều người tin dùng để cải thiện tình trạng da xỉn màu, thâm mụn và nám. Với công thức độc đáo chứa phức hợp 8% [Melasyl+Glycolic+Niacinamide], sản phẩm này mang đến hiệu quả vượt trội trong việc làm sáng da, mờ thâm và đều màu da.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },

  {
    number: 25,
    id: "APh00025",
    src: "./assets/images/serum-image-5.jpg",
    name: "Serum Trị Nám Trắng Da La Roche Posay Mela B3 30ml",
    brand: "La Roche Posay",
    category: "Serum",
    categoryID: "serum",
    price: 279000,
    desc: `<b>Serum Trị Nám Trắng Da La Roche Posay Mela B3 30ml </b> là serum chống thâm nám được thiết kế để điều chỉnh và ngăn ngừa sự xuất hiện của các đốm sắc tố cũng như phục hồi vẻ rạng rỡ cho làn da. Serum Trị Nám Trắng Da La Roche Posay Mela B3 30ml được điều chế với Melasyl™ và 10% Niacinamide đã được cấp bằng sáng chế đa cấp, những thành phần được công nhận về hiệu quả trong việc điều chỉnh sản xuất melanin và cải thiện độ rạng rỡ của da. Kết quả là làn da đều màu hơn và kiểm soát được tình trạng tăng sắc tố.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 26,
    id: "APh00026",
    src: "./assets/images/kem-duong-am-image-1.png",
    name: "Kem dưỡng ẩm , dịu da kích ứng Phasilab Instant Calm Cream 40ml",
    brand: "Phasilab",
    category: "Kem dưỡng ẩm",
    categoryID: "kem-duong-am",
    price: 289000,
    desc: `<b>Kem dưỡng ẩm , dịu da kích ứng Phasilab Instant Calm Cream 40ml </b> Kem dưỡng chứa bảng thành phần chiết xuất từ các thành phần tự nhiên như hoa cam thảo,... giúp làm dịu da, cấp ẩm, phục hồi da đang bị kích ứng, giảm tình trạng da mẩn đỏ, ngứa do thời tiết hay dị ứng mỹ phẩm. Đặc biệt, kem dưỡng còn chống lại sự tác động của tác nhân kích ứng, giảm cảm giác khô căng trên da,  ổn định sự cân bằng của quần thể vi sinh vật, khôi phục và duy trì hàng rào bảo vệ da. Phasilab Instant Calm Cream không chứa paraben, không mùi, không gây mụn. Với kết cấu sản phẩm mềm mượt, mỏng nhẹ giúp các dưỡng chất dễ dàng thẩm thấu vào da nhanh chóng.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 27,
    id: "APh00027",
    src: "./assets/images/kem-duong-am-image-2.png",
    name: "Kem Dưỡng Ẩm Cho Da Khô Nhạy Cảm Atoderm Cream 200ml",
    brand: "BIODERMA",
    category: "Kem dưỡng ẩm",
    categoryID: "kem-duong-am",
    price: 229000,
    desc: `<b>Kem Dưỡng Ẩm Cho Da Khô Nhạy Cảm Atoderm Cream 200ml</b> với hiệu quả làm ẩm da tức thì và kéo dài suốt 24h, hình thành hàng rào tăng cường bảo vệ da, cho da luôn khỏe mạnh trước mọi tác động từ bên ngoài. Phức hợp SKIN PROTECT TM với Xylitylglucoside tăng cường tổng hợp hyaluronic acid và Niacinamide tăng sản xuất các chất béo, giúp tái tạo các tế bào da và duy trì lượng nước dự trữ của da, giúp da mềm dịu trở lại. Bổ sung thêm Omega 3, 6, 9 hỗ trợ giảm cảm giác khô ráp, ngứa, khó chịu. Được kiểm chứng không chứa paraben, không gây mụn và không chứa hương liệu gây hại cho da.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 28,
    id: "APh00028",
    src: "./assets/images/kem-duong-am-image-3.png",
    name: "Kem dưỡng Phục hồi & Tiêu Nhiệt Beyond Angel Aqua Cica Cream",
    brand: "BEYOND",
    category: "Kem dưỡng ẩm",
    categoryID: "kem-duong-am",
    price: 229000,
    desc: `<b>Kem dưỡng Phục hồi & Tiêu Nhiệt Beyond Angel Aqua Cica Cream</b> với công thức dưỡng ẩm chứa 3 loại nhựa cây tự nhiên (cây gai, bạch dương, nho); 2 loại axit hyaluronic (micro và macro giúp len lỏi vào các liên kết da; panthenol cung cấp độ ẩm cho làn da khô và ngăn chặn quá trình bay hơi. Chứa nguồn năng lượng dưỡng ẩm từ chiết xuất thực vật Jeonho Ulluengdo cùng phức hợp Relief Cica giúp làm dịu và phục hồi da khỏi những thương tổn mạnh mẽ. Cam kết không sử dụng nguyên liệu có nguồn gốc từ động vật và thử nghiệm sản phẩm trên động vật. Vượt qua thử nghiệm kích ứng gây ra bởi các tác nhân bên ngoài, chứng minh độ an toàn trên da. Công thức tạo ra kết cấu kem dưỡng đặc mịn, mềm mại và ẩm mượt, tan chảy cung cấp sức mạnh dưỡng ẩm vô cùng tươi mát và không gây nhờn rít.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 29,
    id: "APh00029",
    src: "./assets/images/kem-duong-am-image-4.jpg",
    name: "Kem Dưỡng Ẩm Cerave Moisturising Cream Dành Cho Da Khô 50ml",
    brand: "Cerave",
    category: "Kem dưỡng ẩm",
    categoryID: "kem-duong-am",
    price: 229000,
    desc: `<b>Kem Dưỡng Ẩm Cerave Moisturising Cream Dành Cho Da Khô 50ml</b> Với sự kết hợp hoàn hảo của 3 loại ceramides thiết yếu cùng hyaluronic acid giúp cấp ẩm cho da, duy trì độ ẩm và phục hồi lớp hàng rào bảo vệ da giúp dưỡng da ẩm mịn. Được ví như một nguồn dưỡng chất dồi dào tràn vào làn da khô tróc, không có sự đàn hồi, từ đó đem lại sức sống mới và sự tươi trẻ cho làn da. Ngăn ngừa tình trạng da khô, ngứa rát trong thời tiết khô hanh hay chuyển giao mùa, ngồi điều hoà thường xuyên. Sản phẩm có thể sử dụng nhiều lần mỗi khi da cần được cung cấp độ ẩm. `,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 30,
    id: "APh00030",
    src: "./assets/images/kem-duong-am-image-5.jpg",
    name: "Kem dưỡng ẩm da thường Christina Elastin Collagen Azulene Moisture Cream",
    brand: "Christina",
    category: "Kem dưỡng ẩm",
    categoryID: "kem-duong-am",
    price: 229000,
    desc: `<b>Kem dưỡng ẩm da thường Christina Elastin Collagen Azulene Moisture Cream</b> là một sản phẩm dưỡng da cao cấp, được nhiều chuyên gia và người dùng đánh giá cao. Với công thức độc đáo, giàu dưỡng chất, sản phẩm này mang đến hiệu quả vượt trội trong việc cấp ẩm, nuôi dưỡng và bảo vệ làn da. Kem dưỡng ẩm cho da thường Christina Elastin Collagen Azulene Moisture Cream giàu dưỡng chất lý tưởng cho da thường với công thức dưỡng ẩm đặc biệt bổ sung hoạt động của 8 nhân tố dưỡng ẩm tự nhiên hợp tác tổng hợp, giúp dưỡng ẩm lâu dài.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 31,
    id: "APh00031",
    src: "./assets/images/son-image-1.jpg",
    name: "KSon Gel TechnoSatin",
    brand: " SHISEIDO",
    category: "Son",
    categoryID: "son",
    price: 239000,
    desc: `<b>Son Gel TechnoSatin</b> Là sự kết hợp hoàn hảo giữa nghệ thuật và khoa học, nổi bật với công thức cực kỳ thoải mái bao phủ làn môi bằng chất son với độ hoàn thiện satin ẩm mịn và sắc màu rực rỡ trong nhiều giờ liền. Công nghệ Stretch-Flex đột phá nhằm tạo ra một lớp màu linh hoạ, ôm trọn bờ môi như làn da thứ hai với sắc màu bền lâu và cảm giác thoải mái tối đa cả ngày dài. Chứa hơn 68% thành phần dưỡng da, trong đó có tinh dầu benibana, giúp dưỡng môi và mang lại cảm giác ẩm mịn và bóng mượt như satin.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 32,
    id: "APh00032",
    src: "./assets/images/son-image-2.jpg",
    name: "Son kem Black Rouge Airfit Velvet Tint Ver 6 BLUEMING GARDEN – A31 Đỏ nâu trầm",
    brand: " Black Rouge",
    category: "Son",
    categoryID: "son",
    price: 269000,
    desc: `<b>Son kem Black Rouge Airfit Velvet Tint Ver 6 BLUEMING GARDEN – A31 Đỏ nâu trầm</b> là thỏi son sang chảnh, cá tính được nhiều chị em phụ nữ đặc biệt yêu thích. Son có thiết kế nhỏ gọn vừa tay, vuông góc cạnh đơn giản, có thể đứng dễ dàng, thuận tiện mang theo người khi đi ra ngoài. Chất son Black Rouge Velvet Tint Ver6 A31 mềm môi, khi đánh lên tạo độ mướt cao, độ bám dính tiêu chuẩn, có khả năng hạn chế tối đa tình trạng trôi son khi tiếp xúc với nước hoặc ăn uống. Son có màu đỏ trầm sang trọng, quý phái, tạo độ sáng cho da, đặc biệt cuốn hút với người có tông da lạnh.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 33,
    id: "APh00033",
    src: "./assets/images/son-image-3.png",
    name: "Son lì Naris Ailus Be Brave mịn môi, màu cam rạng rỡ",
    brand: "AILUS",
    category: "Son",
    categoryID: "son",
    price: 269000,
    desc: `<b>Son lì Naris Ailus Be Brave mịn môi, màu cam rạng rỡ</b> sẽ mang đến cho bạn nữ vẻ ngoài rạng rỡ mà không cần phải trang điểm quá cầu kỳ. Son lì Naris Ailus Stress Free Lipstick đến từ Nhật Bản không chỉ sở hữu sắc đỏ cam trendy, dễ dùng mà còn chứa các thành phần chiết xuất từ thiên nhiên như chiết xuất mật ong, Hyaluronic Acid, dầu Jojoba và tinh chất trà xanh Nhật Bản, giúp dưỡng môi mềm mịn, cung cấp độ ẩm cho đôi môi luôn căng mọng, tràn đầy sức sống, đồng thời nuôi dưỡng, bảo vệ môi khỏi các tác nhân gây hại từ môi trường như tia UV, ánh sáng xanh, ngăn ngừa tình trạng môi sạm màu theo thời gian.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 34,
    id: "APh00034",
    src: "./assets/images/son-image-4.jpg",
    name: "Son Kem Lì Hàn Quốc Thuần Chay, Mịn Mượt Lâu Trôi FOIF Daily Velvet Tint",
    brand: "FOIF",
    category: "Son",
    categoryID: "son",
    price: 279000,
    desc: `<b>Son Kem Lì Hàn Quốc Thuần Chay, Mịn Mượt Lâu Trôi FOIF Daily Velvet Tint</b> là son kem lì thuộc dòng Velvet Tint của thương hiệu FOIF - tân binh khủng long của nhà Merzy. Sản phẩm nổi bật với chất son mịn môi, lên màu chuẩn cùng bảng màu đa dạng thời thượng, giúp đôi môi bạn luôn xinh đẹp suốt cả ngày, hứa hẹn sẽ khuấy đảo giới trẻ làm đẹp. Chất son mềm, mịn: Chất son đẹp tuyệt vời với kết cấu son velvet mịn tự như nhung nhưng khi set trên môi vẫn có độ ẩm mịn nhẹ, phủ đầy rãnh môi, là dạng velvet tint nên son bám màu hiệu quả, để lại lớp base tint khá rõ trên môi. Khả năng lên màu chuẩn: Son lên màu chuẩn chỉ sau 1 lần lướt nhẹ trên môi và bền màu. Độ bám màu cao: Son có độ bám màu hoàn hảo, giữ màu lâu trong thời gian dài mà không gây nặng môi, hay khô môi. Thuần chay và an toàn: Sản phẩm thuần chay, an toàn khi sử dụng`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 35,
    id: "APh00035",
    src: "./assets/images/son-image-5.jpg",
    name: "Son Tint Clio Crystal Glam Tint -11 Mellow Fig",
    brand: "CLIO",
    category: "Son",
    categoryID: "son",
    price: 289000,
    desc: `<b>Son Tint Clio Crystal Glam Tint -11 Mellow Fig</b> là sự lựa chọn hoàn hảo cho những ai mong muốn đôi môi căng mọng, bóng mượt và rạng rỡ. Sản phẩm mang lại hiệu ứng môi căng bóng, giúp đôi môi trông đầy sức sống và quyến rũ. Với kết cấu son nhẹ, mềm mịn, Clio Crystal Glam Tint không gây nặng môi hay bết dính, tạo cảm giác thoải mái suốt cả ngày. Lên màu chuẩn xác: Sản phẩm có nhiều tone màu đa dạng, từ tone nude nhẹ nhàng đến tone đỏ rực rỡ, đáp ứng mọi sở thích và phong cách trang điểm. Chống nắng SPF 15: Với chỉ số chống nắng SPF 15, Son tint Clio Crystal Glam Tint giúp bảo vệ đôi môi khỏi tác hại của tia UV, giữ cho môi luôn khỏe mạnh.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 36,
    id: "APh00036",
    src: "./assets/images/phan-image-1.jpg",
    name: "Phấn phủ Geo trắng Sempre Happy & Please Pact",
    brand: "Sempre",
    category: "Phấn",
    categoryID: "phan",
    price: 309000,
    desc: `<b>Phấn phủ Geo trắng Sempre Happy & Please Pact</b> Nhờ cấu tạo từ những hạt phấn rỗng dưới dạng nén nên với tác dụng 2 trong 1 là hút dầu thừa trên da, độ bám tốt…nên tạo được bề mặt phấn lớp trang điểm mỏng mịn, vô cùng hoàn hảo, làn da của bạn được đảm bảo khô thoáng trong suốt ngày dài mà không lo bị đổ dầu hay hiện tượng bóng nhờn trên da. Với chỉ số chống nắng SPF 20 làn da bạn được bảo vệ dưới tác động của ánh sáng mặt trời và những tác động từ môi trường xung quanh. Hướng dẫn sử dụng: phấn phủ Geo Sempre Happy  & Please Pact được sử dụng cuối cùng trong bước trang điểm nền, sau khi đã thực hiện bước dùng kem lót, kem nền bạn chỉ cần lấy cọ rồi phủ phấn lên bề mặt da là có lớp nền hoàn chỉnh và rạng rỡ.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 37,
    id: "APh00037",
    src: "./assets/images/phan-image-2.jpg",
    name: "Bảng phấn mắt Makeup Revolution - Reloaded Velvet Rose - 15x 0.04oz.(us)/1.1g",
    brand: "Revolution",
    category: "Phấn",
    categoryID: "phan",
    price: 339000,
    desc: `<b>Bảng phấn mắt Makeup Revolution - Reloaded Velvet Rose - 15x 0.04oz.(us)/1.1g</b> là bảng phấn mắt mới nhất gia nhập đại gia đình Re-Load, 1 trong những bảng phấn màu bán chạy nhất. Bảng phấn mắt gồm 15 màu mắt mượt và đậm sắc quyến rũ , bao gồm màu chủ đạo be và nâu, vàng ánh, các màu đỏ thẫm và màu đen đậm sắc với kim tuyến ánh đồng. Hãy nâng cao trình makeup của bạn với bảng màu đậm sắc nhưng vẫn rất dễ lan màu.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 38,
    id: "APh00038",
    src: "./assets/images/phan-image-3.jpg",
    name: "Phấn tươi essence soft touch mousse 16g – Đức",
    brand: "Mousse",
    category: "Phấn",
    categoryID: "phan",
    price: 378000,
    desc: `<b>Phấn tươi essence soft touch mousse 16g – Đức </b>  là một dạng của phấn kem nhưng được cô đặc lại, chính vì vậy nó chứa đựng đầy đủ mọi tính năng và ưu điểm của phấn kem: tạo lớp nền mỏng mịn, trong suốt siêu khô thoáng. Phấn nền dạng mousse che được những khuyết điểm như mụn và vết thâm cho bạn một lớp nền hoàn hảo tự nhiên trong suốt mà không cần đánh thêm phấn bột. Đặc biệt cực kì kiềm dầu giữ cho lớp nền lâu trôi trong suốt thời gian dài phù hợp cho mọi loại da đặc biệt là da dầu.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 39,
    id: "APh00039",
    src: "./assets/images/phan-image-4.jpg",
    name: "Phấn phủ trắng da White Extreme",
    brand: "Ohui",
    category: "Phấn",
    categoryID: "phan",
    price: 389000,
    desc: `<b>Phấn phủ trắng da White Extreme </b>  có đặc điểm có thể thay thế được lõi sản phẩm (lõi sơ cua) luôn có chữ Make up đi kèm với chữ Powder/liquid, có độ che phủ tốt, có thể che được khuyết điểm trên da. Màu sắc rõ nét và được chia theo từng nhóm sắc tố da mà mọi người hay phân biệt là tông ánh hồng hay tông ánh vàng, chỉ cần dùng 1 lần cho mỗi lần trang điểm và không cần dặm lại nhiều lần. Đối với phấn nên dạng bột, các hạt phấn thường to hơn, màu sắc rõ nét. Phấn phủ dạng nén không thay được lõi, không có chữ Make up, có màu sắc nhạt, trong, độ che phủ vừa phải và có thể dặm nhiều lần mà không sợ lớp trang điểm bị dầy. Đối với phấn đang bột, các hạt phấn thường mịn, màu sắc nhẹ nhàng và có thể có nhũ để tăng khả năng bắt sáng.`,
    quantity: 6,
    discountQuantity: 5,
    discountPercent: 10,
    originQuantity: 10
  },
  {
    number: 40,
    id: "APh00040",
    src: "./assets/images/phan-image-5.jpg",
    name: "Phấn phủ siêu mịn, kiềm dầu Fresh White Sand by TENAMYD Pure White Powder SPF 15",
    brand: "TENAMYD",
    category: "Phấn",
    categoryID: "phan",
    price: 389000,
    desc: `<b>Phấn phủ siêu mịn, kiềm dầu Fresh White Sand by TENAMYD Pure White Powder SPF 15 </b> Là một loại phấn phủ trang điểm siêu mịn. Phấn tinh chế với hạt phấn trắng siêu mịn giúp làm sáng da, che phủ tuyệt hảo trên da mặt với độ bền cao, không gây bóng nhờn cho da và bảo vệ da khi ra nắng.0`,
    quantity: 6,
    discountQuantity: 5,  
    discountPercent: 10,
    originQuantity: 10
  }
];

// Mảng chứa các sản phẩm (khi thêm vào giỏ hàng)
export let productItemAddedToShoppingCart = [
  {
    id: "APh00002",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    category: "Sửa rửa mặt",
    price: 200000,
    quantity: 1,
    discountQuantity: 5
  },
  {
    id: "APh00003",
    src: "./assets/images/facewash-image-2.jpg",
    name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
    category: "Sửa rửa mặt",
    price: 150000,
    quantity: 3,
  },
  {
    id: "APh00004",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    category: "Sửa rửa mặt",
    price: 222000,
    quantity: 1,
  },
];

export function abc() {
  console.log(productItemAddedToShoppingCart);
}


//dữ liệu mảng user mặc định -- Hiệu
export let userList = [
  {
    type: "employer",
    blockStatus: false,
    id: 1,
    username: "user1",
    password: "password1",
    email: "user1@example.com",
    remember_password: false,
    first_name: "Nguyễn",
    last_name: "Thanh Hiệu",
    phone: null,
    address: null,
    shoppingCart: [
      {
        id: "APh00002",
        src: "./assets/images/facewash-image-1.jpg",
        name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
        category: "Sửa rửa mặt",
        price: 200000,
        quantity: 1,
      },
      {
        id: "APh00003",
        src: "./assets/images/facewash-image-2.jpg",
        name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
        category: "Sửa rửa mặt",
        price: 150000,
        quantity: 3,
      },
      {
        id: "APh00004",
        src: "./assets/images/facewash-image-1.jpg",
        name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
        category: "Sửa rửa mặt",
        price: 222000,
        quantity: 1,
      },
    ],
  },
  {
    "type": "customer",
    "blockStatus": false,
    "id": 2,
    "username": "user2",
    "password": "password2",
    "email": "user2@example.com",
    "remember_password": false,
    "first_name": "Andrew",
    "last_name": "Huy",
    "phone": "1234567891",
    "address": "TPHCM",
    "shoppingCart": []
  },
  {
    type: "admin",
    blockStatus: false,
    id: 3,
    username: "user3",
    password: "password3",
    email: "user3@example.com",
    remember_password: false,
    first_name: null,
    last_name: null,
    phone: null,
    address: null,
    shoppingCart: [
      {
        id: "APh00001",
        src: "./assets/images/facewash-image-1.jpg",
        name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
        category: "Sửa rửa mặt",
        price: 200000,
        quantity: 5,
      },
    ],
  },
  {
    "type": "customer",
    "bloclStatus": false,
    "id": 4,
    "username": "NoPaintNoGain",
    "password": "123",
    "email": "No@gmail.com",
    "first_name": "No",
    "last_name": "game",
    "phone": "1234567892",
    "shoppingCart": [],
    "address": "from HCM with love"
  },
  {
    "type": "customer",
    "bloclStatus": false,
    "id": 5,
    "username": "nguoithanhcong",
    "password": "123",
    "email": "a@gmail.com",
    "first_name": "thanh",
    "last_name": "cong",
    "phone": "1234567888",
    "shoppingCart": [],
    "address": "from anywhere"
  }
];

// Đối tượng chứa thông tin cơ bản của người dùng
export let basicInformationFromUser = {
  fullname: "Trần Thanh Quy",
  email: "email@gmail.com",
  phone: "0123456789",
  address: "...",
};

const orderList = [
  {
    "isDelete": false,
    "customerId": 2,
    "orderId": 1,
    "orderDate": "23:4:17 30/11/2024",
    "orderAddressToShip": "TPHCM",
    "orderStatus": "pending",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 1068000,
    "orderProduct": [
      {
          "id": "APh00002",
          "src": "./assets/images/facewash-image-2.jpg",
          "name": "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
          "price": 150000,
          "quantity": "3",
          "category": "Sửa rửa mặt"
      },
      {
          "id": "APh00001",
          "src": "./assets/images/facewash-image-1.jpg",
          "name": "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
          "price": 200000,
          "quantity": 1,
          "category": "Sửa rửa mặt"
      },
      {
          "id": "APh00003",
          "src": "./assets/images/acnecream-image-1.jpg",
          "name": "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
          "price": 400000,
          "quantity": 1,
          "category": "Kem trị mụn"
      }
    ]
  },
  {
    "isDelete": false,
    "customerId": 2,
    "orderId": 2,
    "orderDate": "23:4:41 30/11/2024",
    "orderAddressToShip": "TPHCM",
    "orderStatus": "pending",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 1568000,
    "orderProduct": [
        {
            "id": "APh00036",
            "src": "./assets/images/phan-image-1.jpg",
            "name": "Phấn phủ Geo trắng Sempre Happy & Please Pact",
            "price": 309000,
            "quantity": 1,
            "category": "Phấn"
        },
        {
            "id": "APh00037",
            "src": "./assets/images/phan-image-2.jpg",
            "name": "Bảng phấn mắt Makeup Revolution - Reloaded Velvet Rose - 15x 0.04oz.(us)/1.1g",
            "price": 339000,
            "quantity": 1,
            "category": "Phấn"
        },
        {
            "id": "APh00038",
            "src": "./assets/images/phan-image-3.jpg",
            "name": "Phấn tươi essence soft touch mousse 16g – Đức",
            "price": 378000,
            "quantity": 1,
            "category": "Phấn"
        },
        {
            "id": "APh00021",
            "src": "./assets/images/serum-image-1.jpg",
            "name": "Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)",
            "price": 289000,
            "quantity": 1,
            "category": "Serum"
        },
        {
            "id": "APh00022",
            "src": "./assets/images/serum-image-2.jpg",
            "name": "Serum La Roche-Posay - Hyalu B5 Serum - 30 ml",
            "price": 235000,
            "quantity": 1,
            "category": "Serum"
        }
    ]
  },
  {
      "isDelete": false,
      "customerId": 2,
      "orderId": 3,
      "orderDate": "23:5:56 30/11/2024",
      "orderAddressToShip": "TPHCM",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 5042000,
      "orderProduct": [
          {
              "id": "APh00001",
              "src": "./assets/images/facewash-image-1.jpg",
              "name": "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
              "price": 200000,
              "quantity": 1,
              "category": "Sửa rửa mặt"
          },
          {
              "id": "APh00011",
              "src": "./assets/images/toner-imag1.jpg",
              "name": "Klairs Supple Preparation Unscented",
              "price": 352000,
              "quantity": 3,
              "category": "toner"
          },
          {
              "id": "APh00017",
              "src": "./assets/images/tay-trang-imag2.jpg",
              "name": "tẩy trang L'Oreal Micellar Water 3-in-1 cho da dầu nhạy cảm",
              "price": 341000,
              "quantity": 5,
              "category": "Tẩy trang"
          },
          {
              "id": "APh00021",
              "src": "./assets/images/serum-image-1.jpg",
              "name": "Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)",
              "price": 289000,
              "quantity": 3,
              "category": "Serum"
          },
          {
              "id": "APh00012",
              "src": "./assets/images/toner-imag2.png",
              "name": "Acleon Clarifying Toning Lotion cấp ẩm cho da dầu ",
              "price": 299000,
              "quantity": 4,
              "category": "toner"
          }
      ]
  },
  {
      "isDelete": false,
      "customerId": 2,
      "orderId": 4,
      "orderDate": "23:6:50 30/11/2024",
      "orderAddressToShip": "TPHCM",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 1891000,
      "orderProduct": [
          {
              "id": "APh00031",
              "src": "./assets/images/son-image-1.jpg",
              "name": "KSon Gel TechnoSatin",
              "price": 239000,
              "quantity": 1,
              "category": "Son"
          },
          {
              "id": "APh00035",
              "src": "./assets/images/son-image-5.jpg",
              "name": "Son Tint Clio Crystal Glam Tint -11 Mellow Fig",
              "price": 289000,
              "quantity": 1,
              "category": "Son"
          },
          {
              "id": "APh00033",
              "src": "./assets/images/son-image-3.png",
              "name": "Son lì Naris Ailus Be Brave mịn môi, màu cam rạng rỡ",
              "price": 269000,
              "quantity": "5",
              "category": "Son"
          }
      ]
  },
  {
      "isDelete": false,
      "customerId": 4,
      "orderId": 5,
      "orderDate": "23:10:23 30/11/2024",
      "orderAddressToShip": "from HCM with love",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 1692000,
      "orderProduct": [
          {
              "id": "APh00025",
              "src": "./assets/images/serum-image-5.jpg",
              "name": "Serum Trị Nám Trắng Da La Roche Posay Mela B3 30ml",
              "price": 279000,
              "quantity": 6,
              "category": "Serum"
          }
      ]
  },
  {
      "isDelete": false,
      "customerId": 4,
      "orderId": 6,
      "orderDate": "23:10:36 30/11/2024",
      "orderAddressToShip": "from HCM with love",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 1557000,
      "orderProduct": [
          {
              "id": "APh00021",
              "src": "./assets/images/serum-image-1.jpg",
              "name": "Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)",
              "price": 289000,
              "quantity": 1,
              "category": "Serum"
          },
          {
              "id": "APh00022",
              "src": "./assets/images/serum-image-2.jpg",
              "name": "Serum La Roche-Posay - Hyalu B5 Serum - 30 ml",
              "price": 235000,
              "quantity": "4",
              "category": "Serum"
          },
          {
              "id": "APh00019",
              "src": "./assets/images/tay-trang-imag4.jpeg",
              "name": "Tẩy Trang Simple Làm Sạch Bụi Bẩn Và Lớp Trang Điểm 200ml",
              "price": 310000,
              "quantity": 1,
              "category": "Tẩy trang"
          }
      ]
  },
  {
      "isDelete": false,
      "customerId": 4,
      "orderId": 7,
      "orderDate": "23:11:0 30/11/2024",
      "orderAddressToShip": "from HCM with love",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 327000,
      "orderProduct": [
          {
              "id": "APh00036",
              "src": "./assets/images/phan-image-1.jpg",
              "name": "Phấn phủ Geo trắng Sempre Happy & Please Pact",
              "price": 309000,
              "quantity": 1,
              "category": "Phấn"
          }
      ]
  },
  {
      "isDelete": false,
      "customerId": 4,
      "orderId": 8,
      "orderDate": "23:11:12 30/11/2024",
      "orderAddressToShip": "from HCM with love",
      "orderStatus": "pending",
      "orderMethod": "Thanh toán khi giao hàng (COD)",
      "orderTotalPrice": 293000,
      "orderProduct": [
          {
              "id": "APh00008",
              "src": "./assets/images/face-washimage-5.jpg",
              "name": "Sữa Rửa Mặt Simple Detox Purifying Face Wash 150ml",
              "price": 275000,
              "quantity": 1,
              "category": "Sửa rửa mặt"
          }
      ]
  },
  {
    "isDelete": false,
    "customerId": 5,
    "orderId": 9,
    "orderDate": "0:22:31 1/12/2024",
    "orderAddressToShip": "from anywhere",
    "orderStatus": "pending",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 1266000,
    "orderProduct": [
        {
            "id": "APh00010",
            "src": "./assets/images/acnecream-image-5.png",
            "name": "Kem giảm mụn ngừa thâm sẹo Sakura Acne Clearing Cream",
            "price": 212000,
            "quantity": 2,
            "category": "Kem trị mụn"
        },
        {
            "id": "APh00003",
            "src": "./assets/images/acnecream-image-1.jpg",
            "name": "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
            "price": 400000,
            "quantity": 1,
            "category": "Kem trị mụn"
        },
        {
            "id": "APh00005",
            "src": "./assets/images/acnecream-image-3.jpg",
            "name": "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
            "price": 212000,
            "quantity": 1,
            "category": "Kem trị mụn"
        },
        {
            "id": "APh00009",
            "src": "./assets/images/acnecream-image-4.jpg",
            "name": "Gel giảm mụn và thâm Gamma SANTAGIFT (20g)",
            "price": 212000,
            "quantity": 1,
            "category": "Kem trị mụn"
        }
    ]
  },
  {
    "isDelete": false,
    "customerId": 5,
    "orderId": 10,
    "orderDate": "0:22:40 1/12/2024",
    "orderAddressToShip": "from anywhere",
    "orderStatus": "pending",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 765000,
    "orderProduct": [
        {
            "id": "APh00026",
            "src": "./assets/images/kem-duong-am-image-1.png",
            "name": "Kem dưỡng ẩm , dịu da kích ứng Phasilab Instant Calm Cream 40ml",
            "price": 289000,
            "quantity": 1,
            "category": "Kem dưỡng ẩm"
        },
        {
            "id": "APh00027",
            "src": "./assets/images/kem-duong-am-image-2.png",
            "name": "Kem Dưỡng Ẩm Cho Da Khô Nhạy Cảm Atoderm Cream 200ml",
            "price": 229000,
            "quantity": 1,
            "category": "Kem dưỡng ẩm"
        },
        {
            "id": "APh00028",
            "src": "./assets/images/kem-duong-am-image-3.png",
            "name": "Kem dưỡng Phục hồi & Tiêu Nhiệt Beyond Angel Aqua Cica Cream",
            "price": 229000,
            "quantity": 1,
            "category": "Kem dưỡng ẩm"
        }
    ]
  },
  {
    "isDelete": false,
    "customerId": 5,
    "orderId": 11,
    "orderDate": "0:22:49 1/12/2024",
    "orderAddressToShip": "from anywhere",
    "orderStatus": "pending",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 795000,
    "orderProduct": [
        {
            "id": "APh00031",
            "src": "./assets/images/son-image-1.jpg",
            "name": "KSon Gel TechnoSatin",
            "price": 239000,
            "quantity": 1,
            "category": "Son"
        },
        {
            "id": "APh00032",
            "src": "./assets/images/son-image-2.jpg",
            "name": "Son kem Black Rouge Airfit Velvet Tint Ver 6 BLUEMING GARDEN – A31 Đỏ nâu trầm",
            "price": 269000,
            "quantity": 1,
            "category": "Son"
        },
        {
            "id": "APh00033",
            "src": "./assets/images/son-image-3.png",
            "name": "Son lì Naris Ailus Be Brave mịn môi, màu cam rạng rỡ",
            "price": 269000,
            "quantity": 100,
            "category": "Son"
        }
    ]
  },
  {
    "isDelete": false,
    "customerId": 5,
    "orderId": 12,
    "orderDate": "0:23:16 1/12/2024",
    "orderAddressToShip": "from anywhere",
    "orderStatus": "shipped",
    "orderMethod": "Thanh toán khi giao hàng (COD)",
    "orderTotalPrice": 4548000,
    "orderProduct": [
        {
            "id": "APh00036",
            "src": "./assets/images/phan-image-1.jpg",
            "name": "Phấn phủ Geo trắng Sempre Happy & Please Pact",
            "price": 309000,
            "quantity": 11,
            "category": "Phấn"
        },
        {
            "id": "APh00037",
            "src": "./assets/images/phan-image-2.jpg",
            "name": "Bảng phấn mắt Makeup Revolution - Reloaded Velvet Rose - 15x 0.04oz.(us)/1.1g",
            "price": 339000,
            "quantity": 12,
            "category": "Phấn"
        },
        {
            "id": "APh00038",
            "src": "./assets/images/phan-image-3.jpg",
            "name": "Phấn tươi essence soft touch mousse 16g – Đức",
            "price": 378000,
            "quantity": 199,
            "category": "Phấn"
        },
        {
            "id": "APh00039",
            "src": "./assets/images/phan-image-4.jpg",
            "name": "Phấn phủ trắng da White Extreme",
            "price": 389000,
            "quantity": 19,
            "category": "Phấn"
        },
        {
            "id": "APh00040",
            "src": "./assets/images/phan-image-5.jpg",
            "name": "Phấn phủ siêu mịn, kiềm dầu Fresh White Sand by TENAMYD Pure White Powder SPF 15",
            "price": 389000,
            "quantity": 1,
            "category": "Phấn"
        },
        {
            "id": "APh00031",
            "src": "./assets/images/son-image-1.jpg",
            "name": "KSon Gel TechnoSatin",
            "price": 239000,
            "quantity": 29,
            "category": "Son"
        },
        {
            "id": "APh00032",
            "src": "./assets/images/son-image-2.jpg",
            "name": "Son kem Black Rouge Airfit Velvet Tint Ver 6 BLUEMING GARDEN – A31 Đỏ nâu trầm",
            "price": 269000,
            "quantity": 15,
            "category": "Son"
        },
        {
            "id": "APh00033",
            "src": "./assets/images/son-image-3.png",
            "name": "Son lì Naris Ailus Be Brave mịn môi, màu cam rạng rỡ",
            "price": 269000,
            "quantity": 11,
            "category": "Son"
        },
        {
            "id": "APh00035",
            "src": "./assets/images/son-image-5.jpg",
            "name": "Son Tint Clio Crystal Glam Tint -11 Mellow Fig",
            "price": 289000,
            "quantity": 1,
            "category": "Son"
        },
        {
            "id": "APh00034",
            "src": "./assets/images/son-image-4.jpg",
            "name": "Son Kem Lì Hàn Quốc Thuần Chay, Mịn Mượt Lâu Trôi FOIF Daily Velvet Tint",
            "price": 279000,
            "quantity": 12,
            "category": "Son"
        },
        {
            "id": "APh00021",
            "src": "./assets/images/serum-image-1.jpg",
            "name": "Serum Ngừa Mụn, Giảm Thâm The Ordinary Niacinamide 10% + Zinc 1% (30ml)",
            "price": 289000,
            "quantity": 19,
            "category": "Serum"
        },
        {
            "id": "APh00022",
            "src": "./assets/images/serum-image-2.jpg",
            "name": "Serum La Roche-Posay - Hyalu B5 Serum - 30 ml",
            "price": 235000,
            "quantity": 11,
            "category": "Serum"
        },
        {
            "id": "APh00023",
            "src": "./assets/images/serum-image-3.jpg",
            "name": "Serum Torriden Dive In Cấp Ẩm Phục Hồi Da",
            "price": 289000,
            "quantity": 1,
            "category": "Serum"
        },
        {
            "id": "APh00024",
            "src": "./assets/images/serum-image-4.jpeg",
            "name": "Serum Dưỡng Sáng Da, Mờ Thâm Mụn & Nám Loreal Paris Glycolic Melasyl 8% ",
            "price": 289000,
            "quantity": 1,
            "category": "Serum"
        },
        {
            "id": "APh00025",
            "src": "./assets/images/serum-image-5.jpg",
            "name": "Serum Trị Nám Trắng Da La Roche Posay Mela B3 30ml",
            "price": 279000,
            "quantity": 12,
            "category": "Serum"
        }
    ]
  }
];


window.addEventListener("load", () => {
  let tmpList = JSON.parse(localStorage.getItem("orderList"));
  if(tmpList === null || tmpList === undefined){
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }

  tmpList = JSON.parse(localStorage.getItem("userList"));
  if(tmpList === null || tmpList === undefined){
    localStorage.setItem("userList", JSON.stringify(userList));
  }

  tmpList = JSON.parse(localStorage.getItem("productList"));
  if(tmpList === null || tmpList === undefined){
    localStorage.setItem("productList", JSON.stringify(productItemArray));
  }
});
