/* 
    Funcionalidad pre entrega 3 -> Comprar sneakers:
    1. Conectar las funcionalidades creadas anteriormente con el DOM.
*/
function openCart() {
    document.getElementById("cart").style.width = "300px";
    document.getElementById("openCart").style.display = "none";
    document.getElementById("closeCart").style.display = "inline";
    document.getElementById("cart").style.borderLeft = "1px solid black";
}

function closeCart() {
    document.getElementById("cart").style.width = "0";
    document.getElementById("openCart").style.display = "inline";
    document.getElementById("closeCart").style.display = "none";
    document.getElementById("cart").style.borderLeft = "0";
}

function addCartNotif() {
    document.getElementById("addCartNotif").style.display = "flex";
}

function closeAddCartNotif() {
    document.getElementById("addCartNotif").style.display = "none";
}

document.getElementById("openCart").onclick = () => {
    openCart();
};

document.getElementById("closeCart").onclick = () => {
    closeCart();
};

document.getElementById("closeAddCartNotif").onclick = () => {
    closeAddCartNotif();
};

for (let i = 0; i < document.getElementsByClassName("addCart").length; i++) {
    document.getElementsByClassName("addCart")[i].onclick = () => {
        cart.addProduct(destacados[i]);
        closeAddCartNotif();
        addCartNotif();
        cart.saveCart();
        cart.refresh();
    };
}

document.getElementById("buy").onclick = () => {
    cart.printTicket(new Date());
};

document.getElementById("closeTicket").onclick = () => {
    document.getElementById("ticket").style.display = "none";
    console.log("asd");
};

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = parseFloat(price);
    }
}

class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        document.getElementById(
            "cartContent"
        ).innerHTML += `<li>${product.name}</li>`;
    }

    getTotal() {
        let total = 0;
        this.products.forEach((product) => {
            total += product.price;
        });
        return total;
    }

    saveCart() {
        for (const product of this.products) {
            localStorage.setItem(product.name, JSON.stringify(product));
        }
    }

    loadCart() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            this.addProduct(JSON.parse(localStorage.getItem(key)));
        }
    }

    printSneakers() {
        let text = "";
        this.products.forEach((sneaker) => {
            text += `<p>${sneaker.name}: $${sneaker.price}</p>`;
        });
        return text;
    }

    printTicket(date) {
        document.getElementById("ticket").innerHTML += `<p>Felicidades por su compra del ${date.toLocaleDateString()}.</p><p>${this.printSneakers()}</p><p>Usted compró ${this.products.length} sneakers por un total de $${this.getTotal()}.</p>`;
        document.getElementById("ticket").style.display = "flex";
    }

    isEmpty() {
        return this.products.length == 0;
    }

    refresh() {
        if (!cart.isEmpty()) {
            document.getElementById("buy").style.display = "inline";
        } else {
            document.getElementById("buy").style.display = "none";
        }
    }
}

let cart = new Cart(1);
let destacados = [];
destacados.push(new Product("Air Jordan 1 Low Black Active Fuchsia", 270));
destacados.push(new Product("Air Jordan 1 Low Black Guava Ice W", 315));
destacados.push(new Product("Air Jordan 1 Low Vintage Stealth Grey", 230));
destacados.push(new Product("Air Jordan 1 Low Black Active Fuchsia", 200));

let itemsDestacados = document
    .getElementsByClassName("destacados")[0]
    .getElementsByClassName("itemDestacado");

for (let i = 0; i < itemsDestacados.length; i++) {
    itemsDestacados[i].getElementsByTagName("h5")[0].innerText =
        destacados[i].name;
    itemsDestacados[i].getElementsByTagName(
        "h4"
    )[0].innerText = `$${destacados[i].price}`;
}
cart.loadCart();
cart.refresh();
