// import { productItemArray, userList } from "../../../user/./"
import {
  showMain
} from "../script2.js";
import {
  deleteProduct,
  editProduct,
  filterProductAdmin,
  searchProduct,
} from "../updateProduct/OptionProduct.js";
import {
  blockCustomer,
  deleteCustomer,
  editCustomer,
  filterCustomer,
  searchCustomer,
} from "../updateCustomer/optionCustomer.js";
import {
  createOrderRow,
  generateOrderEvents,
} from "../updateOrder/handleOrders.js";
import { showOrdersListByProductId, showOrdersListByCustomerId } from "../dashboard.js";
import { formatVietNamMoney } from "../../../user/js/common-js/common.js";

function createPage(list, currentPage, showList, main) {
  if(list.length === 0){
    if(main === "#main-content-order"){
      // console.log(document.querySelector(".content-order-table-body"));
      document.querySelector(".content-order-table-body").innerHTML = `
        <td colspan="7">Không có đơn hàng nào</td>
      `;
    } else
    if(main === "#main-content-product-list"){
      document.querySelector(".product-list-table tbody").innerHTML = `
        <td colspan="8">Không có sản phẩm nào</td>
      `;
    } else
    if(main === "#main-content-dashboard"){
      document.querySelector(".dashboardTable tbody").innerHTML = `
        <td colspan="6">Không có sản phẩm nào được bán</td>
      `;
    } else
    if(main === "#main-content-customer"){
      document.querySelector(".content .content-customer-list table tbody").innerHTML = `
        <td colspan="5">Không có tài khoản nào</td>
      `;
    }
    
    if(document.querySelector(".listPage")) document.querySelector(".listPage").style.display = "none";

    return;
  }
  
  let itemPerPage = 7;
  
  let totalPage = Math.ceil(list.length / itemPerPage);

  let pageList = main + " .list-page";

  if (totalPage === 1) {
    document.querySelector(pageList).style.display = "none";
  } else document.querySelector(pageList).style.display = "block";

  let start = (currentPage - 1) * itemPerPage;
  let end = start + itemPerPage;
  if(start >= list.length){
    currentPage--;
    start = (currentPage - 1) * itemPerPage;
    end = start + itemPerPage;
  }

  let firstPage = currentPage - 2;
  let lastPage = currentPage + 2;

  if (firstPage <= 0) {
    firstPage = 1;
    lastPage = 5;
  }
  if (lastPage >= totalPage) {
    lastPage = totalPage;
  }

  // Tạo listpage, số trang
  let eleUl = document.createElement("ul");
  eleUl.className = "listPage";
  eleUl.innerHTML += `<li><a href="" class="left-page"><</a></li>`;

  // Tạo các số trang
  for (let i = firstPage; i <= lastPage; i++) {
    if (currentPage === i) {
      eleUl.innerHTML += `<li><a href="" class="page-number active-page">${i}</a></li>`;
    } else {
      eleUl.innerHTML += `<li><a href="" class="page-number">${i}</a></li>`;
    }
  }
  eleUl.innerHTML += `<li><a href="" class="right-page">></a></li>`;

  // Gán phần tử phân trang vào DOM
  const listPageElement = document
    .querySelector(main)
    .querySelector(".list-page");
  if (listPageElement) {
    listPageElement.innerHTML = eleUl.outerHTML;
  }

  //------------------------------------------
  //----- In ra danh sách list
  showList(start, end, currentPage, list);
  //------------------------------------------

  //-- Gán sự kiện cho các nút phân trang
  const leftPageButton = document
    .querySelector(main)
    .querySelector(".left-page");
  const rightPageButton = document
    .querySelector(main)
    .querySelector(".right-page");
  const pageNumberButtons = document
    .querySelector(main)
    .querySelectorAll(".page-number");

  if (leftPageButton) {
    leftPageButton.onclick = (e) => {
      e.preventDefault();
      if (currentPage - 1 > 0) {
        createPage(list, currentPage - 1, showList, main);
      }
    };
  }

  if (rightPageButton) {
    rightPageButton.onclick = (e) => {
      e.preventDefault();
      if (currentPage + 1 <= totalPage) {
        createPage(list, currentPage + 1, showList, main);
      }
    };
  }

  pageNumberButtons.forEach((obj) => {
    obj.onclick = (e) => {
      e.preventDefault();
      createPage(list, parseInt(obj.textContent), showList, main);
    };
  });
}

export function pagination(list, currentPage, showList, main) {
  createPage(list, currentPage, showList, main);
}

