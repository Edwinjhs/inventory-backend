import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "country"],
		default: "country",
	},
	country: {
		type: String,
		required: function () {
			return this.role === "country";
		},
	},
});


export default mongoose.model("User", userSchema);
