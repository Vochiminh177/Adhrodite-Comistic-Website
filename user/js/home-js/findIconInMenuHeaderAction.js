import { productItemArray } from "../common-js/database.js";

const suggestionsList = document.getElementById('suggestions-list');
const searchInput = document.getElementById('find-header');
const searchButton = document.getElementById('find-action')

let filteredProducts = [];

// Lọc sản phẩm
function filterProducts(searchTerm){
  filteredProducts = productItemArray.filter(product => 
    product.name.toLowerCase().includes(searchTerm));
}

// Tạo các thẻ <li> cho sản phẩm
function createProductLi(product, filteredProductIndex){
  const li = document.createElement('li');

  li.dataset.index = filteredProductIndex;

  li.innerHTML = `
      <img src="${product.src}" alt="${product.name}" />
      <span>${product.name}</span>
  `;

  return li;
}

// Hiển thị các sản phẩm gợi ý
function showProductSuggestions(filteredProducts, searchTerm) {
  suggestionsList.innerHTML = '';
  const firstFiveSuggestions = filteredProducts.slice(0, 5);
  if (searchTerm && (firstFiveSuggestions.length > 0)) {
    let filteredProductIndex = 0;
    firstFiveSuggestions.forEach((product) => {
      const li = createProductLi(product, (filteredProductIndex++));

      suggestionsList.appendChild(li);
    })
    
    if(filteredProducts.length > 5){
      // <li> Xem thêm sản phẩm
      const li = document.createElement('li');
  
      li.classList.add('HeaderSearch__show-more-products');
      li.innerHTML = `
        <span>Tìm kiếm thêm sản phẩm</span>
      `;
      suggestionsList.appendChild(li);
    }

    suggestionsList.style.display = 'block';
  } else if(searchTerm){
      const li = document.createElement('li');

      li.innerHTML = `
        <span>Không tìm thấy kết quả</span>
      `;

      suggestionsList.appendChild(li);
      suggestionsList.style.display = 'block';
    } else{
      suggestionsList.style.display = 'none';
    }
}

// Khi chọn vào sản phẩm gợi ý
function selectProduct(product) {
    searchInput.value = product.name;
    suggestionsList.style.display = 'none';

    // Chỗ này đi vào chi tiết sản phẩm
}

// Hàm xử lý tìm kiếm chính
function headerSearch(){
  const searchTerm = searchInput.value.trim().toLowerCase();
  filterProducts(searchTerm);
  showProductSuggestions(filteredProducts, searchTerm);
}

// Sự kiện khi người dùng nhấn vào icon tìm kiếm trên Header
export function showFindFormInMenuHeader() {
  document.getElementById("find-click").addEventListener("click", function () {
    const userBlock = document.getElementById("find-block-wrapper");
    if (
      getComputedStyle(userBlock).getPropertyValue("visibility") === "visible"
      ) {
        userBlock.style.visibility = "hidden";
      } else {
        userBlock.style.visibility = "visible";
        searchInput.focus();
      }
  });
  
  searchButton.addEventListener('click', () => {
    // Vào trang sản phẩm với từ khoá đã nhập
  });

  searchInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
      // Vào trang sản phẩm với từ khoá đã nhập
    }
  });

  searchInput.addEventListener('input', headerSearch);

  suggestionsList.addEventListener('click', (event) => {
    const closestLi = event.target.closest('#suggestions-list li');

    if(closestLi){
      if(closestLi.matches('.HeaderSearch__show-more-products')){
        // Vào trang sản phẩm với từ khoá đã nhập
      } else{
        selectProduct(filteredProducts[Number(closestLi.getAttribute('data-index'))]);
      }
    }
  });

}

