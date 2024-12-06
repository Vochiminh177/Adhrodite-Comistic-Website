import { formatVietNamMoney } from "../common-js/common.js";
import { brands } from "../../../database/database.js"
// Bước nhảy
const step = 50000;
// Chênh lệch nhỏ nhất
const gap = 50000;
let minLimit = 100000;
let maxLimit = 900000;
// Giá trị để sử dụng
let currentMin = minLimit;
let currentMax = maxLimit;
// Giá trị của các thanh kéo
let currentMinSlider = minLimit;
let currentMaxSlider = maxLimit;

let doubleSlider = document.getElementById("double-slider");
let minThumb = document.getElementById("min-thumb");
let maxThumb = document.getElementById("max-thumb");
let rangeBar = document.getElementById("range-bar");
let minPrice = document.getElementById("min-price");
let maxPrice = document.getElementById("max-price");

export function generateFilter() {
  // Gán sự kiện 'click' cho bộ lọc
  document
    .querySelector(".left-search-filter__action")
    .addEventListener("click", function () {
      let filterContentBlock = document.querySelector(
        ".left-search-filter__content"
      );
      // Ẩn/hiện bộ lọc
      if (
        getComputedStyle(filterContentBlock).getPropertyValue("display") ===
        "none"
      ) {
        filterContentBlock.style.display = "block";
      } else {
        filterContentBlock.style.display = "none";
      }
    });

  // Các element của double slider
  doubleSlider = document.getElementById("double-slider");
  minThumb = document.getElementById("min-thumb");
  maxThumb = document.getElementById("max-thumb");
  rangeBar = document.getElementById("range-bar");
  minPrice = document.getElementById("min-price");
  maxPrice = document.getElementById("max-price");

  // Gán sự kiện 'click' cho custom-price-button
  document
    .getElementById("custom-price-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      // Ẩn/hiện double slider
      const customerPriceBtn = document.getElementById("custom-price-button");
      if (
        getComputedStyle(doubleSlider).getPropertyValue("visibility") ===
        "hidden"
      ) {
        doubleSlider.style.visibility = "visible";
        customerPriceBtn.classList.add("active");
        customerPriceBtn.innerHTML = `<i class='bx bxs-up-arrow'></i>Hoặc chọn mức giá tuỳ ý`;
      } else {
        doubleSlider.style.visibility = "hidden";
        customerPriceBtn.classList.remove("active");
        customerPriceBtn.innerHTML = `<i class='bx bxs-down-arrow'></i>Hoặc chọn mức giá tuỳ ý`;
      }

      // Khi chọn custom-price, các khoảng giá có sẵn bị reset
      const checkedRadio = document.querySelector(
        `input[name="price"]:checked`
      );
      if (checkedRadio) {
        checkedRadio.checked = false;
      }
      resetDoubleSlider();
    });

  // Khi chọn các khoảng giá có sẵn, double slider bị reset
  document.forms["left-search-filter__form"].price.forEach((ele) => {
    ele.addEventListener("click", () => {
      doubleSlider.style.visibility = "hidden";
      resetDoubleSlider();
    });
  });

  minPrice.addEventListener("input", () => {
    minPrice.value = minPrice.value.replace(/\./g, "");
    minPrice.value = formatVietNamMoney(minPrice.value);
  });

  maxPrice.addEventListener("input", () => {
    maxPrice.value = maxPrice.value.replace(/\./g, "");
    maxPrice.value = formatVietNamMoney(maxPrice.value);
  });

  // Sự kiện khi sử dụng chuột để nhấn, thả, kéo
  minThumb.addEventListener("mousedown", () => {
    document.onmousemove = (event) => {
      updateThumbPosition(event, "min");
    };

    document.onmouseup = () => {
      document.onmousemove = "";
      document.onmouseup = "";
    };
  });

  maxThumb.addEventListener("mousedown", () => {
    document.onmousemove = (event) => {
      updateThumbPosition(event, "max");
    };

    document.onmouseup = () => {
      document.onmousemove = "";
      document.onmouseup = "";
    };
  });

  // Sự kiện khi sử dụng màn hình cảm ứng
  minThumb.addEventListener("touchstart", () => {
    document.ontouchmove = (event) => {
      updateThumbPosition_touchscreen(event, "min");
    };

    document.ontouchend = () => {
      document.ontouchmove = "";
      document.ontouchend = "";
    };
  });

  maxThumb.addEventListener("touchstart", () => {
    document.ontouchmove = (event) => {
      updateThumbPosition_touchscreen(event, "max");
    };

    document.ontouchend = () => {
      document.ontouchmove = "";
      document.ontouchend = "";
    };
  });
}

