window.onload = function () {
    $.ajaxSetup({
        cache: false
    });
    $.getJSON("./assets/products.json", createPage);
}

function createPage(data) {
    const products_length = data.products.length;
    var id = getProductId(products_length);
    console.log('ProductId', id);
    var position = getIndex(data.products, parseInt(id));
    var product = data.products.find(pr => pr.id == id)
    if (product == undefined) {
        product = data.products[0];
        id = product.id;
        position = 0;
    }
    document.getElementById("blog_title").innerHTML = product.name;
    document.getElementById("blog_image").src = "./assets/product" + id + "/image.jpg";
    document.getElementById("posted_date").innerHTML = product.date;
    document.getElementById("description_paragraph").innerHTML = product.description;
    setupSideBar(data, products_length, position);

    const parent = document.getElementById("text_position");
    addVideo(product.video_url, parent);
    setParagraphs(product.text, parent);
}

/**
 * Go vrakja indeksot na elementot vo data jsonot
 * (ne product id, tuku mestoto na elementot vo nizata)
 */

function getIndex(data, id) {
    for (let i = 0; i < data.length; i++)
        if (data[i].id == id)
            return i;
}

/**
 * Gi dodava elementite za navigacija na produktite
 */

function setupSideBar(data, products_length, position) {
    postGameLink(data.products[position].game_link_type, data.products[position].game_link);
    addProductNavigation("left", data, products_length, position);
    addProductNavigation("right", data, products_length, position);
}

/**
 * Elementi za navigacija
 */

function addProductNavigation(direction, data, length, position) {
    const product_url = `product.html?productId=${getNextId(direction, data, length, position)}`;
    let div = document.getElementById(`product_navigation_${direction}`);
    let a = document.createElement('a');
    a.href = product_url;
    div.append(a);

    let img = document.createElement('img');
    img.className = `card-img-${direction}`;
    img.src = `./assets/navigation/${direction}.png`;
    img.width = 70;
    img.height = 70;
    a.append(img);

    let p = document.createElement('p');
    p.innerHTML = direction == 'left' ? "Назад" : "Следно";
    p.align = "center";
    a.append(p);
}

/**
 * Go vrakja idto na sledniot ili prethodniot produkt
 * Ako nema sleden go vrakja istiot
 * Ako nema prethoden go vrakja istiot
 */

function getNextId(direction, data, length, id) {
    const products = data.products;
    const next = id + 1;
    const previous = id - 1;
    console.log(length, id, direction == 'left' ?
        (previous == -1 ? products[0].id : products[previous].id) :
        (next >= length ? products[length - 1].id : products[next].id));
    return direction == 'left' ?
        (previous == -1 ? products[0].id : products[previous].id) :
        (next >= length ? products[length - 1].id : products[next].id);
}

/**
 * Dodava link do igrata zemen od json
 * @param {String} type primer battlenet ili steam
 * @param {String} url link do igrata
 */

function postGameLink(type, url) {
    let div = document.getElementById("link_img");

    let a = document.createElement('a');
    a.href = url;
    div.append(a);

    let img = document.createElement('img');
    img.className = "card-img-top";
    img.src = `./assets/stores/${type}.png`;
    img.width = 200;
    img.height = 100;
    a.append(img);
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
        return id;
    } catch (err) {
        return 0;
    }
}