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

//addItemToList("I Robot","Alan Parsons Project","https://upload.wikimedia.org/wikipedia/en/0/0f/The_Alan_Parsons_Project_-_I_Robot.jpg");

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