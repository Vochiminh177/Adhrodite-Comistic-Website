// Sự kiện khi người dùng nhấn vào icon hình nhân trên Header
function unShowUserFormInMenuHeader() {
  document.getElementById("user-exit").addEventListener("click", function () {
    // Xóa changeUserFormInMenuHeaderScript
    const changeUserFormInMenuHeaderExistingScript = document.querySelector(
      ".change-user-form-in-menu-header-script"
    );
    if (changeUserFormInMenuHeaderExistingScript) {
      changeUserFormInMenuHeaderExistingScript.remove();
    }

    // Xử lý sự kiện
    const userModal = document.getElementById("user-modal");
    const userBlock = document.getElementById("user-block");
    const userExit = document.getElementById("user-exit");
    if (
      getComputedStyle(userModal).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userBlock).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
    ) {
      userModal.style.visibility = "hidden";
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
    }
  });
}
export function showUserFormInMenuHeader() {
  document.getElementById("user-click").addEventListener("click", function () {
    // Tạo mới changeUserFormInMenuHeaderScript
    const changeUserFormInMenuHeaderScript = document.createElement("script");
    changeUserFormInMenuHeaderScript.src =
      "./js/home-js/changeUserFormInMenuHeader.js";
    changeUserFormInMenuHeaderScript.className =
      "change-user-form-in-menu-header-script";
    document.body.appendChild(changeUserFormInMenuHeaderScript);

    // Xử lý sự kiện
    const userModal = document.getElementById("user-modal");
    const userBlock = document.getElementById("user-block");
    const userExit = document.getElementById("user-exit");
    if (
      getComputedStyle(userBlock).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userModal).getPropertyValue("visibility") ===
        "visible" &&
      getComputedStyle(userExit).getPropertyValue("visibility") === "visible"
    ) {
      userModal.style.visibility = "hidden";
      userBlock.style.visibility = "hidden";
      userExit.style.visibility = "hidden";
    } else {
      userModal.style.visibility = "visible";
      userBlock.style.visibility = "visible";
      userExit.style.visibility = "visible";

      unShowUserFormInMenuHeader();
    }
  });
}
