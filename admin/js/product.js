//hiển thị hình ảnh đã upload
// const fileInput = document.getElementById('file');
// const imageShow = document.querySelector('.image-show');
// fileInput.addEventListener('change',function() {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             //tạo nội dung hình ảnh và gắn vào div
//             imageShow.innerHTML = `<img src="${event.target.result}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
//         };
//         //đọc file dạng url
//         reader.readAsDataURL(file);
//     }
// });


//hiển thị hình ảnh đã upload -- Hiệu sửa lại, do thầy không cho sài api, ahihi -- KHÔNG CÒN SÀI FILE NÀY NỮA -- HIỆU
// export function handlePicture(){
//     let picture = document.querySelector(".image-show");
//     let inputPicture = document.querySelector(".add-photo-button #file");

//     inputPicture.addEventListener("change", () => {
//         let src = URL.createObjectURL(inputPicture.files[0]);
//         picture.innerHTML = `<img src="${src}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
//         return src;
//     });
// }
