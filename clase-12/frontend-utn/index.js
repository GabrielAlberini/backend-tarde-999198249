const fetchingProducts = async () => {
  const response = await fetch("http://localhost:3000/productos", {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json();
    renderProducts(data);
  } else {
    document.querySelector("#productos").innerHTML =
      "<p>La petición no funcionó :(</p>";
  }
};

const renderProducts = (productos) => {
  const container = document.getElementById("productos");

  container.innerHTML = productos
    .map(
      (prod) => `
      <div class="card">
        <h2>${prod.nombre}</h2>
        <p class="categoria">${prod.categoria}</p>
        <p>${prod.descripcion}</p>
        <p><strong>Precio:</strong> $${prod.precio}</p>
        <p><strong>Stock:</strong> ${prod.stock}</p>
        <button>Borrar producto</button>
      </div>
    `
    )
    .join("");
};

fetchingProducts();
