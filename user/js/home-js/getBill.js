import { productItemAddedToShoppingCart as productItemAddedArray, usersList } from "../../../database/database.js";
import { productItemArray } from "../../../database/database.js";
import {create_notification_user} from "./changeUserFormInMenuHeader.js";
import {order_is_in_process} from "../../../database/database.js";
import { calTotalProductItemPriceInShoppingCart } from "../common-js/common.js";


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

      //hàm kiểm tra thông tin thanh toán
      if(handle_order_information(userList, index_user_status_login)){
        //hàm xử lí đơn người dùng đặt hàng
        handle_order_product(userList, index_user_status_login, productList, array_orderProduct);

        // Cập nhật thông tin hoá đơn khi người dùng hoàn tất việc mua hàng
        updateBill();
      }
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

//hàm kiểm tra thông tin thanh toán
function handle_order_information(userList, index_user_status_login){
  if(!userList[index_user_status_login].full_info){
    create_notification_user("Bạn cần bổ sung thông tin!");
    return false;
  }
  if(!document.querySelector(".payment-information-info__change-location-list input")){
    create_notification_user("Bạn cần bổ sung địa chỉ giao hàng");
    return false;
  }
  else{
    if(document.querySelector(".payment-information-info__change-location-list input").value == ""){
      create_notification_user("Bạn cần bổ sung địa chỉ giao hàng");
      return false;
    }
  }

  if(document.querySelector("#credit-card").checked){
    if(!userList[index_user_status_login].full_money){
      create_notification_user("Bạn cần bổ sung thông tin ngân hàng!");
      return false;
    }
  }
  
  return true;
}

// hàm kiểm tra có đặt hàng thành công hay không
function handle_order_product(userList, index_user_status_login, productList, array_orderProduct){
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
        //ngược lại, nếu đặt được, cập nhật số lượng sản phẩm ở phía admin
        else{
          obj_product_in_shop.quantity = soLuong_conLai;
        }
      }
    });

    if(!check) return false;
    else return true;
  });

  //nếu người dùng đặt hàng thành công
  if(check_quantity){
    create_notification_user("Đặt hàng thành công!");
    let order_is_in_process = JSON.parse(localStorage.getItem("order_is_in_process")) || [];

    //tạo dữ liệu để push vào mảng đơn hàng chờ xử lí
    //tạo id cho đơn hàng
    let id_order = 1;
    if(order_is_in_process.length != 0){
      while(order_is_in_process.some((obj) => {
        return obj.id === id_order;
      })){
        id_order = Math.floor(Math.random() * 100) + 1;
      }
    }
    console.log(id_order)

    //tạo thời gian đặt hàng
    let date_order = new Date();
    date_order = date_order.getHours().toString() + ":" + date_order.getMinutes().toString() + ":" + date_order.getSeconds().toString() + " " + date_order.getDate().toString() + "/" + date_order.getMonth().toString() + "/" + date_order.getFullYear().toString();
    console.log(date_order);

    //phương thức thanh toán
    let purchase_method;
    let payment_information_info__form_group = document.querySelectorAll(".payment-information-info__form-group");
    payment_information_info__form_group.forEach((obj) => {
      if(obj.querySelector("input[type=radio]")){
        if(obj.querySelector("input[type=radio]").checked){
          purchase_method = obj.querySelector("label").textContent.trim();
          return;
        }
      }
    });

    let data = {
      username: userList[index_user_status_login].username,
      id: id_order,
      status: "pending",
      date_order: date_order,
      address_ship: document.querySelector(".payment-information-info__change-location-list input").value,
      priceTotal: calTotalProductItemPriceInShoppingCart(userList, index_user_status_login) + 18000,
      purchase_method: purchase_method,
      products: userList[index_user_status_login].shoppingCart
    };

    order_is_in_process.push(data);
    console.log(order_is_in_process)
    localStorage.setItem("order_is_in_process", JSON.stringify(order_is_in_process));

    // xóa dữ liệu trong giỏ hàng 
    array_orderProduct.forEach((obj_orderProduct) => {
      userList[index_user_status_login].shoppingCart.forEach((obj_shoppingCart, index) => {
        if(obj_orderProduct.id === obj_shoppingCart.id){
          userList[index_user_status_login].shoppingCart.splice(index, 1);
          return;
        }
      });
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("productList", JSON.stringify(productList));
  }

}

