import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	sequence_value: { type: Number, default: 0 },
});

counterSchema.statics.incrementCounter = async function (counterName) {
	const counter = await this.findOneAndUpdate(
		{ _id: counterName },  // Используем объект с полем _id
		{ $inc: { sequence_value: 1 } },
		{ new: true, upsert: true }
	);
	return counter.sequence_value;
};


const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
