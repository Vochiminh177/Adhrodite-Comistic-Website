// Sự kiện khi người dùng nhấn vào icon tìm kiếm trên Header
import { productItemArray } from "../common-js/database.js";
export function showFindFormInMenuHeader() {
  const suggestionsList = document.getElementById('suggestions-list');
  const searchInput = document.getElementById('find-header');
  document.getElementById("find-click").addEventListener("click", function () {
    const userBlock = document.getElementById("find-block");
    if (
      getComputedStyle(userBlock).getPropertyValue("visibility") === "visible"
      ) {
        userBlock.style.visibility = "hidden";
      } else {
        userBlock.style.visibility = "visible";
        searchInput.focus();
      }
  });
    
  searchInput.addEventListener('input', filterProducts);

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = productItemArray.filter(product => product.name.toLowerCase().includes(searchTerm));

    suggestionsList.innerHTML = '';

    if (searchTerm && (filteredProducts.length > 0)) {
        filteredProducts.forEach(product => {
            const li = document.createElement('li');

            li.innerHTML = `
                <img src="${product.src}" alt="${product.name}" />
                <span>${product.name}</span>
            `;

            li.addEventListener('click', () => selectProduct(product));
            suggestionsList.appendChild(li);
            suggestionsList.style.display = 'block';
        });

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


  function selectProduct(product) {
      searchInput.value = product.name;
      suggestionsList.style.display = 'none';

      // Chỗ này đi vào chi tiết sản phẩm
  }

}

