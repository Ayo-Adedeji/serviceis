import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import { Repair } from "./models/Repair.js";
import { generateReference } from "./utils/generateReference.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Router mounted at /register-repair
const router = express.Router();

// ✅ Test route
router.get("/ping", (req, res) => {
  res.send("pong");
});

// ✅ API Route
router.post("/api/repair-registration", upload.array("files", 5), async (req, res) => {
  try {
    const reference = generateReference();
    const files = (req.files || []).map((f) => f.filename);

    const repair = new Repair({
      reference,
      ...(req.body || {}),   // avoids spreading undefined
      files,
      status: "Pending",
    });

    await repair.save();

    res.json({ success: true, reference, message: "Repair registration saved" });
  } catch (err) {
    console.error("Error in /api/repair-registration:", err);
    res.status(500).json({ success: false, message: "Error saving repair" });
  }
});

// ✅ Serve Vite frontend build
router.use(express.static(path.join(__dirname, "dist")));

// ✅ Catch‑all for SPA routes
router.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Mount router at /register-repair
app.use("/register-repair", router);

// ✅ Start server after DB connection
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
