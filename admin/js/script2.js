import { usersList, productItemArray} from "../../database/database.js";
import { pagination, showListProduct, showListCustomer} from "./showList/show.js";
import { addCustomer } from "./updateCustomer/optionCustomer.js";
import {addProduct} from "./updateProduct/OptionProduct.js";

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


			//khi click option nào thì hiện main của option đó ở thanh menu
			//ẩn tất cả phần tử main không liên quan
			document.querySelectorAll('main').forEach(section => {
				section.style.display = 'none';
			});
			deleteMainCreatedFromJs();
			//hiển thị main của option được chọn
			if(item.className == "product_sidebar"){
				let productList = JSON.parse(localStorage.getItem("productList")) || [];
				if(productList.length == 0){
					productList = [...productItemArray];
				}
				localStorage.setItem("productList", JSON.stringify(productList));
				showMain("main-content-product-list");
				addProduct();
				pagination(productList, 1, showListProduct, "#main-content-product-list");
			}
			else if(item.className == "order_sidebar"){
				showMain("main-content-order");
			}
			else if(item.className == "customer_sidebar"){
				console.log(2);
				let userList = JSON.parse(localStorage.getItem("userList")) || [];
				if(userList.length == 0){
					userList = [...usersList];
				}
				localStorage.setItem("userList", JSON.stringify(userList));
				showMain("main-content-customer");
				addCustomer();
				pagination(userList, 1, showListCustomer, "#main-content-customer");
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
}

