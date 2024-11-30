import { formatVietNamMoney } from "../common-js/common.js";

// Bước nhảy
const step = 50000;
// Chênh lệch nhỏ nhất
const gap = 100000;
let minLimit = 100000;
let maxLimit = 1500000;
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
      if (
        getComputedStyle(doubleSlider).getPropertyValue("visibility") ===
        "hidden"
      ) {
        doubleSlider.style.visibility = "visible";
      } else {
        doubleSlider.style.visibility = "hidden";
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

  // Cập nhật thanh kéo lần đầu tiên
  resetDoubleSlider();
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
  const displayValue = Math.floor(value / step) * step;
  if (thumbType === "min") {
    if (value >= minLimit && value + gap <= currentMaxSlider) {
      currentMinSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue >= minLimit && displayValue + gap <= currentMax) {
      currentMin = displayValue;
      minPrice.value = formatVietNamMoney(currentMin);
    }
  } else if (thumbType === "max") {
    if (value <= maxLimit && value - gap >= currentMinSlider) {
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
  const displayValue = Math.floor(value / step) * step;
  if (thumbType === "min") {
    if (value >= minLimit && value + gap <= currentMaxSlider) {
      currentMinSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue >= minLimit && displayValue + gap <= currentMax) {
      currentMin = displayValue;
      minPrice.value = formatVietNamMoney(currentMin);
    }
  } else if (thumbType === "max") {
    if (value <= maxLimit && value - gap >= currentMinSlider) {
      currentMaxSlider = value;
      updateSlider(currentMinSlider, currentMaxSlider);
    }

    if (displayValue <= maxLimit && displayValue - gap >= currentMin) {
      currentMax = displayValue;
      maxPrice.value = formatVietNamMoney(currentMax);
    }
  }
}