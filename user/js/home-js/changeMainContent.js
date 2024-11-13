import { updateNavbarStyle } from "../common-js/common.js";
import { clickToPopularMenus, clickToProductItem } from "./homePageEvents.js";
import { getProductListInfo } from "../products-js/getProductList.js";
import { usersList } from "../../../database/database.js";



//reset trạng thái không đăng nhập
let userList = JSON.parse(localStorage.getItem("userList")) || [];
if(userList.length == 0){
  userList = [...usersList];
}
userList.forEach((obj) => {
  obj.statusLogin = false;
}); 
localStorage.setItem("userList", JSON.stringify(userList));

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
  <div class="home__popular-menu">
    <h2 class="popular-menu__title heading-lv2">
      Các danh mục nổi bật
    </h2>
    <div class="popular-menu__body">
      <ul class="popular-menu__list">
        <li class="popular-menu__item" data-popular-menu="sua-rua-mat">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-1.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">SỮA&nbsp;RỬA&nbsp;MẶT</p>
        </li>
        <li class="popular-menu__item" data-popular-menu="toner">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-2.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">TONER</p>
        </li>
        <li class="popular-menu__item" data-popular-menu="serum">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-3.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">SERUM</p>
        </li>
        <li class="popular-menu__item" data-popular-menu="kem-duong-am">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-4.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">KEM&nbsp;DƯỠNG&nbsp;ẨM</p>
        </li>
        <li class="popular-menu__item" data-popular-menu="son">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-5.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">SON</p>
        </li>
        <li class="popular-menu__item" data-popular-menu="phan">
          <figure class="popular-menu__media">
            <img
              src="./assets/images/popular-menu_image-6.jpg"
              alt=""
              class="popular-menu__image"
            />
          </figure>
          <p class="popular-menu__label">PHẤN</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="home__popular-product">
    <h2 class="popular-product__title heading-lv2">
      Các sản phẩm nổi bật
    </h2>
    <div class="popular-product__list">
      <div class="popular-product__item" data-popular-product="sua-rua-mat">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
      <div class="popular-product__item" data-popular-product="toner">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>

          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
      <div class="popular-product__item" data-popular-product="serum">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
      <div class="popular-product__item" data-popular-product="kem-duong-am">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
      <div class="popular-product__item" data-popular-product="son">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
      <div class="popular-product__item" data-popular-product="phan">
        <figure class="popular-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="popular-product__image"
          />
        </figure>
        <div class="popular-product__info">
          <h3 class="popular-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="popular-product__detail">Hãng: <b>CeraVe</b></p>
          <p class="popular-product__detail">
            Danh mục: <b>Sửa rửa mặt</b>
          </p>
          <p class="popular-product__detail">Giá: <b>xxx.000đ</b></p>
          <button
            href="javascript:void(0)"
            class="popular-product__button"
          >
            Thêm&nbsp;giỏ&nbsp;hàng
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="home__sale-product">
    <h2 class="sale-product__title">Khuyến mãi</h2>
    <div class="sale-product__list">
      <div class="sale-product__item" data-popular-product="sua-rua-mat">
        <figure class="sale-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="sale-product__image"
          />
        </figure>
        <div class="sale-product__info">
          <h3 class="sale-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="sale-product__price">
            <b class="old">xxx.000đ</b>
            <b class="new">xxx.000đ</b>
          </p>
        </div>
      </div>
      <div class="sale-product__item" data-popular-product="sua-rua-mat">
        <figure class="sale-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="sale-product__image"
          />
        </figure>
        <div class="sale-product__info">
          <h3 class="sale-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="sale-product__price">
            <b class="old">xxx.000đ</b>
            <b class="new">xxx.000đ</b>
          </p>
        </div>
      </div>
      <div class="sale-product__item" data-popular-product="sua-rua-mat">
        <figure class="sale-product__media">
          <img
            src="./assets/images/facewash-image-1.jpg "
            alt=""
            class="sale-product__image"
          />
        </figure>
        <div class="sale-product__info">
          <h3 class="sale-product__name">
            Sữa rửa mặt CeraVe sạch sâu cho da thường đến da dầu
          </h3>
          <p class="sale-product__price">
            <b class="old">xxx.000đ</b>
            <b class="new">xxx.000đ</b>
          </p>
        </div>
      </div>
    </div>
  </div>
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
                <label for="search">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </label>
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
                </a>
                <div class="left-search-filter__content">
                  <h3 class="left-search-filter__title heading">BỘ LỌC</h3>
                  <form autocomple="off" class="left-search-filter__form">
                    <div class="left-search-filter__form-group">
                      <h4 class="left-search-filter__sub-title">Hãng</h4>
                      <div class="left-search-filter__brands">
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="loreal"
                            value="loreal"
                            hidden
                          />
                          <label for="loreal">
                            <img
                              src="./assets/images/brand-logo-1.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="clinique"
                            value="clinique"
                            hidden
                          />
                          <label for="clinique">
                            <img
                              src="./assets/images/brand-logo-2.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="mac"
                            value="mac"
                            hidden
                          />
                          <label for="mac">
                            <img
                              src="./assets/images/brand-logo-3.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="maybelline"
                            value="maybelline"
                            hidden
                          />
                          <label for="maybelline">
                            <img
                              src="./assets/images/brand-logo-4.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="shu-uemura"
                            value="shu-uemura"
                            hidden
                          />
                          <label for="shu-uemura">
                            <img
                              src="./assets/images/brand-logo-5.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="sk-ii"
                            value="sk-ii"
                            hidden
                          />
                          <label for="sk-ii">
                            <img
                              src="./assets/images/brand-logo-6.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="olay"
                            value="olay"
                            hidden
                          />
                          <label for="olay">
                            <img
                              src="./assets/images/brand-logo-7.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="revlon"
                            value="revlon"
                            hidden
                          />
                          <label for="revlon">
                            <img
                              src="./assets/images/brand-logo-8.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="estee-lauder"
                            value="estee-lauder"
                            hidden
                          />
                          <label for="estee-lauder">
                            <img
                              src="./assets/images/brand-logo-9.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                        <div class="left-search-filter__brand">
                          <input
                            name="brand"
                            type="checkbox"
                            id="dove"
                            value="dove"
                            hidden
                          />
                          <label for="dove">
                            <img
                              src="./assets/images/brand-logo-10.jpg"
                              alt=""
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="left-search-filter__row">
                      <div class="left-search-filter__form-group">
                        <h4 class="left-search-filter__sub-title">Sắp xếp</h4>
                        <div class="left-search-filter__list">
                          <div class="left-search-filter__item">
                            <input
                              name="sort"
                              type="radio"
                              id="sort-1"
                              value="sort-1"
                              hidden
                            />
                            <label for="sort-1">Sắp xếp theo tên</label>
                          </div>
                          <div class="left-search-filter__item">
                            <input
                              name="sort"
                              type="radio"
                              id="sort-2"
                              value="sort-2"
                              hidden
                            />
                            <label for="sort-2"
                              >Sắp xếp theo giá giảm dần</label
                            >
                          </div>
                          <div class="left-search-filter__item">
                            <input
                              name="sort"
                              type="radio"
                              id="sort-3"
                              value="sort-3"
                              hidden
                            />
                            <label for="sort-3"
                              >Sắp xếp theo giá tăng dần</label
                            >
                          </div>
                        </div>
                      </div>
                      <div class="left-search-filter__form-group">
                        <h4 class="left-search-filter__sub-title">Giá cả</h4>
                        <div class="left-search-filter__list">
                          <div class="left-search-filter__item">
                            <input
                              name="price"
                              type="radio"
                              id="price-1"
                              value="price-1"
                              hidden
                            />
                            <label for="price-1">Giá dưới 200.000đ</label>
                          </div>
                          <div class="left-search-filter__item">
                            <input
                              name="price"
                              type="radio"
                              id="price-2"
                              value="price-2"
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
                              value="price-3"
                              hidden
                            />
                            <label for="price-3">Giá trên 400.000đ</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="left-search-filter__row">
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
                              value="state-1"
                              hidden
                            />
                            <label for="state-1">Còn hàng</label>
                          </div>
                          <div class="left-search-filter__item">
                            <input
                              name="state"
                              type="radio"
                              id="state-2"
                              value="state-2"
                              hidden
                            />
                            <label for="state-2">Hết hàng</label>
                          </div>
                          <div class="left-search-filter__item">
                            <input
                              name="state"
                              type="radio"
                              id="state-3"
                              value="state-3"
                              hidden
                            />
                            <label for="state-3">Đang giảm giá</label>
                          </div>
                        </div>
                      </div>
                      <div class="left-search-filter__form-group buttons">
                        <input
                          type="submit"
                          class="left-search-filter__button"
                          value="Áp dụng"
                        />
                        <input
                          type="button"
                          class="left-search-filter__button"
                          value="Đặt lại"
                        />
                      </div>
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
                <h2 class="detail__title">Liên hệ với chúng tôi</h2>
                <p class="detail__location">
                    <b>Địa chỉ: </b>273 An Dương Vương, Phường 3, Quận 5, Thành phố
                    Hồ Chí Minh
                </p>
                <p class="detail__email"><b>Email: </b>nhom1SGU@gmail.com</p>
                <p class="detail__phone"><b>Số điện thoại: </b>+ " "8+ 4 0123456789</p>
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
      clickToPopularMenus();

      // Tạo sự kiện cho phép người dùng nhấn vào "Sản phẩm nổi bật", "Khuyến mãi"
      clickToProductItem();
    }

    // Nếu nội dung thay đổi là trang Sản phẩm
    if (mainContentKey === "products") {
      // Kiểm tra filterProductsScript có tồn tại hay không và xoá đi
      const filterProductsExistingScript = document.querySelector(
        ".filter-products-script"
      );
      if (filterProductsExistingScript) {
        filterProductsExistingScript.remove();
      }

      // Hiện thị menu lọc sản phẩm theo các tiêu chí
      const filterProductsScript = document.createElement("script");
      filterProductsScript.src = "./js/products-js/showFilterProducts.js";
      filterProductsScript.className = "filter-products-script";
      document.body.appendChild(filterProductsScript);

      // Tạo sự kiện cho các danh mục sản phẩm
      getProductListInfo();
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
    // Cập nhật lại style cho navbar
    updateNavbarStyle(mainContentKey);

    // Thay đổi nội dung của trang
    updateMainContent(mainContentKey);
  }
});



