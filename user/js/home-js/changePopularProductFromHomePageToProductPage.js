import { formatVietNamMoney } from "../common-js/common.js";
import { clickToProductItem } from "./homePageEvents.js";
import { usersList } from "../../../database/database.js";



var popularProductArray = [
  {
      id: "APh00001",
      src: "./assets/images/facewash-image-1.jpg",
      name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
      brand: "CeraVe",
      category: "Sửa rửa mặt",
      categoryID: "sua-rua-mat",
      price: 200000,
      starNum:4,
      review_Count:735,
      Bottle:"chai",
    },
    {
      id: "APh00002",
      src: "./assets/images/facewash-image-2.jpg",
      name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
      brand: "Simple",
      category: "Sửa rửa mặt",
      categoryID: "sua-rua-mat",
      price: 150000,
      starNum:4,
      review_Count:325,
      Bottle:"chai",


    },
    {
      id: "APh00003",
      src: "./assets/images/acnecream-image-1.jpg",
      name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
      brand: "La Roche-Posay",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 400000,
      starNum:3,
      review_Count:356,
      Bottle:"tuýp",
    },
    {
      id: "APh00004",
      src: "./assets/images/acnecream-image-2.jpg",
      name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
      brand: "Gamma Chemicals",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 235000,
      starNum:4,
      review_Count:764,
      Bottle:"tuýp",


    },
    {
      id: "APh00005",
      src: "./assets/images/acnecream-image-3.jpg",
      name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
      brand: "CeraVe",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 212000,
      starNum:3,
      review_Count:214,
      Bottle:"tuýp",
      
    },

    {
      id: "APh00001",
      src: "./assets/images/facewash-image-1.jpg",
      name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
      brand: "CeraVe",
      category: "Sửa rửa mặt",
      categoryID: "sua-rua-mat",
      price: 200000,
      starNum:5,
      review_Count:934,
      Bottle:"chai",

    },
    {
      id: "APh00002",
      src: "./assets/images/facewash-image-2.jpg",
      name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
      brand: "Simple",
      category: "Sửa rửa mặt",
      categoryID: "sua-rua-mat",
      price: 150000,
      starNum:4,
      review_Count:625,
      Bottle:"chai",


    },
    {
      id: "APh00003",
      src: "./assets/images/acnecream-image-1.jpg",
      name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
      brand: "La Roche-Posay",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 400000,
      starNum:5,
      review_Count:734,
      Bottle:"tuýp",

    },
    {
      id: "APh00004",
      src: "./assets/images/acnecream-image-2.jpg",
      name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
      brand: "Gamma Chemicals",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 235000,
      starNum:4,
      review_Count:521,
      Bottle:"tuýp",

    },
    {
      id: "APh00005",
      src: "./assets/images/acnecream-image-3.jpg",
      name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
      brand: "CeraVe",
      category: "Kem trị mụn",
      categoryID: "kem-tri-mun",
      price: 212000,
      starNum:5,
      review_Count:745,
      Bottle:"tuýp",


    },
];

window.addEventListener('load', () => {
  renderPopularProductList();
});

