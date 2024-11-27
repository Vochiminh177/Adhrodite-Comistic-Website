import { usersList, productItemArray} from "../../database/database.js";
import { pagination, showListProduct, showListCustomer} from "./showList/show.js";
import { addCustomer } from "./updateCustomer/optionCustomer.js";
import {addProduct, filterProductAdmin} from "./updateProduct/OptionProduct.js";

function start(){
	anhMinh();
}


start();

function deleteMainCreatedFromJs(){
	if(document.querySelector(".main-content-customer-edit")){
		document.querySelector(".main-content-customer-edit").remove();
	}
	if(document.querySelector(".main-content-customer-add")){
		document.querySelector(".main-content-customer-add").remove();
	}
}

function anhMinh(){

	//click option của thanh bên
	const allSideMenu = document.querySelectorAll('#side-bar .side-menu li a');

	allSideMenu.forEach(item=> {
		const li = item.parentElement;

		item.addEventListener('click', function(e) {
			e.preventDefault();
			allSideMenu.forEach(i=> {
				i.parentElement.classList.remove('active');
			})
			li.classList.add('active');
			allSideMenu.forEach(i=> {
				i.parentElement.classList.remove('active-mobile');
			})
			li.classList.add('active-mobile');


			//khi click option nào thì hiện main của option đó ở thanh menu
			//ẩn tất cả phần tử main không liên quan
			document.querySelectorAll('main').forEach(section => {
				section.style.display = 'none';
			});
			// deleteMainCreatedFromJs();
			//hiển thị main của option được chọn
			if(item.className == "product_sidebar"){
				showMain("main-content-product-list");
			}
			else if(item.className == "order_sidebar"){
				showMain("main-content-order");
			}
			else if(item.className == "customer_sidebar"){
				showMain("main-content-customer");
			}
		});
	});
	//----------------------------------------------------------------

	// TOGGLE SIDEBAR
	const menuBar = document.querySelector('#content nav .bx.bx-menu');
	const sidebar = document.getElementById('side-bar');

	menuBar.addEventListener('click', function () {
		sidebar.classList.toggle('hide');
	});



	const searchButton = document.querySelector('#content nav form .form-input button');
	const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
	const searchForm = document.querySelector('#content nav form');

	searchButton.addEventListener('click', function (e) {
		if(window.innerWidth < 576) {
			e.preventDefault();
			searchForm.classList.toggle('show');
			if(searchForm.classList.contains('show')) {
				searchButtonIcon.classList.replace('bx-search', 'bx-x');
			} else {
				searchButtonIcon.classList.replace('bx-x', 'bx-search');
			}
		}
	});

	if(window.innerWidth < 768) {
		sidebar.classList.add('hide');
	} else if(window.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}

	window.addEventListener('resize', function () {
		if(this.innerWidth > 576) {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
			searchForm.classList.remove('show');
		}
	});

	const switchMode = document.getElementById('switch-mode');

	switchMode.addEventListener('change', function () {
		if(this.checked) {
			document.body.classList.add('pink1');
		} else {
			document.body.classList.remove('pink1');
		}
	});
}

// function option(){
// 	const allSideMenu = document.querySelectorAll('#side-bar .side-menu li a');

// 	allSideMenu.forEach(item=> {
// 		const li = item.parentElement;

// 		item.addEventListener('click', function() {
// 			allSideMenu.forEach(i=> {
// 				i.parentElement.classList.remove('active');
// 			})
// 			li.classList.add('active');


// 			//khi click option nào thì hiện main của option đó ở thanh menu
// 			//ẩn tất cả phần tử main không liên quan
// 			document.querySelectorAll('main').forEach(section => {
// 				section.style.display = 'none';
// 			});

// 			//hiện thị main của option được chọn
// 			//nếu option là sản phẩm
// 			if(item.className == "product_sidebar"){
// 				showMain("main-content-product-list");
// 				showListProduct();
// 				addProduct();
// 			}
// 			else console.log("khong");
// 		});
// 	});
// }

