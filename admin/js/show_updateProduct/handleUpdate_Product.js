//---HIỆU------
export function delete_space(str) {
    str = str.trim();
    str = str.replaceAll("/\s+/g", " ");
    return str;
}

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


export function add_product(src){
    let productList = JSON.parse(localStorage.getItem("productList"));

    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector(".category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let file_picture = document.querySelector(".add-photo-button #file");

    //Nếu input rỗng
    let check_empty = false;
    if(name.value == "" || price.value == "" || category.value == "" || brand.value == "" || description.value == "" || id.value == "" || src == null || quantity.value ==""){
        err_input(name);
        err_input(id);
        err_input(price);
        err_input(brand);
        err_input(category);
        err_input(description);
        err_input(quantity);
        if(src == null){
            err_input(file_picture);
        }
        check_empty = true;
    }

    //nếu trùng tên hoặc mã sản phẩm, sản phẩm đã tồn tại
    let check = {
        status: true,
        mess_id: null,
        mess_name: null
    }
    check.check_id = productList.some((obj) => {
        if(obj.id === delete_space(id.value)){
            check.status = false;
            check.mess_id = "Lỗi! Trùng mã sản phẩm";
            return;
        }    
    });
    check.check_name = productList.some((obj) => {
        if(obj.name === delete_space(name.value)){
            check.status = false;
            check.mess_name = "Lỗi! Trùng tên sản phẩm";
            return;
        }
    });

    if(!check.status){
        if(check.mess_id){
            err_input(id, check.mess_id);
            id.value = "";
        }
        if(check.mess_name){
            err_input(name, check.mess_name);
            name.value = "";
        }
        return;
    }

    if(check_empty) return;

    //nếu sản phẩm được thêm, tạo number sản phẩm
    let number = 1;
    while(productList.some((obj) => {
        return obj.number == number;
    })){
        number = Math.floor(Math.random() * productList.length+1) + 1;
    }

    //thêm sản phẩm vào mảng và update lên localStorage, xong hết return true
    let data = {
        number: number,
        id: delete_space(id.value),
        src: src,
        name: delete_space(name.value),
        brand: delete_space(brand.value),
        category: delete_space(category.value),
        price: delete_space(price.value),
        desc: delete_space(description.value),
        quantity: quantity.value
    }

    //update vào mảng và localStorage
    productList.push(data);
    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}

export function delete_product(index, number) {
    let productList = JSON.parse(localStorage.getItem("productList"));

    productList[index].quantity -= number;

    if(!productList[index].quantity){
        productList.splice(index, 1); //xóa bỏ
        localStorage.setItem("productList", JSON.stringify(productList));
        return true;
    }
    if(productList[index].quantity <  0){
        let input = document.querySelector("#number-delete-confirm");
        err_input(input, "*Lỗi! Không đủ để xóa");
        return false;
    }

    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}

export function edit_product(index, src) {
    let productList = JSON.parse(localStorage.getItem("productList"));
    let name = document.querySelector(".name-add");
    let price = document.querySelector(".price-add");
    let category = document.querySelector(".category-add");
    let brand = document.querySelector(".brand-add");
    let description = document.querySelector(".description-add");
    let id = document.querySelector(".id-add");
    let quantity = document.querySelector(".quantity-add");
    let file_picture = document.querySelector(".add-photo-button #file");

    //Nếu input rỗng
    let check_empty = false;
    if(name.value == "" || price.value == "" || category.value == "" || brand.value == "" || description.value == "" || id.value == "" || src == null || quantity.value == ""){
        err_input(name);
        err_input(id);
        err_input(price);
        err_input(brand);
        err_input(category);
        err_input(description);
        err_input(src);
        err_input(quantity);
        if(src == null){
            console.log(file_picture)
            // err_input(file_picture);
        }
        check_empty = true;
    }

    //nếu trùng tên sản phẩm, sản phẩm đã tồn tại
    let check = {
        status: true,
        mess_id: null,
        mess_name: null
    }
    check.check_id = productList.some((obj, i) => {
        if(index != i){
            if(obj.id === delete_space(id.value)){
                check.status = false;
                check.mess_id = "Lỗi! Trùng mã sản phẩm";
                return;
            }    
        }
    });
    check.check_name = productList.some((obj, i) => {
        if(index != i){
            if(obj.name === delete_space(name.value)){
                check.status = false;
                check.mess_name = "Lỗi! Trùng tên sản phẩm";
                return;
            }
        }
    });

    if(!check.status){
        if(check.mess_id){
            err_input(id, check.mess_id);
            id.value = "";
        }
        if(check.mess_name){
            err_input(name, check.mess_name);
            name.value = "";
        }
        return;
    }

    if(check_empty) return;

    //update vào mảng và update lên localStorage, return true
    productList[index].name = delete_space(name.value);
    productList[index].price = delete_space(price.value);
    productList[index].category = delete_space(category.value);
    productList[index].brand = delete_space(brand.value)
    productList[index].description = delete_space(description.value);
    productList[index].id = delete_space(id.value);
    productList[index].src = src;
    productList[index].quantity = quantity.value;

    localStorage.setItem("productList", JSON.stringify(productList));
    return true;
}
//-----------------