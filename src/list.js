class List {
    constructor() {
        this.items = [];
    }
    add(title, artist, img, id) {  // title, artist, img src
        let i = new ListItem(title, artist, img, id);
        this.items.push(i);
        console.log(i);
    }
    getItemByAlbum(name) {
        return null;
    }
    getItemByArtist(name) {
        return null;
    }
}

let itemlist = new List();

class ListItem {
    constructor() {
        this.title = "";
        this.artist = "";
        this.imgsrc = "";
        this.itemid = "";
    }
}

function addItemToList(title, artist, img, tracknum, medium) {
    let h = document.getElementById("l-item-builder").cloneNode(true);
    h.id = ("l-item-" + title + artist).toLowerCase().replace(/\s/g, "");
    itemlist.add(title, artist, img, h.id);
    document.getElementById("l-items").appendChild(h);
    let tags = h.children;
    console.log(tags);
    tags[0].onclick = function(){itemButtonInput(0, h.id)};
    tags[1].onclick = function(){itemButtonInput(1, h.id)};
    if (img && img != "") {
        tags[2].src = img
    }
    tags[3].innerText = title;
    tags[5].innerText = artist;
    tags[6].innerText = tracknum + " Tracks";
    tags[8].innerText = "Owned on: " + medium;
    h.style.display = "block";
}

function itemButtonInput(index, itemid) { // index: 0=delete, 1=edit
    console.log(index, "  ::  ", itemid);
    if (index === 0) {
        document.getElementById(itemid).remove();
    }
}

//addItemToList("I Robot","Alan Parsons Project","https://upload.wikimedia.org/wikipedia/en/0/0f/The_Alan_Parsons_Project_-_I_Robot.jpg");