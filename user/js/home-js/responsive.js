document.addEventListener("DOMContentLoaded", function () {
    function changeHeader_navbar() {
        const toggle = document.querySelector(".header__menu-toggle");
        const header_navbar = document.querySelector(".header__navbar");
    
        // Thêm sự kiện click để ẩn/hiện menu
        toggle.addEventListener('click', function () {
            // Kiểm tra trạng thái hiển thị của navbar và thay đổi nó
            header_navbar.classList.toggle('active');
        });
    
       
    }
    
    // Gọi hàm để kích hoạt
    changeHeader_navbar();
    });
    
    //==============================================phần sản phẩm
    
    
    export function changeLeftMenu(menuSelector, menuListSelector, active) {
        const left__menu_btn = document.querySelector(menuSelector);
        const menuList = document.querySelector(menuListSelector);
    
        if (!left__menu_btn || !menuList) return;
    
        left__menu_btn.addEventListener('click', function () {
            menuList.classList.toggle(active);
        });
    }
    
    