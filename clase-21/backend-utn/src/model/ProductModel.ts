// DEFINE EL ESQUEMA DE DATOS Y CREA EL MODELO
// EL MODELO:
// 1 - crea la colección en mongodb
// 2 - habilita los métodos de manipulación de data

import { model, Model, Schema } from "mongoose"
import IProduct from "../interfaces/IProduct"

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: "No tiene descripción" },
  stock: { type: Number, default: 0, min: 0 },
  category: { type: String, default: "No tiene categoria" },
  price: { type: Number, default: 0, min: 0 }
}, {
  versionKey: false
})

const Product: Model<IProduct> = model("Product", productSchema)

export default Product