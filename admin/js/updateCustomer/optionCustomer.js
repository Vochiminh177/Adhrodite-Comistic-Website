
import { createNotificationAdmin, err_input } from "../base/baseFunction.js";
import { pagination, showListCustomer } from "../showList/show.js";
import { handleAddCustomer, handleDeleteCustomer, handleEditCustomer, handleBlockCustomer } from "./handleUpdateCustomer.js";
import { showMain } from "../script2.js";
import { locationToSelectArray } from "../../../database/database.js";

export function deleteCustomer(currentPage) {
    document.querySelectorAll(".delete-customer").forEach((obj) => {
        obj.onclick = (e) => {
            e.preventDefault();
            // let index = parseInt(obj.getAttribute("index-item"));
            let userList = JSON.parse(localStorage.getItem("userList"));
            let parent = obj.parentElement.parentElement;
            let username = parent.querySelector("#username");
            let index = userList.findIndex((obj) => {
                return obj.username === username.textContent;
            })
            let container = document.createElement("div");
            container.className = "container-delete-customer";
            container.innerHTML = `
                <div class="form-delete-customer">
                    <a>&times;</a>
                    <div class="content-delete-customer">
                        <div>
                            <span>Bạn có muốn xóa không ?</span>
                        </div>
                        <div>
                            <button class="yes">Có</button>
                            <button class="no">Không</button>
                        </div>
                    </div>
                </div>
            `;
            if(!document.querySelector(".container-delete-customer")) document.body.appendChild(container);

            document.querySelector(".container-delete-customer a").onclick = (e) => {
                e.preventDefault();
                document.querySelector(".container-delete-customer").remove();
            };
            document.querySelector(".container-delete-customer .no").onclick = () => {
                document.querySelector(".container-delete-customer").remove();
            };
            document.querySelector(".container-delete-customer .yes").onclick = () => {
                let result = handleDeleteCustomer(index);
                if(result){
                    createNotificationAdmin("Xóa thành công", "success");
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
            // let index = parseInt(obj.getAttribute("index-item"));
            let parent = obj.parentElement.parentElement;
            let username = parent.querySelector("#username");
            let index = userList.findIndex((obj) => {
                return obj.username === username.textContent;
            })
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
                    createNotificationAdmin("Sửa thông tin thành công!", "success");
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
                createNotificationAdmin("Thêm khách hàng thành công!", "success");
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
        let value = document.querySelector(".search-customer input").value.trim();
        let userList = JSON.parse(localStorage.getItem("userList"));
        let arr = userList.filter((obj) => {
            return (!value || obj.username.toLowerCase() === value.toLowerCase());
        });
        pagination(arr, 1, showListCustomer, "#main-content-customer");
        // if(arr.length === 0){
        //     createNotificationAdmin("Không tìm thấy");
        // }
        // if(i>=0){
        //     let currentPage;
        //     if(currentPage === 0) currentPage = 1;
        //     else currentPage = Math.ceil((i+1)/7);

        //     createFormAddEdit();

        //     document.querySelector(".container-form-user-add-edit .username-customer").value = userList[i].username;
        //     document.querySelector(".container-form-user-add-edit .password-customer").value = userList[i].password;
        //     document.querySelector(".container-form-user-add-edit .firstname-customer").value =  userList[i].first_name;
        //     document.querySelector(".container-form-user-add-edit .lastname-customer").value =  userList[i].last_name;
        //     document.querySelector(".container-form-user-add-edit .phone-customer").value =  userList[i].phone;
        //     document.querySelector(".container-form-user-add-edit .email-customer").value =  userList[i].email;
        //     document.querySelector(".container-form-user-add-edit .address-customer").value =  userList[i].address;
        //     let objType = {
        //         customer: 0,
        //         employer: 1,
        //         admin: 2
        //     };
        //     document.querySelector(".container-form-user-add-edit #type-customer").value = objType[userList[i].type];

        //     document.querySelector(".add-customer").onclick = (e) => {
        //         e.preventDefault();
        //         let result = handleEditCustomer(i);
        //         if(result){
        //             document.querySelector(".container-form-user-add-edit").remove();
        //             createNotificationAdmin("Sửa thông tin thành công!");
        //             userList = JSON.parse(localStorage.getItem("userList"));
        //             showMain("main-content-customer")
        //             pagination(userList, currentPage, showListCustomer, "#main-content-customer");
        //         }
        //     }
        // }
        // else{
        //     createNotificationAdmin("Không tìm thấy");
        // }
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
            // let index = parseInt(obj.getAttribute("index-item"));
            let parent = obj.parentElement.parentElement;
            let username = parent.querySelector("#username");
            let index = userList.findIndex((obj) => {
                return obj.username === username.textContent;
            })
            if(!document.querySelector(".container-delete-customer")){
                let container = document.createElement("div");
                container.className = "container-delete-customer";
                container.innerHTML = `
                    <div class="form-delete-customer">
                      <a>&times;</a>
                        <div class="content-delete-customer">
                            <div>
                                <span>Bạn có muốn ${userList[index].blockStatus ? "mở khóa" : "khóa"} người dùng này không ?</span>
                            </div>
                            <div>
                                <button class="yes">Có</button>
                                <button class="no">Không</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(container);
            }
            document.querySelector(".container-delete-customer a").onclick = (e) => {
                e.preventDefault();
                document.querySelector(".container-delete-customer").remove();
            }
            document.querySelector(".container-delete-customer .no").onclick = () => {
                document.querySelector(".container-delete-customer").remove();
            };
            document.querySelector(".container-delete-customer .yes").onclick = () => {
                handleBlockCustomer(index);
                document.querySelector(".container-delete-customer").remove();
                userList = JSON.parse(localStorage.getItem("userList"));
                pagination(userList, currentPage, showListCustomer, "#main-content-customer");
                createNotificationAdmin(`${userList[index].blockStatus ? "Khóa" : "Mở khóa"} người dùng thành công`, "success");
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
            <div class="content-one-input"><input readonly type="text" placeholder="Địa chỉ" class="address-customer"></div>
            <div class="form-group-address">
                <div class="form-group">
                    <input type="text" class="street" placeholder="Nhập số nhà và đường"/>
                </div>
                <div class="form-group choice-address">
                    <select class="city"><option></option></select>
                    <select class="district"><option></option></select>
                    <select class="ward"><option></option></select>
                </div>
                <button class="apply-address">Áp dụng</button>
            </div>
            <button class="btn add-customer" type="submit">Lưu tài khoản</button>
        </form>
        <div class="form-user-add-edit-delete"></div>
    `;
    if(!document.querySelector(".container-form-user-add-edit")) document.body.appendChild(container);

     //ấn áp dụng địa chỉ
      document.querySelector(".apply-address").onclick = (e) => {
        e.preventDefault();
        let street = document.querySelector(".street");
        // Phường hoặc Xã
        const wardInfo = document.querySelector(".ward :checked").innerText;
        // Quận hoặc Huyện
        const districtInfo = document.querySelector(".district :checked").innerText;
        // Tỉnh thành
        const cityInfo = document.querySelector(".city :checked").innerText;
    
        if(street.value.trim() === ""){
          err_input(street);
          return;
        }
        if(cityInfo === "Chọn Tỉnh thành"){
          err_input(document.querySelector(".city :checked"), null, true);
          return;
        }
        if(districtInfo === "Chọn Quận / Huyện"){
          err_input(document.querySelector(".district :checked"), null, true);
          return;
        }
        if(wardInfo === "Chọn Phường / Xã"){
            err_input(document.querySelector(".ward :checked"), null, true);
            return;
        }
    
        let tmpAddress = street.value.trim() + ", " + wardInfo + ", " + districtInfo + ", " + cityInfo;
        document.querySelector(".address-customer").value = tmpAddress;
      }

    document.querySelector(".form-user-add-edit a").onclick = (e) => {
        e.preventDefault();
        document.querySelector(".container-form-user-add-edit").remove();
    }
    document.querySelector(".form-user-add-edit-delete").onclick = () => {
        document.querySelector(".container-form-user-add-edit").remove();
    }
     //địa chỉ select
      const citySelect = document.querySelector(".city");
      const districtSelect = document.querySelector(".district");
      const wardSelect = document.querySelector(".ward");
       // Hàm đặt lại các lựa chọn
       function resetAllSelect(condition) {
        if (condition === 1) {
          citySelect.innerHTML = `<option>Chọn Tỉnh thành</option>`;
          districtSelect.innerHTML = `<option>Chọn Quận / Huyện</option>`;
        }
        if (condition === 2) {
          districtSelect.innerHTML = `<option>Chọn Quận / Huyện</option>`;
        }
        wardSelect.innerHTML = `<option>Chọn Phường / Xã</option>`;
      }
       // Đặt lại các lựa chọn
        resetAllSelect(1);
        // Cập nhật dữ liệu Thành phố
        let cityItems = "";
        for (let i = 0; i < locationToSelectArray.length; i++) {
          const city = locationToSelectArray[i];
          cityItems += `<option value="${city.id}">${city.name}</option>`;
        }
        citySelect.innerHTML = cityItems;
      
        //Khi người dùng lựa chọn Thành phố
        citySelect.addEventListener("change", function () {
          const cityIDSelected = citySelect.value;
          let districtsFromCitySelected;
          for (let i = 0; i < locationToSelectArray.length; i++) {
            if (locationToSelectArray[i].id == cityIDSelected) {
              districtsFromCitySelected = locationToSelectArray[i].districts;
              break;
            }
          }
      
          // Đặt lại các lựa chọn
          resetAllSelect(2);
          // Cập nhật dữ liệu Quận / Huyện khi đã biết tên Thành phố
          let districtItems = "";
          for (let i = 0; i < districtsFromCitySelected.length; i++) {
            const district = districtsFromCitySelected[i];
            districtItems += `<option value="${district.id}">${district.name}</option>`;
          }
          districtSelect.innerHTML = districtItems;
      
          //Khi người dùng lựa chọn Quận / Huyện
          districtSelect.addEventListener("change", function () {
            const districtIDSelected = districtSelect.value;
            let wardsFromDistrictSelected;
            for (let i = 0; i < districtsFromCitySelected.length; i++) {
              if (districtsFromCitySelected[i].id == districtIDSelected) {
                wardsFromDistrictSelected = districtsFromCitySelected[i].wards;
                break;
              }
            }
      
            // Đặt lại các lựa chọn
            resetAllSelect(0);
            // Cập nhật dữ liệu Phường / Xã khi đã biết tên Quận / Huyện
            let wardItems = "";
            for (let i = 0; i < wardsFromDistrictSelected.length; i++) {
              const ward = wardsFromDistrictSelected[i];
              wardItems += `<option value="${ward.id}">${ward.name}</option>`;
            }
            wardSelect.innerHTML = wardItems;
          });
        });

}

export function filterCustomer(){
    let userList = JSON.parse(localStorage.getItem("userList"));
     //hàm lọc dữ liệu
     function filterData(type, status) {
        let arr = [];
        arr = userList.filter((obj) => {
            let check;
            if(status === "unblock"){
                check = true;
            }
            else check = false;
            return (type === "all" || type === obj.type)
                && (status === "all" || check === obj.blockStatus)
        });
        return arr;
    }
    document.querySelector("#delete-filter-a-customer").onclick = (e) => {
        e.preventDefault();
        showMain("main-content-customer");
        pagination(userList, 1, showListCustomer, "#main-content-customer");
    }
    document.querySelector("#filter-a-customer").onclick = (e) => {
        e.preventDefault();
        let type = document.querySelector(".type select").value;
        let status = document.querySelector(".status-account select").value;
        let arr = filterData(type, status);
        pagination(arr, 1, showListCustomer, "#main-content-customer");
    }
}