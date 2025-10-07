const fetchingProducts = async () => {
  const response = await fetch("http://localhost:3000/productos", {
    method: "GET",
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
      <div class="card" data-id="${prod.id}">
        <h2>${prod.nombre}</h2>
        <p class="categoria">${prod.categoria}</p>
        <p><strong>Precio:</strong> $${prod.precio}</p>
        <p><strong>Stock:</strong> ${prod.stock}</p>
        <button class="delete-btn">Actualizar producto</button>
        <button class="delete-btn">Borrar producto</button>
      </div>
    `
    )
    .join("");

  // Evento click general en cada card
  const cards = document.querySelectorAll(".card");
  console.log(cards)
  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const id = card.dataset.id;
      const res = await fetch(`http://localhost:3000/productos/${id}`);
      const producto = await res.json();
      console.log(producto)
      showPopup(producto);
    });
  });
};

// Popup con la info del producto
const showPopup = (producto) => {
  // Eliminar popup previo si existe
  document.querySelector(".popup-overlay")?.remove();

  const popup = document.createElement("div");
  popup.className = "popup-overlay";
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-btn">&times;</span>
      <h2>${producto.nombre}</h2>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Stock:</strong> ${producto.stock}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.remove();
  });
};

fetchingProducts();
