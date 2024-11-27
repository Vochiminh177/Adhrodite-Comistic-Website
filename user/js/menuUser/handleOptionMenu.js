//-----------------------------------HANDLE DATA USER----------------------------------------

import { errorInput } from "../userUpdate/handleUserUpdate.js";

function checkNumberPhone(value) {
  if (!isNaN(value)) {
    return value == Math.round(value) && value.length == 10;
  }
}
//hàm đổi mật khẩu
export function handleChangePassword() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  let username = document.querySelector("#username-change");
  let oldPassword = document.querySelector("#old-password-change");
  let newPassword = document.querySelector("#new-password-change");

  if (
    username.value == "" ||
    oldPassword.value == "" ||
    newPassword.value == ""
  ) {
    errorInput(username);
    errorInput(oldPassword);
    errorInput(newPassword);
    return false;
  }

  // lấy người có tên đăng nhập là username
  let check = null;
  userList.some((obj, index) => {
    if (username.value === obj.username) {
      check = userList[index];
      return;
    }
  });

  // nếu không có ai thì tên đăng nhập không tồn tại
  if (!check) {
    errorInput(username, "*Lỗi! Tài khoản không tồn tại");
    return false;
  }

  // kiểm tra có password giống không
  let p = false;
  if (check.password === oldPassword.value) p = true;
  // nếu không là .....
  if (!p) {
    errorInput(oldPassword, "*Lỗi! Mật không không chính xác");
    return false;
  }

  //nếu đổi thành công
  userList.some((obj, index) => {
    if (username.value === obj.username) {
      userList[index].password = newPassword.value;
      return;
    }
  });
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

  let check = userList.some((obj, i) => {
    if (i != indexCurrentUserLogin) return obj.phone === phone.value;
  });
  if (check) {
    errorInput(phone, "*Lỗi! Đã tồn tại số điện thoại");
    return false;
  }

  if (phone.value < 0 || !checkNumberPhone(phone.value)) {
    errorInput(phone, "Cần nhập đúng định dạng số điện thoại");
    return false;
  }

  console.log(userList[indexCurrentUserLogin]);

  userList[indexCurrentUserLogin].first_name = firstName.value;
  userList[indexCurrentUserLogin].last_name = lastName.value;
  userList[indexCurrentUserLogin].email = email.value;
  userList[indexCurrentUserLogin].phone = phone.value;
  userList[indexCurrentUserLogin].address = address.value;

  localStorage.setItem("userList", JSON.stringify(userList));
  console.log(userList);
  return true;
}
