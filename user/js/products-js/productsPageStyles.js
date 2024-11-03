// Hàm cập nhật lại leftMenuStyle
export function updateLeftMenuStyle(leftMenuValue) {
  // Kiểm tra và xoá đi thẻ style (Left Menu Style) tồn tại từ trước
  const leftMenuExistingStyle = document.querySelector(".left-menu-style");
  if (leftMenuExistingStyle) {
    leftMenuExistingStyle.remove();
  }
  // Tạo một thẻ style (Left Menu Style) mới
  const leftMenuStyle = document.createElement("style");
  leftMenuStyle.className = "left-menu-style";
  leftMenuStyle.innerHTML = `
  .body__products .left-menu__action#${leftMenuValue}-left-menu {
    color: #fc8eac;
  }
  .body__products .left-menu__action#${leftMenuValue}-left-menu::before {
    background-color: #fc8eac;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu) {
    color: #000;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu)::before {
    background-color: #000;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu):hover {
    color: #fc8eac;
  }
  .body__products .left-menu__action:not(#${leftMenuValue}-left-menu):hover::before {
    background: #fc8eac;
  }
`;
  document.head.appendChild(leftMenuStyle);
}
