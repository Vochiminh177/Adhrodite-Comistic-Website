//-Hiệu------
import { usersList } from "../../../admin/js/database.js";
import { reset_style_input, delete_space } from "../../../admin/js/show_updateProduct/handleUpdate_Product.js";

function error_input(input, mess){
    let parent = input.parentElement;

    //nếu là checkbox
    if(input.type == "checkbox"){
      if(!input.checked){
        parent.querySelector("p").style.color = "red";
  
        input.onchange = () => {
          parent.querySelector("p").style.color = "black";
        };
      }
    }
    //nếu là text
    else{
        if(parent.querySelector("span") == null){  
            //nếu có tồn tại mess (trường hợp không phải input rỗng)
            if(mess){
                input.style.borderBottom = "1px solid red";
                let text = document.createElement("span");
                text.style.color = "red";
                text.style.fontSize = "1.2rem";    
                text.innerText = mess;
                parent.appendChild(text);
                input.onchange = () => {
                    text.remove();
                    input.style.borderBottom = "1px solid #ccc";
                };
            }

            //nếu input rỗng
            if(input.value == ""){      
                input.style.borderBottom = "1px solid red";
                let text = document.createElement("span");
                text.style.color = "red";
                text.style.fontSize = "1.2rem";    
                text.innerText = "*Lỗi! Không được để trống";
                parent.appendChild(text);
                input.onchange = () => {
                    text.remove();
                    input.style.borderBottom = "1px solid #ccc";
                };
            }

            //còn lại không có lỗi
            
        }
    }
}

// kiểm tra thông tin đăng nhập
export function handle_sign_in() {
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if(userList.length == 0){
        userList = [...usersList];
        localStorage.setItem("userList", JSON.stringify(userList));
    }

    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    if(username.value === "" || password.value === ""){
        error_input(username)
        error_input(password);
        return false;
    }

    // lấy người có tên đăng nhập là username
    let check = null;
    userList.some((obj, index) => {
        if(username.value === obj.username){
            check = userList[index];
            return;
        }
    });

    // nếu không có ai thì tên đăng nhập không tồn tại
    if (!check) {
        error_input(username, "*Lỗi! Tài khoản không tồn tại");
        return false;
    }

    // kiểm tra  password giống không
    let p = false;
    if(check.password === password.value) p=true;
    // nếu không là .....
    if (!p) {
        error_input(password, "*Lỗi! Mật không không chính xác");
        return false;
    }

    // có thì đăng nhập thành công
    return true;
}

//kiểm tra khi đăng ký
export function handle_sign_up(){
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if(userList.length == 0){
        userList = [...usersList];
        localStorage.setItem("userList", JSON.stringify(userList));
    }

    let username = document.querySelector(".username-signup");
    let password = document.querySelector(".password-signup");
    let second_password = document.querySelector("#second-password");
    let email = document.querySelector(".email-signup");
    let check_accept_privacy = document.querySelector(".accept-privacy");

    let check_empty = false;
    if(username.value === "" || password.value === "" || !check_accept_privacy.checked){
        error_input(username)
        error_input(password);
        error_input(second_password);
        error_input(email);
        error_input(check_accept_privacy);
        check_empty = true;
    }

    //kiểm tra xem tài khoản đã tồn tại chưa
    let check = {
        status: true,
        mess_username: null,
        mess_email: null
    };
    userList.some((obj) => {
        if(obj.username === delete_space(username.value)){
            check.mess_username = "*Tên đăng nhập đã tồn tại!"
            check.status = false;
            return;
        }
    });
    userList.some((obj) => {
        if(obj.email === delete_space(email.value)){
            check.mess_email = "*Email đã tồn tại!";
            check.status = false;
            return;
        }
    });
    if(!check.status){
        error_input(username, check.mess_username);
        error_input(username, check.mess_email);
        return false;
    }

    if(check_empty) return;

    let id_user = userList[0].id;
    while (userList.some((obj) => {
        return obj.id == id_user;
    })) {
        id_user = Math.floor(Math.random() * 100) + 1;
    }
    var data_obj = {
        id: id_user,
        username: username.value,
        password: password.value,
        email: email.value,
        remember_password: false
    }

    //thêm vào mảng
    userList.push(data_obj);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

//hàm đổi mật khẩu
export function handle_change_password(){
    let userList = JSON.parse(localStorage.getItem("userList"));
    let username = document.querySelector("#username-change");
    let old_password = document.querySelector("#old-password-change");
    let new_password = document.querySelector("#new-password-change");

    let check_empty = false;
    if(username.value == "" || old_password.value == "" || new_password.value == ""){
        error_input(username);
        error_input(old_password);
        error_input(new_password);
        check_empty = true;
    }

    // lấy người có tên đăng nhập là username
    let check = null;
    userList.some((obj, index) => {
        if(username.value === obj.username){
            check = userList[index];
            return;
        }
    });

    // nếu không có ai thì tên đăng nhập không tồn tại
    if (!check) {
        error_input(username, "*Lỗi! Tài khoản không tồn tại");
        return false;
    }

    // kiểm tra có password giống không
    let p = false;
    if(check.password === old_password.value) p=true;
    // nếu không là .....
    if (!p) {
        error_input(old_password, "*Lỗi! Mật không không chính xác");
        return false;
    }

    if(check_empty) return;

    //nếu đổi thành công
    userList.some((obj, index) => {
        if(username.value === obj.username){
            userList[index].password = new_password.value;
            return;
        }
    });

    username.value = "";
    old_password.value = "";
    new_password.value = "";
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}