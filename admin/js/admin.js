import { createNotificationAdmin, err_input } from "./base/baseFunction.js";

loginAdmin();
console.log(123);

function loginAdmin(){
    document.querySelector(".login").onclick = (e) => {
        e.preventDefault();
        let result = handleLoginAdmin();
        if(result){
            location.assign(location.origin + "/admin/index2.html");  
        }
        else{
            document.querySelector("#account-admin").value = "";
            document.querySelector("#password-admin").value = "";
        }
    }
}

function handleLoginAdmin(){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let account = document.querySelector("#account-admin");
    let password = document.querySelector("#password-admin");

    if(account.value === "" || password.value === ""){
        err_input(account);
        err_input(password);
        return false;
    }

  // lấy người có tên đăng nhập là account
  let check = null;
  userList.some((obj, index) => {
    if (account.value === obj.username) {
      check = userList[index];
      return;
    }
  });

  // nếu không có ai thì tên đăng nhập không tồn tại
  if (!check) {
    err_input(account, "*Lỗi! Tài khoản không tồn tại");
    // password.setAttribute("placeholder", "Nhập mật khẩu");
    return false;
  }
  // kiểm tra  password giống không
  let p = false;
  if (check.password === password.value) p = true;
  // nếu không là .....
  if (!p) {
    err_input(password, "*Lỗi! Mật không không chính xác");
    return false;
  }

  //lấy vị trị của account trong userList
  let indexOfAccount = userList.findIndex((obj) => {
    return obj.username === account.value;
  });
  //kiểm tra xem tài khoản thuộc loại gì
  if (userList[indexOfAccount].type !== "admin") {
   createNotificationAdmin("Tài khoản không thuộc loại admin!");
    return false;
  }
  //kiểm tra xem account có bị admin khóa hay không
  if (userList[indexOfAccount].blockStatus) {
   createNotificationAdmin("Tài khoản bị khóa!");
    return false;
  }

  //update vị trí account của người dùng đang đăng nhập lên local
  localStorage.setItem(
    "indexCurrentUserLogin",
    JSON.stringify(indexOfAccount)
  );
  return true;
}