export function showListProduct(start, end, currentPage, productList) {
  //tạo danh sách sản phẩm từ mảng chèn vô bảng table
  let eleTbody = document.querySelector(".content .content-product-list table tbody");
  eleTbody.innerHTML = "";
  productList.forEach((ele, index) => {
    if (index >= start && index < end) {
      eleTbody.innerHTML += `
            <tr>
                <td id="piture"><img src=${ele.src}></td>
                <td id="id">${ele.id}</td>
                <td id="name">${ele.name}</td>
                <td id="brand">${ele.brand}</td>
                <td id="category">${ele.category}</td>
                <td id="price">${formatVietNamMoney(ele.price)}đ</td>
                <td id="quantity">${ele.quantity}</td>
                <td>
                    <a href="" class="edit-product" index-item=${index}>Sửa</a>
                    <a href="" class="delete-product" index-item=${index}>Xóa</a>
                </td>
            </tr>
        `;
    }
  });
  deleteProduct();
  editProduct(currentPage);
  searchProduct();
}

export function showListCustomer(start, end, currentPage, userList) {
  let eleTbody = document.querySelector(".content .content-customer-list table tbody");
  eleTbody.innerHTML = "";
  let objType = {
    customer: "Khách hàng",
    employer: "Nhân viên",
    admin: "Admin",
  };
  userList.forEach((ele, index) => {
    if (index >= start && index < end) {
      eleTbody.innerHTML += `
                <tr>
                    <td id="id-user">${ele.id}</td>
                    <td id="username">${ele.username}</td>
                    <td id="fullname">${(ele.first_name ? ele.first_name : "chưa") +
        " " +
        (ele.last_name ? ele.last_name : "có")
        }</td>
                     <td id="fullname">${objType[ele.type]}</td>
                    <td><a href="" class="edit-customer" index-item=${index}>Sửa</a>
                        <a href="" class="delete-customer" index-item=${index}>Xóa</a>
                        <a href="" class="block-customer" index-item=${index}>${ele.blockStatus ? "Mở khóa" : "Khóa"
        }</a>
                    </td>
                </tr>
            `;
    }
  });
  deleteCustomer(currentPage);
  editCustomer(currentPage);
  searchCustomer();
  blockCustomer(currentPage);
  filterCustomer();
}

export function showListOrder(start, end, curentPage, orderList) {
  document.querySelector(".content-order-table-body").innerHTML = "";
  end = Math.min(end, orderList.length);
  for (let i = start; i < end; i++) {
    createOrderRow(orderList[i]);
  }

  generateOrderEvents(start, end, curentPage, orderList);
}

// hàm tạo bảng thống kê từ dữ liệu phân tích được 
export function showProductStatistics(start, end, currentPage, productReport) {

  let tableContent = `
    <thead>
        <tr>
            <th>Mã</th>
            <th>Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Tổng đơn hàng</th>
            <th>Tổng doanh thu</th>
            <th>Chi tiết</th>
        </tr>
    </thead>`;

  let eleTbody = document.createElement("tbody");

  productReport.forEach((product, index) => {
    if (index >= start && index < end) {
      eleTbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.src}" style="width: 70px; height:70px;"></td>
                <td>${product.name}</td>
                <td>${formatVietNamMoney(product.price)}đ</td>
                <td>${product.orderCount}</td>
                <td>${formatVietNamMoney(product.totalRevenue)}đ</td>
                <td>
                  <button class="order-list-btn" data-product-id="${product.id}">Đơn hàng</button>
                </td>
            </tr>`;
    }
  });

  tableContent += eleTbody.outerHTML;
  document.querySelector(".dashboardTable").innerHTML = tableContent;

  showOrdersListByProductId();
}

export function showCustomerStatistics(start, end, currentPage, customerReport) {

  let tableContent = `
    <thead>
        <tr>
            <th>Mã khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Tổng chi tiêu</th>
            <th>Tổng đơn hàng</th>
            <th>Tùy chọn</th>
        </tr>
    </thead>`;

  let eleTbody = document.createElement("tbody");

  customerReport.forEach((customer, index) => {
    if (index >= start && index < end) {
      eleTbody.innerHTML += `
        <tr>
          <td>${customer.customerId}</td>
          <td>${customer.username}</td>
          <td>${formatVietNamMoney(customer.totalSpent)}đ</td>
          <td>${customer.orderCount}</td>
          <td>
            <button class="order-list-btn" data-customer-id="${customer.customerId}">Đơn hàng</button>
          </td>
        </tr>`;
    }
  });

  tableContent += eleTbody.outerHTML;
  document.querySelector(".dashboardTable").innerHTML = tableContent;

  showOrdersListByCustomerId();
}


