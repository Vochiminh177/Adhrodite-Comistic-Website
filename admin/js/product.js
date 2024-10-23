//hiển thị hình ảnh đã upload
const fileInput = document.getElementById('file');
const imageShow = document.querySelector('.image-show');
fileInput.addEventListener('change',function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            //tạo nội dung hình ảnh và gắn vào div
            imageShow.innerHTML = `<img src="${event.target.result}" alt="Ảnh sản phẩm" style="width: 60%; height: auto;">`;
        };
        //đọc file dạng url
        reader.readAsDataURL(file);
    }
});