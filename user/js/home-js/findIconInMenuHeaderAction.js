// Sự kiện khi người dùng nhấn vào icon tìm kiếm trên Header
export function showFindFormInMenuHeader() {
  document.getElementById("find-click").addEventListener("click", function () {
    const userBlock = document.getElementById("find-block");
    if (
      getComputedStyle(userBlock).getPropertyValue("visibility") === "visible"
    ) {
      userBlock.style.visibility = "hidden";
    } else {
      userBlock.style.visibility = "visible";
    }
  });
}
