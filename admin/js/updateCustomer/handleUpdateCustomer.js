
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
        if(tmp !== ".com.vn" && tmp !== ".edu.vn") return false;
    }

    return true;
}

export function checkAddress(value){
    if(value === "") return false;
    if(!value.toLowerCase().includes("phường")) return false;
    if(!value.toLowerCase().includes("quận")) return false;
    if(!value.toLowerCase().includes("thành phố")) return false;
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
    let street = document.querySelector(".container-form-user-add-edit .street");

   if(!checkErrorAddEdit(username, password, phone, firstName, lastName, email, address, street)) return false;

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
            if (obj.username === username.value.toLowerCase().trim()) {
                check.status = true;
                check.messUsername = "Tài khoản đã tồn tại";
            }
            if (obj.phone === phone.value.trim()) {
                check.status = true;
                check.messPhone = "Số điện thoại đã tồn tại";
            }
            if (obj.email === email.value.toLowerCase().trim()) {
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

     // Phường hoặc Xã
     const wardInfo = document.querySelector(".ward :checked").innerText;
     // Quận hoặc Huyện
     const districtInfo = document.querySelector(".district :checked").innerText;
     // Tỉnh thành
     const cityInfo = document.querySelector(".city :checked").innerText;
    let tmpAddress = street.value.trim() + ", " + wardInfo + ", " + districtInfo + ", " + cityInfo;

    //nếu tất cả ổn
    userList[index].username = username.value.trim();
    userList[index].password = password.value.trim();
    userList[index].phone = phone.value.trim();
    userList[index].first_name = firstName.value.trim();
    userList[index].last_name = lastName.value.trim();
    let objType = {
        0: "customer",
        1: "employer",
        2: "admin"
    }
    userList[index].type = objType[type.value];
    userList[index].email = email.value.trim();
    userList[index].address = tmpAddress;
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
    let street = document.querySelector(".container-form-user-add-edit .street");

    if(!checkErrorAddEdit(username, password, phone, firstName, lastName, email, address, street)) return false;

    //nếu bị trùng username hoặc sdt hoặc email
    let userList = JSON.parse(localStorage.getItem("userList"));
    let check = {
        status: false,
        messPhone: null,
        messUsername: null,
        checkEmail: null
    }
    userList.forEach((obj) => {
        if (obj.username == username.value.toLowerCase().trim()) {
            check.status = true;
            check.messUsername = "Tài khoản đã tồn tại";
        }
        if (obj.phone == phone.value.trim()) {
            check.status = true;
            check.messPhone = "Số điện thoại đã tồn tại";
        }
        if (obj.email === email.value.toLowerCase().trim()) {
            check.status = true;
            check.messEmail = "Email đã tồn tại";
        }
    });
    if (check.status) {
        if (check.messPhone != null) {
            err_input(phone, check.messPhone);
        }
        if (check.messUsername != null) {
            err_input(username, check.messUsername);
        }
        if(checkEmail.messEmail !== null){
            err_input(email, check.messEmail);
        }
        return false;
    }

    //nếu tất cả ổn
    let id = userList[0].id;
    while(userList.some((obj) => {
        return obj.id === id;
    })){
        id = Math.floor(Math.random() * (userList.length+1)) + 1;
    }

    let objType = {
        0: "customer",
        1: "employer",
        2: "admin"
    }

    // Phường hoặc Xã
    const wardInfo = document.querySelector(".ward :checked").innerText;
    // Quận hoặc Huyện
    const districtInfo = document.querySelector(".district :checked").innerText;
    // Tỉnh thành
    const cityInfo = document.querySelector(".city :checked").innerText;
   let tmpAddress = street.value.trim() + ", " + wardInfo + ", " + districtInfo + ", " + cityInfo;

    let data = {
        type: objType[type.value],
        blockStatus: false,
        statusLogin: false,
        id: id,
        username: username.value.trim(),
        password: password.value.trim(),
        email: email.value.trim(),
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim(),
        phone: phone.value.trim(),
        address: tmpAddress,
        shoppingCart: []
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

function checkErrorAddEdit(username, password, phone, firstName, lastName, email, address, street){
    if (username.value === "" || password.value === "" || phone.value === "" || firstName.value === "" || lastName.value === "" || email.value === "") {
        err_input(username);
        err_input(password);
        err_input(phone);
        err_input(firstName);
        err_input(lastName);
        err_input(email);
        return false;
    }

      let tmp = username.value.trim().toLowerCase();
      for(let k=0; k<username.value.trim().length; k++){
        if(!( tmp.charAt(k) >= 'a' && tmp.charAt(k)  <= 'z' || tmp.charAt(k)  >= '0' && tmp.charAt(k)  <= '9')){
          err_input(username, "Cần chữ thường");
          return false;
        }
      }
  
   for(const char of firstName.value.trim()){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]/.test(char)){
      err_input(firstName, "Cần nhập chữ");
      return;
    }
  }
  for(const char of lastName.value.trim()){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]/.test(char)){
      err_input(lastName, "Cần nhập chữ");
      return;
    }
  }

    //nếu không đúng số điện thoại
    let checkPhone = checkNumberPhone(phone.value.trim());
    if(!checkPhone){
        err_input(phone, "Sai định dạng");
        return false;
    }

    if(!checkEmail(email.value.trim())){
        err_input(email, "Email cần đúng định dạng");
        return false;
    }

    // if(!checkAddress(address.value)){
    //     err_input(address, "Cần thông tin cụ thể");
    //     return false;
    // }

    // Phường hoặc Xã
    const wardInfo = document.querySelector(".ward :checked").innerText;
    // Quận hoặc Huyện
    const districtInfo = document.querySelector(".district :checked").innerText;
    // Tỉnh thành
    const cityInfo = document.querySelector(".city :checked").innerText;

    if(address.value === ""){
        if(street.value===""){
            err_input(street);
            return false;
        }
        if(cityInfo === "Chọn Tỉnh thành"){
        err_input(document.querySelector(".city :checked"), null, true);
        return false;
        }
        if(districtInfo === "Chọn Quận / Huyện"){
        err_input(document.querySelector(".district :checked"), null, true);
        return false;
        }
    }

    return true;
}

