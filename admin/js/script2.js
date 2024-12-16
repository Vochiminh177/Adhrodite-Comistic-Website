// import { userList, productItemArray } from "../../database/database.js";
import {
  pagination,
  showListProduct,
  showListCustomer,
  showListOrder
} from "./showList/show.js";
import { addCustomer } from "./updateCustomer/optionCustomer.js";
import {
  addProduct,
  filterProductAdmin,
} from "./updateProduct/OptionProduct.js";
import { generateOrderFilter } from "./updateOrder/orderFilter.js";

import { DashboardEvent } from "./dashboard.js";
import { createNotificationAdmin } from "./base/baseFunction.js";

import { responsiveOrderFilter } from "./responsive.js"

// import { responsiveOrderFilter } from "./responsive.js";

function start() {
  anhMinh();
}

start();

function deleteMainCreatedFromJs() {
  if (document.querySelector(".main-content-customer-edit")) {
    document.querySelector(".main-content-customer-edit").remove();
  }
  if (document.querySelector(".main-content-customer-add")) {
    document.querySelector(".main-content-customer-add").remove();
  }
}

function anhMinh() {
	showMain("main-content-dashboard");

  //click option của thanh bên
  const allSideMenu = document.querySelectorAll('#side-bar .side-menu li a');

  allSideMenu.forEach((item) => {
    const li = item.parentElement;
    item.addEventListener("click", function (e) {
      e.preventDefault();
      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      li.classList.add("active");
      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active-mobile");
      });
      li.classList.add("active-mobile");

      //khi click option nào thì hiện main của option đó ở thanh menu
      //ẩn tất cả phần tử main không liên quan
      document.querySelectorAll("main").forEach((section) => {
        section.style.display = "none";
      });
      // deleteMainCreatedFromJs();
      //hiển thị main của option được chọn
      if (item.className === "product_sidebar") {
        showMain("main-content-product-list");
      } else if (item.className === "order_sidebar") {
        showMain("main-content-order");
      } else if (item.className === "account_sidebar") {
        showMain("main-content-customer");
      } else if (item.className === "dashboard_sidebar") {
        showMain("main-content-dashboard");
      } else if (item.className === "customer_sidebar") {
        location.assign(location.origin + "/user/index.html");
      } else {
        localStorage.setItem("indexCurrentUserLogin", JSON.stringify(-1));
        createNotificationAdmin("Đăng xuất thành công");
        document.querySelector("#side-bar").style.display = "none";
            document.querySelector("#content").style.display = "none";
            document.querySelector("#container-admin-login").style.display = "flex";

      }
    });
  });
  //----------------------------------------------------------------

  // TOGGLE SIDEBAR
  const menuBar = document.querySelector("#content nav .bx.bx-menu");
  const sidebar = document.getElementById("side-bar");

  if (menuBar) {
    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hide");
    });
  }

  const searchButton = document.querySelector(
    "#content nav form .form-input button"
  );
  const searchButtonIcon = document.querySelector(
    "#content nav form .form-input button .bx"
  );
  const searchForm = document.querySelector("#content nav form");

  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });
  }

  if (searchButton && searchForm) {
    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    window.addEventListener("resize", function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });
  }

  const switchMode = document.getElementById("switch-mode");
  if (switchMode) {
    switchMode.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("pink1");
      } else {
        document.body.classList.remove("pink1");
      }
    });
  }
}

