
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
    let username = document.querySelector(".container-form-user-add-edit .username-customer");
    let password = document.querySelector(".container-form-user-add-edit .password-customer");
    let phone = document.querySelector(".container-form-user-add-edit .phone-customer");
    let firstName = document.querySelector(".container-form-user-add-edit .firstname-customer");
    let lastName = document.querySelector(".container-form-user-add-edit .lastname-customer");
    let type = document.querySelector(".container-form-user-add-edit #type-customer");
    let email = document.querySelector(".container-form-user-add-edit .email-customer");
    let address = document.querySelector(".container-form-user-add-edit .address-customer");

    if (username.value === "" || password.value === "" || phone.value === "" || firstName.value === "" || lastName.value === "" || email.value === "" || address.value === "") {
        err_input(username);
        err_input(password);
        err_input(phone);
        err_input(firstName);
        err_input(lastName);
        err_input(email);
        err_input(address);
        return false;
    }

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

    //kiểm tra email
    function checkEmail(email) {
        if(email.indexOf("@") === -1){
          return false;
        }
        const parts = email.split("@");
        
        // Kiểm tra cấu trúc email
        if (parts.length !== 2 || parts[1] !== "gmail.com") {
            return false;
        }
      
        // Kiểm tra từng ký tự trong phần trước "@"
        for (const char of parts[0]) {
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))) {
                return false; // Ký tự không hợp lệ
            }
        }
        
        return true; // Email hợp lệ
      }
    if(!checkEmail(email.value)){
        err_input(email, "Email cần đúng định dạng");
        return false;
    }
    let checkExistEmail = userList.some((obj, i) => {
        if(i !== index) return obj.email === email.value;
    });
    if(checkExistEmail) {
        err_input(email, "Email đã tồn tại");
        return false;
    }

    //nếu tất cả ổn
    userList[index].username = username.value;
    userList[index].password = password.value;
    userList[index].phone = phone.value;
    userList[index].first_name = firstName.value;
    userList[index].last_name = lastName.value;
    let objType = {
        0: "customer",
        1: "employer",
        2: "admin"
    }
    userList[index].type = objType[type.value];
    userList[index].email = email.value;
    userList[index].address = address.value;
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

export function handleAddCustomer() {
    let username = document.querySelector(".container-form-user-add-edit .username-customer");
    let password = document.querySelector(".container-form-user-add-edit .password-customer");
    let phone = document.querySelector(".container-form-user-add-edit .phone-customer");
    let firstName = document.querySelector(".container-form-user-add-edit .firstname-customer");
    let lastName = document.querySelector(".container-form-user-add-edit .lastname-customer");
    let type = document.querySelector(".container-form-user-add-edit #type-customer");
    let email = document.querySelector(".container-form-user-add-edit .email-customer");
    let address = document.querySelector(".container-form-user-add-edit .address-customer");

    if (username.value === "" || password.value === "" || phone.value === "" || firstName.value === "" || lastName.value === "" || email === "" || address === "") {
        err_input(username);
        err_input(password);
        err_input(phone);
        err_input(firstName);
        err_input(lastName);
        err_input(email);
        err_input(address);
        return false;
    }

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
    userList.forEach((obj) => {
        if (obj.username == username.value) {
            check.status = true;
            check.messUsername = "Tên tài khoản đã tồn tại!";
        }
        if (obj.phone == phone.value) {
            // console.log(obj.phone, userList[index].phone)
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

    if(!checkEmail(email)){
        err_input(email, "Email cần đúng định dạng");
        return false;
    }
    let checkExistEmail = userList.some((obj, i) => {
        return obj.email === email.value;
    });
    if(checkExistEmail) {
    err_input(email, "Email đã tồn tại");
    return false;
    }

    //nếu tất cả ổn
    let id = userList[0].id;
    while(userList.some((obj) => {
        return obj.id == id;
    })){
        id = Math.floor(Math.random() * userList.length+1) + 1;
    }

    let objType = {
        0: "customer",
        1: "employer",
        2: "admin"
    }

    let data = {
        type: objType[type.value],
        blockStatus: false,
        statusLogin: false,
        id: id,
        username: username.value,
        password: password.value,
        email: email.value,
        address: address.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone: phone.value,
        shoppingCart: [],
    }
    userList.push(data);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

export function handleBlockCustomer(index){
    let userList = JSON.parse(localStorage.getItem("userList"));
    if(userList[index].blockStatus) userList[index].blockStatus = false;
    else userList[index].blockStatus = true;
    localStorage.setItem("userList", JSON.stringify(userList));
}

function checkEmail(email) {
    //kiểm tra số dấu @
    let point = 0;
    for(const char of email.value){
      if(char === "@") point++;
    }
    if(point > 1){
      return false;
    }
  
    if (email.value.indexOf("@") === -1) {
      return false;
    }
    const parts = email.value.split("@");
  
    // Kiểm tra 2 bên @
    if (parts.length !== 2) {
      return false;
    }
  
    // Kiểm tra từng ký tự trong phần trước "@"
    for (const char of parts[0]) {
      if (
        !(
          (char >= "a" && char <= "z") ||
          (char >= "A" && char <= "Z") ||
          (char >= "0" && char <= "9")
        )
      ) {
        return false; // Ký tự không hợp lệ
      }
    }
  
    // kiểm tra nếu trước @ toàn số
    let checkAllNumberDigital = true;
    for(const char of parts[0]){
      if(!(char >=0 && char <= 9)){
        checkAllNumberDigital = false;
      }
    }
    if(checkAllNumberDigital) return false;
  
    //kiểm tra sau @
    let indexPoint = parts[1].indexOf(".");
    let index = parts[1].indexOf("@");
    let veri = parts[1].slice(indexPoint, parts[1].length);
    let beforePoint = parts[1].slice(index, indexPoint);

    for(const char of beforePoint){
        if(!(char >= "a" && char <= "z")) return false;
    }

    if(veri !== ".com" && veri !== ".com.vn") return false;
  
    return true; // Email hợp lệ
  }