// Reset lại double slider
export function resetDoubleSlider() {
    currentMinSlider = minLimit;
    currentMaxSlider = maxLimit;
    currentMin = minLimit;
    currentMax = maxLimit;
    updateSlider(minLimit, maxLimit);
    minPrice.value = formatVietNamMoney(minLimit);
    maxPrice.value = formatVietNamMoney(maxLimit);
}

// Hàm cập nhật lại độ dài của thanh giá trị
function updateSlider(minSliderValue, maxSliderValue) {
  const minPercent =
    ((minSliderValue - minLimit) * 100) / (maxLimit - minLimit);
  const maxPercent =
    ((maxSliderValue - minLimit) * 100) / (maxLimit - minLimit);

  rangeBar.style.left = `${minPercent}%`;
  rangeBar.style.width = `${maxPercent - minPercent}%`;
}

// Hàm cập nhật vị trí của các thumb
function updateThumbPosition(event, thumbType) {
  const rect = doubleSlider.getBoundingClientRect();
  const percent = ((event.clientX - rect.left) / rect.width) * 100;
  const value = minLimit + Math.floor((percent * (maxLimit - minLimit)) / 100);
  if (thumbType === "min") {
    const displayValue = Math.ceil(value / step) * step;
    if (value >= minLimit && displayValue + gap < currentMax) {
      currentMinSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue >= minLimit && displayValue + gap <= currentMax) {
      currentMin = displayValue;
      minPrice.value = formatVietNamMoney(currentMin);
    }
  } else if (thumbType === "max") {
    const displayValue = Math.floor(value / step) * step;
    if (value <= maxLimit && displayValue - gap > currentMin) {
      currentMaxSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue <= maxLimit && displayValue - gap >= currentMin) {
      currentMax = displayValue;
      maxPrice.value = formatVietNamMoney(currentMax);
    }
  }
}

// Hàm dành cho màn hình cảm ứng
function updateThumbPosition_touchscreen(event, thumbType) {
  const rect = doubleSlider.getBoundingClientRect();
  const clientX = event.targetTouches[0].clientX;
  const percent = ((clientX - rect.left) / rect.width) * 100;
  const value = minLimit + Math.floor((percent * (maxLimit - minLimit)) / 100);
  if (thumbType === "min") {
    const displayValue = Math.ceil(value / step) * step;
    if (value >= minLimit && displayValue + gap < currentMax) {
      currentMinSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue >= minLimit && displayValue + gap <= currentMax) {
      currentMin = displayValue;
      minPrice.value = formatVietNamMoney(currentMin);
    }
  } else if (thumbType === "max") {
    const displayValue = Math.floor(value / step) * step;
    if (value <= maxLimit && displayValue - gap > currentMin) {
      currentMaxSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue <= maxLimit && displayValue - gap >= currentMin) {
      currentMax = displayValue;
      maxPrice.value = formatVietNamMoney(currentMax);
    }
  }
}

export function generateBrands(){
  const brandsContainer = document.querySelector(".body__products .left-search-filter__brands");
  brandsContainer.innerHTML = "";
  brands.forEach((brand) => {
    const div = document.createElement("div");
    div.classList.add("left-search-filter__brand");
    const input = document.createElement("input");
    input.setAttribute("name", "brand");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", brand.name.toLowerCase())
    input.setAttribute("value", brand.name.toLowerCase())
    input.setAttribute("hidden", "");
    const label = document.createElement("label");
    label.setAttribute("for", brand.name.toLowerCase());
    label.innerHTML = `
      <img
        src=${brand.src}
        alt=""
      />
    `;
    div.appendChild(input);
    div.appendChild(label);
    brandsContainer.appendChild(div);
    
  });
}