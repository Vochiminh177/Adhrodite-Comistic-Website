//-Hiệu------


// kiểm tra thông tin đăng nhập
export function check_user(username, password) {
    let userList = JSON.parse(localStorage.getItem("userList"));

    let result = {
        mess: "Thành công",
        status: true
    }


    // lấy toàn bộ người có tên đăng nhập là username
    const check = userList.filter((obj) => {
        return username === obj.username;
    });

    // nếu không có ai thì tên đăng nhập không tồn tại
    if (!check.length) {
        result.mess = "Tai khoan khong ton tai";
        result.status = false;
        return result;
    }

    // kiểm tra trong array đó có người có password giống không
    const a = check.find((obj) => obj.password === password)
    // nếu không là .....
    if (!a) {
        result.mess = "Mat khau khong chinh xac";
        result.status = false;
    }

    // có thì đăng nhập thành công
    return result;
}

export function add_user(username, password, email){
    let oldDataUsers = JSON.parse(localStorage.getItem("userList"));

    let result = {
        mess: "Đăng ký thành công",
        status: true
    }

    //kiểm tra xem tài khoản đã tồn tại chưa
    oldDataUsers.some((obj) => {
        if(obj.username == username){
            result.mess = "Tên tài khoản đã tồn tại";
            result.status = false;
            return result;
        }
        if(obj.email == email){
            result.mess = "Email đã tồn tại";
            result.status = false;
            return result;
        }
    });
    if(!result.status) return result;

    let id_user = oldDataUsers[0].id;
    while (oldDataUsers.some((obj) => {
        return obj.id == id_user;
    })) {
        id_user = Math.floor(Math.random() * 100) + 1;
    }
    var data_obj = {
        username: username,
        password: password,
        email: email,
        id: id_user
    }

    //thêm vào mảng
    oldDataUsers.push(data_obj);
    localStorage.setItem("userList", JSON.stringify(oldDataUsers));
    return result;
}
