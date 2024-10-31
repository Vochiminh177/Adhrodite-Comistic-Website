//-Hiệu------
import { usersList } from "../../../admin/js/database.js";
import { reset_style_input, delete_space } from "../../../admin/js/show_updateProduct/handleUpdate_Product.js";

function error_input(input, mess){
    let parent = input.parentElement;

    if(input.type == "checkbox"){
      if(!input.checked){
        parent.querySelector("p").style.color = "red";
  
        input.onchange = () => {
          parent.querySelector("p").style.color = "black";
        };
      }
    }
    else{
        if(parent.querySelector("span") == null){  
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
            
        }
    }
}

// kiểm tra thông tin đăng nhập
export function check_user() {
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

    // lấy toàn bộ người có tên đăng nhập là username
    let check = userList.filter((obj) => {
        return username.value === obj.username;
    });

    // nếu không có ai thì tên đăng nhập không tồn tại
    if (!check.length) {
        error_input(username, "Tài khoản không tồn tại");
        return false;
    }

    // kiểm tra trong array đó có người có password giống không
    let a = check.find((obj) => obj.password === password.value)
    // nếu không là .....
    if (!a) {
        error_input(password, "Mật không không chính xác");
        return false;
    }

    // có thì đăng nhập thành công
    return true;
}

export function add_user(){
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
