console.log("uniblog.js loaded!");

function sectionButtonClick(index) {
    if (index == -1) {
        const elemSel = document.getElementById("selcontrols");
        const elemPosts = document.getElementById("posts");
        elemSel.style.display = "block";
        elemPosts.style.display = "none";
        const elemReturn = document.getElementById("postops").cloneNode(true);
        elemPosts.innerHTML = '';
        elemPosts.appendChild(elemReturn);
        playSfx("audio/close.mp3");
    } else if (index == 0) {
        displayPostJson("json/uniblog/posts_example.json");
        playSfx("audio/open.mp3");
    }  else if (index == 1) {
        displayPostJson("json/uniblog/atls_obj_idc_1_ideation.json");
        playSfx("audio/open.mp3");
    } else {
        playSfx("audio/deny.mp3");
    }
}

function displayPostJson(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const elemSel = document.getElementById("selcontrols");
            const elemPosts = document.getElementById("posts");
            elemSel.style.display = "none";
            elemPosts.style.display = "block";
            document.getElementById("sectitle").innerText = data.section
            for (i of data.posts) {
                obj1 = document.createElement("div");
                obj1.classList.add("post");

                txtDesc = document.createElement("span");
                txtDesc.classList.add("pdesc");
                txtDesc.innerText = i.desc;

                maaSpan(obj1, "pdate", (i.author + ", " + i.date));
                maaSpan(obj1, "ptitle", i.title);
                maaBr(obj1);
                if (i.desc != "") maaSpan(obj1, "pdesc", i.desc);
                maaBr(obj1);
                if (i.imgsrc != "") maaImg(obj1, i.imgsrc);
                if (i.link != "" && i.linktxt != "") maaLink(obj1, i.link, i.linktxt);
                document.getElementById("posts").appendChild(obj1);
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
        });
}

function maaSpan(elem, clss, txt) { // make and append span
    s = document.createElement("span");
    s.classList.add(clss);
    s.innerText = txt;
    elem.appendChild(s);
    return;
}
function maaBr(elem) { // make and append line break
    s = document.createElement("br");
    elem.appendChild(s);
    return;
}
function maaImg(elem, src) { // make and append image
    s = document.createElement("img");
    s.src = src
    s.style.width = "100%";
    elem.appendChild(s);
    return;
}
function maaLink(elem, href, text) { // make and append image
    s = document.createElement("a");
    s.href = href
    s.innerText = text;
    s.target = "_blank"
    elem.appendChild(s);
    return;
}
function playSfx(path) {
    document.getElementById("sfx").src = path
    document.getElementById("sfx").play();
}