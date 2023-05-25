/* 
    Requisitos entrega final:
    -Objetos y arrays.
    -Funciones y condicionales.
    -Generación de dom de forma dinámica. Eventos.
    -Sintaxis avanzada.
    -Libraries.
    -Manejo de promesas con fetch.
    -Carga de datos mediante JSON local o API.
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
    Toast.fire({
        icon: 'success',
        title: 'Producto añadido al carrito'
    })
}

document.getElementById("openCart").onclick = () => {
    openCart();
};

document.getElementById("closeCart").onclick = () => {
    closeCart();
};

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

document.getElementById("buy").onclick = () => {
    cart.printTicket(new Date());
};

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = parseFloat(price);
        this.id = String(this.name).replace(/ /g, "");
    }
}

class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    addProduct(product) {
        if(this.products.find((el) => el.name === product.name)){
            product = this.products[this.products.findIndex((el) => el.name === product.name)];
            product.quantity += 1;
            document.getElementById(product.id).innerHTML = `${product.name} <div class="btnProduct" id="${product.id+"More"}">+</div> ${product.quantity} <div class="btnProduct" id="${product.id+"Less"}">-</div>`;
        } else {
            product.quantity = 1;
            this.products.push(product);
            document.getElementById(
                "cartContent"
            ).innerHTML += `<li id="${product.id}">${product.name} <div class="btnProduct" id="${product.id+"More"}">+</div> ${product.quantity} <div class="btnProduct" id="${product.id+"Less"}">-</div></li>`;
        }
        this.refresh();
        cart.saveCart();
        console.log(this.products);
    }

    addProductById(id) {
        let product = this.products[this.products.findIndex((el) => el.id === id)];
        this.addProduct(product);
    }

    removeProductById(id) {
        let product = this.products[this.products.findIndex((el) => el.id === id)];
        product.quantity -= 1;
        if(product.quantity == 0) {
            document.getElementById(product.id).remove();
        } else {
            document.getElementById(product.id).innerHTML = `${product.name} <div class="btnProduct" id="${product.id+"More"}">+</div> ${product.quantity} <div class="btnProduct" id="${product.id+"Less"}">-</div>`;
        }
        this.refresh();
        cart.saveCart();
    }

    getTotal() {
        let total = 0;
        this.products.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    }

    saveCart() {
        for (const product of this.products) {
            if(product.quantity == 0) {
                localStorage.removeItem(product.id)
            } else {
                localStorage.setItem(product.id, JSON.stringify(product));
            }
        }
    }

    loadCart() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            let productLoaded = JSON.parse(localStorage.getItem(key));
            let product = new Product(productLoaded.name, productLoaded.price);
            product.quantity = productLoaded.quantity;
            this.products.push(product);
            document.getElementById(
                "cartContent"
            ).innerHTML += `<li id="${product.id}">${product.name} <div class="btnProduct" id="${product.id+"More"}">+</div> ${product.quantity} <div class="btnProduct" id="${product.id+"Less"}">-</div></li>`;
        }
    }

    printSneakers() {
        let text = "";
        this.products.forEach((sneaker) => {
            text += `<li>${sneaker.quantity +" "+ sneaker.name}: $${parseFloat(sneaker.price)*sneaker.quantity}</li>`;
        });
        return text;
    }

    printTicket(date) {
        Swal.fire({
            title: `Felicidades por su compra del ${date.toLocaleDateString()}.`,
            html: `<ul style="list-style:none;">${this.printSneakers()}</ul><b>El precio total de su compra es $${this.getTotal()}.</b>`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }

    isEmpty() {
        return this.products.length == 0;
    }

    refresh() {
        if (!cart.isEmpty()) {
            document.getElementById("buy").style.display = "inline";
            for (let i = 0; i < document.getElementsByClassName("btnProduct").length; i++) {
                let element = document.getElementsByClassName("btnProduct")[i];
                if(element.id.substring(element.id.length - 4) == "More") {
                    element.onclick = () => {this.addProductById(element.id.substring(0, element.id.length - 4))}
                } else {
                    element.onclick = () => {this.removeProductById(element.id.substring(0, element.id.length - 4))}
                }
            }
        } else {
            document.getElementById("buy").style.display = "none";
        }
    }
}

let cart = new Cart(1);
let destacados = [];

fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(product => {
            destacados.push(new Product(product.name, product.price))
        });
        let itemsDestacados = document.getElementsByClassName("destacados")[0].getElementsByClassName("itemDestacado");
        
        for (let i = 0; i < itemsDestacados.length; i++) {
            itemsDestacados[i].getElementsByTagName("h5")[0].innerText =
                destacados[i].name;
            itemsDestacados[i].getElementsByTagName(
                "h4"
            )[0].innerText = `$${destacados[i].price}`;
        }
        /* Se agrega el onClick a los botones de "agregar al carrito" */
        for (let i = 0; i < document.getElementsByClassName("addCart").length; i++) {
            document.getElementsByClassName("addCart")[i].onclick = () => {
                cart.addProduct(destacados[i]);
                addCartNotif();
            };
        }
    });

cart.loadCart();
cart.refresh();