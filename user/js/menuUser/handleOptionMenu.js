//-----------------------------------HANDLE DATA USER----------------------------------------

import { errorInput } from "../userUpdate/handleUserUpdate.js";

function checkNumberPhone(value) {
  if (!isNaN(value)) {
    return value == Math.round(value) && value.length == 10;
  }
}

//hàm kiểm tra định dạng email
export function checkEmail(email) {
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
//hàm đổi mật khẩu
export function handleChangePassword() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"));
  let oldPassword = document.querySelector("#old-password-change");
  let newPassword = document.querySelector("#new-password-change");

  if (
    oldPassword.value == "" ||
    newPassword.value == ""
  ) {
    errorInput(oldPassword);
    errorInput(newPassword);
    return false;
  }
  
  // kiểm tra có password giống không
  if(userList[indexCurrentUserLogin].password !== oldPassword.value){
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
  let address = document.querySelector(".form-user .address");

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    email.value === "" ||
    phone.value === "" ||
    address.value === ""
  ) {
    errorInput(firstName);
    errorInput(lastName);
    errorInput(email);
    errorInput(phone);
    errorInput(address);
    return false;
  }

  if (phone.value < 0 || !checkNumberPhone(phone.value)) {
    errorInput(phone, "Cần nhập đúng định dạng số điện thoại");
    return false;
  }
  let check = userList.some((obj, i) => {
    if (i != indexCurrentUserLogin) return obj.phone === phone.value;
  });
  if (check) {
    errorInput(phone, "*Lỗi! Đã tồn tại số điện thoại");
    return false;
  }

  if(!checkEmail(email.value)){
    errorInput(email, "Email cần đúng định dạng");
    return false;
  }
  let checkExistEmail = userList.some((obj, i) => {
    if (i != indexCurrentUserLogin) return obj.email === email.value;
  });
  if(checkExistEmail) {
    errorInput(email, "Email đã tồn tại");
    return false;
  }

  userList[indexCurrentUserLogin].first_name = firstName.value;
  userList[indexCurrentUserLogin].last_name = lastName.value;
  userList[indexCurrentUserLogin].email = email.value;
  userList[indexCurrentUserLogin].phone = phone.value;
  userList[indexCurrentUserLogin].address = address.value;

  localStorage.setItem("userList", JSON.stringify(userList));
  return true;
}
