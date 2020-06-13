window.onload = function () {
    $.getJSON("./assets/products.json", createProducts);
}

function createProducts(data) {
    var json = data.products;
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
        // a2.href....
        a2.innerHTML = element.name;
        h4.append(a2);

        let descr = document.createElement('p');
        descr.className = "card-text";
        descr.innerHTML = getShortDescription(element.description);
        div3.append(descr);

        let read_more = document.createElement('a');
        read_more.href = product_url;
        read_more.innerHTML = "Read more";
        div3.append(read_more);
    });
}

function getShortDescription(descr) {
    const description_limit = 130;
    let text = descr;
    if (text.length > description_limit) {
        text = text.slice(0, description_limit);
        text += "...";
    }
    return text;
}