import { createNotificationAdmin } from "../base/baseFunction.js";
import { pagination, showListProduct } from "../showList/show.js";
import { showMain } from "../script2.js";
import { add_product, delete_product, edit_product } from "./handleUpdate_Product.js";
import { productItemArray } from "../../../database/database.js";
import { checkNumber } from "./handleUpdate_Product.js";


var path_picture_admin = {
    src: null
};


//Hàm lấy hình ảnh để upload - HIỆU
function handlePicture_admin() {
    let inputPicture = document.querySelector("#file");
    inputPicture.onchange = () => {
        const reader = new FileReader();
        reader.readAsDataURL(inputPicture.files[0]);
        reader.onload = (e) => {
            path_picture_admin.src = e.target.result;
            document.querySelector(".image-show").innerHTML = `<img src="${path_picture_admin.src}" alt="Ảnh sản phẩm" style="width: 100%; height: auto;">`;
        }
    };
}

//chức năng thêm sản phẩm của admin - HIẸU
export function addProduct() {
    //ấn nút thêm sản phẩm ở ngoài
    let handle_click_btn_add_product = () => {
        showMain("main-content-product-add");
        //gán sự kiện quay lại
        document.querySelector(".comback-product").onclick = (e) => {
            e.preventDefault();
            showMain("main-content-product-list");
        }
        handlePicture_admin();
        //ấn nút thêm sản phẩm bên trong
        let handle_click_btn_add = () => {
            let result = add_product(path_picture_admin);
            //nếu thêm sản phẩm thành công
            if (result) {
                showMain("main-content-product-list");
                createNotificationAdmin("Thêm sản phẩm thành công!");
                let productList = JSON.parse(localStorage.getItem("productList"));
                pagination(productList, Math.ceil(productList.length / 7), showListProduct, "#main-content-product-list");
                path_picture_admin.src = null;
            }
           
        };
        document.querySelector(".btn-add").onclick = handle_click_btn_add;
    };
    document.querySelector(".btn-add-product").onclick = handle_click_btn_add_product;

}

//chức năng xóa sản phẩm của admin -HIỆU
export function deleteProduct(currentPage) {
    document.querySelectorAll(".delete-product").forEach((obj) => {
        obj.addEventListener("click", (e) => {
            e.preventDefault();
            let index = parseInt(obj.getAttribute("index-item"));
            //tạo form xóa sản phẩm
            let ele = document.createElement("div");
            ele.className = "container-delete-confirm";
            ele.innerHTML = `
            <div class="form-delete-confirm">
                <a class="exit-confirm-delete">&times;</a>
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
            document.querySelector(".exit-confirm-delete").onclick = (e) => {
                e.preventDefault();
                ele.remove();
            };
            //nếu chọn xóa hết
            document.querySelector(".select-all-delete").onclick = () => {
                let productList = JSON.parse(localStorage.getItem("productList"));
                document.querySelector("#number-delete-confirm").value = productList[index].quantity;
            };

            //kiểm tra xóa thành công hay không
            document.querySelector(".confirm-delete").onclick = () => {
                let result = delete_product(index);
                if (result) {
                    ele.remove();
                    createNotificationAdmin("Xóa sản phẩm thành công!");
                    let productList = JSON.parse(localStorage.getItem("productList"));
                    if(index === (productList.length)){
                        currentPage = 1;
                    }
                    pagination(productList, currentPage, showListProduct, "#main-content-product-list");
                }
            };
        });
    });
}

//chức năng sửa sản phẩm của admin - HIỆU
export function editProduct(currentPage) {
    document.querySelectorAll(".edit-product").forEach((obj) => {
        obj.addEventListener("click", (e) => {
            e.preventDefault();
            let productList = JSON.parse(localStorage.getItem("productList"));
            let index = parseInt(obj.getAttribute("index-item"));
            showMain("main-content-product-add");
            document.querySelector(".comback-product").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-product-list");
            }
            document.querySelector(".name-add").value = productList[index].name;
            document.querySelector(".price-add").value = productList[index].price;
            document.querySelector("#category-add").value = productList[index].categoryID;
            document.querySelector(".brand-add").value = productList[index].brand;
            document.querySelector(".description-add").value = productList[index].desc;
            document.querySelector(".id-add").value = productList[index].id;
            document.querySelector(".quantity-add").value = productList[index].quantity;
            document.querySelector(".percent-discount-add").value = productList[index].discountPercent;
            document.querySelector(".quantity-discount-add").value = productList[index].discountQuantity;
            path_picture_admin.src = productList[index].src;
            let picture = document.querySelector(".image-show");
            let src_2 = productList[index].src;
            picture.innerHTML = `<img src="${src_2}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;

            handlePicture_admin();

            let handle_click_btn_edit = () => {
                let result = edit_product(index, path_picture_admin);
                if (result) {
                    createNotificationAdmin("Sửa sản phẩm thành công!");
                    showMain("main-content-product-list");
                    productList = JSON.parse(localStorage.getItem("productList"));
                    pagination(productList, currentPage, showListProduct, "#main-content-product-list");
                    path_picture_admin.src = null;
                }
               
            };
            document.querySelector(".btn-add").onclick = handle_click_btn_edit;
        });
    });
}

