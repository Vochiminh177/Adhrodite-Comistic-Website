import { handleAdmin } from "./adminClick.js";
import { showFindFormInMenuHeader } from "./findIconInMenuHeaderAction.js";
import { showShoppingCartFormInMenuHeader } from "./shoppingCartIconInMenuHeaderAction.js";
import { showUserFormInMenuHeader } from "./userIconInMenuHeaderAction.js";

// Cho phép người dùng có thể xem Find Form trên Menu Header
showFindFormInMenuHeader();

// Cho phép người dùng có thể xem Shopping Cart Form trên Menu Header
showShoppingCartFormInMenuHeader();

// Cho phép người dùng có thể xem User Form trên Menu Header
showUserFormInMenuHeader();

let userList = JSON.parse(localStorage.getItem("userList"));
let indexCurrentUserLogin = JSON.parse(localStorage.getItem("indexCurrentUserLogin"));
if(indexCurrentUserLogin != -1){
    if(userList[indexCurrentUserLogin].type === "admin"){
        document.querySelector(".header__admin-icon").style.visibility = "visible";
        handleAdmin();
    }
}
// handleAdmin();
