window.addEventListener('resize', function () {
    const ord_filter_btn = document.querySelector(".order-filter-buttons");
    const ord_filter_row_1 = document.querySelector(".order-filter-row:nth-of-type(1)");
    const ord_filter_row_2 = document.querySelector(".order-filter-row:nth-of-type(2)");
    const ord_filter_group = document.querySelector(".order-filter-group");
    const ord_filter_group_2 = document.querySelectorAll(".order-filter-row:nth-of-type(2) .order-filter-group");
    const ord_filter_st_end_container = document.querySelector(".order-filter-start-end-date-container");

    if (ord_filter_btn && ord_filter_row_1 && ord_filter_group && ord_filter_st_end_container) {
        if (window.innerWidth < 700) {
            // Sử dụng .style thay vì applyStyles
            ord_filter_row_1.style.flexDirection = "column";
            ord_filter_row_2.style.flexDirection = "column";
            ord_filter_st_end_container.style.width = "100%";
            ord_filter_st_end_container.style.marginTop = "10px";
            ord_filter_group.style.width = "100%";

            ord_filter_group_2.forEach(function(group) {
                group.style.width = "100%";
                group.style.marginTop = "20px";
            });

            ord_filter_row_2.appendChild(ord_filter_btn);
            const ord_filter_btn_2 = document.querySelector(".order-filter-row:nth-of-type(2) .order-filter-buttons");
            ord_filter_btn_2.style.width = "100%";
            ord_filter_btn_2.style.marginTop = "20px";
        
        } else {
        
            ord_filter_row_1.style.flexDirection = "row";
            ord_filter_row_2.style.flexDirection = "row";
            ord_filter_st_end_container.style.width = "50%";
            ord_filter_group.style.width = "calc(25% - 16px)";

            ord_filter_row_1.appendChild(ord_filter_btn);
            const ord_filter_btn_1 = document.querySelector(".order-filter-row:nth-of-type(1) .order-filter-buttons");
            ord_filter_btn_1.style.width = "25%";
        }
    }
});
