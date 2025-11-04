import { connect } from "mongoose"

const connectDB = async () => {
  const URI_DB = process.env.URI_DB!
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB con éxito!")
  } catch (e) {
    console.log("❌ Error al conectarse a Mongo DB")
    process.exit(1)
  }
}

export default connectDB