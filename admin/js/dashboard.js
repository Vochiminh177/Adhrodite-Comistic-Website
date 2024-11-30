const selectmonths = document.querySelectorAll('.select-month');

selectmonths.forEach(selectmonth => {
    
    const select = select-month.querySelector('.select-month .select');
    const caret = select-month.querySelector('.select-month .caret');
    const menu = select-month.querySelector('.select-month .menu');
    const options = select-month.querySelector('.select-month .menu li');
    const selected = select-month.querySelector('.selected');

    select.addEventListener('click', ()=>{

        select.classList.toggle('.select-month .select-clicked');

        caret.classList.toggle('.select-month .caret-rotate');

        menu.classList.toggle('.select-month .menu-open');
    });

    options.forEach(options => {
        
        options.addEventListener('click', ()=>{
            
        });
    })
});