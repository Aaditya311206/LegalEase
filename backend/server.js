require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const axios = require('axios'); 
const pdfParse = require('pdf-parse'); 
const Tesseract = require('tesseract.js'); // 🔥 NEW
const fetchPolicies = require('./scraper');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json()); 

// 📁 DIRECTORY CREATOR
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 📁 MULTER UPLOAD CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// 🚀 AI ANALYZE ROUTE (PDF + IMAGE OCR)
app.post('/api/analyze', upload.single('document'), async (req, res) => {
  try {
    const file = req.file;
    const docType = req.body.docType; 

    if (!file) return res.status(400).json({ error: 'No document uploaded' });

    console.log(`\n[🤖 AI ENGINE] Processing ${docType}...`);

    let extractedText = "";

    // 🔥 HANDLE PDF
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    }

    // 🔥 HANDLE IMAGES (OCR)
    else if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      console.log("🧾 Running OCR on image...");

      const result = await Tesseract.recognize(file.path, 'eng');
      extractedText = result.data.text;
    }

    // ❌ UNSUPPORTED
    else {
      return res.status(400).json({
        error: "Unsupported file type (Only PDF, JPG, PNG allowed)"
      });
    }

    // 🔥 LIMIT TEXT (IMPORTANT FOR GEMINI)
    const finalText = extractedText.slice(0, 8000);

    // 🧠 PROMPT
    const prompt = `
You are an expert government compliance and legal AI assistant. You are analyzing a ${docType}.
Your ONLY job is to extract risky, notable, or unfair clauses and analyze them strictly against standard government policies, statutory laws, and consumer rights.

Return ONLY a valid JSON object with the following exact structure. Do not include markdown formatting.

{
  "score": <number between 0 and 100>,
  "scoreColor": "<text-red-500 or text-yellow-500 or text-green-500>",
  "clauses": [
    {
      "title": "<Clause name>",
      "titleColor": "<text-red-800 or text-yellow-800>",
      "bgColor": "<bg-red-50 or bg-yellow-50>",
      "borderColor": "<border-red-200 or border-yellow-200>",
      "text": "<Extracted clause text>",
      "suggestion": "<Legal explanation>",
      "relevantLawTitle": "<Law name>",
      "relevantLawLink": "<Google search link>"
    }
  ]
}

Document Text:
${finalText}
`;

    console.log(`[🧠 GEMINI] Asking AI to analyze...`);

    // 🔥 GEMINI CALL
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const aiResponseText = geminiResponse.data.candidates[0].content.parts[0].text;

    // 🔥 SAFE JSON PARSE
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    const aiAnalysis = JSON.parse(jsonMatch[0]);

    console.log(`[✅ SUCCESS] Analysis complete!`);

    res.json({ status: 'success', analysis: aiAnalysis });

  } catch (error) {
    console.error("\n🔥 Analysis Error:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ error: 'Server error during AI analysis' });
  }
});

// 📜 POLICIES ROUTE
app.get('/api/policies', async (req, res) => {
  try {
    console.log(`\n[📜 SCRAPER] Fetching policies...`);
    const policies = await fetchPolicies();
    
    res.json(policies);
    console.log(`[✅ SCRAPER] Sent ${policies.length} policies`);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

app.listen(PORT, () => console.log(`🚀 LegalEase Backend running on port ${PORT}`));