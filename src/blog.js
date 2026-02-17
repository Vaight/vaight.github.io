console.log("blog.js loaded!");

let blogFile = "json/uniblog/posts_example.json";

function displayPostJson(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const elemPosts = document.getElementById("blog-container");
            for (i of data.posts) {
                let postElem = maaBlogPost(elemPosts, i.id);
                maaSpan(postElem, "blog-author", getCustomId("author", i.id), i.author);
                maaSpan(postElem, "blog-date", getCustomId("date", i.id), i.date);
                maaSpan(postElem, "blog-section", getCustomId("section", i.id), i.section);
                maaBr(postElem);
                maaSpan(postElem, "blog-title", getCustomId("title", i.id), i.title);
                maaSpan(postElem, "blog-content", getCustomId("content", i.id), i.desc);
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
        });
}

function getCustomId(str, id) {
    return str + "-" + String(id);
}

function maaBlogPost(parentElem, id) { // make and append blog post
    let e = document.createElement("div");
    e.classList.add("blog-post");
    e.id = String("author-", id);
    parentElem.appendChild(e);
    return e;
}

function maaSpan(elem, clss, id, txt) { // make and append span
    let s = document.createElement("span");
    s.classList.add(clss);
    s.id = id;
    s.innerHTML = txt;
    elem.appendChild(s);
    return s;
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

displayPostJson(blogFile);