function itemsEnCarrito() {
  const elegidos = itemsElegidosCarritoLS();

  let contenido = "";

  if (elegidos.length == 0) {
    contenido = `<div class="alert alert-secondary text-center col-4 mx-auto" role="alert"> <b>Tu Carrito esta Vacio !!!</b></div>`;
  } else {
    contenido += `
    <table class="table table-hover table-borderless bg-white">
      <thead>
      <tr class="bg-dark">
        <th class="text-white text-center">PRODUCTO</th>
        <th class="text-white text-center"></th>
        <th class="text-white text-center">CANTIDAD </th>
        <th class="text-white text-center"></th>
        <th class="text-white text-center">PRECIO</th>
        <th class="text-white text-center"></th>
      </tr>
    </thead>`;
    elegidos.forEach((vino) => {
      contenido += `
        <tbody >
          <tr>
            <td class="align-middle fw-bold ">${vino.nombre}</td>
            <td id="${vino.id}" class="text-center container-eliminar" width="30"><a href="" class="btn">
            <img src="image/quitar.png" alt="cart" class="btn-eliminar" title="Quitar" width="22">
            <span class="badge bg-secondary"></img></span>
          </a></td>
          <td class=" container-tabla text-center align-middle fw-bold" width="30">${vino.cantidad}</td>
          <td id="${vino.id}" class="text-center container-agregar" width="30"><a href="" class="btn">
            <img src="image/agregar.png" alt="cart" class="btn-sumar"  title="Agregar"width="22">
            <span class="badge bg-secondary"></img></span>
          </a></td>
            <td class="text-center fw-bold" width="130">$ ${(vino.precio * vino.cantidad).toFixed(2)}</td>
            <td class="text-center" width="80"><a href="" class="btn">
            <img id="${vino.id}" src="image/tacho.png" alt="cart" class="btn-eliminar container-eliminar" title="Eliminar Articulo" width="18">
            <span class="badge bg-secondary"></img></span>
          </a></td>
          </tr>
        </tbody>`;
    });

    contenido += `<tfoot class="bg-dark">
      <th class="text-white bg-dark">TOTAL A PAGAR</th>
      <th class="text-white bg-dark"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center">$ ${descuento().toFixed(2)}</th>
      <th class="text-white bg-dark text-center"></th>
    </tfoot>
    <tfoot class="bg-dark">
      <th class="text-white bg-dark">TOTAL</th>
      <th class="text-white bg-dark"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center">$ ${totalCompra().toFixed(2)} </th>
      <th class="text-white bg-dark text-center"></th>
    </tfoot>
    <tfoot class="bg-dark">
      <th class="text-white bg-dark">DESCUENTOS OBTENIDOS</th>
      <th class="text-white bg-dark"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center"></th>
      <th class="text-white bg-dark text-center">$ ${(totalCompra () - descuento()).toFixed(2)} </th>
      <th class="text-white bg-dark text-center"></th>
    </tfoot></table>`;
    contenido += `<button type="button" class="btn btn-success col-4 mx-auto" width="80">FINALIZAR COMPRA</button>`;
  }
  document.getElementById("productos").innerHTML = contenido;
}

function eliminarItem() {
  const itemsCarrito = itemsElegidosCarritoLS();

  const botones = document.querySelectorAll(".btn-eliminar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      let itemId = parseInt(e.target.closest(".container-eliminar").id);

      let pos = itemsCarrito.findIndex((vino) => vino.id === itemId);

      itemsCarrito[pos].cantidad -= 1;
      
      if(itemsCarrito[pos].cantidad == 0){
        itemsCarrito.splice(pos, 1);
      
      }
      subirstockCarritoLS(itemsCarrito);
      itemsEnCarrito();
      botonCarrito();
    });
  });

}

function sumarItem() {
  const itemsCarrito = itemsElegidosCarritoLS();
  const botones = document.querySelectorAll(".btn-sumar");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      let itemId = parseInt(e.target.closest(".container-agregar").id);
      let pos = itemsCarrito.findIndex((vino) => vino.id === itemId);

      itemsCarrito[pos].cantidad += 1;
      
      if(itemsCarrito[pos].cantidad == 0){
        itemsCarrito.push(pos, 1);
      }
      subirstockCarritoLS(itemsCarrito);
      itemsEnCarrito();
      botonCarrito();
    });
  });
}

function vaciarCarrito(){
  const limpiar = localStorage.removeItem("elegidos");
 
  document.getElementById("vaciar").innerHTML = limpiar;

  itemsEnCarrito();
  botonCarrito();
}

function finalizarCompra(){
  
}

itemsEnCarrito();
agregarAlCarrito();
eliminarItem();
sumarItem();
botonCarrito();
