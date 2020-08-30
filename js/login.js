
document.addEventListener("DOMContentLoaded", function (e) {
});

var user = document.getElementById("username").value;
var pass = document.getElementById("password").value;

function usercheck(){ 
    user = document.getElementById("username").value;
}
function passcheck() {
    pass = document.getElementById("password").value;
}

function relocateAndLogin() {
    if(user == "" || pass == ""){
        alert("Debe introducir usuario y contraseña");
    } else {
        sessionStorage.setItem("Logged", "true");
        localStorage.setItem("User", user);
        window.location.replace("index.html");
    }    
};
