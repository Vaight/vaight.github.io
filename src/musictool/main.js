let d1y = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
if (
    navigator.userAgent.match(/Android/i) || 
    navigator.userAgent.match(/webOS/i) || 
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
) {
    document.getElementById("mnav").className = "mobile";    // format nav bar for mobile devices
} else {
    document.getElementById("mnav").className = "desktop";   // format nav bar for desktop devices
}

function getCookieValue(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) { return parts.pop().split(';').shift(); }
}

function addToCookies(key, value, expiry) {
    let _c = key + "=" + value + "; expires=" + expiry
    document.cookie = _c;
    console.log("adding to cookies: ", _c);
    let _cs = document.cookie; // get all cookies
    if (_cs.match(key + "=" + value)) {
        return true;
    }
    return false;
}

function removeCookie(key) {
    let _c = key + "=del; expires=Mon, 1 Jan 2000 00:00:00 GMT";
    document.cookie = _c;
}