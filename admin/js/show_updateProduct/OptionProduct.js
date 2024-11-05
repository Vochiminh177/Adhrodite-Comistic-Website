import { productItemArray } from "../database.js"
import { showMain } from "../script2.js";
import {add_product, delete_product, edit_product} from "./handleUpdate_Product.js";

var path_picture = null;

//hàm tạo thông báo
function create_notification_admin(mess) {
    let text = document.createElement("p");
    text.className = "notification";
    text.innerText = mess;
    text.style.backgroundColor = "#ffff";
    text.style.color = "#a94064";
    text.style.position = "absolute";
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
    }, 2000);
    //xóa khỏi dom
    setTimeout(() => {
        document.querySelector(".notification").remove();
    }, 2500);
}

// hàm lọc theo danh mục
// function filer_category(){
//     document.querySelector(".category-list").style.cursor = "pointer"
//     document.querySelector(".category-list").onmousedown = (e) => {
//         e.preventDefault();
//     }
//     document.querySelector(".category-list").onclick = (e) => {
//         e.preventDefault();
//         if(!document.querySelector(".form-category")){
//             let ele = document.createElement("div");
//             ele.className = "form-category";
//             ele.innerHTML = `
//             <div class="content-category">
//                 <p>Trang điểm</p>
//                 <p>Tóc</p>
//                 <p>Cơ thể</p>
//                 <p>Da</p>
//             </div>
//             `;
//             document.querySelector(".category-list").appendChild(ele);
//         }
//         else{
//             document.querySelector(".form-category").remove();
//         }
//     };
// }

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
            <th class="id-list">ID</th>
            <th class="name-list">Tên</th>
            <th class="brand-list">Thương hiệu</th>
            <th class="category-list">Loại</th>
            <th class="price-list">Giá</th>
            <th class="option-list">Tùy chỉnh</th>
        </tr>
    `;
    productList.forEach((ele) => {
        product += `
            <tr>
                <td id="id">${ele.id}</td>
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
    // filer_category();
}



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
    
    document.querySelector(".quantity-add").value = "";
    document.querySelector(".quantity-add").style.borderColor = "#a94064";
    document.querySelector(".quantity-add").placeholder = "Số lượng";

    let parent = document.querySelector(".add-photo-button #file").parentElement;
    if(parent.querySelector("p")){
        parent.querySelector("p").remove();
    }
    
    let picture = document.querySelector(".image-show");
    picture.innerHTML = ``;
    path_picture = null;
}
//Hàm lấy hình ảnh để upload - HIỆU
function handlePicture_admin(){
        let picture = document.querySelector(".image-show");
        let inputPicture = document.querySelector(".add-photo-button #file");
    
        inputPicture.onchange = () => {
            path_picture = URL.createObjectURL(inputPicture.files[0]);
            picture.innerHTML = `<img src="${path_picture}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
        };
}

//chức năng thêm sản phẩm của admin - HIẸU
export function addProduct(){

    //sự kiện click bên trong một sự kiện click
    let handle_click_btn_add_product = () => {
        showMain("main-content-product-add");
        document.querySelector(".btn-add").textContent = "Thêm sản phẩm";
        handlePicture_admin();

        //xóa bỏ dữ liệu cũ trong input khi admin click (.btn-add-product)
        reset_input();

        //xử lí thêm sản phẩm trong data
        let handle_click_btn_add = () => {  
            let result = add_product(path_picture);   
            //nếu thêm sản phẩm thành công
            if(result){
                path_picture = null;
                showMain("main-content-product-list");
                showListProduct();
                create_notification_admin("Thêm sản phẩm thành công!");
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
                    create_notification_admin("Xóa sản phẩm thành công!");
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
            path_picture = productList[index].src;

            let picture = document.querySelector(".image-show");
            let src_2 = productList[index].src;
            picture.innerHTML = `<img src="${src_2}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;

            handlePicture_admin();      

            let handle_click_btn_edit = () => {
                let result = edit_product(index, path_picture);
                if(result){
                    path_picture = null;
                    showMain("main-content-product-list");
                    showListProduct();
                    create_notification_admin("Sửa sản phẩm thành công!");
                }
            };
            document.querySelector(".btn-add").onclick = handle_click_btn_edit;
        });
    });
}