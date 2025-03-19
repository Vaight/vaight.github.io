class List {
    constructor() {
        this.items = [];
    }
    add(title, artist, img, tracks, type, id) {  // title, artist, img src
        let i = new ListItem();
        i.title = title;
        i.artist = artist;
        i.imgsrc = img;
        i.tracks = tracks;
        i.type = type;
        i.id = id;
        this.items.push(i);
        console.log(i);
    }
    remove(obj) {
        if (this.items.includes(obj)) {
            this.items.splice(this.items.indexOf(obj), 1);
        }
        console.log(this.items);
    }
    getItemsByAlbum(name) {
        return null;
    }
    getItemsByArtist(name) {
        return null;
    }
    getItemById(id) {
        let result = null;
        for (const i of this.items) {
            if (i.id === id) {
                result = i;
            }
        }
        return result;
    }
}

let itemlist = new List();

class ListItem {
    constructor() {
        this.title = "";
        this.artist = "";
        this.imgsrc = "";
        this.tracks = 0;
        this.type = "";
        this.itemid = "";
    }
}

const addToList = (title, artist, img, tracknum, type) => {
    let ltag = document.getElementById("litembuilder").cloneNode(true);
    ltag.id = ("li-" + title + artist).toLowerCase().replace(/\s/g, "");
    if (itemlist.getItemById(ltag.id)) return;
    itemlist.add(title, artist, img, tracknum, type, ltag.id);
    document.getElementById("litems").appendChild(ltag);
    for (const tag of ltag.children) {
        if (tag.className === "ltitle") tag.innerText = title.toUpperCase();
        if (tag.className === "lartist") tag.innerText = artist.toUpperCase();
        if (tag.className === "ltracks") tag.innerText = tracknum.toString();
        if (tag.className === "ltype") tag.innerText = type.toUpperCase();
        if (tag.className === "licon") tag.src = img;
        if (tag.className === "lbtnitem" && tag.value === "EDIT") tag.onclick = function(){itemButtonInput(1, ltag.id)};
        if (tag.className === "lbtnitem" && tag.value === "DELETE") tag.onclick = function(){itemButtonInput(0, ltag.id)};
    }
    ltag.style.display = "block";

    updateTempDisplay();
}

const removeFromList = (id) => {
    const lobj = itemlist.getItemById(id);
    document.getElementById(id).remove();
    itemlist.remove(lobj);

    updateTempDisplay();
}

const modifyListItem = (title, artist, img, tracknum, type, id) => {
    const lobj = itemlist.getItemById(id);
    const ltag = document.getElementById(id);
    ltag.id = ("li-" + title + artist).toLowerCase().replace(/\s/g, "");
    if (itemlist.getItemById(ltag.id)) return; // there is already an item with the new id
    lobj.title = title; lobj.artist = artist; lobj.imgsrc = img; lobj.tracknum = tracknum; lobj.type = type;
    lobj.id = ltag.id;
    for (const tag of ltag.children) {
        if (tag.className === "ltitle") tag.innerText = title.toUpperCase();
        if (tag.className === "lartist") tag.innerText = artist.toUpperCase();
        if (tag.className === "ltracks") tag.innerText = tracknum.toString();
        if (tag.className === "ltype") tag.innerText = type.toUpperCase();
        if (tag.className === "licon") tag.src = img;
    }
}

const updateTempDisplay = () => {
    let str = "INTERNAL DATA STRUCTURE: \n\n";
    for (const i of itemlist.items) {
        str += "LI:  T: " + i.title + ",  A: " + i.artist + ",  TN: " + i.tracks + ",  TP: " + i.type + ",  ID: " + i.id + "\n\n";
    }
    document.getElementById("tempjsondisplay").innerText = str;
}

function itemButtonInput(index, itemid) { // index: 0=delete, 1=edit
    console.log(index, "  ::  ", itemid);
    if (index === 0) {
        removeFromList(itemid);
    }
}

function unfocus() {
    const t = document.getElementById("fullfocus");
    t.style.display = "block";
}
function refocus() {
    const t = document.getElementById("fullfocus");
    t.style.display = "none";
}
function showPopUp(id) {
    unfocus();
    const t = document.getElementById(id)
    t.style.display = "block";
    for (const tag of t.children) {
        if (tag.type === "text") tag.value = "";
    }
}
function hidePopUps() {
    refocus();
    let tags = document.getElementById("fullfocus").children;
    for (let i = 0; i < tags.length; i++) {
        tags[i].style.display = "none";
    }
}

hidePopUps();

addToList(
    "i robot",
    "the alan parsons project",
    "https://upload.wikimedia.org/wikipedia/en/0/0f/The_Alan_Parsons_Project_-_I_Robot.jpg",
    10,
    "vinyl"
);
addToList(
    "wish you were here",
    "pink floyd",
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png/220px-Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png",
    5,
    "vinyl"
);
addToList(
    "mista don't play: everythangs workin",
    "project pat",
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Project_Pat_Mista_Dont_Play.jpg/220px-Project_Pat_Mista_Dont_Play.jpg",
    20,
    "compact disk"
);
addToList(
    "Ambrosia",
    "Ambrosia",
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Ambrosia%28album%29.jpeg/220px-Ambrosia%28album%29.jpeg",
    8,
    "8-track tape"
);
addToList(
    "Animals",
    "Pink Floyd",
    "https://i.discogs.com/_hYJ-UiHBq0KtuIlz26o-4Ar82o9589HIFIE5XOXuVU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM5MTMy/Mi0xNjkxNTYzMjc4/LTYwODAuanBlZw.jpeg",
    5,
    "vinyl"
);