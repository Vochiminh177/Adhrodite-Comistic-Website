// Mảng chứa thông tin của tỉnh thành, quận huyện, phường xã để nhập địa chỉ cho người dùng
export const locationToSelectArray = [
  {
    name: "Chọn Tỉnh thành",
    id: "default-city",
    districts: [
      {
        name: "Chọn Quận / Huyện",
        id: "default-district",
        wards: [
          {
            name: "Chọn Phường / Xã",
            id: "default-ward",
          },
        ],
      },
    ],
  },
  {
    name: "Hà Nội",
    id: "hanoi",
    districts: [
      {
        name: "Chọn Quận / Huyện",
        id: "default-district",
        wards: [
          {
            name: "Chọn Phường / Xã",
            id: "default-ward",
          },
        ],
      },
    ],
  },
  {
    name: "TP Hồ Chí Minh",
    id: "tphcm",
    districts: [
      {
        name: "Chọn Quận / Huyện",
        id: "default-district",
        wards: [
          {
            name: "Chọn Phường / Xã",
            id: "default-ward",
          },
        ],
      },
      {
        name: "Quận 3",
        id: "quan3",
        wards: [
          {
            name: "Chọn Phường / Xã",
            id: "default-ward",
          },
          {
            name: "Phường 11",
            id: "phuong11",
          },
          {
            name: "Phường 13",
            id: "phuong13",
          },
        ],
      },
      {
        name: "Quận 10",
        id: "quan10",
        wards: [
          {
            name: "Chọn Phường / Xã",
            id: "default-ward",
          },
          {
            name: "Phường 2",
            id: "phuong2",
          },
          {
            name: "Phường 13",
            id: "phuong13",
          },
        ],
      },
    ],
  },
];

// Mảng chứa các Danh mục phổ biến sẽ được hiển thị ở Trang chủ
export let popularMenuArray = [
  {
    src: "./assets/images/popular-menu_image-1.jpg",
    label: `SỮA&nbsp;RỬA&nbsp;MẶT`,
    categoryID: "sua-rua-mat",
  },
  {
    src: "./assets/images/popular-menu_image-2.jpg",
    label: `TONER`,
    categoryID: "toner",
  },
  {
    src: "./assets/images/popular-menu_image-3.jpg",
    label: `SERUM`,
    categoryID: "serum",
  },
  {
    src: "./assets/images/popular-menu_image-4.jpg",
    label: `KEM&nbsp;DƯỠNG&nbsp;ẨM`,
    categoryID: "kem-duong-am",
  },
  {
    src: "./assets/images/popular-menu_image-5.jpg",
    label: `SON`,
    categoryID: "son",
  },
  {
    src: "./assets/images/popular-menu_image-6.jpg",
    label: `PHẤN`,
    categoryID: "phan",
  },
];

// Mảng chứa các sản phẩm phổ biến sẽ được hiển thị ở Trang chủ
export let popularProductArray = [
  {
    id: "APh00001",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    brand: "CeraVe",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 200000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "chai",
  },
  {
    id: "APh00002",
    src: "./assets/images/facewash-image-2.jpg",
    name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
    brand: "Simple",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 150000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "chai",
  },
  {
    id: "APh00003",
    src: "./assets/images/acnecream-image-1.jpg",
    name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
    brand: "La Roche-Posay",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 400000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "tuýp",
  },
  {
    id: "APh00004",
    src: "./assets/images/acnecream-image-2.jpg",
    name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
    brand: "Gamma Chemicals",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 235000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "tuýp",
  },
  {
    id: "APh00005",
    src: "./assets/images/acnecream-image-3.jpg",
    name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
    brand: "CeraVe",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 212000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "tuýp",
  },

  {
    id: "APh00001",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    brand: "CeraVe",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 200000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "chai",
  },
  {
    id: "APh00002",
    src: "./assets/images/facewash-image-2.jpg",
    name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
    brand: "Simple",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 150000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "chai",
  },
  {
    id: "APh00003",
    src: "./assets/images/acnecream-image-1.jpg",
    name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
    brand: "La Roche-Posay",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 400000,
    starNum: 5,
    review_Count: 1000,
    Bottle: "tuýp",
  },
];

// Mảng chứa các sản phẩm đang khuyến mãi sẽ được hiển thị ở Trang chủ
export let salePopularProductArray = [
  {
    id: "APh00001",
    src: "./assets/images/facewash-image-1.jpg",
    name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
    brand: "CeraVe",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 253000,
    percent: 0.21,
    starNum: 4,
    review_Count: 735,
    Bottle: "chai",
  },
  {
    id: "APh00002",
    src: "./assets/images/facewash-image-2.jpg",
    name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
    brand: "Simple",
    category: "Sửa rửa mặt",
    categoryID: "sua-rua-mat",
    price: 172000,
    percent: 0.13,
    starNum: 4,
    review_Count: 325,
    Bottle: "chai",
  },
  {
    id: "APh00003",
    src: "./assets/images/acnecream-image-1.jpg",
    name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
    brand: "La Roche-Posay",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 500000,
    percent: 0.2,
    starNum: 3,
    review_Count: 356,
    Bottle: "tuýp",
  },
  {
    id: "APh00003",
    src: "./assets/images/acnecream-image-1.jpg",
    name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
    brand: "La Roche-Posay",
    category: "Kem trị mụn",
    categoryID: "kem-tri-mun",
    price: 500000,
    percent: 0.2,
    starNum: 3,
    review_Count: 356,
    Bottle: "tuýp",
  },
];