//hàm lọc 
export function filterProductAdmin() {
    document.querySelector(".filter-product a").onclick = (e) => {
        e.preventDefault();
        let productList = JSON.parse(localStorage.getItem("productList"));
        document.querySelector(".filter-product .content-filter").classList.toggle("active");

        //tạo select chứa các danh mục
  
            let selectCategory = document.createElement("select");
            selectCategory.id = "select-product-filter-category";
            selectCategory.innerHTML = `

                        <option value="-1" selected>Không chọn</option>
                        <option value="kem-tri-mun">Kem trị mụn</option>
                        <option value="sua-rua-mat">Sữa rửa mặt</option>
                        <option value="son">Son</option>
                        <option value="phan">Phấn</option>
                        <option value="toner">Toner</option>
                        <option value="sereum">Sereum</option>
                        <option value="kem-duong-am">Kem dưỡng ẩm</option>
                        <option value="tay-trang">Tẩy trang</option>
        `;

        

        //lấy mảng chứa các hãng
        let array = [];
        productList.forEach((obj) => {
            let check = array.some((objBrand) => {
                return objBrand === obj.brand;
            });
            if (!check) {
                array.push(obj.brand);
            }
        });

        //tạo phần thẻ select chứa các hãng

        let selectBrand = document.createElement("select");
        selectBrand.id = "select-product-filter-brand";
        selectBrand.innerHTML += `<option value="-1">Không chọn</option>`;
        array.forEach((obj, index) => {
            selectBrand.innerHTML += `<option value="${index}">${obj}</option>`;
            })

        //tạo phần input hàng tồn kho
     
        let inputQuantity = document.createElement("input");
        inputQuantity.placeholder = "Nhập hàng tồn bé hơn một số";
        inputQuantity.id = "input-filter-quantity";
        inputQuantity.type = "text";
        

        //tạo thẻ lọc 

        let a = document.createElement("a");
        a.textContent = "Lọc";
        

        document.querySelector(".filter-product .content-filter").innerHTML = selectCategory.outerHTML + selectBrand.outerHTML + inputQuantity.outerHTML + a.outerHTML;

        //hàm lọc dữ liệu
        function filterData(categoryID, brand, number) {
            let arr = [];
            arr = productList.filter((obj) => {
                return (categoryID === '-1' || categoryID === obj.categoryID)
                    && (brand === "Không chọn" || brand === obj.brand)
                    && (isNaN(number) || obj.quantity <= number);
            });
            return arr;
        }

        document.querySelector(".filter-product .content-filter a").onclick = (e) => {
            e.preventDefault();
            let categoryID = document.querySelector("#select-product-filter-category").value;
            let brandSelect = document.querySelector("#select-product-filter-brand").value;
            let brand;
            document.querySelectorAll("#select-product-filter-brand option").forEach((obj) => {
                if(obj.value === brandSelect){
                    brand = obj.textContent
                };
            });
            let number = document.querySelector("#input-filter-quantity").value;

            if (!checkNumber(number) || number < 0) {
                createNotificationAdmin("Cần nhập số nguyên dương");
                return;
            }
            let arr = filterData(categoryID, brand, parseInt(number));

            pagination(arr, 1, showListProduct, "#main-content-product-list");
            if (arr.length > 0) {
                createNotificationAdmin("Lọc thành công");
                if(document.querySelector("#main-content-product-list .content p")){
                    document.querySelector("#main-content-product-list .content p").remove();
                }
            }
            else {
                createNotificationAdmin("Không có sản phẩm");
                if(!document.querySelector("#main-content-product-list .content p")){
                    document.querySelector(".list-page").style.display = "none";
                    let p = document.createElement("p");
                    p.className = "dont-have-product";
                    p.textContent = "KHÔNG CÓ SẢN PHẨM NÀO PHÙ HỢP";
                    document.querySelector("#main-content-product-list .content").appendChild(p);
                    // document.querySelector("#main-content-product-list .content").style.backgroundColor = "#fff";
                }
            }
        };
    };
}

export function searchProduct() {
    document.querySelector(".search-product a").onclick = (e) => {
        e.preventDefault();
        let value = document.querySelector(".search-product input").value;
        let productList = JSON.parse(localStorage.getItem("productList"));
        let i = productList.findIndex((obj) => {
            return obj.id.toLowerCase() === value.toLowerCase();
        });
        let currentPage;
        if(i==0) currentPage = 1;
        else currentPage = Math.ceil(i/3);

        if (i >= 0) {
            showMain("main-content-product-add");
            document.querySelector(".comback-product").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-product-list");
            }

            //gán giá trị hiện tại của sản phẩm vào input để admin dễ xử lý
            document.querySelector(".name-add").value = productList[i].name;
            document.querySelector(".price-add").value = productList[i].price;
            document.querySelector("#category-add").value = productList[i].categoryID;
            document.querySelector(".brand-add").value = productList[i].brand;
            document.querySelector(".description-add").value = productList[i].desc;
            document.querySelector(".id-add").value = productList[i].id;
            document.querySelector(".quantity-add").value = productList[i].quantity;
            document.querySelector(".percent-discount-add").value = productList[i].discountPercent;
            document.querySelector(".quantity-discount-add").value = productList[i].discountQuantity;
            path_picture_admin.src = productList[i].src;

            let picture = document.querySelector(".image-show");
            let src_2 = productList[i].src;
            picture.innerHTML = `<img src="${src_2}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;

            handlePicture_admin();

            let handle_click_btn_edit = () => {
                let result = edit_product(i, path_picture_admin);
                if (result) {
                    path_picture_admin.src = null;
                    createNotificationAdmin("Sửa sản phẩm thành công!");
                    showMain("main-content-product-list");
                    productList = JSON.parse(localStorage.getItem("productList"));
                    pagination(productList, currentPage, showListProduct, "#main-content-product-list");
                }
            };
            document.querySelector(".btn-add").onclick = handle_click_btn_edit;
        }
        else {
            createNotificationAdmin("Không tìm thấy");
        }
    };
    document.querySelector(".search-product input").onfocus = () => {
        document.querySelector(".search-product input").value = "";
        document.querySelector(".search-product input").placeholder = "Nhập mã sản phẩm";
    }
}
