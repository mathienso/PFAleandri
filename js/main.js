/* 
    Funcionalidad pre entrega 2 -> Comprar sneakers:
    1. Crear un programa que pida al usuario ingresar nombre y valor de un producto (zapatillas en mi caso) la cantidad de veces que quiera.
    2. Se debe dejar vacío el nombre del producto para finalizar la compra.
    3. Mostrar precio final, cantidad y lista de productos.
*/

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
    }

    getTotal() {
        let total = 0;
        this.products.forEach(product => {
            total += product.price;
        });
        return total;
    }

    printSneakers() {
        let text = "";
        this.products.forEach(sneaker => {
            text += ` ${sneaker.name}: $${sneaker.price}\n`;
        });
        return text;
    }

    printTicket(date) {
        alert(
            `Felicidades por su compra del ${date.toLocaleDateString()}.\n${this.printSneakers()}\nUsted compró ${this.products.length} sneakers por un total de $${this.getTotal()}.`
        );
    }

    isEmpty() {
        return this.products.length == 0;
    }
}
let cart = new Cart(1);

let sneaker;
let price = 0;
while (sneaker != "") {
    sneaker = prompt(
        "Ingrese el modelo de su Sneaker (enviar en blanco para no cargar más Sneakers)"
    );
    if (sneaker != "") {
        price = parseFloat(prompt("Ingrese el valor de su Sneaker"));
        cart.addProduct(new Product(sneaker, price));
    }
}

if(!cart.isEmpty()){
    cart.printTicket(new Date());
}