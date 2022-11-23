class producto {
    constructor (id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
};

const botas = new producto (1, `Botas de esqui`, 8700, "img/2.png");
const velas = new producto (2, `veleros para pared`, 1500, `img/3.png`);
const maquina = new producto (3, `maquina para escribir`, 16000, `img/4.png`);
const coctelera = new producto (4, `coctelera de vidrio`, 3200, `img/5.png`);
const fondiue = new producto (5, `Olla para hacer fondiue`, 19300, `img/6.png`);

const productos = [botas, velas, maquina, coctelera, fondiue];

let carrito = [];

if(localStorage.getItem(`carrito`)){
    carrito = JSON.parse(localStorage.getItem(`carrito`));
};

const contenedorProductos = document.getElementById(`contenedorProductos`);

const mostrarProductos = () => {
    productos.forEach((producto)=> {
        const card = document.createElement(`div`);
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                    <button class="btn colorBoton" id="boton${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", ()=> {
            agregarAlCarrito(producto.id)
        })
    })
};

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto)=> producto.id === id);
    const productosEnCarrito = carrito.find((producto)=> producto.id === id);
    if (productosEnCarrito){
        productosEnCarrito.cantidad++;
    } else {
        carrito.push(producto);
        localStorage.setItem(`carrito`,JSON.stringify(carrito));
    }
    calcularTotal();
};

mostrarProductos ();

const contenedorCarrito = document.getElementById(`contenedorCarrito`);

const verCarrito = document.getElementById(`verCarrito`);

verCarrito.addEventListener(`click`, ()=> {
    agregarAlCarrito ();
});

const mostrar = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto)=> {
        const card = document.createElement(`div`);
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                    <p class="card-text">${producto.cantidad}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar del carrito </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);

        boton.addEventListener(`click`, ()=> {
            eliminarDelCarrito(producto.id);
        });
    });
    calcularTotal ();
};

const eliminarDelCarrito = (id) => {
    const producto = carrito.find ((producto)=> producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    carrito ();
    localStorage.setItem(`carrito`,JSON.stringify(carrito));
};

const total = document.getElementById(`total`);

const calcularTotal = ()=> {
    let totalCompra = 0;
    carrito.forEach ((producto)=> {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    });
    total.innerHTML = `Total: $ ${totalCompra}`;
};