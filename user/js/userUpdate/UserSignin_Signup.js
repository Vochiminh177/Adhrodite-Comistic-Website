//--Hiệu-----


import {check_user, add_user} from "./handleUserUpdate.js";
import { usersList } from "../../../admin/js/database.js"
import { updateMainContent } from "../home-js/changeMainContent.js";


let userList = JSON.parse(localStorage.getItem("userList")) || [];
if (userList.length == 0) {
    userList = [...usersList];
    localStorage.setItem("userList", JSON.stringify(userList));
}

console.log(userList);

// document.querySelector("#user-click").addEventListener("click", () => {
//     //đăng nhập tài khoản 
//     document.querySelector(".btn-signin").addEventListener("click", () => {
//         let username = document.querySelector("#username").value;
//         let password = document.querySelector("#password").value;

//         let result = check_user(username, password);

//         //nếu đăng nhập thành công
//         if (result.status) {
//             alert(result.mess);
//             // Xóa changeUserFormInMenuHeaderScript--------Xem hàm trong phần import 
//             const changeUserFormInMenuHeaderExistingScript = document.querySelector(
//                 ".change-user-form-in-menu-header-script"
//             );
//             if (changeUserFormInMenuHeaderExistingScript) {
//                 changeUserFormInMenuHeaderExistingScript.remove();
//             }

//             // Xử lý sự kiện
//             const userModal = document.getElementById("user-modal");
//             const userBlock = document.getElementById("user-block");
//             const userExit = document.getElementById("user-exit");
            
//             userModal.style.visibility = "hidden";
//             userBlock.style.visibility = "hidden";
//             userExit.style.visibility = "hidden";
//             //--------------------------------------------------------

//             //--vô trang Trang chủ khi đăng nhập thành công
//             updateMainContent("home");
//         }
//         else alert(result.mess);
//     });
//     //------------------------------------

//     //đăng ký tài khoản
//     // document.querySelector(".a-signup").addEventListener("click", (e) => {
//     //     e.preventDefault();
//     //     console.log(document.querySelector(".btn-signup"))
//     //     document.querySelector(".btn-signup").addEventListener("click", () => {
//     //         let username = document.querySelector(".username-signup").value;
//     //         let password = document.querySelector(".password-signup").value;
//     //         let email = document.querySelector(".email-signup").value;

//     //         let result = add_user(username, password, email);
            
//     //         //nếu đăng ký thành công
//     //         if (result.status) {
//     //             alert(result.mess);
//     //         }
//     //         //nếu đăng ký thât bại
//     //         else alert(result.mess);
//     //     });
//     // });
// });


