

import { createNotificationAdmin, err_input } from "../base/baseFunction.js";


//hàm kiểm tra input số
export function checkNumber(value){
    for(let i=0; i<value.length; i++){
        if(!(value.charAt(i) >= '0' && value.charAt(i) <= '9')) return false;
    }
    return true;
}

export function add_product(path_picture_admin){
    let productList = JSON.parse(localStorage.getItem("productList"));
    if(!checkErrorForAddAndEdit(path_picture_admin)) return false;
    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector("#category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let discountQuantity =  document.querySelector(".quantity-discount-add");
    let discountPercent = document.querySelector(".percent-discount-add");

    //nếu trùng tên hoặc mã sản phẩm, sản phẩm đã tồn tại
    let check = {
        status: true,
        mess_id: null,
        mess_name: null
    }
    check.check_id = productList.some((obj) => {
        if(obj.id === id.value){
            check.status = false;
            check.mess_id = "Trùng mã sản phẩm";
            return;
        }    
    });
    check.check_name = productList.some((obj) => {
        if(obj.name === name.value){
            check.status = false;
            check.mess_name = "Trùng tên sản phẩm";
            return;
        }
    });
    if(!check.status){
        if(check.mess_id){
            err_input(id, check.mess_id);
        }
        if(check.mess_name){
            err_input(name, check.mess_name);
        }
        return false;
    }

    //nếu sản phẩm được thêm, tạo number sản phẩm
    let number = 1;
    while(productList.some((obj) => {
        return obj.number == number;
    })){
        number = Math.floor(Math.random() * productList.length+1) + 1;
    }

    //obj của danh mục
    let objCategory = {
        "kem-tri-mun": "Kem trị mụn",
        "sua-rua-mat": "Sữa rửa mặt",
        "son": "son",
        "phan": "phấn",
        "toner": "toner",
        "sereum": "sereum",
        "kem-duong-am": "kem dưỡng ẩm",
        "tay-trang": "tẩy trang",
    }
    //thêm sản phẩm vào mảng và update lên localStorage, xong hết return true
    let data = {
        number: number,
        id: id.value,
        src: path_picture_admin.src,
        name: name.value,
        brand: brand.value,
        category: objCategory[category.value],
        categoryID: category.value,
        price: parseInt(price.value),
        desc: description.value,
        quantity: parseInt(quantity.value), 
        originQuantity: parseInt(quantity.value), //số lượng ban đầu không thay đổi
        discountQuantity: parseInt(discountQuantity.value),
        discountPercent: parseInt(discountPercent.value)
    }

    //update vào mảng và localStorage
    productList.push(data);
    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}

export function delete_product(index) {
    //lấy số lượng muốn xóa
    let number = document.querySelector("#number-delete-confirm");
    if(number.value === ""){
        err_input(number);
        return false;
    }
    if(parseInt(number.value) < 0){
        err_input(number, "Cần nhập đúng");
        return false;
    }
    let productList = JSON.parse(localStorage.getItem("productList"));
 
    productList[index].quantity -= parseInt(number.value);

    if(!productList[index].quantity){
        productList.splice(index, 1); //xóa bỏ
        localStorage.setItem("productList", JSON.stringify(productList));
        return true;
    }
    if(productList[index].quantity <  0){
        let input = document.querySelector("#number-delete-confirm");
        err_input(input, "*Lỗi! Không đủ để xóa");
        return false;
    }

    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}

export function edit_product(index, path_picture_admin) {
    let productList = JSON.parse(localStorage.getItem("productList"));
    if(!checkErrorForAddAndEdit(path_picture_admin)) return false;

    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector("#category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let discountQuantity =  document.querySelector(".quantity-discount-add");
    let discountPercent = document.querySelector(".percent-discount-add");

    //nếu trùng tên sản phẩm, sản phẩm đã tồn tại
    let check = {
        status: true,
        mess_id: null,
        mess_name: null
    }
    check.check_id = productList.some((obj, i) => {
        if(index != i){
            if(obj.id === id.value){
                check.status = false;
                check.mess_id = "Trùng mã sản phẩm";
                return;
            }    
        }
    });
    check.check_name = productList.some((obj, i) => {
        if(index != i){
            if(obj.name === name.value){
                check.status = false;
                check.mess_name = "Trùng tên sản phẩm";
                return;
            }
        }
    });

    if(!check.status){
        if(check.mess_id){
            err_input(id, check.mess_id);
            id.value = "";
        }
        if(check.mess_name){
            err_input(name, check.mess_name);
            name.value = "";
        }
        return;
    }

      //obj của danh mục
      let objCategory = {
        "kem-tri-mun": "Kem trị mụn",
        "sua-rua-mat": "Sữa rửa mặt",
        "son": "son",
        "phan": "phấn",
        "toner": "toner",
        "sereum": "sereum",
        "kem-duong-am": "kem dưỡng ẩm",
        "tay-trang": "tẩy trang",
      }

    //update vào mảng và update lên localStorage, return true
    productList[index].name = name.value;
    productList[index].price = parseInt(price.value);
    productList[index].category = objCategory[category.value];
    productList[index].categoryID = category.value;
    productList[index].brand = brand.value;
    productList[index].description = description.value;
    productList[index].id = id.value;
    productList[index].src = path_picture_admin.src;
    productList[index].quantity = parseInt(quantity.value);
    productList[index].originQuantity = parseInt(quantity.value);
    productList[index].discountQuantity = parseInt(discountQuantity.value);
    productList[index].discountPercent = parseInt(discountPercent.value);

    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}
//--------------------------------------------------------------------

function checkErrorForAddAndEdit(path_picture_admin){
    let name = document.querySelector(".name-add");
    let price = document.querySelector("#price-add");
    let category = document.querySelector("#category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector("#quantity-add");
    let discountQuantity =  document.querySelector(".quantity-discount-add");
    let discountPercent = document.querySelector(".percent-discount-add");
    let file_picture = document.querySelector(".add-photo-button #file");

    //Nếu input rỗng
    if(name.value == "" || price.value == "" || brand.value == "" || description.value == "" || id.value == "" || path_picture_admin.src == null || quantity.value == "" ||  discountPercent.value == "" || discountQuantity.value == ""){
        err_input(name);
        err_input(id);
        err_input(price);
        err_input(brand);
        err_input(description);
        if(path_picture_admin.src == null){
            err_input(file_picture);
        }
        err_input(quantity);
        err_input(discountPercent);
        err_input(discountQuantity)
        return false;
    }

    //check mã sản phẩm
    if(id.value.slice(0,3) !== "APh"){
        err_input(id, "Cần định dạng APhXXXX..")
        return false;
    }
    for(let k=3; k<id.value.lengh; k++){
        if(!(id.value.charAt(k) >= '0' && id.value.charAt(k) <= 9)){
            err_input(id, "Cần định dạng APhXXXX..")
            return false;
        }
    }

   //check số input
   let checkNum = true;
   if(!checkNumber(price.value)){
       checkNum = false;
       err_input(price, "Phải nhập số nguyên")
   }
   if(!checkNumber(quantity.value)){
       checkNum = false;
       err_input(quantity, "Phải nhập số nguyên!");
   }
   if(!checkNumber(discountPercent.value)){
       checkNum = false;
       err_input(discountPercent, "Phải nhập số nguyên!");
   }
   if(!checkNumber(discountQuantity.value)){
       checkNum = false;
       err_input(discountQuantity, "Phải nhập số nguyên!");
   }
   if(!checkNum) return false;

   if(discountQuantity.value > quantity.value){
    createNotificationAdmin("Số lượng giảm giá phải nhỏ hơn số lượng sản phẩm");
    discountQuantity.value = "";
    quantity.value = "";
    return false;
   }
   if(discountPercent.value >= 100){
    err_input(discountPercent, "Cần nhỏ hơn 100%");
    return false;
   }
   return true;
}