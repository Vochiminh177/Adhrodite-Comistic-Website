
import { createNotificationAdmin } from "../base/baseFunction.js";
import { pagination, showListCustomer } from "../showList/show.js";
import { handleAddCustomer, handleDeleteCustomer, handleEditCustomer } from "./handleUpdateCustomer.js";
import { showMain } from "../script2.js";

export function deleteCustomer(currentPage) {
    document.querySelectorAll(".delete-customer").forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            let index = parseInt(obj.getAttribute("index-item"));
            let container = document.createElement("div");
            container.className = "container-delete-customer";
            container.innerHTML = `
                <div class="form-delete-customer">
                    <div class="content-delete-customer">
                        <span>Bạn có muốn xóa không ?</span>
                        <button class="yes">Có</button>
                        <button class="no">Không</button>
                    </div>
                </div>
            `;
            document.body.appendChild(container);
            let userList = JSON.parse(localStorage.getItem("userList"));
            document.querySelectorAll(".container-delete-customer .no").forEach((obj) => {
                obj.onclick = () => {
                    document.querySelector(".container-delete-customer").remove();
                    pagination(userList, currentPage, showListCustomer);
                };
            });
            document.querySelectorAll(".container-delete-customer .yes").forEach((obj) => {
                obj.onclick = () => {
                    handleDeleteCustomer(index);
                    console.log(index);
                    document.querySelector(".container-delete-customer").remove();
                    pagination(userList, 1, showListCustomer);
                };
            });
        };
    });
}

export function editCustomer(currentPage) {
    document.querySelectorAll(".edit-customer").forEach((obj) => {
        let userList = JSON.parse(localStorage.getItem("userList"));
        obj.onclick = (e) => {
            e.preventDefault();
            let index = parseInt(obj.getAttribute("index-item"));
            //Ẩn tất cả các main
            const sections = document.querySelectorAll('main');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            //sài js để render ra form sửa customer
            let container = document.createElement("div");
            container.className = "container-edit-customer";
            container.innerHTML = `
                <div class="title">
                <h1>Sửa thông tin khách hàng</h1>
                </div>
                <div class="content">
                    <div class="content-edit-customer">
                        <div id="left-input">
                            <div class="content-two-input">
                                <input type="text" placeholder="Nhập tên tài khoản" class="username-customer" value=${userList[index].username}>
                                <input type="text" placeholder="Nhập mật khẩu" class="password-customer" value=${userList[index].password}>
                            </div>
                            <div class="content-two-input">
                                <input type="text" placeholder="Nhập họ" class="firstname-customer" value=${userList[index].first_name ? userList[index].first_name : ''}>
                                <input type="text" placeholder="Nhập tên" class="lastname-customer" value=${userList[index].last_name ? userList[index].last_name : ''}>
                            </div>
                            <div class="content-one-input">
                                <input type="text" placeholder="Nhập số điện thoại" class="phone-customer" value=${userList[index].phone ? userList[index].phone : ''}>
                            </div>
                            <button class="btn btn-saveChange-customer">Thay đổi và lưu</button>
                        </div>
                    </div>
                </div>
            `;
            let main = document.createElement("main");
            main.id = "main-content-customer-edit";
            main.innerHTML = container.innerHTML;
            document.querySelector("#content").appendChild(main);
            document.querySelector(".btn-saveChange-customer").onclick = () => {
                let result = handleEditCustomer(index);
                if(result){
                    createNotificationAdmin("Sửa thông tin thành công!");
                    userList = JSON.parse(localStorage.getItem("userList"));
                    document.querySelector("#main-content-customer-edit").remove();
                    showMain("main-content-customer");
				    pagination(userList, currentPage, showListCustomer);
                }
            }
        }
    })
}

export function addCustomer(){
    document.querySelector("#main-content-customer .btn-add-customer").onclick = () =>{
        //Ẩn tất cả các main
        const sections = document.querySelectorAll('main');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        let main = document.createElement("main");
        main.className = "main-content-product-add main-content-customer-add";
        main.innerHTML = `
             <div class="title">
                <h1>Thêm khách hàng</h1>
            </div>
            <div class="content">
                <div class="content-product-add content-customer-add">
                    <div id="left-input">
                        <div class="content-two-input">
                            <input type="text" placeholder="Nhập tên tài khoản" class="username-customer">
                            <input type="text" placeholder="Nhập mật khẩu" class="password-customer">
                        </div>
                        <div class="content-two-input">
                           <input type="text" placeholder="Nhập họ" class="firstname-customer">
                            <input type="text" placeholder="Nhập tên" class="lastname-customer" >
                        </div>
                        <div class="content-one-input">
                            <input type="text" placeholder="Nhập số điện thoại" class="phone-customer">
                        </div>
                        <button class="btn btn-add add-customer">Thêm khách hàng</button>
                    </div>
                </div>
            </div>
        `;
        document.querySelector("#content").appendChild(main);
        document.querySelector(".add-customer").onclick = () => {
            let result = handleAddCustomer();
            if(result){
                createNotificationAdmin("Thêm khách hàng thành công!");
                document.querySelector(".main-content-customer-add").remove();
                let userList = JSON.parse(localStorage.getItem("userList"));
                showMain("main-content-customer");
				pagination(userList, Math.ceil(userList.length/3), showListCustomer);
            }
        }
    }
}