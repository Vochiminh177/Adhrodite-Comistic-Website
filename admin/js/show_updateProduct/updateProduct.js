import updateDataHandle from "./handleUpdate_Product.js";
import data from "../productData/data.js";

function start() {
    document.querySelector(".list-product").addEventListener("click", (e) => {
        render_product();
    });
}

start();


function clearDataInput() {
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#product_code").value = "";
    document.querySelector("#brand").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#imageurl").value = "";
}

function render_product() {
    // console.log(data.getListData());

    let listProduct = JSON.parse(localStorage.getItem("productList"));

    if (listProduct.length == 0) {
        data.getListData().forEach((i) => {
            listProduct.push(i);
        });
    }

    localStorage.setItem("productList", JSON.stringify(listProduct));

    let list = `
        <tr>
            <th>SẢN PHẨM</th>
            <th>Hãng</th>
            <th>MÃ SẢN PHẨM</th>
            <th>DANH MỤC</th>
            <th>GIÁ</th>
            <th>CHỨC NĂNG</th>
        </tr>
            `;
    listProduct.forEach((obj, index) => {
        list += `
            <tr>
                <td>${obj.name}</td>
                <td>${obj.brand}</td>
                <td>${obj.product_code}</td>
                <td>${obj.category}</td>
                <td>${obj.price}</td>
                <td>
                    <button class="delete" index="${index}">XÓA BỎ</button>
                    <button class="edit">CHỈNH SỬA</button>
                </td>
            </tr>
        `
    });

    document.querySelector(".table-list-product").innerHTML = list;
    
    handle_delete();
}


function render_popup() {
    document.querySelector(".container").style.display = "flex";
    let popup = `
            <div class="popup">
            <i class="fa-solid fa-x"></i>
            <div class="left">
            <div class="top">
            <div class="inputBox">
            <textarea class="scrollable-input name_edit" required="required"></textarea>
            
            <span>Name</span>
            </div>
            <div class="inputBox">
            <textarea class="scrollable-input description_edit" required="required"></textarea>
            
            <span>Description</span>
            </div>
                    <div class="inputBox">
                        <textarea class="scrollable-input brand_edit" required="required"></textarea>

                        <span>Brand</span>
                    </div>
                    <div class="inputBox">
                        <textarea class="scrollable-input product-code_edit" required="required"></textarea>

                        <span>Product-code</span>
                    </div>
                    <div class="inputBox">
                        <textarea class="scrollable-input category_edit" required="required"></textarea>

                        <span>category</span>
                    </div>
                    <div class="inputBox">
                        <textarea class="scrollable-input price_edit" required="required"></textarea>

                        <span>Price</span>
                    </div>
                </div>
                <div class="down">
                    <div class="top-container">
                        <div class="inputBox">
                            <textarea class="scrollable-input imageurl_edit" required="required"></textarea>

                            <span>Link image</span>
                        </div>
                        <div class="save-link">
                            <button>SAVE</button>
                            <button class="exitSave">EXIT SAVE</button>
                        </div>
                    </div>
                    <div class="down-container">
                        <i id="left" class="fa-solid fa-angle-left"></i>
                        <div class="image-container">
                            <div class="item">
                                <img src="../images\images\img-1.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                             <div class="item">
                                <img src="../images\images\img-2.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <div class="item">
                                <img src="../images\images\img-3.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <!-- <div class="item">
                                <img src="../images\images\img-4.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <div class="item"> 
                                <img src="../images\images\img-5.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <div class="item">
                                <img src="../images\images\img-7.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <div class="item">
                                <img src="../images\images\img-8.jpg" alt="img">
                                <p>SELECT</p>
                            </div>
                            <div class="item">
                                <img src="../images\images\img-9.jpg" alt="img">
                                <p>SELECT</p>
                            </div> -->
                        </div> 
                        <i id="right" class="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="box-1">
                    <div class="top">
                        <img src="./images\images\img-1.jpg" alt="img">
                        <div class="content-container">
                            <div class="content">
                                <h2>Kem duong da La Roche-Posay giam mun hieu qua 40ml mot hai ba bon nam sau bay tam chin muoi mot hai sad sadasdasdasdasđájklljlkjljljljljj klljljjkljlkjljlkjljljlljlkj ba bon nam sau bay tam chin muoi muoi mot hai ba bon nam sau bay tam chin muoi</h2>
                                <p>ma san pham: APHxxxxx</p>
                                <p>Hang: La Roche-Posay</p>
                                <p>Danh muc: kem tri mun</p>
                                <p>Gia: 500.000$</p>
                            </div>
                            <div class="items">
                                <div class="count">
                                    <div class="number">N</div>
                                    <div class="plus">
                                        <i class="fa-solid fa-plus"></i>
                                    </div>
                                    <div class="sub">
                                        <i class="fa-solid fa-minus"></i>
                                    </div>
                                </div>
                                <button class="buy">MUA</button>
                                <button class="card">THEM GIO HANG</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-2">
                    <div class="description-product">
                        <h2>THÔNG TIN CHI TIẾT</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, cum expedita. Sequi, debitis aliquam corrupti quibusdam quisquam id qui voluptates asperiores, cupiditate minima voluptatem? Rerum tempore quis repellendus repellat fugit.<p>
                    </div>
                </div>

                <div class="box-3">
                    <div class="rate">
                        <h2>ĐÁNH GIÁ</h2>
                    </div>
                </div>

            </div>
         </div>`;
    document.querySelector(".container").innerHTML = popup;

    //tắt popup
    document.querySelector(".fa-x").addEventListener("click", () => {
        document.querySelector(".container").style.display = "none";
    });
}