export function renderPopularProductList() {
  const productContainer = document.querySelector(".popular-product__list");
  if (!productContainer) return;

  let productsHTML = '';

  popularProductArray.forEach((product) => {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < product.starNum) {
        starsHTML += `<i class="fa-solid fa-star yellow"></i>`;
      } else {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      }
    }

    productsHTML += `
      <div class="popular-product__item" data-popular-product="${product.categoryID}">
        <figure class="popular-product__media">
          <img src="${product.src}" alt="" class="popular-product__image" />
        </figure>
        <div class="popular-product__info">
          <p class="popular-product__detail-brand"><b>${product.brand}</b></p>
          <h3 class="popular-product__name">${product.name}</h3>
          <div class="starContainer">
            ${starsHTML}
            <p class="danhGia">(${product.review_Count} đánh giá)</p>
          </div>
          <p class="popular-product__detail" style="display: none;">
            Danh mục: <b>${product.category}</b>
          </p>
          <div class="popular-product__price-container">
            <p class="popular-product__detail-price"><b>${formatVietNamMoney(product.price)}đ</b></p> 
            <p class="popular-product__detail-bottle"> / ${product.Bottle}</p>
          </div>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
            data-id="${product.id}"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>`;
  });

  productContainer.innerHTML = productsHTML;
  clickToProductItem();

  document.querySelectorAll('.popular-product__button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();  // Ngăn chặn nổi bọt để không kích hoạt sự kiện trên phần tử cha
    });

    button.addEventListener("click", function(e) {
      let userList = JSON.parse(localStorage.getItem("userList"));
      let userStatusLoginIndex;
      // Tìm vị trí của người dùng đang đăng nhập
      userList.forEach((user, index) => {
        if (user.statusLogin) {
          userStatusLoginIndex = index;
        }
      });
      if (userStatusLoginIndex === undefined) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
      }
      let id = e.currentTarget.getAttribute("data-id");
      let isExistingProductItem = false;
      let indexProductItem = -1;
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
      const shoppingCart = userList[userStatusLoginIndex].shoppingCart;
      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].id === id) {
          isExistingProductItem = true;
          indexProductItem = i;
          break;
        }
      }
      if (isExistingProductItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        shoppingCart[indexProductItem].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        const productToAdd = popularProductArray.find(product => product.id === id);
        if (productToAdd) {
          shoppingCart.push({
            id: productToAdd.id,
            src: productToAdd.src,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1,
            category: productToAdd.category,
          });
        }
      }
      // Lưu cập nhật giỏ hàng vào `localStorage`
      localStorage.setItem("userList", JSON.stringify(userList));
      alert("Sản phẩm đã được thêm vào giỏ hàng.");
    });
  });
}

window.addEventListener('load', () => {
  renderPopularProductList();
});




