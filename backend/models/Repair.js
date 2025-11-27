import mongoose from "mongoose";

const RepairSchema = new mongoose.Schema({
  reference: { type: String, unique: true },
  registrationType: String,
  manufacturer: String,
  productName: String,
  productNumber: String,
  productManufacturer: String,
  purchaseDate: String,
  purchasePrice: String,
  faultDescription: String,
  files: [String],
  fullName: String,
  email: String,
  phone: String,
  address: String,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export const Repair = mongoose.model("Repair", RepairSchema);
