function updateMainContent(mainContentKey) {
    const mainContentMap = {
        thongKe: `

        `,
        sanPham: `
        <div class="title">
                <h1>Danh sách sản phẩm</h1>
            </div>
            <div class="content">
                <div class="content-product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Hình ảnh</th>
                                <th>Tên</th>
                                <th>Thương hiệu</th>
                                <th>Loại</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Tùy chỉnh</th>
                            </tr>
                        <tbody>
                            <tr>
                                <td id="id">1</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/acnecream-image-1.jpg"></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                            <tr>
                                <td id="id">2</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/acnecream-image-2.jpg" alt=""></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                            <tr>
                                <td id="id">3</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/acnecream-image-3.jpg" alt=""></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                            <tr>
                                <td id="id">4</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/facewash-image-1.jpg" alt=""></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                            <tr>
                                <td id="id">5</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/facewash-image-1.jpg" alt=""></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                            <tr>
                                <td id="id">6</td>
                                <td id="src"><img style="width: 70px; height:90%;" src="assets/images/facewash-image-2.jpg" alt=""></td>
                                <td id="name">abc</td>
                                <td id="brand">dgs</td>
                                <td id="category">eig</td>
                                <td id="price">100000</td>
                                <td id="desc">akhlkahofhlh</td>
                                <td>
                                    <a href="">Sửa</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                        </tbody>
                                    
                        </thead>
                    </table>
                </div>
                
            </div>
        `,
        donHang: `
        
        `,
        khachHang: `
        
        `,
        taiKhoan: `
        
        `
    };
    const mainContentDiv = document.getElementById("main-content");
    if (mainContentMap[mainContentKey]) {

        // var 
    }
}