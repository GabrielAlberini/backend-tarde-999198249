// FUNCIONES QUE SANITIZAN DATOS DE ENTRADA Y RESPONDEN AL CLIENTE
// LA REQUEST Y EL RESPONSE SIEMPRE ESTARÁN SOLO EN LOS CONTROLLERS

import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"


const getAllProducts = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const products = await Product.find()
    res.json({ success: true, data: products })
  } catch (e) {
    const error = e as Error
    res.status(500).json({ success: false, error: error.message })
  }
}

const getProduct = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "ID Inválido" })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ success: false, error: "Producto no encontrado" })
    }

    res.status(200).json({ success: true, data: product })
  } catch (e) {
    const error = e as Error
    res.status(500).json({ success: false, error: error.message })
  }
}

const addProduct = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { body } = req

    const { name, description, price, category, stock } = body

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "Datos invalidos" })
    }

    const newProduct = new Product({ name, description, price, category, stock })

    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (e) {
    const error = e as Error
    res.status(500).json({ error: error.message })
  }
}

const updateProduct = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params
    const { body } = req

    if (!Types.ObjectId.isValid(id)) res.status(400).json({ error: "ID Inválido" })

    const { name, description, price, category, stock } = body

    const updates = { name, description, price, category, stock }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(product)
  } catch (e) {
    const error = e as Error
    res.status(500).json({ error: error.message })
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const id = req.params.id

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID Inválido" });
    }

    const product = await Product.findByIdAndDelete(id)

    res.json(product)
  } catch (e) {
    const error = e as Error
    res.status(500).json({ error: error.message })
  }
}

export default { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct }