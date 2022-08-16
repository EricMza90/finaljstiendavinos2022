const articulos = [
  {
    nombre: "Kaiken Estate",
    id: 1,
    precio: 1250,
    imagen: "Kaiken-Malbec.png",
    varietal: "MALBEC",
  },
  {
    nombre: "Killka",
    id: 2,
    precio: 1100,
    imagen: "Killka-Malbec.png",
    varietal: "MALBEC",
  },
  {
    nombre: "Cordero con Piel de Lobo ",
    id: 3,
    precio: 990,
    imagen: "Cordero-Lobo.png",
    varietal: "MALBEC",
  },
  {
    nombre: "Mil Piedras ",
    id: 4,
    precio: 1250,
    imagen: "Mil-Piedras.png",
    varietal: "CABERNET SAUVIGNON",
  },
  {
    nombre: "AlbaFlor",
    id: 5,
    precio: 1300,
    imagen: "Albaflor-Cabernet.png",
    varietal: "CABERNET SAUVIGNON",
  },
  {
    nombre: "Trivento Reserve",
    id: 6,
    precio: 1300,
    imagen: "Trivento-Reserve.png",
    varietal: "CABERNET SAUVIGNON",
  },
  {
    nombre: "La Flor Sauvignon Blanc",
    id: 7,
    precio: 1100,
    imagen: "La-Flor-Blanc.png",
    varietal: "BLANCO",
  },
  {
    nombre: "Crios Torrontes",
    id: 8,
    precio: 1100,
    imagen: "crios.png",
    varietal: "BLANCO",
  },
  {
    nombre: "Santa Julia Chenin Dulce",
    id: 9,
    precio: 820,
    imagen: "Santa-Julia-Chenin-Dulce.png",
    varietal: "BLANCO",
  },
  {
    nombre: "Norton Cosecha Tardia",
    id: 10,
    precio: 690,
    imagen: "Norton-Tardio.png",
    varietal: "BLANCO",
  },
  {
    nombre: "La Flor",
    id: 11,
    precio: 1150,
    imagen: "La-Flor-Rose.png",
    varietal: "ROSE",
  },
  {
    nombre: "Kaiken Malbec",
    id: 12,
    precio: 1250,
    imagen: "Kaiken-Rose.png",
    varietal: "ROSE",
  },
];

const carrito = [];

function subirstockLS(articulos) {
  localStorage.setItem("vinos", JSON.stringify(articulos));
}

function productosEnLS() {
  return JSON.parse(localStorage.getItem("vinos")) || [];
}

function subirstockCarritoLS(articulos) {
  localStorage.setItem("elegidos", JSON.stringify(articulos));
}

function itemsElegidosCarritoLS() {
  return JSON.parse(localStorage.getItem("elegidos")) || [];
}

function stock() {
  const stockTienda = productosEnLS();

  let contenido = "";

  stockTienda.forEach((vino) => {
    contenido += `<div id="${vino.id}" class= "col-md-3 container-tarjeta">
      <div class="card text-center text-white bg-secondary mb-3">
      <img src="image/${vino.imagen}" class="card-img-top" alt="${vino.nombre}">
      <div class="card-body">
        <h6 class="card-title">${vino.varietal}</h6>
        <p class="card-text">${vino.nombre}</p>
        <p class="card-text">$ ${vino.precio}</p>
        <button type="button" class="btn btn-success btn-agregar">Agregar al Carrito</button>
      </div>
    </div>
    </div>`;
    document.getElementById("productos").innerHTML = contenido;
  });
}

function agregarAlCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      let itemId = parseInt(e.target.closest(".container-tarjeta").id);
      let pos = itemsCarrito.findIndex((vino) => vino.id === itemId);
      if (pos > -1) {
        itemsCarrito[pos].cantidad += 1;
      } else {
        let item = articulos.find((vino) => vino.id === itemId);
        item.cantidad = 1;
        itemsCarrito.push(item);
      }
      subirstockCarritoLS(itemsCarrito);
      botonCarrito();
      vaciarCarrito();
    });
  });
}

function vaciarCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();

  const botones = document.querySelectorAll("#vaciar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      let itemId = parseInt(e.target.closest("#vaciar").id);
      let item = itemsCarrito.findIndex((vino) => vino.id === itemId);
      itemsCarrito.splice(item, 1);
      subirstockCarritoLS(itemsCarrito);
      botonCarrito();
    });
  });
}

function botonCarrito() {
  let contenido = `<button type="button" class="btn">
    <img src="/image/carrito.png" alt="cart" width="42">
    <span class="badge bg-secondary"></img>${ArticulosEnCarrito()}</span>
  </button>`;

  document.getElementById("btn-cart").innerHTML = contenido;

}

function ArticulosEnCarrito() {
  const itemsCarrito = itemsElegidosCarritoLS();

  return itemsCarrito.reduce((sumatoria, vino) => sumatoria + vino.cantidad, 0);
}

function descuento() {
  const itemsCarrito = itemsElegidosCarritoLS();

  let dto = itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad,
    0
  );

  if (dto >= 4) {
    return itemsCarrito.reduce(
      (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio * 0.85,
      0
    );
  }

  return itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio,
    0
  );
}

function totalCompra() {
  const itemsCarrito = itemsElegidosCarritoLS();

  return itemsCarrito.reduce(
    (sumatoria, vino) => sumatoria + vino.cantidad * vino.precio,
    0
  );
}

subirstockLS(articulos);
stock();
agregarAlCarrito();
botonCarrito();