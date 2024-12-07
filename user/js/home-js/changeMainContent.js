import { updateNavbarStyle } from "../common-js/common.js";
import { getProductListInfo } from "../products-js/getProductList.js";
import { renderPopularMenuList } from "./popularMenuRender.js";
import { renderPopularProductList } from "./popularProductRender.js";
import { renderSaleProductList } from "./saleProductRender.js";
import {
  generateFilter,
  resetDoubleSlider,
  generateBrands
} from "../products-js/generateFilter.js";
import { userList } from "../../../database/database.js";
import { changeLeftMenu } from "./reponsive.js";
import { updateSaleProductPaginationWhenChangeToHome } from "./saleProductPagination.js"
import { updatePopularProductPaginationWhenChangeToHome } from "./popularProductPagination.js"
export const mainContentMap = {
  home: `
  <div class="body__home">
          <div class="home__hero">
            <div class="hero__rectangle">
              <h1 class="hero__title heading-lv1">
                Làm đẹp không chỉ là một lựa chọn, mà là một phong cách sống.
              </h1>
              <p class="hero__desc desc-lv1">
                Ở APHRODITE, chúng tôi cung cấp các sản phẩm giúp bạn dễ dàng
                lựa chọn được phong cách sống cho riêng mình.
              </p>
            </div>
          </div>
          <div class="home__sale-product">
            <div class="sale-product__header"></div>
            <div class="sale-product__body">
              <div class="sale-product__list"></div>
            </div>
          </div>
          <div class="home__popular-menu">
            <h2 class="popular-menu__title heading-lv2">
              Các danh mục nổi bật
            </h2>
            <div class="popular-menu__list"></div>
          </div>
          <!-- <div class="home__popular-product">
            <div class="popular-product__header">
              <h2 class="popular-product__title heading-lv2">
                Các sản phẩm nổi bật
              </h2>
            </div>
            <div class="popular-product__body">
              <div class="popular-product__list"></div>
            </div>
          </div> -->
          <div class="home__useful">
            <div class="useful__media">
              <img
                src="./assets/images/useful-image.jpg"
                alt=""
                class="useful__model"
              />
            </div>
            <div class="useful__content">
              <h2 class="useful__title heading-lv2">
                Lợi ích khi mua sản phẩm từ chúng tôi
              </h2>
              <ul class="useful__list">
                <li class="useful__item">
                  <p class="useful__desc">
                    <b>Sản phẩm chính hãng:</b> Cam kết cung cấp các sản phẩm mỹ
                    phẩm từ các thương hiệu uy tín và có nguồn gốc rõ ràng.
                  </p>
                </li>
                <li class="useful__item">
                  <p class="useful__desc">
                    <b>Đa dạng sản phẩm:</b> Cửa hàng có đầy đủ các sản phẩm từ
                    skincare đến trang điểm, đáp ứng mọi nhu cầu làm đẹp của
                    khách hàng.
                  </p>
                </li>
                <li class="useful__item">
                  <p class="useful__desc">
                    <b>Tư vấn chuyên nghiệp:</b> Đội ngũ nhân viên có kiến thức
                    chuyên sâu sẽ hỗ trợ tư vấn sản phẩm phù hợp với loại da và
                    nhu cầu cá nhân.
                  </p>
                </li>
                <li class="useful__item">
                  <p class="useful__desc">
                    <b>Ưu đãi hấp dẫn:</b> Luôn có các chương trình khuyến mãi
                    và quà tặng kèm cho những đơn hàng lớn.
                  </p>
                </li>
                <li class="useful__item">
                  <p class="useful__desc">
                    <b>Tư vấn chăm sóc da miễn phí:</b> Khách hàng có thể được
                    tư vấn cách sử dụng mỹ phẩm và chăm sóc da hàng ngày hoàn
                    toàn miễn phí.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
  `,
  about: `
    <div class="about">
        <!-- Story -->
        <div class="body__story">
            <h2 class="story__title">GIỚI THIỆU</h2>
            <p class="story__content">
            Năm 2018, <b>APHRODITE</b> chính thức ra đời với mục tiêu trở
            thành điểm đến tin cậy cho những ai đam mê làm đẹp. Được truyền
            cảm hứng từ vẻ đẹp tự nhiên và sự tự tin của phụ nữ trên khắp thế
            giới, cửa hàng chúng tôi đã quyết định nhập khẩu những sản phẩm mỹ
            phẩm cao cấp từ các thương hiệu nổi tiếng toàn cầu, mang đến cho
            khách hàng sự lựa chọn tốt nhất trong việc chăm sóc sắc đẹp.
            </p>
            <p class="story__content">
            Khởi đầu với chỉ vài sản phẩm nhập khẩu từ Hàn Quốc và Nhật Bản –
            những nơi nổi tiếng với ngành công nghiệp mỹ phẩm tiên tiến,
            <b>APHRODITE</b> đã nhanh chóng mở rộng danh mục sản phẩm của mình
            với các thương hiệu từ châu Âu và Mỹ. Đến năm 2020, cửa hàng của
            chúng tôi đã trở thành một trong những nhà phân phối mỹ phẩm hàng
            đầu, mang lại sự phong phú và đa dạng cho mọi nhu cầu làm đẹp của
            phụ nữ Việt Nam.
            </p>
            <p class="story__content">
            Tại <b>APHRODITE</b>, chúng tôi hiểu rằng làm đẹp không chỉ đơn
            giản là một lựa chọn mà còn là một phong cách sống. Chính vì thế,
            từ ngày đầu tiên hoạt động, cửa hàng luôn cam kết mang đến những
            sản phẩm chất lượng, được kiểm tra kỹ lưỡng và có nguồn gốc rõ
            ràng. Mỗi sản phẩm chúng tôi phân phối đều được chọn lọc cẩn thận
            để đảm bảo an toàn và hiệu quả cho người sử dụng.
            </p>
            <p class="story__content">
            Với phương châm “Làm đẹp không chỉ là một lựa chọn, mà là một
            phong cách sống”, <b>APHRODITE</b> không chỉ đơn thuần là nơi bán
            mỹ phẩm, mà còn là không gian để mọi phụ nữ khám phá và tôn vinh
            vẻ đẹp của riêng mình. Chúng tôi luôn đồng hành cùng bạn trong
            hành trình chăm sóc và nâng niu bản thân, từ việc tư vấn chọn sản
            phẩm cho đến việc cung cấp những bí quyết chăm sóc da và làm đẹp
            hiệu quả nhất.
            </p>
            <p class="story__content">
            Đến nay, sau hơn 5 năm hoạt động, <b>APHRODITE</b> đã xây dựng
            được một hệ thống khách hàng thân thiết và uy tín trong ngành.
            Chúng tôi tự hào là nơi mà phụ nữ có thể hoàn toàn tin tưởng và
            tìm thấy những sản phẩm tốt nhất cho làn da và phong cách sống của
            mình.
            </p>
            <p class="story__content">
            Hãy ghé thăm <b>APHRODITE</b> – nơi mỗi sản phẩm đều là một lựa
            chọn hoàn hảo cho vẻ đẹp tự nhiên của bạn.
            </p>
        </div>
    </div>
  `,
  products: `
  <div class="body__products">
          <div class="products__left">
            <div class="left__search">
              <h2 class="left-search__title heading">TÌM KIẾM</h2>
              <div class="left-search__form-group">
                <input
                  type="text"
                  id="left-search-input"
                  autocomplete="off"
                  placeholder="Tìm kiếm"
                />
              </div>
              <div class="left-search__filter">
                <a href="javascript:void(0)" class="left-search-filter__action">
                  <i
                    class="fa-solid fa-filter"
                    class="left-search-filter__icon"
                  ></i>
                  <span class="filter-criteria-count" id="filter-criteria-count">0</span>
                </a>
                <div class="left-search-filter__content-overlay"></div>
                <div class="left-search-filter__content">
                  <h3 class="left-search-filter__title heading">BỘ LỌC</h3>
                  <form name="left-search-filter__form" autocomple="off" class="left-search-filter__form">
                    <div class="left-search-filter__form-group">
                      <h4 class="left-search-filter__sub-title">Hãng</h4>
                      <div class="left-search-filter__brands">
                      </div>
                    </div>
                    <div class="left-search-filter__columns">
                      <div class="left-search-filter__column">
                        <div class="left-search-filter__form-group">
                          <h4 class="left-search-filter__sub-title">Sắp xếp</h4>
                          <div class="left-search-filter__list">
                            <div class="left-search-filter__item">
                              <input
                                name="sort"
                                type="radio"
                                id="sort-1"
                                value="price-desc"
                                hidden
                              />
                              <label for="sort-1"
                                >Sắp xếp theo giá giảm dần</label
                              >
                            </div>
                            <div class="left-search-filter__item">
                              <input
                                name="sort"
                                type="radio"
                                id="sort-2"
                                value="price-asc"
                                hidden
                              />
                              <label for="sort-2"
                                >Sắp xếp theo giá tăng dần</label
                              >
                            </div>
                          </div>
                        </div>
                        <div class="left-search-filter__form-group">
                          <h4 class="left-search-filter__sub-title">
                            Trạng thái
                          </h4>
                          <div class="left-search-filter__list">
                            <div class="left-search-filter__item">
                              <input
                                name="state"
                                type="radio"
                                id="state-1"
                                value="available"
                                hidden
                              />
                              <label for="state-1">Còn hàng</label>
                            </div>
                            <div class="left-search-filter__item">
                              <input
                                name="state"
                                type="radio"
                                id="state-2"
                                value="unavailable"
                                hidden
                              />
                              <label for="state-2">Hết hàng</label>
                            </div>
                            <div class="left-search-filter__item">
                              <input
                                name="state"
                                type="radio"
                                id="state-3"
                                value="discounted"
                                hidden
                              />
                              <label for="state-3">Đang giảm giá</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="left-search-filter__column">
                        <div class="left-search-filter__form-group">
                          <h4 class="left-search-filter__sub-title">Giá cả</h4>
                          <div class="left-search-filter__list">
                            <div class="left-search-filter__item">
                              <input
                                name="price"
                                type="radio"
                                id="price-1"
                                value="0-199999"
                                hidden
                              />
                              <label for="price-1">Giá dưới 200.000đ</label>
                            </div>
                            <div class="left-search-filter__item">
                              <input
                                name="price"
                                type="radio"
                                id="price-2"
                                value="200000-400000"
                                hidden
                              />
                              <label for="price-2"
                                >Giá từ 200.000đ đến 400.000đ</label
                              >
                            </div>
                            <div class="left-search-filter__item">
                              <input
                                name="price"
                                type="radio"
                                id="price-3"
                                value="400001-INF"
                                hidden
                              />
                              <label for="price-3">Giá trên 400.000đ</label>
                            </div>
                            <button type="button" class="left-search-filter__custom-price-button" id="custom-price-button">
                              <i class='bx bxs-down-arrow'></i><span>Hoặc chọn mức giá tuỳ ý</span>
                            </button>
                            <div class="left-search-filter__item">
                              <div class="left-search-filter__double-slider" id="double-slider">
                                <div class="grey-bar"></div>
                                <div class="range-bar" id="range-bar">
                                  <div class="thumb" id="min-thumb"></div>
                                  <div class="thumb" id="max-thumb"></div>
                                </div>
                                <div class="price-container" id="price-container">
                                  <input name="minPrice" class="min-price" id="min-price" readonly>
                                  <span>-</span>
                                  <input name="maxPrice" class="max-price" id="max-price" readonly>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="left-search-filter__form-group buttons">
                      <input
                        type="submit"
                        class="left-search-filter__button"
                        value="Áp dụng"
                        id="left-search-filter__apply"
                      />
                      <input
                        type="reset"
                        class="left-search-filter__button"
                        value="Đặt lại"
                        id="left-search-filter__reset"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="left__menu">
              <h2 class="left-menu__title heading">DANH MỤC</h2>
              <ul class="left-menu__list" id="left-menu-list">
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="tat-ca-left-menu"
                    data-menu-product="tat-ca"
                  >
                    Tất cả
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="sua-rua-mat-left-menu"
                    data-menu-product="sua-rua-mat"
                  >
                    Sữa rửa mặt
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="kem-tri-mun-left-menu"
                    data-menu-product="kem-tri-mun"
                  >
                    Kem trị mụn
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="toner-left-menu"
                    data-menu-product="toner"
                  >
                    Toner
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="tay-trang-left-menu"
                    data-menu-product="tay-trang"
                    >Tẩy trang</a
                  >
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="serum-left-menu"
                    data-menu-product="serum"
                  >
                    Serum
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="kem-duong-am-left-menu"
                    data-menu-product="kem-duong-am"
                  >
                    Kem dưỡng ẩm
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="son-left-menu"
                    data-menu-product="son"
                  >
                    Son
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="javascript:void(0)"
                    class="left-menu__action"
                    id="phan-left-menu"
                    data-menu-product="phan"
                  >
                    Phấn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="products__main main-body" id="products-main"></div>
        </div>
        `,
  contact: `
  <div class="contact">
    <div class="body__info">
      <div class="info__detail">
        <div class="info__block">
          <h2 class="detail__title">Liên hệ với chúng tôi</h2>
          <p class="detail__location">
            <b>Địa chỉ: </b>273 An Dương Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh
          </p>
          <p class="detail__email"><b>Email: </b>nhom1SGU@gmail.com</p>
          <p class="detail__phone"><b>Số điện thoại: </b>84+ 0123456789</p>
        </div>
      </div>
      <figure class="info__map">
       <img
           src="./assets/images/contact-map.svg"
           alt="273 An Dương Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh"
           class="info__image"
       />
      </figure>
    </div>
    <div class="body__request">
      <div class="request__logo">
        <h2 class="logo__title">A P H R O D I T E</h2>
        <p class="logo__slogan">
          Làm đẹp không chỉ là một lựa chọn, mà là một phong cách sống.
        </p>
      </div>
      <div class="request__send-request">
        <form action="" class="send-request__form">
          <label for="" class="send-request__title">Gửi yêu cầu</label>
          <div class="send-request__form-group">
            <input type="text" id="name" placeholder="Họ và tên" />
          </div>
          <div class="send-request__form-group">
           <input type="phone" id="phone" placeholder="Số điện thoại" />
          </div>
          <div class="send-request__form-group">
          <input type="text" id="title" placeholder="Tiêu đề" />
          </div>
          <div class="send-request__form-group">
          <textarea
            name=""
            id="content"
            placeholder="Nội dung"
          ></textarea>
          </div>
          <div class="send-request__form-group">
            <input type="submit" value="Gửi tin nhắn" />
          </div>
        </form>
       </div>
    </div>
  </div>
  `,
};

