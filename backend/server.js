const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const axios = require('axios'); 
const fetchPolicies = require('./scraper'); // 🆕 Imported your scraper!

// Initialize the Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// 📁 BULLETPROOF DIRECTORY CREATOR
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`[📁] Created uploads directory at ${uploadDir}`);
}

// 📁 Configure Multer (The File Catcher)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
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

    console.log(`\n[🤖 AI ENGINE] Incoming Request!`);
    console.log(`[📁 Saved As]: ${file.filename}`);

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


// 🔐 NEW ROUTE: Verify Google Authentication
app.post('/api/auth/google', async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "No access token provided" });
    }

    const googleResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const userProfile = googleResponse.data;
    
    console.log(`\n[🔐 AUTH] New Google Login!`);
    console.log(`Name: ${userProfile.name}`);
    console.log(`Email: ${userProfile.email}`);

    res.json({
      message: "Successfully authenticated with Google",
      name: userProfile.name,
      email: userProfile.email,
      picture: userProfile.picture
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});


// 📜 NEW ROUTE: Fetch Government Policies via Scraper
app.get('/api/policies', async (req, res) => {
  try {
    console.log(`\n[📜 SCRAPER] React requested policies... scraping PRS India...`);
    const policies = await fetchPolicies();
    
    // Send the scraped array of policies back to the React frontend
    res.json(policies);
    console.log(`[📜 SCRAPER] Successfully sent ${policies.length} policies to frontend.`);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚀 LegalEase Backend running on port ${PORT}`);
  console.log(`=========================================\n`);
});