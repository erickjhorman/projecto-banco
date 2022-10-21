function showAccounts() {
    var x = document.getElementById("showAccounts");
    var showUser = document.getElementById("showUsers");
    if (x.style.display === "none") {
       x.style.display = "block";
       showUser.style.display = "none"
    } else {
        x.style.display = "none";
    }
}

function showUsers() {
    var x = document.getElementById("showAccounts");
    var showUser = document.getElementById("showUsers");
    if (x.style.display === "block") {
       x.style.display = "none";
       showUser.style.display = "block"
    } else {
        x.style.display = "none";
    }
}