// Biến dùng để chuyển nội dung chính tương ứng với từng trang
export const mainContentDiv = document.getElementById("main-content");

//---Hiệu thêm export dùng cho việc đăng nhập xong thì vào trang Trang chủ
// Hàm cập nhật nội dung khi chuyển đến trang tương ứng
export function updateMainContent(mainContentKey) {
  if (mainContentMap[mainContentKey]) {
    // Kéo lên đầu trang mỗi lần chuyển trang
    window.scrollTo(0, 0);

    // Thay đổi nội dung ở trang tương ứng
    mainContentDiv.innerHTML = mainContentMap[mainContentKey];

    // Nếu nội dung thay đổi là trang Trang chủ
    if (mainContentKey === "home") {
      // Tạo sự kiện cho phép người dùng nhấn vào "Danh mục nổi bậc"
      renderPopularMenuList();
      // renderPopularProductList();
      renderSaleProductList();
      updateSaleProductPaginationWhenChangeToHome();
      updatePopularProductPaginationWhenChangeToHome();
    }

    // Nếu nội dung thay đổi là trang Sản phẩm
    if (mainContentKey === "products") {
      // Tạo sự kiện cho bộ lọc
      generateFilter();
      generateBrands();
      resetDoubleSlider();
      // Tạo sự kiện cho các danh mục sản phẩm
      getProductListInfo();

      changeLeftMenu(
        ".left-menu__title",
        ".left-menu__list",
        "show-left-menu__list"
      );
      changeLeftMenu(
        ".left-search__title",
        ".left-search__form-group",
        "show-left-search"
      );

      // Tự động nhấn mục "Tất cả"
      document.getElementById("tat-ca-left-menu").click();
    }
  }
}

// Tạo sự kiện khi người dùng muốn chuyển trang trên header
document.querySelector(".navbar").addEventListener("click", function (event) {
  event.preventDefault();
  const mainContentKey = event.target.getAttribute("data-main-content");
  if (mainContentKey) {
    // Xoá user menu nếu đang hiển thị
    if (document.querySelector(".header__user-menu")) {
      document.querySelector(".header__user-menu").remove();
    }

    // Cập nhật lại style cho navbar
    updateNavbarStyle(mainContentKey);

    // Thay đổi nội dung của trang
    updateMainContent(mainContentKey);

    const element = document.querySelector(".header__menu-toggle");
    const displayStyle = window.getComputedStyle(element).display;
    if (displayStyle !== "none") element.click();

    if (mainContentKey === "products") {
      // Tự động nhấn mục "Tất cả" khi vào trang "sản phẩm" ở header
      document.getElementById("tat-ca-left-menu").click();
    }
  }
});

//hàm xóa các form tạo từ javascript
export function deleteAllFormCreatedFromJsUser() {
  if (document.querySelector(".header__user-menu")) {
    document.querySelector(".header__user-menu").remove();
  }
}
