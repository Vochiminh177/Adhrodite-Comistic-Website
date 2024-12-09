
import { err_input } from "../base/baseFunction.js";

function checkNumberPhone(value){
    if(value.length !== 10) return false;
    if(value.charAt(0) !== '0') return false;
    for(let i=0; i<value.length; i++){
        if(!(value.charAt(i) >= '0' && value.charAt(i) <= '9')){
            return false;
        }
    }
    return true;
}

function checkEmail(value){
    let count = 0;
    for(const char of value){
        if(char === '@'){
        count++;
        }
    }
    if(count !== 1){
        return false;
    }
    let index = value.indexOf('@');
    //kí tự trước @
    let checkBefore = true;
    for(const char of value.slice(0, index)){
        if(!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))) checkBefore = false;
    }
    if(!checkBefore) return false;
    let checkAllNumber = false;
    for(const char of value.slice(0, index)){
        if(!(char >= '0' && char <= '9')) checkAllNumber = true;
    }
    if(!checkAllNumber) return false;

    let countPoint = 0;
    let checkBeforePoint = true;
    for(let k=value.length-1; k>=0; k--){
        if(value.charAt(k) === '.'){
        countPoint += 1;
        }
    }
    if(!(countPoint > 0 && countPoint <= 2)) return false;

    //kiểm tra trước dấu . và sau @
    let i = value.indexOf(".");
    for(const char of value.slice((index+1), i)){
        if(!(char >= 'a' && char <= 'z')) checkBeforePoint = false;
    }
    if(!checkBeforePoint) return false;
    if(countPoint === 1){
        let tmp = value.slice(i, value.length);
        if(tmp !== ".com") return false;
    }
    else{
        let tmp = value.slice(i, value.length);
        if(tmp !== ".com.vn") return false;
    }

    return true;
}

export function handleDeleteCustomer(index) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    if(userList[index].type === "admin") return false;
    userList.splice(index, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
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

   if(!checkErrorAddEdit(username, password, phone, firstName, lastName, email, address)) return false;

    //nếu bị trùng username hoặc sdt hoặc email
    let userList = JSON.parse(localStorage.getItem("userList"));
    let check = {
        status: false,
        messPhone: null,
        messUsername: null,
        messEmail: null
    }
    userList.forEach((obj, i) => {
        if (index != i) {
            if (obj.username === username.value) {
                check.status = true;
                check.messUsername = "Tài khoản đã tồn tại";
            }
            if (obj.phone === phone.value) {
                check.status = true;
                check.messPhone = "Số điện thoại đã tồn tại";
            }
            if (obj.email === email.value) {
                check.status = true;
                check.messEmail = "Email đã tồn tại";
            }
        }
    })
    if (check.status) {
        if (check.messPhone !== null) {
            err_input(phone, check.messPhone);
        }
        if (check.messUsername !== null) {
            err_input(username, check.messUsername);
        }
        if(checkEmail.messEmail !== null){
            err_input(email, check.messEmail);
        }
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

    if(!checkErrorAddEdit(username, password, phone, firstName, lastName, email, address)) return false;

    //nếu bị trùng username hoặc sdt hoặc email
    let userList = JSON.parse(localStorage.getItem("userList"));
    let check = {
        status: false,
        messPhone: null,
        messUsername: null,
        checkEmail: null
    }
    userList.forEach((obj) => {
        if (obj.username == username.value) {
            check.status = true;
            check.messUsername = "Tài khoản đã tồn tại";
            console.log(123);
        }
        if (obj.phone == phone.value) {
            check.status = true;
            check.messPhone = "Số điện thoại đã tồn tại";
            console.log(123);
        }
        if (obj.email === email.value) {
            check.status = true;
            check.messEmail = "Email đã tồn tại";
            console.log(123);
        }
    });
    if (check.status) {
        if (check.messPhone != null) {
            console.log(123);
            err_input(phone, check.messPhone);
        }
        if (check.messUsername != null) {
            console.log(123);
            err_input(username, check.messUsername);
        }
        if(checkEmail.messEmail !== null){
            console.log(123);
            err_input(email, check.messEmail);
        }
        return false;
    }

    //nếu tất cả ổn
    let id = userList[0].id;
    while(userList.some((obj) => {
        return obj.id === id;
    })){
        console.log(123);
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

function checkErrorAddEdit(username, password, phone, firstName, lastName, email, address){
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
  
   for(const char of firstName.value){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(char)){
      errorInput(firstName, "Cần nhập chữ");
      return;
    }
  }
  for(const char of lastName.value){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(char)){
      errorInput(lastName, "Cần nhập chữ");
      return;
    }
  }

    //nếu không đúng số điện thoại
    let checkPhone = checkNumberPhone(phone.value);
    if(!checkPhone){
        err_input(phone, "Cần nhập đúng 10 chữ số");
        console.log(123);
        return false;
    }

    if(!checkEmail(email.value)){
        err_input(email, "Email cần đúng định dạng");
        console.log(123);
        return false;
    }

    return true;
}

