//-Hiệu------
import { usersList } from "../../../database/database.js";
import { delete_space } from "../../../admin/js/show_updateProduct/handleUpdate_Product.js";


//hàm báo lỗi input
function error_input(input, mess){
    //nếu là file
    if(input.type == "file"){''
        input.style.borderBottom = "1px solid red";
        input.change = () => {
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
    
    if(mess){
        let text = input.placeholder;
        console.log(text);
        input.style.borderBottom = "1px solid red";
        input.value = "";
        input.placeholder = mess;
        console.log(input.placeholder);
        input.onchange = () => {
            input.style.borderBottom = "1px solid #ccc";
            input.placeholder = text;
            input.classList.remove("err-text");
        };
        return;
    }
    //nếu input rỗng
    if(input.value == ""){
        let text = input.placeholder;
        input.style.borderBottom = "1px solid red";
        input.placeholder = "*Lỗi! Không được để trống";
        input.onchange = () => {
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
        console.log(username.value);
        error_input(username)
        error_input(password);
        error_input(second_password);
        error_input(email);
        error_input(check_accept_privacy);
        check_empty = true;
    }

    //kiểm tra xem tài khoản đã tồn tại chưa
    let check = {
        status: false,
        mess_username: null,
        mess_email: null
    };
    userList.forEach((obj) => {
        if(obj.username === delete_space(username.value)){
            check.mess_username = "*Tên đăng nhập đã tồn tại!"
            check.status = true;
            return;
        }
    });
    userList.forEach((obj) => {
        if(obj.email === delete_space(email.value)){
            check.mess_email = "*Email đã tồn tại!";
            check.status = true;
            return;
        }
    });
    if(check.status){
        console.log(check.mess_username);
        error_input(username, check.mess_username);
        error_input(email, check.mess_email);
        return false;
    }
    
    if(password.value != second_password.value){
        error_input(second_password, "*Lỗi! Mật khẩu cần giống nhau");
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
        full_info: false,
        full_money: false,
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
        ma_the: "null",
        code_the: "null",  
        bank: "null",
        purchase_method: "null",
        src: null,
        shoppingCart: [],
        ordersHistory: []
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

    if(check_empty) return;

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



//hàm lưu thông tin người dùng
export function handle_save_data_information(index_user_status_login, path_picture_user){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let first_name = document.querySelector(".first-name");
    let last_name = document.querySelector(".last-name");
    let email = document.querySelector(".email-info");
    let phone = document.querySelector(".phone");
    let address = document.querySelector(".address");

    let check_empty = false;
    if(first_name.value === "" || last_name.value === "" || email.value === "" || phone.value === "" || address.value === ""){
        error_input(first_name);
        error_input(last_name);
        error_input(email);
        error_input(phone);
        error_input(address);
        check_empty = true;
    }

    let check = userList.some((obj, i) => {
        if(i != index_user_status_login)
            return obj.phone === phone.value;
    });
    if(check){
        error_input(phone, "*Lỗi! Đã tồn tại số điện thoại");
        path_picture_user.src = null;
        return false;
    }
    if(check_empty){
        path_picture_user.src = null;
        return false;
    }

    userList[index_user_status_login].first_name = first_name.value;
    userList[index_user_status_login].last_name = last_name.value;
    userList[index_user_status_login].email = email.value;
    userList[index_user_status_login].phone = phone.value;
    userList[index_user_status_login].address = address.value;
    userList[index_user_status_login].src = path_picture_user.src;
    userList[index_user_status_login].full_info = true;

    localStorage.setItem("userList", JSON.stringify(userList));
    path_picture_user.src = null;
    return true;
}

//hàm lưu ví người dùng
export function handle_save_data_money(index_user_status_login){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let ma_the = document.querySelector(".ma-the");
    let code_the = document.querySelector(".code-the");
    let bank = document.querySelector(".bank");

    let check_empty = false;
    if(ma_the.value == "" || code_the.value == "" || bank.value == ""){
        error_input(ma_the);
        error_input(code_the);
        error_input(bank);
        check_empty = true;
    }

    let check = userList.some((obj, i) => {
        if(i != index_user_status_login){ //tránh trường hợp so sánh dữ liệu cũ
            if(bank.value == obj.bank) //trường hợp khác ngân hàng nhưng giống số tài khoản
                return obj.ma_the === ma_the.value;
        }
    });

    if(check){
        error_input(stk, "*Lỗi! Đã tồn tại số tài khoản");
        return false;
    }
    if(check_empty){
        return false;
    }

    userList[index_user_status_login].bank = bank.value;
    userList[index_user_status_login].ma_the = ma_the.value;
    userList[index_user_status_login].code_the = code_the.value;
    userList[index_user_status_login].full_money = true;

    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}