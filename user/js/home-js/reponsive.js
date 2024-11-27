function changeHeader_navbar() {
    const toggle = document.querySelector(".header__menu-toggle");
    const header_navbar = document.querySelector(".header__navbar");

    // Thêm sự kiện click để ẩn/hiện menu
    toggle.addEventListener('click', function () {
        // Kiểm tra trạng thái hiển thị của navbar và thay đổi nó
        if (header_navbar.style.display === "block") {
            header_navbar.style.display = "none"; // Ẩn navbar
            toggle.style.color = "white";

        } else {
            header_navbar.style.display = "block"; // Hiển thị navbar
            toggle.style.color = "black";
        }
    });

    // Kiểm tra chiều rộng viewport và thiết lập hiển thị cho navbar
    function adjustNavbar() {
        let viewportWidth = window.innerWidth;

        if (viewportWidth > 840) {
            // Nếu màn hình lớn hơn 550px, hiển thị navbar dưới dạng flex
            header_navbar.style.display = "flex";
            toggle.style.display = "none";
            header_navbar.style.position = '';
        } else {
            // Nếu màn hình nhỏ hơn hoặc bằng 550px, ẩn navbar
            header_navbar.style.display = "none";
            toggle.style.display = "flex";
            header_navbar.style.position = "absolute";


        }
    }

    // Gọi adjustNavbar lần đầu tiên khi trang được tải
    adjustNavbar();

    // Theo dõi sự thay đổi kích thước viewport
    window.addEventListener('resize', adjustNavbar);
}

// Gọi hàm để kích hoạt
changeHeader_navbar();

//==============================================phần sản phẩm
export function changeLeftMenu(menuSelector, menuListSelector) {
    const menu = document.querySelector(menuSelector);
    const menuList = document.querySelector(menuListSelector);

    // Hàm để xử lý hiển thị menu dựa trên kích thước màn hình
    function handleMenuDisplay() {
        const viewportWidth = window.innerWidth;

        if (menu && menuList) {
            if (viewportWidth < 875) {
                // Màn hình nhỏ: Thêm sự kiện click để hiển thị/ẩn menu
                menuList.style.display = "none"; // Ẩn menu mặc định trên màn hình nhỏ

                menu.addEventListener("click", function () {
                    if (menuList.style.display === "block") {
                        menuList.style.display = "none"; // Ẩn menu list
                    } else {
                        menuList.style.display = "block"; // Hiện menu list
                    }
                });
            } else {
                // Màn hình lớn hơn 500px: Luôn hiển thị menu
                menuList.style.display = "block";
            }
        } 
    }

    // Gọi hàm lần đầu để thiết lập trạng thái ban đầu
    handleMenuDisplay();

    // Thêm sự kiện `resize` để theo dõi thay đổi kích thước màn hình
    window.addEventListener("resize", handleMenuDisplay);
}

// Gọi hàm
changeLeftMenu(".left-menu__title", ".left-menu__list");
changeLeftMenu(".left-search__title",".left-search__form-group" );