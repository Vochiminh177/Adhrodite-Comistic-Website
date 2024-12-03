//hàm tạo thông báo
export function createNotificationAdmin(mess) {
    let text = document.createElement("p");
    text.className = "notification";
    text.innerText = mess;
    text.style.backgroundColor = "#ffff";
    text.style.color = "#000";
    text.style.position = "fixed";
    text.style.right = "0px";
    text.style.top = "0px";
    text.style.transform = "translate(100%, 10%)";
    text.style.zIndex = "2001";
    text.style.padding = "10px 50px";
    text.style.fontSize = "1.5rem";
    text.style.boxShadow = "1px 1px 12px rgba(0, 0, 0, 0.3)";
    text.style.transition = "transform 0.2s ease-in-out, opacity 0.5s ease-in-out";
    document.body.appendChild(text);
    setTimeout(() => {
        document.querySelector(".notification").style.transform = "translate(-5%, 10%)";
    }, 10);
    //tắt dần
    // setTimeout(() => {
    //     document.querySelector(".notification").style.transform = "translate(100%, 10%)";
    // }, 2000);
    //xóa khỏi dom
    setTimeout(() => {
        document.querySelector(".notification").remove();
    }, 1500);
}

//reset input
export function reset_style_input(input){
    input.classList.remove("err-text");
    if(input.className == "id-add"){
        input.placeholder = "Mã sản phẩm";
    }
    else if(input.className === "brand-add") input.placeholder = "Thương hiệu";
    else if(input.className === "name-add") input.placeholder = "Tên sản phẩm";
    else if(input.className === "price-add") input.placeholder = "Giá bán";
    else if(input.className === "quantity-add") input.placeholder = "Số lượng";
    else if(input.className === "description-add") input.placeholder = "Miêu tả sản phẩm";   
    else if(input.className === "username-customer") input.placeholder = "Tên tài khoản";
    else if(input.className === "password-customer") input.placeholder = "Mật khẩu";
    else if(input.className === "phone-customer") input.placeholder = "Số điện thoại";
    else if(input.className === "firstname-customer") input.placeholder = "Họ";
    else if(input.className === "lastname-customer") input.placeholder = "Tên đệm";
    else if(input.className === "email-customer") input.placeholder = "Email";
    else if(input.className === "percent-discount-add") input.placeholder = "Giảm giá %";
    else if(input.className === "quantity-discount") input.placeholder = "Số lượng giảm giá";
    else input.placeholder = "Số lượng sản phẩm";
    input.style.borderColor = "#a94064";
}

export function err_input(input, mess){
    if(input.type == "file"){
        let parent = input.parentElement;
        if(!parent.querySelector("p")){
            let ele = document.createElement("p");
            ele.innerText = "*Lỗi! Cần thêm hình ảnh";
            ele.style.fontSize = "0.8rem";
            ele.style.color = "red";
            parent.appendChild(ele);

            input.onclick = () => {
                ele.remove();
            };
        }
    }
    else{
        if(input.value == ""){
            input.placeholder = "*Lỗi! Thiếu dữ liệu";
            input.style.borderColor = "red";
            input.classList.add("err-text");
        }
        else{
            if(mess){
                input.value = "";
                input.placeholder = mess;
                input.style.borderColor = "red";
                input.classList.add("err-text");
            }
        }
        input.onfocus = () => {
            reset_style_input(input);
        }
    }
}

