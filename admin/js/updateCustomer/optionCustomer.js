
import { createNotificationAdmin } from "../base/baseFunction.js";
import { pagination, showListCustomer } from "../showList/show.js";
import { handleAddCustomer, handleDeleteCustomer, handleEditCustomer, handleBlockCustomer } from "./handleUpdateCustomer.js";
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
            document.querySelector(".container-delete-customer .no").onclick = () => {
                document.querySelector(".container-delete-customer").remove();
            };
            document.querySelector(".container-delete-customer .yes").onclick = () => {
                let result = handleDeleteCustomer(index);
                if(result){
                    createNotificationAdmin("Xóa thành công");
                }
                else createNotificationAdmin("Không thể xóa");
                document.querySelector(".container-delete-customer").remove();
                let userList = JSON.parse(localStorage.getItem("userList"));
                showMain("main-content-customer");
                pagination(userList, currentPage, showListCustomer, "#main-content-customer");
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
            createFormAddEdit();
            document.querySelector(".container-form-user-add-edit .username-customer").value = userList[index].username;
            document.querySelector(".container-form-user-add-edit .password-customer").value = userList[index].password;
            document.querySelector(".container-form-user-add-edit .firstname-customer").value =  userList[index].first_name;
            document.querySelector(".container-form-user-add-edit .lastname-customer").value =  userList[index].last_name;
            document.querySelector(".container-form-user-add-edit .phone-customer").value =  userList[index].phone;
            document.querySelector(".container-form-user-add-edit .address-customer").value =  userList[index].address;
            let objType = {
                customer: 0,
                employer: 1,
                admin: 2
            };
            document.querySelector(".container-form-user-add-edit #type-customer").value = objType[userList[index].type];
            document.querySelector(".container-form-user-add-edit .email-customer").value = userList[index].email;

            // document.querySelector(".comback-customer").onclick = (e) => {
            //     e.preventDefault();
            //     showMain("main-content-customer");
            // }

            document.querySelector(".add-customer").onclick = (e) => {
                e.preventDefault();
                let result = handleEditCustomer(index);
                if(result){
                    document.querySelector(".container-form-user-add-edit").remove();
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
        createFormAddEdit();
        document.querySelector(".container-form-user-add-edit .add-customer").onclick = (e) => {
            e.preventDefault();
            let result = handleAddCustomer();
            if(result){
                document.querySelector(".container-form-user-add-edit").remove();
                createNotificationAdmin("Thêm khách hàng thành công!");
                let userList = JSON.parse(localStorage.getItem("userList"));
                showMain("main-content-customer");
				pagination(userList, Math.ceil(userList.length/7), showListCustomer, "#main-content-customer");
            }
        }
    }
}

export function searchCustomer(){
    document.querySelector(".search-customer a").onclick = (e) => {
        e.preventDefault();
        let value = document.querySelector(".search-customer input").value;
        let userList = JSON.parse(localStorage.getItem("userList"));
        let i = userList.findIndex((obj) => {
            return obj.username.toLowerCase() === value.toLowerCase();
        });

        if(i>=0){
            let currentPage;
            if(currentPage === 0) currentPage = 1;
            else currentPage = Math.ceil((i+1)/7);

            createFormAddEdit();

            document.querySelector(".container-form-user-add-edit .username-customer").value = userList[i].username;
            document.querySelector(".container-form-user-add-edit .password-customer").value = userList[i].password;
            document.querySelector(".container-form-user-add-edit .firstname-customer").value =  userList[i].first_name;
            document.querySelector(".container-form-user-add-edit .lastname-customer").value =  userList[i].last_name;
            document.querySelector(".container-form-user-add-edit .phone-customer").value =  userList[i].phone;
            document.querySelector(".container-form-user-add-edit .email-customer").value =  userList[i].email;
            document.querySelector(".container-form-user-add-edit .address-customer").value =  userList[i].address;
            let objType = {
                customer: 0,
                employer: 1,
                admin: 2
            };
            document.querySelector(".container-form-user-add-edit #type-customer").value = objType[userList[i].type];

            document.querySelector(".add-customer").onclick = (e) => {
                e.preventDefault();
                let result = handleEditCustomer(i);
                if(result){
                    document.querySelector(".container-form-user-add-edit").remove();
                    createNotificationAdmin("Sửa thông tin thành công!");
                    userList = JSON.parse(localStorage.getItem("userList"));
                    showMain("main-content-customer")
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

export function blockCustomer(currentPage){
    document.querySelectorAll(".block-customer").forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            let userList = JSON.parse(localStorage.getItem("userList"));
            let index = parseInt(obj.getAttribute("index-item"));
            let container = document.createElement("div");
            container.className = "container-delete-customer";
            container.innerHTML = `
                <div class="form-delete-customer">
                    <div class="content-delete-customer">
                        <span>Bạn có muốn ${userList[index].blockStatus ? "mở khóa" : "khóa"} người dùng này không ?</span>
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
                handleBlockCustomer(index);
                document.querySelector(".container-delete-customer").remove();
                userList = JSON.parse(localStorage.getItem("userList"));
                pagination(userList, currentPage, showListCustomer, "#main-content-customer");
                createNotificationAdmin(`${userList[index].blockStatus ? "Khóa" : "Mở khóa"} người dùng thành công`);
            };
        };
    });
}

function createFormAddEdit(){
    let container = document.createElement("div");
    container.className = "container-form-user-add-edit";
    container.innerHTML = `
        <form action="" autocomplete="off" class="form-user-add-edit">
            <a>&times;</a>
            
            <div class="content-two-input">
                <input type="text" placeholder="Tên tài khoản" class="username-customer">
                <input type="text" placeholder="Mật khẩu" class="password-customer">
            </div>
            <div class="content-two-input">
                <input type="text" placeholder="Họ" class="firstname-customer">
                <input type="text" placeholder="Tên đệm" class="lastname-customer" >
            </div>
            <div class="content-two-input">
                <input type="text" placeholder="Số điện thoại" class="phone-customer">
                <select id="type-customer">
                    <option value="0">Khách hàng</option>
                    <option value="1">Nhân viên</option>
                    <option value="2">Admin</option>
                </select>
            </div>
            <div class="content-one-input"><input type="text" placeholder="Email" class="email-customer"></div>
            <div class="content-one-input"><input type="text" placeholder="Địa chỉ" class="address-customer"></div>
            <button class="btn add-customer" type="submit">Lưu khách hàng</button>
        </form>
        <div class="form-user-add-edit-delete"></div>
    `;
    document.body.appendChild(container);
    document.querySelector(".form-user-add-edit a").onclick = (e) => {
        e.preventDefault();
        document.querySelector(".container-form-user-add-edit").remove();
    }
    document.querySelector(".form-user-add-edit-delete").onclick = () => {
        document.querySelector(".container-form-user-add-edit").remove();
    }

}