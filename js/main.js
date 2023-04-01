/* 
    Primer entrega:
    Usar lo visto en clase (ej. funciones de tipos de datos en js, no hay objetos).
    Usar variables, funciones, prompt y alert. Tambien usar ciclos y condicionales.
    Simulador interactivo: la pagina tiene que pedir cosas al entrar.
    Agregar readme que indique como debe ser usado el programa.

    Funcionalidad pre entrega 1 -> Comprar sneakers:
    1. Crear un programa que pida al usuario ingresar nombre y valor de un producto (zapatillas en mi caso) la cantidad de veces que quiera.
    2. Se debe dejar vacío el nombre del producto para finalizar la compra.
    3. Mostrar precio final y cantidad de productos (la lista de productos no se puede porque no vimos arrays todavía).
*/

let total = 0;
let sneaker;
let price;
let sneakersCounter = 0;

function addCart(price) {
  total += parseFloat(price);
}

while (sneaker != "") {
  sneaker = prompt(
    "Ingrese el modelo de su Sneaker (enviar en blanco para no cargar más Sneakers)"
  );
  if (sneaker != "") {
    sneakersCounter++;
    price = parseFloat(prompt("Ingrese el valor de su Sneaker"));
    addCart(price);
  }
}

alert(
  "Usted compró " + sneakersCounter + " Sneakers por un total de $" + total
);
