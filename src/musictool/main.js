let d1y = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
let addItemPopupIdState = "";

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

function unfocus() {
    let _t = document.getElementById("fullfocus");
    _t.style.display = "block";
}
function refocus() {
    let _t = document.getElementById("fullfocus");
    _t.style.display = "none";
}
function showPopUp(id) {
    unfocus();
    document.getElementById(id).style.display = "block";
}
function hidePopUps() {
    addItemPopupIdState = "";
    refocus();
    let tags = document.getElementById("fullfocus").children;
    for (let i = 0; i < tags.length; i++) {
        tags[i].style.display = "none";
    }
}

function addNewItemFromPopup() {
    let title = document.getElementById("add-item-title").value;
    let artist = document.getElementById("add-item-artist").value;
    let src = document.getElementById("add-item-img-src").value;
    let tracks = document.getElementById("add-item-track-count").value;
    let own = document.getElementById("add-item-ownership").value;
    addItemToList(title, artist, src, tracks, own);
    document.getElementById("add-item-title").value = ""
    document.getElementById("add-item-artist").value = ""
    document.getElementById("add-item-img-src").value = ""
    document.getElementById("add-item-track-count").value = ""
    hidePopUps();
}

async function isImage(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (!response.ok) {
        return false;
      }
  
      const contentType = response.headers.get('content-type');
      return contentType?.startsWith('image/');
    } catch (error) {
      return false;
    }
  }

function loadPreviewAddPopup() {
    let src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
    let url = document.getElementById("add-item-img-src").value;
    if (isImage(url)) {
        src = url;
    }
    document.getElementById("item-add-img-prev-src").src = src;
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

showPopUp("popup-warning");