export function showMain(sectionId) {
    // Ẩn tất cả các phần tử main
    const sections = document.querySelectorAll('main');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Hiển thị phần tử main được chọn
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
	if(sectionId === "main-content-product-list"){
		document.querySelector("#main-content-product-list").innerHTML = `
			 <div class="title">
                <div id="title-name">Danh sách sản phẩm</div>
                <div>
                    <button class="btn btn-add-product">Thêm sản phẩm</button>
                </div>
            </div>
            <div class="filter-product">
                <a href="">Bộ lọc</a>
                <div class="content-filter">
                </div>
            </div>
            <div class="content">
                <div class="content-product-list">
                    <div class="search-product">
                        <input type="text" id="search-product-input" placeholder="Nhập mã sản phẩm">
                        <a href="">Tìm kiếm</a>
                    </div>
                    <table>
                    </table>
                    <div class="list-page"></div>
                </div>
            </div>
		`;
		let productList = JSON.parse(localStorage.getItem("productList")) || [];
		if(productList.length == 0){
			productList = [...productItemArray];
		}
		localStorage.setItem("productList", JSON.stringify(productList));
		addProduct();
		filterProductAdmin();
		pagination(productList, 1, showListProduct, "#main-content-product-list");
	}
	if(sectionId === "main-content-product-add"){
		document.querySelector("#main-content-product-add").innerHTML = `
			<div class="title">
                <h1>Thêm sản phẩm</h1>
                <a class="comback-product">< Quay lại</a>
            </div>
            <div class="content">
                <div class="content-product-add">
                    <div id="left-input">
                        <div class="content-two-input">
                            <input type="text" placeholder="Mã sản phẩm" class="id-add">
                            <input type="text" placeholder="Thương hiệu" class="brand-add">
                        </div>
                        <div class="content-two-input">
                            <input type="text" placeholder="Tên sản phẩm" class="name-add">
							<input type="text" placeholder="Số lượng" class="quantity-add">
                        </div>
                        <div class="content-two-input">
                            <select name="category" id="category-add">
                                <option value="kem-tri-mun">Kem trị mụn</option>
                                <option value="sua-rua-mat">Sữa rửa mặt</option>
                                <option value="son">Son</option>
                                <option value="phan">Phấn</option>
                                <option value="toner">Toner</option>
                                <option value="sereum">Sereum</option>
                                <option value="kem-duong-am">Kem dưỡng ẩm</option>
                                <option value="tay-trang">Tẩy trang</option>
                            </select>
                            <input type="text" placeholder="Giá bán" class="price-add">
                        </div>
                        <div class="content-two-input">
							<input type="text" placeholder="Giảm giá %" class="percent-discount-add">
							<input type="text" placeholder="Số lượng giảm giá" class="quantity-discount-add">
                        </div>
                        <textarea name="" id="" placeholder="Miêu tả sản phẩm" class="description-add"></textarea>
                        <button class="btn btn-add">Lưu sản phẩm</button>
                    </div>
                    <div id="right-input">
                        <div class="add-photo-button">
                            <label for="file"><i class='bx bxs-folder-plus' ></i>  Ảnh sản phẩm</label>
                            <input id="file" type="file" accept="image/*">
                        </div>
                        <div class="image-show"></div>
                    </div>
                </div>
            </div>
		`;
	}
	if(sectionId === "main-content-customer"){
		document.querySelector("#main-content-customer").innerHTML = `
			<div class="title">
                <div id="title-name">Danh Sách Khách Hàng</div>
                <div>
                    <button class="btn btn-add-product btn-add-customer">Thêm khách hàng</button>
                </div>
            </div>
            <div class="content">
                <div class="content-customer-list">
                    <div class="search-customer">
                        <input type="text" id="search-customer-input" placeholder="Nhập tên tài khoản">
                        <a href="">Tìm kiếm</a>
                    </div>
                    <table>
                    </table>
                    <div class="list-page"></div>
                </div>
                
            </div>
		`;
		let userList = JSON.parse(localStorage.getItem("userList")) || [];
		if(userList.length ==0){
			userList = [...usersList];
		}
		localStorage.setItem("userList", JSON.stringify(userList));
		addCustomer();
		pagination(userList, 1, showListCustomer, "#main-content-customer");
	}
	if(sectionId === "main-content-customer-add"){
		document.querySelector("#main-content-customer-add").innerHTML = `
			<div class="title">
                <h1>Thêm khách hàng</h1>
                <a class="comback-customer">< Quay lại</a>
            </div>
            <div class="content">
                <div class="content-customer-add">
                    <div id="left-input">
                        <div class="content-two-input">
                            <input type="text" placeholder="Nhập tên tài khoản" class="username-customer">
                            <input type="text" placeholder="Nhập mật khẩu" class="password-customer">
                        </div>
                        <div class="content-two-input">
                           <input type="text" placeholder="Nhập họ" class="firstname-customer">
                            <input type="text" placeholder="Nhập tên" class="lastname-customer" >
                        </div>
                        <div class="content-two-input">
                            <input type="text" placeholder="Nhập số điện thoại" class="phone-customer">
							<select id="type-customer">
								<option value="0">Khách hàng</option>
								<option value="1">Nhân viên</option>
								<option value="2">Admin</option>
							</select>
                        </div>
                        <button class="btn add-customer">Lưu khách hàng</button>
                    </div>
                </div>
            </div>
		`;
	}
}

