window.onload = function () {
    $.ajaxSetup({
        cache: false
    });
    getJson(createProducts);
    document.getElementById("delete_product").onclick = requestDeleteProduct;
}

/**
 * Go zemame jsonot so produktite
 * mu prakjame data zatoa shto e unikatna i so toa
 * kje ja zemi datata direkt od server a ne od cache
 */

function getJson(callback) {
    $.getJSON("./assets/products.json", {
        _: new Date().getTime()
    }, callback);
}

/**
 * Se kreiraat kartite na produktite
 */

function createProducts(data) {
    var json = data.products;
    const type = getType();
    console.log(type);
    if (type != undefined)
        json = json.filter(product => product.game_link_type == type)
    console.log(json);
    // referenca do prostorot za stavanje na kartite
    const space = document.getElementById('product_space');
    json.forEach(element => {
        const product_url = `product.html?productId=${element.id}`;

        let div1 = document.createElement('div');
        div1.className = "col-lg-6 col-md-6 mb-4";
        space.append(div1);

        let div2 = document.createElement('div');
        div2.className = "card h-400";
        div1.append(div2);

        let a1 = document.createElement('a');
        a1.href = product_url;
        div1.append(a1);

        let img = document.createElement('img');
        img.className = "card-img-top";
        img.src = "./assets/product" + element.id + '/image.jpg';
        img.width = 300;
        img.height = 200;
        a1.append(img);

        let div3 = document.createElement('div');
        div3.className = "card-body";
        div2.append(div3);

        let h4 = document.createElement('h4');
        h4.className = "card-title";
        div3.append(h4);

        let a2 = document.createElement('a');
        a2.innerHTML = element.name;
        h4.append(a2);

        let descr = document.createElement('p');
        descr.className = "card-text";
        descr.innerHTML = getShortDescription(element.description);
        div3.append(descr);

        let read_more = document.createElement('a');
        read_more.href = product_url;
        read_more.innerHTML = "Прочитај повеќе";
        div3.append(read_more);

        let arrow = document.createElement('img');
        arrow.src = './assets/navigation/right.png';
        arrow.height = 40;
        arrow.width = 40;
        read_more.append(arrow);

        let a3 = document.createElement('a');
        a3.innerHTML = "Избриши";
        a3.class = "trigger-btn";
        a3.href = "#myModal";
        a3.setAttribute("data-toggle", "modal");
        a3.setAttribute("productId", element.id);
        a3.onclick = setDeleteIndex;
        div3.append(a3);

        let close = document.createElement('img');
        close.src = './assets/navigation/delete.png';
        close.height = 40;
        close.width = 40;
        a3.append(close);
    });
}

/**
 * Go zemame idto na kartata koja shto e kliknata
 */

function setDeleteIndex(mouse) {
    window.deletetionId = parseInt(mouse.srcElement.attributes["productid"].value)
    console.log("SetDeleteIndex", window.deletetionId);
}

/**
 * Go zemame jsonot otkako korisnikot kliknal na izbrishi
 */

function requestDeleteProduct() {
    console.log('Delete product', window.deletetionId);
    getJson(deleteProducts);
}

/**
 * Go brishime elementot so zemenoto ID i
 * go prakjame jsonot vo bazata zaedno so 
 * imeto na produktot za da se izbrishe folderot i
 * slikata od bazata
 */

function deleteProducts(data) {
    for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].id == window.deletetionId) {
            data.products.splice(i, 1);
            break;
        }
    }
    $.ajax({
        type: "POST",
        url: "./assets/products.php",
        data: {
            content: JSON.stringify(data),
            delete: "product" + window.deletetionId
        },
        success: function () {
            alert("Избришан продуктот");
            localStorage.clear();
            window.location.href = window.location.href
        }
    });
}

/**
 * Dokolku deskripcijata na elementot nadmine
 * 130 karakteri, go kratime i stavame tri tochki
 */

function getShortDescription(descr) {
    const description_limit = 130;
    let text = descr;
    if (text.length > description_limit) {
        text = text.slice(0, description_limit);
        text += "...";
    }
    return text;
}

/**
 * Go vrakja tipot na filtriranje na elementite
 * dali steam ili battlenet
 */

function getType() {
    try {
        var parameters = location.search.substring(1).split("&");
        var temp = parameters[0].split("=");
        return temp[1];
    } catch (err) {
        return undefined;
    }
}