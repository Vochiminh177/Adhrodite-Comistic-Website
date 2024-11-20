import { err_input } from "../base/baseFunction.js";

function checkNumberPhone(value){
    if(!isNaN(value)){
        return value == Math.round(value) && value.length == 10;
    }
}

export function handleDeleteCustomer(index) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.splice(index, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
}

export function handleEditCustomer(index) {
    let username = document.querySelector(".username-customer");
    let password = document.querySelector(".password-customer");
    let phone = document.querySelector(".phone-customer");
    let firstName = document.querySelector(".firstname-customer");
    let lastName = document.querySelector(".lastname-customer");

    let checkEmpty = false;
    if (username.value == "" || password.value == "" || phone.value == "" || firstName.value == "" || lastName.value == "") {
        err_input(username);
        err_input(password);
        err_input(phone);
        err_input(firstName);
        err_input(lastName);
        checkEmpty = true;
    }
    if (checkEmpty) return false; //nếu input bị rỗng

    //nếu không đúng số điện thoại
    let checkPhone = checkNumberPhone(phone.value);
    if(!checkPhone){
        err_input(phone, "Cần nhập đúng 10 chữ số!");
        return false;
    }

    //nếu bị trùng username hoặc sdt
    let userList = JSON.parse(localStorage.getItem("userList"));
    let check = {
        status: false,
        messPhone: null,
        messUsername: null
    }
    console.log(phone.value)
    userList.forEach((obj, i) => {
        if (index != i) {
            if (obj.username == username.value) {
                check.status = true;
                check.messUsername = "Tên tài khoản đã tồn tại!";
            }
            if (obj.phone == phone.value) {
                console.log(obj.phone, userList[index].phone)
                check.status = true;
                check.messPhone = "Số điện thoại đã tồn tại!";
            }
        }
    })
    if (check.status) {
        if (check.messPhone != null) {
            err_input(phone, check.messPhone);
        }
        if (check.messUsername != null) {
            err_input(username, check.messUsername);
        }
        return false;
    }

    //nếu tất cả ổn
    userList[index].username = username.value;
    userList[index].password = username.password;
    userList[index].phone = phone.value;
    userList[index].first_name = firstName.value;
    userList[index].last_name = lastName.value;
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

export function handleAddCustomer() {
    let username = document.querySelector(".content-customer-add .username-customer");
    let password = document.querySelector(".content-customer-add .password-customer");
    let phone = document.querySelector(".content-customer-add .phone-customer");
    let firstName = document.querySelector(".content-customer-add .firstname-customer");
    let lastName = document.querySelector(".content-customer-add .lastname-customer");

    let checkEmpty = false;
    if (username.value == "" || password.value == "" || phone.value == "" || firstName.value == "" || lastName.value == "") {
        err_input(username);
        err_input(password);
        err_input(phone);
        err_input(firstName);
        err_input(lastName);
        checkEmpty = true;
    }
    if (checkEmpty) return false; //nếu input bị rỗng

    //nếu không đúng số điện thoại
    let checkPhone = checkNumberPhone(phone.value);
    if(!checkPhone){
        err_input(phone, "Cần nhập đúng 10 chữ số!");
        return false;
    }

    //nếu bị trùng username hoặc sdt
    let userList = JSON.parse(localStorage.getItem("userList"));
    let check = {
        status: false,
        messPhone: null,
        messUsername: null
    }
    console.log(phone.value)
    userList.forEach((obj) => {
        if (obj.username == username.value) {
            check.status = true;
            check.messUsername = "Tên tài khoản đã tồn tại!";
        }
        if (obj.phone == phone.value) {
            console.log(obj.phone, userList[index].phone)
            check.status = true;
            check.messPhone = "Số điện thoại đã tồn tại!";
        }
    });
    if (check.status) {
        if (check.messPhone != null) {
            err_input(phone, check.messPhone);
        }
        if (check.messUsername != null) {
            err_input(username, check.messUsername);
        }
        return false;
    }
    let id = userList[0].id;
    while(userList.some((obj) => {
        return obj.id == id;
    })){
        id = Math.floor(Math.random() * userList.length+1) + 1;
    }
    //nếu tất cả ổn
    let data = {
        full_info: true,
        statusLogin: false,
        id: id,
        username: username.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone: phone.value,
        shoppingCart: [],
        ordersHistory: []
    }
    userList.push(data);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}
