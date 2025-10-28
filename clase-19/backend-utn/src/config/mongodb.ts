import { connect } from "mongoose"

const connectDB = async () => {
  const URI_DB = "mongodb://localhost:27017/db_utn_backend"
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB con éxito!")
  } catch (e) {
    console.log("❌ Error al conectarse a Mongo DB")
    process.exit(1)
  }
}

export default connectDB