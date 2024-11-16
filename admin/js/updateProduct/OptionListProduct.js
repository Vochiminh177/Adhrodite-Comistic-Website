import { createNotificationAdmin } from "../base/baseFunction.js";
import { showListProduct } from "../showList/show.js";
import { showMain } from "../script2.js";
import {add_product, delete_product, edit_product} from "./handleUpdate_Product.js";


var path_picture_admin = {
    src: null
};

//đặt lại input về ban đầu, áp dụng cho add product
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
    document.querySelector(".category-add").placeholder = "Danh mục";

    document.querySelector(".brand-add").value = "";
    document.querySelector(".brand-add").style.borderColor = "#a94064";
    document.querySelector(".brand-add").placeholder = "Thương hiệu";

    document.querySelector(".description-add").value = "";
    document.querySelector(".description-add").style.borderColor = "#a94064";
    document.querySelector(".description-add").placeholder = "Miêu tả sản phẩm";

    document.querySelector(".id-add").value = "";
    document.querySelector(".id-add").style.borderColor = "#a94064";
    document.querySelector(".id-add").placeholder = "Mã sản phẩm";
    
    document.querySelector(".quantity-add").value = "";
    document.querySelector(".quantity-add").style.borderColor = "#a94064";
    document.querySelector(".quantity-add").placeholder = "Số lượng";

    let parent = document.querySelector(".add-photo-button #file").parentElement;
    if(parent.querySelector("p")){
        parent.querySelector("p").remove();
    }
    
    let picture = document.querySelector(".image-show");
    picture.innerHTML = ``;
    path_picture_admin.src = null;
}
//Hàm lấy hình ảnh để upload - HIỆU
function handlePicture_admin(){
    let inputPicture = document.querySelector("#file");
    inputPicture.onchange = () => {
        const reader = new FileReader();
        reader.readAsDataURL(inputPicture.files[0]);
        reader.onload = (e) => {
            path_picture_admin.src = e.target.result;
            document.querySelector(".image-show").innerHTML = `<img src="${path_picture_admin.src}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
        }
    };
}

//chức năng thêm sản phẩm của admin - HIẸU
export function addProduct(){
    //sự kiện click bên trong một sự kiện click
    let handle_click_btn_add_product = () => {
        showMain("main-content-product-add");
        //xóa bỏ dữ liệu cũ trong input khi admin click (.btn-add-product)
        reset_input();
        document.querySelector(".btn-add").textContent = "Thêm sản phẩm";
        handlePicture_admin();

        //xử lí thêm sản phẩm trong data
        let handle_click_btn_add = () => {  
            let result = add_product(path_picture_admin);   
            //nếu thêm sản phẩm thành công
            if(result){
                path_picture_admin.src = null;
                showMain("main-content-product-list");
                showListProduct();
                createNotificationAdmin("Thêm sản phẩm thành công!");
            }
        };
        document.querySelector(".btn-add").onclick = handle_click_btn_add;
    };
    document.querySelector(".btn-add-product").onclick = handle_click_btn_add_product;

}

//chức năng xóa sản phẩm của admin -HIỆU
export function deleteProduct(){
    document.querySelectorAll(".delete-product").forEach((obj, i) => {
        obj.addEventListener("click", (e) => {
            e.preventDefault();
            //tạo form xóa sản phẩm
            let ele = document.createElement("div");
            ele.className = "container-delete-confirm";
            ele.innerHTML = `
            <div class="form-delete-confirm">
                <button class="exit-confirm-delete">X</button>
                <div class="content-delete-confirm">
                    
                    <div class="content-delete">
                        <label for="number-delete-confirm">Số lượng:</label>
                        <input type="number" name="number-delete" id="number-delete-confirm" placeholder="Nhập số lượng">
                        <button class="btndelete select-all-delete">Chọn tất cả</button>
                    </div>
                    <button class="btndelete confirm-delete">Xóa</button>
                </div>
            </div>
            `;
            document.body.appendChild(ele);
            setTimeout(() => {
                document.querySelector(".form-delete-confirm").style.opacity = "1";
            }, 10);

            //gán sự kiện click để xóa form
            document.querySelector(".exit-confirm-delete").onclick = () => {
                ele.remove();
            };
            //nếu chọn xóa hết
            document.querySelector(".select-all-delete").onclick = () => {
                let productList = JSON.parse(localStorage.getItem("productList"));
                document.querySelector("#number-delete-confirm").value = productList[i].quantity;
            };

            //kiểm tra xóa thành công hay không
            let result = false;
            document.querySelector(".confirm-delete").onclick = () => {
                //lấy số lượng muốn xóa
                let number = document.querySelector("#number-delete-confirm").value;

                result = delete_product(i, number);
                if(result){
                    ele.remove();
                    createNotificationAdmin("Xóa sản phẩm thành công!");
                    showListProduct();
                }
            };
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
            document.querySelector(".quantity-add").value = productList[index].quantity;
            path_picture_admin.src = productList[index].src;

            let picture = document.querySelector(".image-show");
            let src_2 = productList[index].src;
            picture.innerHTML = `<img src="${src_2}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;

            handlePicture_admin();      

            let handle_click_btn_edit = () => {
                let result = edit_product(index, path_picture_admin);
                if(result){
                    path_picture_admin.src = null;
                    showMain("main-content-product-list");
                    showListProduct();
                    createNotificationAdmin("Sửa sản phẩm thành công!");
                }
            };
            document.querySelector(".btn-add").onclick = handle_click_btn_edit;
        });
    });
}