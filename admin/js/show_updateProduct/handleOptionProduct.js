import { productItemArray } from "../database.js"
import { showMain } from "../script2.js";
import {add_product, delete_product, edit_product} from "./handleUpdate_Product.js";

var src_1 = null;



//hiện danh sách sản phẩm - HIỆU
export function showListProduct() {
    let productList = JSON.parse(localStorage.getItem('productList')) || [];
    if (productList.length == 0) {
        productList = [...productItemArray];
        localStorage.setItem("productList", JSON.stringify(productList));
    }

    //tạo danh sách sản phẩm từ mảng chèn vô bảng table
    let product = `
        <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Thương hiệu</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Tùy chỉnh</th>
        </tr>
    `;
    productList.forEach((ele) => {
        product += `
            <tr>
                <td id="id">${ele.id}</td>
                <td id="src"><img style="width: 70px; height:90%;" src="${ele.src}" alt=""></td>
                <td id="name">${ele.name}</td>
                <td id="brand">${ele.brand}</td>
                <td id="category">${ele.category}</td>
                <td id="price">${ele.price}</td>
                <td>
                    <a href="" class="edit-product">Sửa</a>
                    <a href="" class="delete-product">Xóa</a>
                </td>
            </tr>
        `;
    });
    document.querySelector(".content .content-product-list table").innerHTML = product;

    deleteProduct();
    editProduct();
}


function reset_input(){
    if(document.querySelector(".err-text")){
        document.querySelectorAll(".content-one-input input").forEach((ele) => {
            ele.classList.remove("err-text");
        });
        document.querySelectorAll(".content-two-input input").forEach((ele) => {
            ele.classList.remove("err-text");
        });

        document.querySelectorAll(".content-product-add #left-input textarea").forEach((ele) => {
            ele.classList.remove("err-text");
        });
    }

    document.querySelector(".name-add").value = "";
    document.querySelector(".name-add").style.borderColor = "#a94064";
    document.querySelector(".name-add").placeholder = "Tên sản phẩm";

    document.querySelector(".price-add").value = "";
    document.querySelector(".price-add").style.borderColor = "#a94064";
    document.querySelector(".price-add").placeholder = "Giá bán";

    document.querySelector(".category-add").value = "";
    document.querySelector(".category-add").style.borderColor = "#a94064";
    document.querySelector(".category-add").placeholder = "Thương Hiệu";

    document.querySelector(".brand-add").value = "";
    document.querySelector(".brand-add").style.borderColor = "#a94064";
    document.querySelector(".brand-add").value = "";

    document.querySelector(".description-add").value = "";
    document.querySelector(".description-add").style.borderColor = "#a94064";
    document.querySelector(".description-add").placeholder = "Miêu tả sản phẩm";

    document.querySelector(".id-add").value = "";
    document.querySelector(".id-add").style.borderColor = "#a94064";
    document.querySelector(".id-add").placeholder = "Mã sản phẩm";
    
    let picture = document.querySelector(".image-show");
    picture.innerHTML = ``;
}
//Hàm lấy hình ảnh để upload - HIỆU
function handlePicture(){
        let picture = document.querySelector(".image-show");
        let inputPicture = document.querySelector(".add-photo-button #file");
    
        inputPicture.onchange = () => {
            src_1 = URL.createObjectURL(inputPicture.files[0]);
            picture.innerHTML = `<img src="${src_1}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
        };
}

//chức năng thêm sản phẩm của admin - HIẸU
export function addProduct(){

    //sự kiện click bên trong một sự kiện click
    let handle_click_btn_add_product = () => {
        showMain("main-content-product-add");
        document.querySelector(".btn-add").textContent = "Thêm sản phẩm";
        handlePicture();

        //xóa bỏ dữ liệu cũ trong input khi admin click (.btn-add-product)
        reset_input();

        //xử lí thêm sản phẩm trong data
        let handle_click_btn_add = () => {  
            let result = add_product(src_1);

            //nếu thêm sản phẩm thành công
            if(result){
                showMain("main-content-product-list");
                showListProduct();
            }
        };
        document.querySelector(".btn-add").onclick = handle_click_btn_add;
    };
    document.querySelector(".btn-add-product").onclick = handle_click_btn_add_product;

}

//chức năng xóa sản phẩm của admin -HIỆU
export function deleteProduct(){
    document.querySelectorAll(".delete-product").forEach((obj, index) => {
        obj.addEventListener("click", (e) => {
            e.preventDefault();
            delete_product(index);
            showListProduct();
        });
    });
}

//chức năng sửa sản phẩm của admin - HIỆU
export function editProduct(){
    document.querySelectorAll(".edit-product").forEach((obj, index) => {
        obj.addEventListener("click", (e) => {
            let productList = JSON.parse(localStorage.getItem("productList"));

            e.preventDefault();
            showMain("main-content-product-add");

            document.querySelector(".btn-add").textContent = "Lưu sản phẩm"; //hehe, sửa lại nội dung nút button

            //gán giá trị hiện tại của sản phẩm vào input để admin dễ xử lý
            reset_input();//trước khi gán thì reset input
            document.querySelector(".name-add").value = productList[index].name;
            document.querySelector(".price-add").value = productList[index].price;
            document.querySelector(".category-add").value = productList[index].category;
            document.querySelector(".brand-add").value = productList[index].brand;
            document.querySelector(".description-add").value = productList[index].desc;
            document.querySelector(".id-add").value = productList[index].id;
            let picture = document.querySelector(".image-show");
            let src_2 = productList[index].src;
            picture.innerHTML = `<img src="${src_2}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;

            handlePicture();      

            let handle_click_btn_edit = () => {
                let result = edit_product(index, src_1);
                if(result){
                    showMain("main-content-product-list");
                    showListProduct();
                }
            };
            document.querySelector(".btn-add").onclick = handle_click_btn_edit;
        });
    });
}