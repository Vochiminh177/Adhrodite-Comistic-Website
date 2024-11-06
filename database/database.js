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
    quantity: 2
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
    quantity: 3
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
    quantity: 2
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
    quantity: 1
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
    quantity: 6
    },
  ];
  
  // Mảng chứa các sản phẩm (khi thêm vào giỏ hàng)
export let productItemAddedToShoppingCart = [
    {
      id: "APhxxxx",
      src: "./assets/images/facewash-image-1.jpg",
      name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
      category: "Sửa rửa mặt",
      price: 200000,
      quantity: 1,
    },
    {
      id: "APhxxxx",
      src: "./assets/images/facewash-image-2.jpg",
      name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
      category: "Sửa rửa mặt",
      price: 150000,
      quantity: 3,
    },
    {
      id: "APhxxxx",
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
export let usersList = [
  {
    status_login: false,
    id: 1,
    username: "user1",
    password: "password1",
    email: "user1@example.com",
    remember_password: false,
    first_name: "Nguyễn",
    last_name: "Thanh Hiệu",
    phone: "null",
    address: "null",
    stk: "null",  
    bank: "null",
    src: null
  },
  {
    status_login: false,
    id: 2,
    username: "user2",
    password: "password2",
    email: "user2@example.com",
    remember_password: false,
    first_name: "null",
    last_name: "null",
    phone: "null",
    address: "null",
    stk: "null",
    bank: "null",
    src: null
  },
  {
    status_login: false,
    id: 3,
    username: "user3",
    password: "password3",
    email: "user3@example.com",
    remember_password: false,
    first_name: "null",
    last_name: "null",
    phone: "null",
    address: "null",
    stk: "null",
    bank: "null",
    src: null
  }
];

// Đối tượng chứa thông tin cơ bản của người dùng
export let basicInformationFromUser = {
    fullname: "Trần Thanh Quy",
    email: "email@gmail.com",
    phone: "0123456789",
    address: "...",
};