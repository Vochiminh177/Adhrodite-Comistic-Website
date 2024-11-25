//---HIỆU------

import { err_input } from "../base/baseFunction.js";

// function delete_space(str) {
//     str = str.trim();
//     str = str.replaceAll(/\s+/g, " ");
//     return str;
// }


//hàm kiểm tra input giá cả và số lượng
export function checkNumber(value){
    if(!isNaN(value)){
        return value == Math.round(value);
    }
}

export function add_product(path_picture_admin){
    let productList = JSON.parse(localStorage.getItem("productList"));

    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector("#category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let file_picture = document.querySelector(".add-photo-button #file");

    //Nếu input rỗng
    if(name.value == "" || price.value == "" || brand.value == "" || description.value == "" || id.value == "" || path_picture_admin.src == null || quantity.value ==""){
        err_input(name);
        err_input(id);
        err_input(price);
        err_input(brand);
        err_input(description);
        err_input(quantity);
        if(path_picture_admin.src == null){
            err_input(file_picture);
        }
        return false;
    }

    //check số giá bán và số lượng
    let checkNum = true;
    if(!checkNumber(price.value) || !checkNumber(quantity.value)){
        checkNum = false;
        if(!checkNumber(price.value) && !checkNumber(quantity.value)){
            err_input(price, "Phải nhập số nguyên!");
            err_input(quantity, "Phải nhập số nguyên!");
        }
        else if(!checkNumber(price.value)){
            err_input(price, "Phải nhập số nguyên!");
        }
        else err_input(quantity, "Phải nhập số nguyên!");
    }
    if(price.value<0 || quantity.value<0){
        if(price.value<0 && quantity.value<0){
            err_input(price, "Nhập số dương");
            err_input(quantity, "Nhập số dương");
        }
        else if(price.value<0){
            err_input(price, "Nhập số dương");
        }
        else {
            err_input(quantity, "Nhập số dương");
        }
        return false;
    }

    //nếu trùng tên hoặc mã sản phẩm, sản phẩm đã tồn tại
    let check = {
        status: true,
        mess_id: null,
        mess_name: null
    }
    check.check_id = productList.some((obj) => {
        if(obj.id === id.value){
            check.status = false;
            check.mess_id = "Lỗi! Trùng mã sản phẩm";
            return;
        }    
    });
    check.check_name = productList.some((obj) => {
        if(obj.name === name.value){
            check.status = false;
            check.mess_name = "Lỗi! Trùng tên sản phẩm";
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
        quantity: parseInt(quantity.value)
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
    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector("#category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let file_picture = document.querySelector(".add-photo-button #file");

    //Nếu input rỗng
    if(name.value == "" || price.value == "" || brand.value == "" || description.value == "" || id.value == "" || path_picture_admin.src == null || quantity.value == ""){
        err_input(name);
        err_input(id);
        err_input(price);
        err_input(brand);
        err_input(description);
        if(path_picture_admin.src == null){
            err_input(file_picture);
        }
        err_input(quantity);
        return false;
    }

    //check số giá bán
    let checkNum = true;
    if(!checkNumber(price.value) || !checkNumber(quantity.value)){
        checkNum = false;
        if(!checkNumber(price.value) && !checkNumber(quantity.value)){
            err_input(price, "Phải nhập số nguyên!");
            err_input(quantity, "Phải nhập số nguyên!");
        }
        else if(!checkNumber(price.value)){
            err_input(price, "Phải nhập số nguyên!");
        }
        else err_input(quantity, "Phải nhập số nguyên!");
    }
    if(!checkNum) return false;

    if(price.value<0 || quantity.value<0){
        if(price.value<0 && quantity.value<0){
            err_input(price, "Nhập số dương");
            err_input(quantity, "Nhập số dương");
        }
        else if(price.value<0){
            err_input(price, "Nhập số dương");
        }
        else {
            err_input(quantity, "Nhập số dương");
        }
        return false;
    }

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
                check.mess_id = "Lỗi! Trùng mã sản phẩm";
                return;
            }    
        }
    });
    check.check_name = productList.some((obj, i) => {
        if(index != i){
            if(obj.name === name.value){
                check.status = false;
                check.mess_name = "Lỗi! Trùng tên sản phẩm";
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

    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}
//--------------------------------------------------------------------