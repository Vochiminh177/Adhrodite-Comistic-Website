//---HIỆU------

export function add_product(src){
    let name = document.querySelector(".name-add").value;
    let price = document.querySelector(".price-add").value;
    let category = document.querySelector(".category-add").value;
    let brand = document.querySelector(".brand-add").value;
    let description = document.querySelector(".description-add").value;
    let id = document.querySelector(".id-add").value;
    

    let lisProduct = JSON.parse(localStorage.getItem("productList"));

    let result = {
        status: true,
        mess: "Thêm thành công"
    }

    //nếu trùng tên sản phẩm, sản phẩm đã tồn tại, return false
   lisProduct.some((obj) => {
        if(obj.id == id){
            result.status = false;
            result.mess = "Lỗi! Trùng mã sản phẩm";
            return result;
        }
        if(obj.name == name){
            result.status = false;
            result.mess = "Lỗi! Trùng tên sản phẩm";
            return result
        }
    });

    if (!result.status) {
        return result;
    }

    //nếu sản phẩm được thêm, tạo id sản phẩm random
    let number = lisProduct.length + 1;

    //thêm sản phẩm vào mảng và update lên localStorage, xong hết return true
    let data = {
        number: number,
        id: id,
        name: name,
        desc: description,
        brand: brand,
        category: category,
        price: price,
        src: src
    }

    //update vào mảng và localStorage
    lisProduct.push(data);
    localStorage.setItem("productList", JSON.stringify(lisProduct));
    return result;
}

export function delete_product(index) {
    let lisProduct = JSON.parse(localStorage.getItem("productList"));
    lisProduct.splice(index, 1); //xóa bỏ
    localStorage.setItem("productList", JSON.stringify(lisProduct));
}

export function edit_product(index) {
    let productList = JSON.parse(localStorage.getItem("productList"));
    let result = {
        status: true,
        mess: "Sửa thành công"
    };

    //nếu các thuộc tính của sản phẩm bị trùng với sản phẩm khác, return false
    productList.some((obj, i) => { 
        if(i != index){ //duyệt qua mảng, loại bỏ trường hợp so sánh trên 1 sản phẩm 

            //nếu trùng tên sản phẩm
            if(obj.name == document.querySelector(".name-add").value){
                result.status = false;
                result.mess = "Lỗi! Tên sản phẩm bị trùng";
                return result;
            }

            //nếu trùng mã sản phẩm
            if(obj.id == document.querySelector(".id-add").value){
                result.status = false;
                result.mess = "Lỗi! Mã sản phẩm bị trùng";
                return result;
            }
        } 
    });

    //update vào mảng và update lên localStorage, return true
    productList[index].name = document.querySelector(".name-add").value;
    productList[index].price = document.querySelector(".price-add").value;
    productList[index].category = document.querySelector(".category-add").value;
    productList[index].brand = document.querySelector(".brand-add").value;
    productList[index].description = document.querySelector(".description-add").value;
    productList[index].id = document.querySelector(".id-add").value;

    localStorage.setItem("productList", JSON.stringify(productList));
    return result;
}
//-----------------