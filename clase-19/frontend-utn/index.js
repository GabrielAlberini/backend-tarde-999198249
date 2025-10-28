const fetchingProduct = async () => {
  try {
    const response = await fetch("http://localhost:3000/products/68f7d7641064")

    const json = await response.json()

    console.log(json)

    if (json.success) {
      const { name } = json.data
      document.querySelector("h1").textContent = `Nombre del producto encontrado: ${name}`
    } else {
      alert(json.error)
    }

  } catch (error) {
    console.log(error)
  }
}

fetchingProduct()