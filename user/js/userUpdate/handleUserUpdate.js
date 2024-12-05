import { handleAdmin } from "../home-js/adminClick.js";
import { checkEmail } from "../menuUser/handleOptionMenu.js";
import { create_notification_user } from "../menuUser/optionMenu.js";
import { userList } from "../../../database/database.js";

//hàm return về chuỗi placeholder ban đầu
export function resetDefaultInputForUser(input) {
  input.classList.remove("err-text");
  if (input.className === "username-change") {
    return "Nhập tên tài khoản";
  }
  if (input.className === "old-password-change") return "Nhập mật khẩu cũ";
  if (input.className === "new-password-change") return "Nhập mật khẩu mới";
  if (input.className === "username-login") return "Nhập tên tài khoản";
  if (input.className === "password-login") return "Nhập mật khẩu";
  if (input.className === "username-signup") return "Nhập tên tài khoản";
  if (input.className === "email-signup") return "Nhập email";
  if (input.id === "first-password") return "Nhập mật khẩu";
  if (input.id === "second-password") return "Nhập lại mật khẩu";
  if (input.className === "first-name") return "Nhập họ";
  if (input.className === "last-name") return "Nhập tên";
  if (input.className === "phone") return "Nhập số điện thoại";
  if (input.className === "email") return "Nhập email";
  if (input.id === "username-change") return "Nhập tên tài khoản";
  if (input.id === "old-password-change") return "Nhập mật khẩu cũ";
  if (input.id === "new-password-change") return "Nhập mật khẩu mới";
  if(input.className === "payment-information-info__firstName") return "Họ";
  if(input.className === "payment-information-info__lastName") return "Tên";
  if(input.className === "payment-information-info__email") return "Email";
  if(input.className === "payment-information-info__address") return "Số nhà và đường";
  if(input.className === "payment-information-info__phone") return "Số điện thoại";
  if(input.className === "street") return "Số nhà và đường"
}
//hàm báo lỗi input
export function errorInput(input, mess, checkSelect) {
  if(checkSelect){
    console.log(input);
    input.parentElement.style.border = "2px solid red";
    return;
  }

  if (input.type == "checkbox") {
    let parent = input.parentElement;
    if (!input.checked) {
      parent.querySelector("p").style.color = "red";
      input.onclick = () => {
        parent.querySelector("p").style.color = "black";
      };
    }
    return;
  }


  if (mess) {
    input.value = "";
    input.placeholder = mess;
    input.onfocus = () => {
      input.placeholder = resetDefaultInputForUser(input);
    };
      //nếu là text, có tồn tại mess (trường hợp không phải input rỗng)
  input.classList.add("err-text");
    return;
  }
  //nếu input rỗng
  if (input.value == "") {
    input.placeholder = "Thiếu dữ liệu!";
    input.style.color = "#000";
    input.onfocus = () => {
      input.placeholder = resetDefaultInputForUser(input);
    };
      //nếu là text, có tồn tại mess (trường hợp không phải input rỗng)
  input.classList.add("err-text");
    return;
  }
  //còn lại không có lỗi
}

// kiểm tra thông tin đăng nhập
export function handleSignIn() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (username.value === "" || password.value === "") {
    errorInput(username);
    errorInput(password);
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
    password.setAttribute("placeholder", "Nhập mật khẩu");
    return false;
  }
  // kiểm tra  password giống không
  let p = false;
  if (check.password === password.value) p = true;
  // nếu không là .....
  if (!p) {
    errorInput(password, "*Lỗi! Mật không không chính xác");
    return false;
  }

  //lấy vị trị của username trong userList
  let indexOfUsername = userList.findIndex((obj) => {
    return obj.username === username.value;
  });
  //kiểm tra xem tài khoản thuộc loại gì
  if (userList[indexOfUsername].type !== "customer") {
    create_notification_user("Tài khoản không thuộc loại khách hàng!");
    return false;
  }
  //kiểm tra xem username có bị admin khóa hay không
  if (userList[indexOfUsername].blockStatus) {
    create_notification_user("Tài khoản bị khóa!");
    return false;
  }
  // if (userList[indexOfUsername].type === "admin") {
  //   document
  //     .querySelector(".header__admin-icon")
  //     .style.setProperty("visibility", "visible");
  //   handleAdmin();
  // }

  //update vị trí username của người dùng đang đăng nhập lên local
  localStorage.setItem(
    "indexCurrentUserLogin",
    JSON.stringify(indexOfUsername)
  );
  return true;
}

