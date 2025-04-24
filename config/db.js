import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("✅ Conectado a MongoDB Atlas");
	} catch (error) {
		console.error("❌ Error de conexión a MongoDB:", error.message);
		process.exit(1);
	}
};

mongoose.connection.on("connected", () => {
	console.log("📦 Mongoose conectado");
});

mongoose.connection.on("error", (err) => {
	console.error(`🚨 Error de Mongoose: ${err}`);
});

export default connectDB;
