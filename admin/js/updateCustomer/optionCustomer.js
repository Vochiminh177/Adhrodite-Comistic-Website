
import { createNotificationAdmin } from "../base/baseFunction.js";
import { pagination, showListCustomer } from "../showList/show.js";
import { handleAddCustomer, handleDeleteCustomer, handleEditCustomer } from "./handleUpdateCustomer.js";
import { showMain } from "../script2.js";

export function deleteCustomer() {
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
            document.querySelector(".container-delete-customer .no").onclick = () => {
                document.querySelector(".container-delete-customer").remove();
            };
            document.querySelector(".container-delete-customer .yes").onclick = () => {
                handleDeleteCustomer(index);
                document.querySelector(".container-delete-customer").remove();
                let userList = JSON.parse(localStorage.getItem("userList"));
                pagination(userList, 1, showListCustomer, "#main-content-customer");
            };
        };
    });
}

export function editCustomer(currentPage) {
    document.querySelectorAll(".edit-customer").forEach((obj) => {
        let userList = JSON.parse(localStorage.getItem("userList"));
        obj.onclick = (e) => {
            e.preventDefault();
            let index = parseInt(obj.getAttribute("index-item"));

            showMain("main-content-customer-add");
            document.querySelector(".username-customer").value = userList[index].username;
            document.querySelector(".password-customer").value = userList[index].password;
            document.querySelector(".firstname-customer").value =  userList[index].first_name;
            document.querySelector(".lastname-customer").value =  userList[index].last_name;
            document.querySelector(".phone-customer").value =  userList[index].phone;

            document.querySelector(".comback-customer").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-customer");
            }

            document.querySelector(".add-customer").onclick = () => {
                let result = handleEditCustomer(index);
                if(result){
                    createNotificationAdmin("Sửa thông tin thành công!");
                    userList = JSON.parse(localStorage.getItem("userList"));
                    showMain("main-content-customer");
				    pagination(userList, currentPage, showListCustomer, "#main-content-customer");
                }
            }
        }
    })
}

export function addCustomer(){
    document.querySelector("#main-content-customer .btn-add-customer").onclick = () =>{
        showMain("main-content-customer-add");
        document.querySelector(".comback-customer").onclick = (e) => {
            e.preventDefault();
            showMain("main-content-customer");
        }

        document.querySelector(".add-customer").onclick = () => {
            let result = handleAddCustomer();
            if(result){
                createNotificationAdmin("Thêm khách hàng thành công!");
                document.querySelector(".main-content-customer-add").remove();
                let userList = JSON.parse(localStorage.getItem("userList"));
                showMain("main-content-customer");
				pagination(userList, Math.ceil(userList.length/3), showListCustomer, "#main-content-customer");
            }
        }
    }
}

export function searchUser(){
    document.querySelector(".search-customer a").onclick = (e) => {
        e.preventDefault();
        let value = document.querySelector(".search-customer input").value;
        let userList = JSON.parse(localStorage.getItem("userList"));
        let i = userList.findIndex((obj) => {
            return obj.username.toLowerCase() === value.toLowerCase();
        });
        
        if(i>=0){
            let currentPage;
            if(i=0){
                currentPage = 1;
            } 
            else currentPage = Math.ceil(i/3);

            showMain("main-content-customer-add");
            document.querySelector(".username-customer").value = userList[i].username;
            document.querySelector(".password-customer").value = userList[i].password;
            document.querySelector(".firstname-customer").value =  userList[i].first_name;
            document.querySelector(".lastname-customer").value =  userList[i].last_name;
            document.querySelector(".phone-customer").value =  userList[i].phone;

            document.querySelector(".comback-customer").onclick = (e) => {
                e.preventDefault();
                showMain("main-content-customer");
            }
            document.querySelector(".add-customer").onclick = () => {
                let result = handleEditCustomer(i);
                if(result){
                    createNotificationAdmin("Sửa thông tin thành công!");
                    userList = JSON.parse(localStorage.getItem("userList"));
                    showMain("main-content-customer");
				    pagination(userList, currentPage, showListCustomer, "#main-content-customer");
                }
            }
        }
        else{
            createNotificationAdmin("Không tìm thấy");
        }
    };
    document.querySelector(".search-customer input").onfocus = () => {
        document.querySelector(".search-customer input").value = "";
        document.querySelector(".search-customer input").placeholder = "Nhập tên tài khoản";  
    }
}
