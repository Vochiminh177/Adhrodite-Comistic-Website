import { usersList } from "../../../database/database.js";


//hàm return về chuỗi placeholder ban đầu
export function resetDefaultInputForUser(input){
    input.style.borderBottom = "1px solid #ccc";
    input.classList.remove("err-text");
    if(input.className === "username-change"){
        return "Nhập tên tài khoản"
    }
    if(input.className === "old-password-change") return "Nhập mật khẩu cũ";
    if(input.className === "new-password-change") return "Nhập mật khẩu mới";
    if(input.className === "username-login") return "Nhập tên tài khoản";
    if(input.className === "password-login") return "Nhập mật khẩu";
    if(input.className === "username-signup") return "Nhập tên tài khoản";
    if(input.className === "email-signup") return "Nhập email";
    if(input.id === "first-password") return "Nhập mật khẩu";
    if(input.id === "second-password") return "Nhập lại mật khẩu";
    if(input.className === "first-name") return "Nhập họ";
    if(input.className === "last-name") return "Nhập tên";
    if(input.className === "phone") return "Nhập số điện thoại";
    if(input.className === "email-info") return "Nhập email";
    if(input.id === "username-change") return "Nhập tên tài khoản";
    if(input.id === "old-password-change") return "Nhập mật khẩu cũ";
    if(input.id === "new-password-change") return "Nhập mật khẩu mới";
} 
//hàm báo lỗi input
export function errorInput(input, mess){
    console.log(123);
    if(input.type == "checkbox"){
        let parent = input.parentElement;
        if(!input.checked){
            parent.querySelector("p").style.color = "red";
            input.onfocus = () => {
                parent.querySelector("p").style.color = "black";
            };
        }
        return;
    }
    //nếu là text, có tồn tại mess (trường hợp không phải input rỗng)
    input.classList.add("err-text");
    
    if(mess){
        input.style.borderBottom = "1px solid red";
        input.value = "";
        input.placeholder = mess;
        input.onfocus = () => {
            input.placeholder = resetDefaultInputForUser(input);
        };
        return;
    }
    //nếu input rỗng
    if(input.value == ""){
        input.style.borderBottom = "1px solid red";
        input.placeholder = "*Lỗi! Không được để trống";
        input.onfocus = () => {
            input.placeholder = resetDefaultInputForUser(input);
        };
        return;
    }
    //còn lại không có lỗi  
}

// kiểm tra thông tin đăng nhập
export function handleSignIn() {
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if(userList.length == 0){
        userList = [...usersList];
        localStorage.setItem("userList", JSON.stringify(userList));
    }

    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    if(username.value === "" || password.value === ""){
        errorInput(username)
        errorInput(password);
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
        errorInput(username, "*Lỗi! Tài khoản không tồn tại");
        return false;
    }

    // kiểm tra  password giống không
    let p = false;
    if(check.password === password.value) p=true;
    // nếu không là .....
    if (!p) {
        errorInput(password, "*Lỗi! Mật không không chính xác");
        return false;
    }

    // có thì đăng nhập thành công
    userList.forEach((obj) => {
        if(username.value === obj.username){
            obj.statusLogin = true;
            return;
        }
    });
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

//kiểm tra khi đăng ký
export function handleSignUp(){
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

    if(username.value === "" || password.value === "" || !check_accept_privacy.checked || email.value == ""){
        errorInput(username)
        errorInput(password);
        errorInput(second_password);
        errorInput(email);
        errorInput(check_accept_privacy);
        return false;
    }

    //kiểm tra xem tài khoản đã tồn tại chưa
    let check = {
        status: false,
        mess_username: null,
        mess_email: null
    };
    userList.forEach((obj) => {
        if(obj.username === username.value){
            check.mess_username = "*Tên đăng nhập đã tồn tại!"
            check.status = true;
            return;
        }
    });
    userList.forEach((obj) => {
        if(obj.email === email.value){
            check.mess_email = "*Email đã tồn tại!";
            check.status = true;
            return;
        }
    });
    if(check.status){
        console.log(check.mess_username);
        errorInput(username, check.mess_username);
        errorInput(email, check.mess_email);
        return false;
    }
    
    if(password.value != second_password.value){
        errorInput(second_password, "*Lỗi! Mật khẩu cần giống nhau");
        return false;
    }

    let userID = userList[0].id;
    while (userList.some((obj) => {
        return obj.id == userID;
    })) {
        userID = Math.floor(Math.random() * userList.length + 1) + 1;
    }
    console.log(userID);
    var data_obj = {
        full_info: false,
        statusLogin: false,
        id: userID,
        username: username.value,
        password: password.value,
        email: email.value,
        first_name: null,
        last_name: null,
        phone: null,
        shoppingCart: [],
        ordersHistory: [],
    }

    //thêm vào mảng
    userList.push(data_obj);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}