function handle_edit() {
    let btn = document.querySelectorAll("#edit");
    let index;

    var productList = JSON.parse(localStorage.getItem("productList")) || [];
    if (productList.length == 0) {
        productList = data.getListData();
    }

    btn.forEach(i => {
        i.addEventListener("click", () => {
            render_popup();


            //Lấy giá trị cũ gán vô input để dễ sửa
            index = i.className;

            document.querySelector(".name_edit").value = productList[index].name;
            document.querySelector(".description_edit").value = productList[index].description;
            document.querySelector(".product-code_edit").value = productList[index].product_code;
            document.querySelector(".brand_edit").value = productList[index].brand;
            document.querySelector(".category_edit").value = productList[index].category;
            document.querySelector(".price_edit").value = productList[index].price;
            document.querySelector(".imageurl_edit").value = productList[index].imageurl;

            //Thoát và lưu sau khi chỉnh sửa sản phẩm xong
            let exitSaveBtn = document.querySelector(".exitSave");
            exitSaveBtn.addEventListener("click", () => {
                let name = document.querySelector(".name_edit").value;
                let description = document.querySelector(".description_edit").value;
                let product_code = document.querySelector(".product-code_edit").value;
                let brand = document.querySelector(".brand_edit").value;
                let category = document.querySelector(".category_edit").value;
                let price = document.querySelector(".price_edit").value;
                let imageurl = document.querySelector(".imageurl_edit").value;

                let result = updateDataHandle.edit_product(index, name, description, product_code, brand, category, price, imageurl);

                if (result) alert("ok");
                else alert("khong duoc");
                document.querySelector(".container").style.display = "none";

                render_product();
                handle_delete();
                handle_edit();
            });
        });
    });
}

function handle_delete() {
    let btn = document.querySelectorAll(".delete");
    let index;

    btn.forEach((elem) => {
        elem.addEventListener("click", () => {
            index = elem.getAttribute("index");
            updateDataHandle.delete_product(index);
            render_product();
        });
    });
}
function handle_addProduct() {
    let saveBtn = document.querySelector("#saveBtn");

    saveBtn.addEventListener("click", () => {
        let name, description, product_code, brand, category, price, imageurl;
        name = document.querySelector("#name").value;
        description = document.querySelector("#description").value;
        product_code = document.querySelector("#product_code").value;
        brand = document.querySelector("#brand").value;
        category = document.querySelector("#category").value;
        price = document.querySelector("#price").value;
        imageurl = document.querySelector("#imageurl").value;

        let result = updateDataHandle.add_product(name, description, product_code, brand, category, price, imageurl);

        console.log(name);

        if (result) {
            alert("ok");
        }
        else alert("khong duoc");

        clearDataInput();
        render_product();
        handle_delete();
        handle_edit();
    });
}


