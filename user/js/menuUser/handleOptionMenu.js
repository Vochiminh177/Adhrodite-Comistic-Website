//-----------------------------------HANDLE DATA USER----------------------------------------

import { locationToSelectArray } from "../../../database/database.js";
import { errorInput } from "../userUpdate/handleUserUpdate.js";

export function checkAddress(value){
  if(value === "") return false;
  if(!value.toLowerCase().includes("phường")) return false;
  if(!value.toLowerCase().includes("quận")) return false;
  if(!value.toLowerCase().includes("thành phố")) return false;
  return true;
}

export function checkNumberPhone(value){
  if(value.length !== 10) return false;
  if(value.charAt(0) !== '0') return false;
  for(let i=0; i<value.length; i++){
      if(!(value.charAt(i) >= '0' && value.charAt(i) <= '9')){
          return false;
      }
  }
  return true;
}

//hàm kiểm tra định dạng email
export function checkEmail(value){
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
//hàm đổi mật khẩu
export function handleChangePassword() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let indexCurrentUserLogin = JSON.parse(
    localStorage.getItem("indexCurrentUserLogin")
  );
  let oldPassword = document.querySelector("#old-password-change");
  let newPassword = document.querySelector("#new-password-change");

  if (oldPassword.value == "" || newPassword.value == "") {
    errorInput(oldPassword);
    errorInput(newPassword);
    return false;
  }

  // kiểm tra có password giống không
  if (userList[indexCurrentUserLogin].password !== oldPassword.value) {
    errorInput(oldPassword, "Mật khẩu không chính xác");
    return false;
  }

  //nếu đổi thành công
  userList[indexCurrentUserLogin].password = newPassword.value;
  localStorage.setItem("userList", JSON.stringify(userList));
  return true;
}

//hàm lưu thông tin người dùng
export function handleSaveDateInformation(indexCurrentUserLogin) {
  let userList = JSON.parse(localStorage.getItem("userList"));

  let firstName = document.querySelector(".form-user .first-name");
  let lastName = document.querySelector(".form-user .last-name");
  let email = document.querySelector(".form-user .email");
  let phone = document.querySelector(".form-user .phone");
  // let address = document.querySelector(".form-user .address");
  const citySelect = document.querySelector(".city");
  const districtSelect = document.querySelector(".district");
  const wardSelect = document.querySelector(".ward");
  let street = document.querySelector(".street");

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    email.value === "" ||
    phone.value === "" 
    // ||
    // address.value === ""
  ) {
    errorInput(firstName);
    errorInput(lastName);
    errorInput(email);
    errorInput(phone);
    // errorInput(address);
    return false;
  }

  for(const char of firstName.value){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]/.test(char)){
      errorInput(firstName, "Cần nhập chữ");
      return;
    }
  }
  for(const char of lastName.value){
    if(!/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]/.test(char)){
      errorInput(lastName, "Cần nhập chữ");
      return;
    }
  }

  if (!checkNumberPhone(phone.value)) {
    errorInput(phone, "Sai định dạng");
    return false;
  }
  let check = userList.some((obj, i) => {
    if (i != indexCurrentUserLogin) return obj.phone === phone.value;
  });
  if (check) {
    errorInput(phone, "Số điện thoại đã tồn tại");
    return false;
  }
  if (!checkEmail(email.value)) {
    errorInput(email, "Sai định dạng");
    return false;
  }
  let checkExistEmail = userList.some((obj, i) => {
    if (i != indexCurrentUserLogin) return obj.email === email.value;
  });
  if(checkExistEmail) {
    errorInput(email, "Email đã tồn tại");
    return false;
  }
  // if(!checkAddress(address.value)){
  //   errorInput(address, "Sai định dạng");
  //   return false;
  // }
  const formGroupAddress = document.querySelector("form.form-user .form-group-address");
  if(formGroupAddress.classList.contains("active")){
    // Phường hoặc Xã
    const wardInfo = document.querySelector(".ward :checked").innerText;
    // Quận hoặc Huyện
    const districtInfo = document.querySelector(".district :checked").innerText;
    // Tỉnh thành
    const cityInfo = document.querySelector(".city :checked").innerText;

    if(street.value === ""){
      errorInput(street);
      return false;
    }
    if(cityInfo === "Chọn Tỉnh thành"){
      errorInput(document.querySelector(".city :checked"), null, true);
      return false;
    }
    if(districtInfo === "Chọn Quận / Huyện"){
      errorInput(document.querySelector(".district :checked"), null, true);
      return false;
    }
    let tmpAddress = street.value + ", " + wardInfo + ", " + districtInfo + ", " + cityInfo;
    
    userList[indexCurrentUserLogin].address = tmpAddress;
    document.querySelector("form.form-user input.street").setAttribute("placeholder", "Nhập số nhà và đường mới");
    document.querySelector("form.form-user input.street").setAttribute("value", "");
    document.querySelector("form.form-user input.street").value = "";
    document.querySelector("form.form-user input.address").setAttribute("value", tmpAddress);
    document.querySelector("form.form-user input.address").value = tmpAddress;
  }
  userList[indexCurrentUserLogin].first_name = firstName.value;
  userList[indexCurrentUserLogin].last_name = lastName.value;
  userList[indexCurrentUserLogin].email = email.value;
  userList[indexCurrentUserLogin].phone = phone.value;
  
  localStorage.setItem("userList", JSON.stringify(userList));
  return true;
}
