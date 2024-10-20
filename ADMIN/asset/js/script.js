const menuli = document.querySelectorAll('.admin-sidemenu-content > ul > li > a')

for (let index = 0; index < menuli.length; index++) {
    menuli[index].addEventListener('click', (e)=>{
        e.preventDefault()
        menuli[index].parentNode.querySelector('ul').classList.toggle('active')
    })
}