const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize the Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); 

// 📁 Configure Multer (The File Catcher)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Saves files into the uploads folder you just created
  },
  filename: (req, file, cb) => {
    // Renames the file to have a unique timestamp so files don't overwrite each other
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// 🚀 The Core API Route: Catching the File from React
app.post('/api/analyze', upload.single('document'), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    // Log it to the terminal so you can see it working
    console.log(`\n[🤖 AI ENGINE] Incoming Request!`);
    console.log(`[📁 Saved As]: ${file.filename}`);

    // Send a success message back to React
    res.json({
      message: 'File successfully received by LegalEase Backend!',
      fileName: file.originalname,
      status: 'success'
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: 'Server error during upload' });
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚀 LegalEase Backend running on port ${PORT}`);
  console.log(`=========================================\n`);
});