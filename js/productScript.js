window.onload = function () {
    $.getJSON("./assets/products.json", createPage);
}

function createPage(data) {
    var id = getProductId(data.products.length);
    var product = data.products.find(pr => pr.id == id)
    document.getElementById("blog_title").innerHTML = product.name;
    document.getElementById("blog_image").src = "./assets/product" + id + "/image.jpg";
    document.getElementById("posted_date").innerHTML = product.date;
    document.getElementById("description_paragraph").innerHTML = product.description;

    const parent = document.getElementById("text_position");
    addVideo(product.video_url, parent);
    setParagraphs(product.text, parent);
}

/**
 * Dodava iframe od youtube so videoto dokolku treba
 * @param {String} url url do videoto
 * @param {Object} parent 
 */

function addVideo(url, parent) {
    if (url.length == 0)
        return;
    let img = document.getElementById("blog_image");
    var iframe = document.createElement('iframe');
    iframe.width = img.width;
    iframe.height = 500;
    iframe.src = url;
    parent.append(iframe);
}

/**
 * Kreira paragrafi so tekst kolku shto ima "\n" obelezhani
 * @param {Array} raw_text Tekstot koj kje sedi vo paragrafi
 * @param {Object} parent 
 */
function setParagraphs(raw_text, parent) {
    const text = raw_text.split("\n");
    for (paragraph of text) {
        let p = document.createElement('p');
        p.innerHTML = paragraph;
        p.align = "justify";
        parent.append(p);
    }
}

/**
 * Zema produkt preku url promenliva
 * Vo sluchaj da ne postoj produktot vrakja default produkt 0
 * @param {Number} length broj na produkti vo json
 * @return {Number} idto na produktot koj treba da se prikazhi
 */
function getProductId(length) {
    try {
        var parameters = location.search.substring(1).split("&");
        var temp = parameters[0].split("=");
        var id = decodeURI(temp[1]).match(/\d+/)[0];
        return id >= length ? 0 : id;
    } catch (err) {
        return 0;
    }
}