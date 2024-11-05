//-Hiệu------
import { usersList } from "../../../admin/js/database.js";
import { delete_space } from "../../../admin/js/show_updateProduct/handleUpdate_Product.js";


//hàm báo lỗi input
function error_input(input, mess){
    //nếu là file
    if(input.type == "file"){
        input.style.borderBottom = "1px solid red";
        input.onclick = () => {
            input.style.borderBottom = "1px solid #ccc";
        };
        return;
    }
    //nếu là checkbox
    if(input.type == "checkbox"){
        let parent = input.parentElement;
        if(!input.checked){
            parent.querySelector("p").style.color = "red";
            input.onchange = () => {
                parent.querySelector("p").style.color = "black";
            };
        }
        return;
    }
    //nếu là text, có tồn tại mess (trường hợp không phải input rỗng)
    input.classList.add("err-text");
    let text = input.placeholder;
    if(mess){
        input.style.borderBottom = "1px solid red";
        input.value = "";
        input.placeholder = mess;
        input.onclick = () => {
            input.style.borderBottom = "1px solid #ccc";
            input.placeholder = text;
            input.classList.remove("err-text");
        };
        return;
    }
    //nếu input rỗng
    if(input.value == ""){
        input.style.borderBottom = "1px solid red";
        input.placeholder = "*Lỗi! Không được để trống";
        input.onclick = () => {
            input.placeholder = text;
            input.style.borderBottom = "1px solid #ccc";
            input.classList.remove("err-text");
        };
        return;
    }
    //còn lại không có lỗi  
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
    userList.forEach((obj) => {
        if(username.value === obj.username){
            obj.status_login = true;
            return;
        }
    });
    localStorage.setItem("userList", JSON.stringify(userList));
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
        status_login: false,
        id: id_user,
        username: username.value,
        password: password.value,
        email: email.value,
        remember_password: false,
        first_name: "null",
        last_name: "null",
        phone: "null",
        address: "null",
        stk: "null",
        bank: "null",
        src: "null" 
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

//Hàm lấy hình ảnh để upload 
var path_picture_user = null;
function handlePicture_user(){
    let inputPicture = document.querySelector(".picture-profile");

    inputPicture.onchange = () => {
        path_picture_user = URL.createObjectURL(inputPicture.files[0]);
    };
}

//hàm lấy thông tin người dùng
export function handle_get_data_information(index_user_status_login){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let first_name = document.querySelector(".first-name");
    let last_name = document.querySelector(".last-name");
    let email = document.querySelector(".email-info");
    let phone = document.querySelector(".phone");
    let address = document.querySelector(".address");
    let inputPicture = document.querySelector(".picture-profile");
    handlePicture_user();

    let check_empty = false;
    if(first_name.value == "" || last_name.value == "" || email.value == "" || phone.value == "" || address.value == "" || path_picture_user == null){
        error_input(first_name);
        error_input(last_name);
        error_input(email);
        error_input(phone);
        error_input(address);
        if(path_picture_user == null){
            error_input(inputPicture);
        }
        check_empty = true;
    }

    let check = userList.some((obj) => {
        return obj.phone === phone.value;
    });
    if(check){
        error_input(phone, "*Lỗi! Đã tồn tại số điện thoại");
        path_picture_user = null;
        return false;
    }
    if(check_empty){
        path_picture_user = null;
        return false;
    }

    userList[index_user_status_login] = {
        status_login: true,
        id: userList[index_user_status_login].id,
        username: userList[index_user_status_login].username,
        password: userList[index_user_status_login].password,
        email: userList[index_user_status_login].email,
        remember_password: false,
        first_name: first_name.value,
        last_name: last_name.value,
        phone: phone.value,
        address: address.value,
        stk: "null",
        bank: "null",
        src: path_picture_user
    };

    localStorage.setItem("userList", JSON.stringify(userList));
    path_picture_user = null;
    return true;
}