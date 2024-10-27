import { productItemArray } from "../database.js"
import { showMain } from "../script2.js";
import {add_product, delete_product, edit_product} from "./handleUpdate_Product.js";


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

//Hàm lấy hình ảnh để upload - HIỆU
let src;
function handlePicture(){
    let picture = document.querySelector(".image-show");
    let inputPicture = document.querySelector(".add-photo-button #file");

    inputPicture.addEventListener("change", () => {
        src = URL.createObjectURL(inputPicture.files[0]);
        picture.innerHTML = `<img src="${src}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
    });
}

//chức năng thêm sản phẩm của admin - HIẸU
export function addProduct(){
    document.querySelector(".btn-add-product").addEventListener("click", () => {
        showMain("main-content-product-add");
        handlePicture();

        document.querySelector(".btn-add").addEventListener("click", () => {
            let result = add_product(src);
            if(result.status){
                showMain("main-content-product-list");
                showListProduct();
                alert(result.mess);
            }
            else alert(result.mess);
            document.querySelector(".name-add").value = "";
            document.querySelector(".price-add").value = "";
            document.querySelector(".category-add").value = "";
            document.querySelector(".brand-add").value = "";
            document.querySelector(".description-add").value = "";
            document.querySelector(".id-add").value = "";
        });
    });

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
            document.querySelector(".name-add").value = productList[index].name;
            document.querySelector(".price-add").value = productList[index].price;
            document.querySelector(".category-add").value = productList[index].category;
            document.querySelector(".brand-add").value = productList[index].brand;
            document.querySelector(".description-add").value = productList[index].desc;
            document.querySelector(".id-add").value = productList[index].id;

            document.querySelector(".btn-add").addEventListener("click", () => {
                let result = edit_product(index);

                if(result.status){
                    alert(result.mess);
                    showMain("main-content-product-list");
                    showListProduct();
                }
                else alert(result.mess);
            });
        });
    });
}