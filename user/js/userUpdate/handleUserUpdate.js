//-Hiệu------
import { usersList } from "../../../database/database.js";
import { delete_space } from "../../../admin/js/show_updateProduct/handleUpdate_Product.js";


//hàm báo lỗi input
function errorInput(input, mess){
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

    let checkEmpty = false;
    if(username.value === "" || password.value === "" || !check_accept_privacy.checked){
        console.log(username.value);
        errorInput(username)
        errorInput(password);
        errorInput(second_password);
        errorInput(email);
        errorInput(check_accept_privacy);
        checkEmpty = true;
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
        errorInput(username, check.mess_username);
        errorInput(email, check.mess_email);
        return false;
    }
    
    if(password.value != second_password.value){
        errorInput(second_password, "*Lỗi! Mật khẩu cần giống nhau");
        return false;
    }

    if(checkEmpty) return;

    let userID = userList[0].id;
    while (userList.some((obj) => {
        return obj.id == userID;
    })) {
        userID = Math.floor(Math.random() * 100) + 1;
    }
    var data_obj = {
        full_info: false,
        full_money: false,
        statusLogin: false,
        id: userID,
        username: username.value,
        password: password.value,
        email: email.value,
        remember_password: false,
        firstName: "null",
        lastName: "null",
        phone: "null",
        address: "null",
        ma_the: "null",
        code_the: "null",  
        bank: "null",
        purchase_method: "null",
        src: "null",
        shoppingCart: [],
        ordersHistory: []
    }

    //thêm vào mảng
    userList.push(data_obj);
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

//hàm đổi mật khẩu
export function handleChangePassword(){
    let userList = JSON.parse(localStorage.getItem("userList"));
    let username = document.querySelector("#username-change");
    let oldPassword = document.querySelector("#old-password-change");
    let newPassword = document.querySelector("#new-password-change");

    let checkEmpty = false;
    if(username.value == "" || oldPassword.value == "" || newPassword.value == ""){
        errorInput(username);
        errorInput(oldPassword);
        errorInput(newPassword);
        checkEmpty = true;
    }

    if(checkEmpty) return false;

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

    // kiểm tra có password giống không
    let p = false;
    if(check.password === oldPassword.value) p=true;
    // nếu không là .....
    if (!p) {
        errorInput(oldPassword, "*Lỗi! Mật không không chính xác");
        return false;
    }

    //nếu đổi thành công
    userList.some((obj, index) => {
        if(username.value === obj.username){
            userList[index].password = newPassword.value;
            return;
        }
    });

    username.value = "";
    oldPassword.value = "";
    newPassword.value = "";
    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

//hàm lưu thông tin người dùng
export function handleSaveDateInformation(userStatusLoginIndex){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let firstName = document.querySelector(".first-name");
    let lastName = document.querySelector(".last-name");
    let email = document.querySelector(".email-info");
    let phone = document.querySelector(".phone");
    let address = document.querySelector(".address");

    let checkEmpty = false;
    if(firstName.value === "" || lastName.value === "" || email.value === "" || phone.value === "" || address.value === ""){
        errorInput(firstName);
        errorInput(lastName);
        errorInput(email);
        errorInput(phone);
        errorInput(address);
        checkEmpty = true;
    }

    let check = userList.some((obj, i) => {
        if(i != userStatusLoginIndex)
            return obj.phone === phone.value;
    });
    if(check){
        errorInput(phone, "*Lỗi! Đã tồn tại số điện thoại");
        pictureUserPath.src = null;
        return false;
    }
    if(checkEmpty){
        pictureUserPath.src = null;
        return false;
    }

    userList[userStatusLoginIndex].firstName = firstName.value;
    userList[userStatusLoginIndex].lastName = lastName.value;
    userList[userStatusLoginIndex].email = email.value;
    userList[userStatusLoginIndex].phone = phone.value;
    userList[userStatusLoginIndex].address = address.value;
    userList[userStatusLoginIndex].full_info = true;

    localStorage.setItem("userList", JSON.stringify(userList));
    return true;
}

//hàm lưu ví người dùng
// export function handleSaveDateMoney(userStatusLoginIndex){
//     let userList = JSON.parse(localStorage.getItem("userList"));

//     let ma_the = document.querySelector(".ma-the");
//     let code_the = document.querySelector(".code-the");
//     let bank = document.querySelector(".bank");

//     let checkEmpty = false;
//     if(ma_the.value == "" || code_the.value == "" || bank.value == ""){
//         errorInput(ma_the);
//         errorInput(code_the);
//         errorInput(bank);
//         checkEmpty = true;
//     }

//     let check = userList.some((obj, i) => {
//         if(i != userStatusLoginIndex){ //tránh trường hợp so sánh dữ liệu cũ
//             if(bank.value == obj.bank) //trường hợp khác ngân hàng nhưng giống số tài khoản
//                 return obj.ma_the === ma_the.value;
//         }
//     });

//     if(check){
//         errorInput(stk, "*Lỗi! Đã tồn tại số tài khoản");
//         return false;
//     }
//     if(checkEmpty){
//         return false;
//     }

//     userList[userStatusLoginIndex].bank = bank.value;
//     userList[userStatusLoginIndex].ma_the = ma_the.value;
//     userList[userStatusLoginIndex].code_the = code_the.value;
//     userList[userStatusLoginIndex].full_money = true;

//     localStorage.setItem("userList", JSON.stringify(userList));
//     return true;
// }