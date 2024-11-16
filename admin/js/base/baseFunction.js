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
    text.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
    document.body.appendChild(text);
    setTimeout(() => {
        document.querySelector(".notification").style.transform = "translate(-5%, 10%)";
    }, 10);
    //tắt dần
    setTimeout(() => {
        document.querySelector(".notification").style.transform = "translate(100%, 10%)";
    }, 1000);
    //xóa khỏi dom
    setTimeout(() => {
        document.querySelector(".notification").remove();
    }, 1500);
}

//reset input
export function reset_style_input(input, text){
    input.placeholder = text;
    input.classList.remove("err-text");
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
        let text = input.placeholder;

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
        input.onclick = () => {
            reset_style_input(input, text);
        }
    }
}