//kiểm tra khi đăng ký
export function handleSignUp() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  let username = document.querySelector(".username-signup");
  let password = document.querySelector(".password-signup");
  let second_password = document.querySelector("#second-password");
  let email = document.querySelector(".email-signup");
  let check_accept_privacy = document.querySelector(".accept-privacy");

  if (
    username.value === "" ||
    password.value === "" ||
    !check_accept_privacy.checked ||
    email.value === ""
  ) {
    errorInput(username);
    errorInput(password);
    errorInput(second_password);
    errorInput(email);
    errorInput(check_accept_privacy);
    return false;
  }

  if (!checkEmail(email)) {
    errorInput(email, "Cần nhập đúng định dạng email");
    return false;
  }
    //kiểm tra xem tài khoản và email đã tồn tại chưa
    let check = {
        status: false,
        mess_username: null,
        mess_email: null
    };
    userList.forEach((obj) => {
        if(obj.username === username.value){
            check.mess_username = "*Tên đăng nhập đã tồn tại!"
            check.status = true;
        }
    });
    userList.forEach((obj) => {
        if(obj.email === email.value){
            check.mess_email = "*Email đã tồn tại!";
            check.status = true;
        }
    });
    if(check.status){
        errorInput(username, check.mess_username);
        errorInput(email, check.mess_email);
        return false;
    }

  if (password.value != second_password.value) {
    errorInput(second_password, "*Lỗi! Mật khẩu cần giống nhau");
    return false;
  }

  let userID = userList[0].id;
  while (
    userList.some((obj) => {
      return obj.id == userID;
    })
  ) {
    userID = Math.floor(Math.random() * userList.length + 1) + 1;
  }
  var data_obj = {
    type: "customer",
    bloclStatus: false,
    id: userID,
    username: username.value,
    password: password.value,
    email: email.value,
    first_name: null,
    last_name: null,
    phone: null,
    shoppingCart: [],
  };

  //thêm vào mảng
  userList.push(data_obj);
  localStorage.setItem("userList", JSON.stringify(userList));

  return true;
}

// let username = document.querySelector(".username-signup");
// let password = document.querySelector(".password-signup");
// let second_password = document.querySelector("#second-password");
// let email = document.querySelector(".email-signup");
// let check_accept_privacy = document.querySelector(".accept-privacy");

// if (
//   username.value === "" ||
//   password.value === "" ||
//   !check_accept_privacy.checked ||
//   email.value == ""
// ) {
//   errorInput(username);
//   errorInput(password);
//   errorInput(second_password);
//   errorInput(email);
//   errorInput(check_accept_privacy);
//   return false;
// }

// //kiểm tra xem tài khoản đã tồn tại chưa
// let check = {
//   status: false,
//   mess_username: null,
//   mess_email: null,
// };
// userList.forEach((obj) => {
//   if (obj.username === username.value) {
//     check.mess_username = "*Tên đăng nhập đã tồn tại!";
//     check.status = true;
//     return;
//   }
// });
// userList.forEach((obj) => {
//   if (obj.email === email.value) {
//     check.mess_email = "*Email đã tồn tại!";
//     check.status = true;
//     return;
//   }
// });
// if (check.status) {
//   console.log(check.mess_username);
//   errorInput(username, check.mess_username);
//   errorInput(email, check.mess_email);
//   return false;
// }

// if (password.value != second_password.value) {
//   errorInput(second_password, "*Lỗi! Mật khẩu cần giống nhau");
//   return false;
// }

// let userID = userList[0].id;
// while (
//   userList.some((obj) => {
//     return obj.id == userID;
//   })
// ) {
//   userID = Math.floor(Math.random() * userList.length + 1) + 1;
// }
// console.log(userID);
// var data_obj = {
//   type: "customer",
//   bloclStatus: false,
//   id: userID,
//   username: username.value,
//   password: password.value,
//   email: email.value,
//   first_name: null,
//   last_name: null,
//   phone: null,
//   shoppingCart: [],
// };

// //thêm vào mảng
// userList.push(data_obj);
// localStorage.setItem("userList", JSON.stringify(userList));
// return true;
