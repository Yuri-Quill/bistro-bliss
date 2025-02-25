// autoIncrementPlugin
import mongoose from "mongoose";
import Counter from "../models/counter.model.js";

const autoIncrementPlugin = (schema) => {
	schema.add({
		id: {
			type: Number,
			unique: true,
		},
	});

	schema.pre("save", async function (next) {
		try {
			if (this.isNew) {
				const counter = await Counter.incrementCounter(this.collection.name);
				this.id = counter;
			}
			next();
		} catch (err) {
			next(err);
		}
	});

	schema.pre("insertMany", async function (next, docs) {
		try {
			if (!Array.isArray(docs) || docs.length === 0) {
				return next();
			}
			let sequence_value = 0;
			for (const doc of docs) {
				sequence_value = await Counter.incrementCounter(this.collection.name);
				doc.id = sequence_value;
			}
			next();
		} catch (err) {
			next(err);
		}
	});

	const originalToJSON =
		schema.methods.toJSON ||
		function () {
			return this.toObject();
		};

	schema.methods.toJSON = function () {
		const obj = originalToJSON.apply(this, arguments);
		if (obj.id === undefined && this.id !== undefined) {
			obj.id = this.id;
		}
		return obj;
	};

	schema.statics.findById = function (id) {
		if (typeof id === "number") {
			return this.findOne({ id: id });
		}
		return this.findOne({ _id: id });
	};
};

export default autoIncrementPlugin;
