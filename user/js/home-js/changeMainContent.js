import { removeAllStyleTags } from "../common-js/common.js";
import { getProductListInfo } from "../products-js/getProductList.js";


//---Hiệu thêm export dùng cho việc đăng nhập xong thì vào trang Trang chủ
// Hàm cập nhật nội dung khi chuyển đến trang tương ứng
export function updateMainContent(mainContentKey) {
  const mainContentMap = {
    home: `
    <div class="body__home">
          <!-- Hero -->
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
          <!-- Popular Menu -->
          <div class="home__popular-menu">
            <h2 class="popular-menu__title heading-lv2">
              Các danh mục nổi bật
            </h2>
            <div class="popular-menu__body">
              <ul class="popular-menu__list">
                <li class="popular-menu__item">
                  <figure class="popular-menu__media">
                    <img
                      src="./assets/images/popular-menu_image-1.jpg"
                      alt=""
                      class="popular-menu__image"
                    />
                  </figure>
                  <p class="popular-menu__label">SỮA&nbsp;RỬA&nbsp;MẶT</p>
                </li>
                <li class="popular-menu__item">
                  <figure class="popular-menu__media">
                    <img
                      src="./assets/images/popular-menu_image-2.jpg"
                      alt=""
                      class="popular-menu__image"
                    />
                  </figure>
                  <p class="popular-menu__label">TONER</p>
                </li>
                <li class="popular-menu__item">
                  <figure class="popular-menu__media">
                    <img
                      src="./assets/images/popular-menu_image-3.jpg"
                      alt=""
                      class="popular-menu__image"
                    />
                  </figure>
                  <p class="popular-menu__label">SERUM</p>
                </li>
                <li class="popular-menu__item">
                  <figure class="popular-menu__media">
                    <img
                      src="./assets/images/popular-menu_image-4.jpg"
                      alt=""
                      class="popular-menu__image"
                    />
                  </figure>
                  <p class="popular-menu__label">KEM&nbsp;DƯỠNG&nbsp;ẨM</p>
                </li>
                <li class="popular-menu__item">
                  <figure class="popular-menu__media">
                    <img
                      src="./assets/images/popular-menu_image-5.jpg"
                      alt=""
                      class="popular-menu__image"
                    />
                  </figure>
                  <p class="popular-menu__label">SON</p>
                </li>
                <li class="popular-menu__item">
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
          <!-- Popular Product -->
          <div class="home__popular-product">
            <h2 class="popular-product__title heading-lv2">
              Các sản phẩm nổi bật
            </h2>
            <div class="popular-product__list">
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-p roduct__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-product__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-product__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-product__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-product__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
              <div class="popular-product__item">
                <div class="popular-product__color"></div>
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
                  <div class="popular-product__actions">
                    <a href="#!" class="popular-product__action">Mua</a>
                    <a href="#!" class="popular-product__action">
                      Thêm giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Sale Product -->
          <div class="home__sale-product">
            <h2 class="sale-product__title">Khuyến mãi</h2>
            <div class="sale-product__list">
              <div class="sale-product__item">
                <div class="sale-product__color"></div>
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
              <div class="sale-product__item">
                <div class="sale-product__color"></div>
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
              <div class="sale-product__item">
                <div class="sale-product__color"></div>
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
          <!-- Useful -->
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
              <ul class="useful__menu">
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
          <!-- Feedback -->
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
                      Với phương châm “Làm đẹp không chỉ là một lựa chọn, mà là một
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
            </div>
            <div class="left__filter">
              <h2 class="left-filter__tilte heading">BỘ LỌC</h2>
              <a href="#!" class="left-filter__see" id="see-filter-menu">
                Xem thêm <i class="fa-solid fa-chevron-down"></i>
              </a>
              <form action="" class="left-filter__form" id="filter-menu">
                <div class="left-filter__form-group">
                  <p class="left-filter__sub-title">Sắp xếp</p>
                  <div class="left-filter__checkboxs">
                    <input type="checkbox" name="sort" id="name" hidden="" />
                    <label for="name">Sắp xếp tên</label>
                    <input
                      type="checkbox"
                      name="sort"
                      id="price-asc"
                      hidden=""
                    />
                    <label for="price-asc">Sắp xếp giá tăng&nbsp;dần</label>
                    <input
                      type="checkbox"
                      name="sort"
                      id="price-desc"
                      hidden=""
                    />
                    <label for="price-desc">Sắp xếp giá giảm&nbsp;dần</label>
                  </div>
                </div>
                <div class="left-filter__form-group">
                  <p class="left-filter__sub-title">Hãng</p>
                  <div class="left-filter__checkboxs">
                    <input
                      type="checkbox"
                      name="brand"
                      id="the-ordinary"
                      hidden=""
                    />
                    <label for="the-ordinary">The Ordinary</label>
                    <input
                      type="checkbox"
                      name="brand"
                      id="la-roche-posay"
                      hidden=""
                    />
                    <label for="la-roche-posay">La Roche-Posay</label>
                    <input type="checkbox" name="brand" id="cerave" hidden="" />
                    <label for="cerave">CeraVe</label>
                    <input type="checkbox" name="brand" id="..." hidden="" />
                    <label for="...">. . .</label>
                  </div>
                </div>
                <div class="left-filter__form-group">
                  <p class="left-filter__sub-title">Giá cả</p>
                  <div class="left-filter__checkboxs">
                    <input
                      type="checkbox"
                      name="price"
                      id="level-1"
                      hidden=""
                    />
                    <label for="level-1">Giá dưới 200.000đ</label>
                    <input
                      type="checkbox"
                      name="price"
                      id="level-2"
                      hidden=""
                    />
                    <label for="level-2">Giá từ 200.000đ đến 400.000đ</label>
                    <input
                      type="checkbox"
                      name="price"
                      id="level-3"
                      hidden=""
                    />
                    <label for="level-3">Giá trên 400.000đ</label>
                  </div>
                </div>
                <div class="left-filter__form-group">
                  <p class="left-filter__sub-title">Giới tính</p>
                  <div class="left-filter__checkboxs">
                    <input type="checkbox" name="price" id="male" hidden="" />
                    <label for="male">Nam</label>
                    <input type="checkbox" name="price" id="female" hidden="" />
                    <label for="female">Nữ</label>
                  </div>
                </div>
                <div class="left-filter__form-group"></div>
                <div class="left-filter__form-group">
                  <p class="left-filter__sub-title">Trạng thái</p>
                  <div class="left-filter__checkboxs">
                    <input
                      type="checkbox"
                      name="status"
                      id="can-buy"
                      hidden=""
                    />
                    <label for="can-buy">Còn hàng</label>
                    <input
                      type="checkbox"
                      name="status"
                      id="can-not-buy"
                      hidden=""
                    />
                    <label for="can-not-buy">Hết hàng</label>
                    <input type="checkbox" name="status" id="sale" hidden="" />
                    <label for="sale">Đang giảm giá</label>
                  </div>
                </div>
              </form>
              <button href="#!" class="left-filter__reset btn">Đặt lại</button>
            </div>
            <div class="left__menu">
              <h2 class="left-menu__title heading">DANH MỤC</h2>
              <ul class="left-menu__list">
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="tat-ca-left-menu"
                    data-menu-product="tat-ca"
                  >
                    Tất cả
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="sua-rua-mat-left-menu"
                    data-menu-product="sua-rua-mat"
                  >
                    Sữa rửa mặt
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="kem-tri-mun-left-menu"
                    data-menu-product="kem-tri-mun"
                  >
                    Kem trị mụn
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="toner-left-menu"
                    data-menu-product="toner"
                  >
                    Toner
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="tay-trang-left-menu"
                    data-menu-product="tay-trang"
                    >Tẩy trang</a
                  >
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="serum-left-menu"
                    data-menu-product="serum"
                  >
                    Serum
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="kem-duong-am-left-menu"
                    data-menu-product="kem-duong-am"
                  >
                    Kem dưỡng ẩm
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
                    class="left-menu__action"
                    id="son-left-menu"
                    data-menu-product="son"
                  >
                    Son
                  </a>
                </li>
                <li class="left-menu__item">
                  <a
                    href="#!"
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
                  <p class="detail__phone"><b>Số điện thoại: </b>+84 0123456789</p>
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
  const mainContentDiv = document.getElementById("main-content");
  if (mainContentMap[mainContentKey]) {
    // Kéo lên đầu trang mỗi lần chuyển trang
    window.scrollTo(0, 0);

    // Thay đổi nội dung ở trang tương ứng
    mainContentDiv.innerHTML = mainContentMap[mainContentKey];

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
    // Xoá các thẻ <style> đã tồn tại từ trước đó
    removeAllStyleTags();

    // Đặt lại style mới cho navbarStyle
    const navbarStyle = document.createElement("style");
    navbarStyle.className = "navbar-style";
    navbarStyle.innerHTML = `
      .header-navbar__action#${mainContentKey} {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
      .header-navbar__action:not(#${mainContentKey}) {
        color: #dbd7d7;
        text-shadow: none;
      }
      .header-navbar__action:not(#${mainContentKey}):hover {
        color: #fff;
        text-shadow: 1px 0 0 currentColor;
      }
    `;
    document.head.appendChild(navbarStyle);

    // Thay đổi nội dung của trang
    updateMainContent(mainContentKey);
  }
});
