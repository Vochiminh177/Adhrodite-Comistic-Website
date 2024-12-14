window.addEventListener('resize', function () {
    responsiveOrderFilter();
});

export function responsiveOrderFilter(){
    const ord_filter_btn = document.querySelector(".order-filter-buttons");
    const ord_filter_row_1 = document.querySelector(".order-filter-row:nth-of-type(1)");
    const ord_filter_row_2 = document.querySelector(".order-filter-row:nth-of-type(2)");

    if (ord_filter_btn && ord_filter_row_1) {
        if (window.innerWidth < 700) {
            ord_filter_row_2.appendChild(ord_filter_btn);
        } else {
            ord_filter_row_1.appendChild(ord_filter_btn);
        }
    }
}
