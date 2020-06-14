window.onload = function () {
    console.log("Adding listener");
    $.ajaxSetup({
        cache: false
    });
    document.getElementById("product_form").onsubmit = getJson;
};

function getJson() {
    $.getJSON("./assets/products.json", getForm);
}

/**
 * Gi zema informacite od formata i kreira objekt so tie informaci
 * objektot se klava na pochetokot od nizata na produkti
 * data objektot se konvertira vo string i se pushta do serverot
 * za da se zapishi, otkako kje se zapishi se pushta slikata do serverot
 */

function getForm(data) {
    window.product_id = getId(data.products);
    data.products.unshift({
        id: window.product_id,
        name: document.getElementById("form_name").value,
        description: document.getElementById("form_description").value,
        text: document.getElementById("form_text").value,
        game_link_type: document.getElementById("form_game_link_type").value,
        game_link: document.getElementById("form_game_link").value,
        video_url: document.getElementById("form_video_url").value,
        date: new Date().toJSON().slice(0, 10).replace(/-/g, "/")
    });
    console.log(data);
    $.ajax({
        type: "POST",
        url: "./assets/products.php",
        data: {
            content: JSON.stringify(data),
        },
        success: downloadImage,
    });
}

/**
 * Slikata se prakja do serverot i po uspeshnoto izvrshuvanje
 * se nosi do stranata kade se naogja noviot produkt
 */

function downloadImage() {
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file', files);
    var name = "product" + window.product_id;
    fd.append('name', name);
    $.ajax({
        url: './assets/upload.php',
        type: 'post',
        processData: false,
        contentType: false,
        data: fd,
        success: function (response) {
            console.log(response);
            localStorage.clear();
            document.location.href = "product.html?productId=" + window.product_id;
        },
    });
}

/**
 * Se proverva jsonot za najgolemo id
 * i go vrakja idto zgolemeno za 1 so shto sekogash
 * kje imame unikatno id
 */

function getId(products) {
    let id = products[0].id;
    for (let i = 1; i < products.length; i++) {
        if (products[i].id > id) id = products[i].id;
    }
    return id + 1;
}