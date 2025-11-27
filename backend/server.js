import express from "express";
import multer from "multer";
import cors from "cors";
import { connectDB } from "./db.js";
import { Repair } from "./models/Repair.js";
import { generateReference } from "./utils/generateReference.js";

const app = express();
app.use(cors());

// ✅ connect to MongoDB
await connectDB();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Route
app.post("/api/repair-registration", upload.array("files", 5), async (req, res) => {
  try {
    const reference = generateReference();
    const files = (req.files || []).map((f) => f.filename);

    const repair = new Repair({
      reference,
      ...req.body,
      files,
      status: "Pending",
    });

    await repair.save();

    res.json({ success: true, reference, message: "Repair registration saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving repair" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
