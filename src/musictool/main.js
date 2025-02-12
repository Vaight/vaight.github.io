let txt = document.getElementById("ctest");
txt.value = "";

function loadCookie() {
    txt.value = document.cookie;
}
function saveCookie() {
    document.cookie = txt.value;
}