var salePopularProductArray = [

    {
        id: "APh00001",
        src: "./assets/images/facewash-image-1.jpg",
        name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
        brand: "CeraVe",
        category: "Sửa rửa mặt",
        categoryID: "sua-rua-mat",
        price:475000,
        percent: 0.21,
        starNum:4,
        review_Count:735,
        Bottle:"chai",
      },
      {
        id: "APh00002",
        src: "./assets/images/facewash-image-2.jpg",
        name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
        brand: "Simple",
        category: "Sửa rửa mặt",
        categoryID: "sua-rua-mat",
        price:290000,
        percent: 0.13,
        starNum:4,
        review_Count:325,
        Bottle:"chai",
  
  
      },
      {
        id: "APh00003",
        src: "./assets/images/acnecream-image-1.jpg",
        name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
        brand: "La Roche-Posay",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:300000,
        percent: 0.2,
        starNum:3,
        review_Count:356,
        Bottle:"tuýp",
      },
      {
        id: "APh00004",
        src: "./assets/images/acnecream-image-2.jpg",
        name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
        brand: "Gamma Chemicals",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:300000,
        percent: 0.2,
        starNum:4,
        review_Count:764,
        Bottle:"tuýp",
  
  
      },
      {
        id: "APh00005",
        src: "./assets/images/acnecream-image-3.jpg",
        name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
        brand: "CeraVe",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:199000,
        percent: 0.09,
        starNum:3,
        review_Count:214,
        Bottle:"tuýp",
        
      },
  
      {
        id: "APh00001",
        src: "./assets/images/facewash-image-1.jpg",
        name: "Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu",
        brand: "CeraVe",
        category: "Sửa rửa mặt",
        categoryID: "sua-rua-mat",
        price:399000,
        percent: 0.11,
        starNum:5,
        review_Count:934,
        Bottle:"chai",
  
      },
      {
        id: "APh00002",
        src: "./assets/images/facewash-image-2.jpg",
        name: "Sữa Rửa Mặt Simple Giúp Da Sạch Thoáng 150ml",
        brand: "Simple",
        category: "Sửa rửa mặt",
        categoryID: "sua-rua-mat",
        price:270000,
        percent: 0.19,
        starNum:4,
        review_Count:625,
        Bottle:"chai",
  
  
      },
      {
        id: "APh00003",
        src: "./assets/images/acnecream-image-1.jpg",
        name: "Kem Dưỡng La Roche-Posay Giảm Mụn Hiệu Quả 40ml Effaclar Duo+ M",
        brand: "La Roche-Posay",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:240000,
        percent: 0.15,
        starNum:5,
        review_Count:734,
        Bottle:"tuýp",
  
      },
      {
        id: "APh00004",
        src: "./assets/images/acnecream-image-2.jpg",
        name: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
        brand: "Gamma Chemicals",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:420000,
        percent: 0.23,
        starNum:4,
        review_Count:521,
        Bottle:"tuýp",
  
      },
      {
        id: "APh00005",
        src: "./assets/images/acnecream-image-3.jpg",
        name: "Gel Giảm Mụn Alcom Derma Forte Advanced 15g",
        brand: "CeraVe",
        category: "Kem trị mụn",
        categoryID: "kem-tri-mun",
        price:350000,
        percent: 0.2,
        starNum:5,
        review_Count:745,
        Bottle:"tuýp",
  
  
      },
  ];


  export function renderSalePopularProductList() {
    const productContainer = document.querySelector(".sale-product__list");
    if (!productContainer) return;
  
    let productData = JSON.parse(localStorage.getItem("saleProductData"));
      
    if (!productData) {
        productData = salePopularProductArray; // Sử dụng mảng mặc định
        localStorage.setItem("saleProductData", JSON.stringify(productData)); // Lưu vào `localStorage`
    }
  
    let productsHTML = '';
  
    productData.forEach((product) => {
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        starsHTML += `<i class="fa-solid fa-star ${i < product.starNum ? 'yellow' : ''}"></i>`;
      }
  
      productsHTML += `
        <div class="sale-product__item" data-popular-product="${product.categoryID}">
          <figure class="sale-product__media">
            <div class="sale-product__item-percent"> -${product.percent * 100}%</div> 
            <img src="${product.src}" alt="" class="sale-product__image" />
          </figure>
          <div class="sale-product__info">
            <p>${product.brand}</p>
            <h3 class="sale-product__name">${product.name}</h3>
            <div class="starContainer">
              ${starsHTML}
              <p class="danhGia">(${product.review_Count} đánh giá)</p>
            </div>
            <p class="sale-product__price">
              <b class="old"><del>${formatVietNamMoney(product.price)}<sub>đ</sub></del></b><br>
              <b class="new">${formatVietNamMoney(product.price * (1 - product.percent))} đ</b> / ${product.Bottle}
            </p>
            <button
              href="javascript:void(0)"
              class="sale-product__button"
              data-id="${product.id}"
            >
              Thêm&nbsp;giỏ&nbsp;hàng
            </button>
          </div>
        </div>`;
    });
  
    productContainer.innerHTML = productsHTML;
    clickToProductItem();
  
    document.querySelectorAll('.sale-product__button').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
  
        let userList = JSON.parse(localStorage.getItem("userList"));
        let userStatusLoginIndex;
  
        // Tìm người dùng đang đăng nhập
        userList.forEach((user, index) => {
          if (user.statusLogin) {
            userStatusLoginIndex = index;
          }
        });
  
        // Nếu không có người dùng đăng nhập
        if (userStatusLoginIndex === undefined) {
          alert("Bạn cần đăng nhập để đặt hàng.");
          return; // Dừng lại nếu chưa đăng nhập
        }
  
        const shoppingCart = userList[userStatusLoginIndex].shoppingCart;
        const id = e.currentTarget.getAttribute("data-id");
        let isExistingProductItem = false;
        let indexProductItem = -1;
  
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].id === id) {
            isExistingProductItem = true;
            indexProductItem = i;
            break;
          }
        }
  
        if (isExistingProductItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          shoppingCart[indexProductItem].quantity += 1;
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
          const productToAdd = salePopularProductArray.find(product => product.id === id);
          if (productToAdd) {
            shoppingCart.push({
              id: productToAdd.id,
              src: productToAdd.src,
              name: productToAdd.name,
              price: productToAdd.price * (1 - productToAdd.percent),
              quantity: 1,
              category: productToAdd.category,
            });
          }
        }
  
        // Cập nhật `localStorage` với `userList` đã sửa đổi
        localStorage.setItem("userList", JSON.stringify(userList));
        alert("Sản phẩm đã được thêm vào giỏ hàng.");
      });
    });
  }
  
window.addEventListener('load', () => {
  renderSalePopularProductList();
});
