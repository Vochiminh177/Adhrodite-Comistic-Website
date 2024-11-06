import { productItemAddedToShoppingCart as productItemAddedArray, usersList } from "../../../database/database.js";
import { productItemArray } from "../../../database/database.js";
import {create_notification_user} from "./changeUserFormInMenuHeader.js"

// Hàm cập nhật thông tin hoá đơn
function updateBill() {}

export function getBillInfo(array_orderProduct, currentPage) {
  document
    .querySelector(".payment-information-info__submit")
    .addEventListener("click", function () {
      // lấy danh sách sản phẩm từ phía admin để đồng bộ, xử lí dữ liệu
      let productList = JSON.parse(localStorage.getItem('productList')) || [];
      if (productList.length == 0) {
        productList = [...productItemArray];
        localStorage.setItem("productList", JSON.stringify(productList));
      }

      //lấy danh sách user từ local để lấy vị trí người đang đăng nhập
      let userList = JSON.parse(localStorage.getItem("userList"));
      let index_user_status_login;
      userList.forEach((obj, index) => {
        if(obj.status_login){
          index_user_status_login = index;
        }
      });

      check_remaning_quantity(userList, index_user_status_login, productList, array_orderProduct)

      // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
      updateBill();
    });
}

// hàm kiểm tra sản phẩm nào không đặt được, tô đỏ sản phẩm đó
function error_orderProduct(id_product){
  let array_products__item =document.querySelectorAll(".payment-information-products__item");
  array_products__item.forEach((obj) => {
    let array_details = obj.querySelector(".payment-information-products__details").textContent;
    let array_string = array_details.split("/");
    let id = array_string[0].trim();
    
    if(id === id_product){
      if(!obj.querySelector(".payment-information-products__column hr")){
        obj.querySelector("h3").style.color = "red";
        obj.querySelector("p").style.color = "red";
        let ele = document.createElement("hr");
        ele.style.border = "2px solid red";
        obj.querySelector(".payment-information-products__column").appendChild(ele);
      }
    }
  });

}

// hàm kiểm tra có đặt hàng thành công hay không
function check_remaning_quantity(userList, index_user_status_login, productList, array_orderProduct){
  let check_quantity = array_orderProduct.some((obj_orderProduct) => {
    let check = true;

    // kiểm tra số lượng sản phẩm so với hàng tồn của admin, tránh trường hợp admin hết hàng
    productList.forEach((obj_product_in_shop) => {
      if(obj_orderProduct.id === obj_product_in_shop.id){
        let soLuong_conLai = obj_product_in_shop.quantity - obj_orderProduct.quantity;
        //nếu hàng đặt nhiều hơn hàng tồn kho
        if(soLuong_conLai < 0){
          error_orderProduct(obj_orderProduct.id);
          create_notification_user("Vui lòng xem lại số lượng đơn hàng!");
          check = false;
          return;
        }
        //ngược lại, nếu đặt được
        else{
          obj_product_in_shop.quantity = soLuong_conLai;
        }
      }
    });

    console.log(123);
    if(!check) return false;
    else return true;
  });

  if(check_quantity){
    create_notification_user("Đặt hàng thành công!");

    array_orderProduct.forEach((obj_orderProduct) => {
      userList[index_user_status_login].shoppingCart.forEach((obj_shoppingCart, index) => {
        if(obj_orderProduct.id === obj_shoppingCart){
          userList[index_user_status_login].shoppingCart.splice(index, 1);
          return;
        }
      });
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("productList", JSON.stringify(productList));
  }

}