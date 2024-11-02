document
  .querySelector(".left-search-filter__action")
  .addEventListener("click", function () {
    let filterContentBlock = document.querySelector(
      ".left-search-filter__content"
    );
    if (
      getComputedStyle(filterContentBlock).getPropertyValue("display") ===
      "none"
    ) {
      filterContentBlock.style.display = "block";
    } else {
      filterContentBlock.style.display = "none";
    }
  });
