import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"


const getAllProducts = async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const products = await Product.find()
    response.json(products)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}

const getProduct = async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "ID Inválido" });
    }

    const product = await Product.findById(id)

    if (!product) {
      return response.status(404).json({ error: "Producto no encontrado" })
    }
    response.status(200).json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}

const addProduct = async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const body = request.body

    const { name, description, price, category, stock } = body

    if (!name || !description || !price || !category || !stock) {
      return response.status(400).json({ message: "Datos invalidos" })
    }

    const newProduct = new Product({ name, description, price, category, stock })

    await newProduct.save()
    response.status(201).json(newProduct)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}

const updateProduct = async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id
    const body = request.body

    if (!Types.ObjectId.isValid(id)) response.status(400).json({ error: "ID Inválido" })

    const { name, description, price, category, stock } = body

    const updates = { name, description, price, category, stock }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!product) {
      return response.status(404).json({ error: "Producto no encontrado" })
    }

    response.json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}

const deleteProduct = async (request: Request, response: Response): Promise<void | Response> => {
  try {
    const id = request.params.id

    if (!Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: "ID Inválido" });
    }

    const product = await Product.findByIdAndDelete(id)

    response.json(product)
  } catch (e) {
    const error = e as Error
    response.status(500).json({ error: error.message })
  }
}

export default { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct }