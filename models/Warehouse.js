const warehouseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	country: { type: String, required: true },
	products: [
		{
			productId: { type: String, required: true },
			quantity: { type: Number, required: true },
			lastUpdated: { type: Date, default: Date.now },
		},
	],
	admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
