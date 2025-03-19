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
        //console.log(i);
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

let collectionList = new List();
let wishList = new List();

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

const addToList = (list, title, artist, img, tracknum, type) => {
    const id = ("li-" + title + artist).toLowerCase().replace(/\s/g, "");
    list.add(title, artist, img, tracknum, type, id);
}

function makeListsFromJson(path) {
    fetch(path).then(response => response.json()).then(data => {
        //console.log(data);
        for (const l of data.lists) {
            if (l.type === 0) {
                for (const i of l.items) {
                    addToList(collectionList, i.title, i.artist, i.imgsrc, i.tracknum, i.type);
                }
            } else if (l.type === 1) {
                for (const i of l.items) {
                    addToList(wishList, i.title, i.artist, i.imgsrc, i.tracknum, i.type);
                }
            }
        }
    });
}

const displayList = (listId) => {
    const lbox = document.getElementById("litems")
    const childTags = lbox.children;
    for (const t in childTags) { // t is index of tags
        const tag = childTags[1];
        if (!tag) break;
        if (tag.id != "litembuilder") {
            tag.remove();
        }
    }

    let list;
    if (listId === 0) {
        list = collectionList;
        document.getElementById("lcurtitle").innerText = "OWNED COLLECTION"
    }
    if (listId === 1) {
        list = wishList;
        document.getElementById("lcurtitle").innerText = "WISHLIST"
    }

    //console.log("list:", list);

    for (const i of list.items) {
        let ltag = document.getElementById("litembuilder").cloneNode(true);
        ltag.id = ("li-" + i.title + i.artist).toLowerCase().replace(/\s/g, "");
        document.getElementById("litems").appendChild(ltag);
        for (const tag of ltag.children) {
            if (tag.className === "ltitle") tag.innerText = i.title.toUpperCase();
            if (tag.className === "lartist") tag.innerText = i.artist.toUpperCase();
            if (tag.className === "ltracks") tag.innerText = i.tracks.toString();
            if (tag.className === "ltype") tag.innerText = i.type.toUpperCase();
            if (tag.className === "licon") tag.src = i.imgsrc;
            if (tag.className === "lbtnitem" && tag.value === "EDIT") tag.onclick = function(){itemButtonInput(1, ltag.id)};
            if (tag.className === "lbtnitem" && tag.value === "DELETE") tag.onclick = function(){itemButtonInput(0, ltag.id)};
        }
        ltag.style.display = "block";
    }
}

function buttonInput(index, itemid) {
    console.log(index, "  ::  ", itemid);
    if (index === 0) {
        removeFromList(itemid);
    }
}

makeListsFromJson("../json/vaightlist.json");