export function showMain(sectionId) {
  // console.log(document.querySelector(".dashboardTable")); // Kiểm tra phần tử có tồn tại trong DOM
  // Ẩn tất cả các phần tử main
  const sections = document.querySelectorAll("main");
  sections.forEach((section) => {
    section.style.display = "none";
    section.innerHTML = "";
  });

  // Hiển thị phần tử main được chọn
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = "block";
  }
  if (sectionId === "main-content-dashboard") {
    document.querySelector("#main-content-dashboard").innerHTML = `
<div class="title">
    <div id="title-name">Thống kê</div>
</div>
<div class="content">
    <div class="dashboard-highlight">
        <div class="dashboard-highlight-box">
            <i class='bx bx-dollar'></i>
            <div>
                <h3></h3>
                <span>Tổng doanh thu</span>
            </div>
        </div>
        <div class="dashboard-highlight-box">
            <i class='bx bx-cart'></i>
            <div>
                <h3></h3>
                <span>Tổng đơn hàng</span>
            </div>
        </div>
        <div class="dashboard-highlight-box">
            <i class='bx bxs-smile'></i>
            <div>
                <h3></h3>
                <span>Tổng khách hàng</span>
            </div>
        </div>
        <div class="dashboard-highlight-box-product">
            <img src="" alt="Sản phẩm" style="width: 80px; height: 100px; ">
            <div>
                <h3 id="productId"></h3>
                <span>Nổi bật</span>
            </div>
        </div>
    </div>

 <div class="dashboard-filter">
    <!-- Cột Thống kê và Tìm kiếm -->
    <div class="filter-group-container">
      <div class="filter-group">
          <label for="sortTypeStatistic">Thống kê:</label>
          <select id="sortTypeStatistic" class="sort-input">
              <option value="product">Theo sản phẩm</option>
              <option value="customer">Theo khách hàng</option>
          </select>
          <label for="product-id" id="object-id-label">Tìm kiếm:</label>
          <input type="search" id="object-id" class="custom-date-input" placeholder="Nhập mã sản phẩm">
      </div>

      <!-- Cột Sắp xếp và Hiển thị -->
      <div class="filter-group">
          <label for="sortType">Sắp xếp:</label>
          <select id="sortType" class="sort-input">
              <option value="desc">Tổng tiền giảm dần</option>
              <option value="asc">Tổng tiền tăng dần</option>
              <option value="az">Từ A đến Z</option>
              <option value="za">Từ Z đến A</option>
          </select>
          <label for="row-count">Hiển thị:</label>
          <input type="text" id="row-count" class="custom-date-input" placeholder="Nhập số hàng">
      </div>

      <!-- Cột Ngày bắt đầu và Ngày kết thúc -->
      <div class="filter-group">
          <label for="from-date">Từ ngày:</label>
          <input type="date" id="from-date" class="custom-date-input">
          <label for="to-date">Đến ngày:</label>
          <input type="date" id="to-date" class="custom-date-input">
      </div>
    </div>

    <!-- Cột Nút Lọc và Xóa -->
    <div class="filter-group-button">
        <button id="filterBtn" class="reset-button">Lọc</button>
        <button id="resetBtn" class="reset-button">Xóa</button>
    </div>
</div>



    <div class="dashboard-data">
        <table class="dashboardTable">
        </table>
    </div>
</div>
<div class="list-page"></div>
		`;
    DashboardEvent();
  } else if (sectionId === "main-content-dashboard-orderList") {
    document.querySelector("#main-content-dashboard-orderList").innerHTML = `
<a class="comeback-product">
            < Quay lại</a>
      <div class="title">
          <div id="title-name">Danh sách đơn hàng</div>
      </div>
    
<div class="dashboard-filter">
    <div class="filter-group">
        <label for="sortType">Sắp xếp:</label>
        <select id="sortType" class="sort-input">
            <option value="desc">Tổng tiền giảm dần</option>
            <option value="asc">Tổng tiền tăng dần</option>
        </select>
        <label for="row-count">Hiển thị:</label>
        <input type="text" id="row-count" class="custom-date-input" placeholder="Nhập số hàng">
    </div>
    <div class="filter-group">
        <label for="from-date">Từ ngày:</label>
        <input type="date" id="from-date" class="custom-date-input">
        <label for="to-date">Đến ngày:</label>
        <input type="date" id="to-date" class="custom-date-input">
    </div>
    <div class="filter-group-button">
        <button id="filterBtn" class="reset-button">Lọc</button>
        <button id="resetBtn" class="reset-button">Xóa</button>
    </div>
</div>
<div class="content">
    <div id="dashboard-main">
        <div class="content order">
            <div class="table-container">
                <table class="content-order-table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Mã khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Quận, Tỉnh/TP</th>
                            <th>Tổng cộng</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>

                    <tbody class="content-order-table-body">

                    </tbody>
                </table>
                <div class="list-page"></div>
            </div>
            <!-- Modal hiện chi tiết đơn hàng -->
            <div id="order-details-modal" class="order-details-modal">
                <div class="order-details-modal-content">
                    <a href="#" class="close-btn">&times;</a>
                    <div id="order-details-container">
                        <!-- Header đơn hàng -->
                        <header class="order-header" id="order-header">
                        </header>

                        <div class="order-customer-info-and-cost-wrapper">
                            <!-- Thông tin khách hàng -->
                            <section class="customer-info" id="customer-info">

                            </section>
                            <!-- Chi phí đơn hàng -->
                            <section class="order-summary" id="order-summary">

                            </section>
                        </div>
                        <!-- Các sản phẩm -->
                        <section class="product-info" id="product-info">
                            <h3>Chi tiết Sản Phẩm</h3>
                            <table class="order-product-table">
                                <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>

                                <tbody id="order-product-info-body">
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`;
  } else
    if (sectionId === "main-content-product-list") {
      document.querySelector("#main-content-product-list").innerHTML = `
			 <div class="title">
                <h2 id="title-name">Danh sách sản phẩm</h2>
            </div>
            <div class="content">
                <div class="content-product-list">
                <div class="filter-product">
                    <div class="content-product-row">
                        <div class="search-product search-id">
                          <input type="text" id="search-product-id" placeholder="Nhập mã sản phẩm">
                          <a href="">Tìm kiếm</a>
                        </div>
                        <button class="btn btn-add-product">Thêm sản phẩm</button>
                    </div>
                    <div class="content-filter">
                        </div>
                    </div>
                    <div class="product-table">
                      <table class="product-list-table">
                          <thead>
                            <tr>
                                <th class="picture-list">Hình ảnh</th>
                                <th class="id-list">Mã</th>
                                <th class="name-list">Tên</th>
                                <th class="brand-list">Thương hiệu</th>
                                <th class="category-list">Danh mục</th>
                                <th class="price-list">Giá</th>
                                <th class="quantity-list">Số lượng</th>
                                <th class="option-list">Tùy chỉnh</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                      </table>
                    </div>
					<div class="list-page"></div>
                </div>
            </div>
		
		`;
    let productList = JSON.parse(localStorage.getItem("productList")) || [];

    addProduct();
    filterProductAdmin();
    pagination(productList, 1, showListProduct, "#main-content-product-list");
  } else if (sectionId === "main-content-order") {
    document.querySelector("#main-content-order").innerHTML = `
		<div class="content order">
      <div class="title">
        <h2 id="title-name">Danh sách đơn hàng</h2>
      </div>
      <div class="order-filter-container" id="order-filter-container"></div>
			<div class="table-container">
        <table class="content-order-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Mã khách hàng</th>
              <th>Ngày đặt</th>
              <th>Quận, Tỉnh/TP</th>
              <th>Tổng cộng</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>

          <tbody class="content-order-table-body">

          </tbody>
        </table>
        <div class="list-page"></div>
			</div>
			<!-- Modal hiện chi tiết đơn hàng -->
			<div id="order-details-modal" class="order-details-modal">
				<div class="order-details-modal-content">
					<a href="#" class="close-btn">&times;</a>
					<div id="order-details-container">
						<!-- Header đơn hàng -->
						<header class="order-header" id="order-header">
						</header>

            <div class="order-customer-info-and-cost-wrapper">
              <!-- Thông tin khách hàng -->
              <section class="customer-info" id="customer-info">

              </section>
              <!-- Chi phí đơn hàng -->
              <section class="order-summary" id="order-summary">
        
              </section>
            </div>
						<!-- Các sản phẩm -->
						<section class="product-info" id="product-info">
							<h3>Chi tiết Sản Phẩm</h3>
							<table class="order-product-table">
								<thead>
									<tr>
						 					<th>Mã sản phẩm</th>
										<th>Số lượng</th>
										<th>Đơn giá</th>
										<th>Thành tiền</th>
									</tr>
								</thead>
					
								<tbody id="order-product-info-body">
								</tbody>
							</table>
						</section>
			
						<!-- Thanh hành động-->
						<div class="action-bar" id="action-bar">
			
						</div>
					</div>
				</div>
			</div>
      <div class="order-confirm-modal" id="order-confirm-modal">
      <div class="order-confirm-modal-content">
        <a href="#" class="close-btn">&times;</a>
          <p class="order-confirm-modal-message" id="order-confirm-modal-message"></p>
          <div class="order-confirm-modal-buttons">
            <button class="order-btn order-confirm-btn" id="order-confirm-confirm-btn">Xác nhận</button>
            <button class="order-btn order-cancel-btn" id="order-confirm-cancel-btn">Huỷ</button>
          </div>
        </div>
      </div>
		</div>
		`;
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    pagination(orderList, 1, showListOrder, "#main-content-order");
    generateOrderFilter();
    responsiveOrderFilter();
  } else if (sectionId === "main-content-product-add") {
    document.querySelector("#main-content-product-add").innerHTML = `
			<div class="title">
                <h1>Thêm sản phẩm</h1>
                <a class="comback-product">< Quay lại</a>
            </div>
            <div class="content">
                <div class="content-product-add">
                    <div id="left-input">
                    <form action="" autocomplete="off">
                        <div class="content-two-input">
                            <div class="content-two-input-group">
                              <label for="id-add">Mã sản phẩm</label>
                              <input type="text" placeholder="Mã sản phẩm" id="id-add" class="id-add">
                            </div>
                            <div class="content-two-input-group">
                              <label for="brand-add">Thương hiệu</label>
                              <input type="text" placeholder="Thương hiệu" id="brand-add" class="brand-add">
                            </div>
                        </div>
                        <div class="content-two-input">
                          <div class="content-two-input-group">
                            <label for="name-add">Tên sản phẩm</label>
                            <input type="text" placeholder="Tên sản phẩm" id="name-add" class="name-add">
                          </div>
                          <div class="content-two-input-group">
                            <label for="quantity-add">Số lượng sản phẩm</label>
                            <input type="text" placeholder="Số lượng sản phẩm" id="quantity-add" class="quantity-add">
                          </div>
                        </div>
                        <div class="content-two-input">
                          <div class="content-two-input-group">
                            <label for="category-add">Loại sản phẩm</label>
                            <select name="category" id="category-add" id="category-add">
                                  <option value="kem-tri-mun">Kem trị mụn</option>
                                  <option value="sua-rua-mat">Sữa rửa mặt</option>
                                  <option value="son">Son</option>
                                  <option value="phan">Phấn</option>
                                  <option value="toner">Toner</option>
                                  <option value="sereum">Sereum</option>
                                  <option value="kem-duong-am">Kem dưỡng ẩm</option>
                                  <option value="tay-trang">Tẩy trang</option>
                              </select>
                          </div>
                          <div class="content-two-input-group">
                            <label for="price-add">Giá bán</label>
                            <input type="text" placeholder="Giá bán" id="price-add" class="price-add">
                          </div>
                        </div>
                        <div class="content-two-input">
                        <div class="content-two-input-group">
                          <label for="percent-discount-add">Giảm giá (%)</label>
                          <input type="text" placeholder="Giảm giá (%)" id="percent-discount-add" class="percent-discount-add">
                        </div>
                        <div class="content-two-input-group">
                          <label for="quantity-discount-add">Số lượng giảm giá</label>
                          <input type="text" placeholder="Số lượng giảm giá" id="quantity-discount-add" class="quantity-discount-add">
                        </div>
                      </div>
                        <div class="content-one-input-group">
                          <label for="description-add">Miêu tả sản phẩm</label>
                          <textarea name="" id="" placeholder="Miêu tả sản phẩm" id="description-add" class="description-add" style="resize: none; height: 200px"></textarea>
                        </div>
                        <div class="content-one-input-group">
                          <button type="submit" class="btn btn-add">Lưu sản phẩm</button>
                        </div>
                        </form>
                      </div>
                    <div id="right-input">
                        <div class="add-photo-button">
                            <label for="file"><i class='bx bxs-folder-plus' ></i> Ảnh sản phẩm</label>
                            <input id="file" type="file" accept="image/*">
                        </div>
                        <div class="image-show">
                          <img src="./assets/images/no-image.png" alt="Ảnh sản phẩm" style="width: 100%; height: 568px;">
                        </div>
                    </div>
                </div>
            </div>
		`;
  } else if (sectionId === "main-content-customer") {
    document.querySelector("#main-content-customer").innerHTML = `
            <div class="title">
                <div id="title-name">Danh sách tài khoản</div>
            </div>
            <div class="content">
				<div class="customer-row">
					<div class="search-customer">
            <div class="search-customer-bar">
              <input type="text" id="search-customer-input" placeholder="Nhập tên tài khoản">
              <a href="">Tìm kiếm</a>
            </div>
            <button class="btn btn-add-product btn-add-customer">Thêm khách hàng</button>
					</div>
          <div id="filter-customer">
              <div class="content-filter">
                <div class="type">
                  <p>Loại:</p>
                  <select id="filter-type-customer">
                    <option value="all">Tất cả</option>
                    <option value="employer">Nhân viên</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Khách hàng</option>
                  </select>
                </div>
                <div class="status-account">
                  <p>Tình trạng:</p>
                  <select id="filter-status-block">
                    <option value="all">Tất cả</option>
                    <option value="block">Khóa</option>
                    <option value="unblock">Mở khóa</option>
                  </select>
                </div>
                <a href="#" id="filter-a-customer">Lọc</a>
              </div>
          </div>
				</div>
                <div class="content-customer-list">
                  <div class="customer-table">
                    <table class="content-customer-table">
                      <thead>
                        <tr>
                            <th class="id-user-list">Id</th>
                            <th class="username-list">Tài khoản</th>
                            <th class="fullname-list">Họ tên</th>
                            <th class="type-user">Loại</th>
                            <th class="edit-user">Chỉnh sửa</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
					<div class="list-page"></div>
                </div>
            </div>
	
		`;
      let userList = JSON.parse(localStorage.getItem("userList"));
      localStorage.setItem("userList", JSON.stringify(userList));
      addCustomer();
      pagination(userList, 1, showListCustomer, "#main-content-customer");
    } else if (sectionId === "main-content-customer-add") {
      document.querySelector("#main-content-customer-add").innerHTML = `
			<div class="title">
                <h1>Thêm khách hàng</h1>
                <a class="comback-customer">< Quay lại</a>
            </div>
            <div class="content">
                <div class="content-customer-add">
                    <div id="left-input">
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
                        <button class="btn add-customer">Lưu khách hàng</button>
                    </div>
                </div>
            </div>
		`;
    }
}
