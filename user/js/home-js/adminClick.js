
export function handleAdmin(){
    document.querySelector("#admin-click").onclick = (e) => {
      e.preventDefault();
      location.assign(location.origin + "/admin/index2.html");
    } 
}
