require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const axios = require('axios'); 
const pdfParse = require('pdf-parse'); 
const Tesseract = require('tesseract.js'); 
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

// 🧹 JANITOR: Clears folder on start for privacy
const clearUploadsOnStart = () => {
  try {
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
      fs.unlinkSync(path.join(uploadDir, file));
    }
    console.log("🧹 [PRIVACY] Local uploads folder cleared.");
  } catch (err) {
    console.log("Cleanup: Folder already empty.");
  }
};
clearUploadsOnStart();

// 📁 MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// 🚀 AI ANALYZE ROUTE
app.post('/api/analyze', upload.single('document'), async (req, res) => {
  const file = req.file; 
  try {
    const docType = req.body.docType || "Document"; 
    if (!file) return res.status(400).json({ error: 'No document uploaded' });

    console.log(`\n[🤖 AI ENGINE] Processing ${docType}...`);

    let extractedText = "";
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } else if (file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(file.path, 'eng');
      extractedText = result.data.text;
    }

    // 🧠 IMPROVED PROMPT: Forces AI to extract actual text and follow JSON structure
    const prompt = `
      Analyze this ${docType} for legal risks and compliance. 
      You MUST extract 5-8 specific clauses. 
      For each clause, "text" MUST be a direct, literal quote from the document text provided below. 
      DO NOT use generic phrases like "Text could not be extracted".

      Return ONLY a valid JSON object with this exact structure:
      {
        "score": 75,
        "scoreColor": "text-yellow-500",
        "clauses": [
          {
            "title": "Clause Name (e.g. Termination)",
            "titleColor": "text-red-800",
            "bgColor": "bg-red-50",
            "borderColor": "border-red-200",
            "text": "The actual quoted sentence from the document",
            "suggestion": "Detailed legal explanation and advice",
            "relevantLawTitle": "Name of relevant law or act",
            "relevantLawLink": "https://www.google.com/search?q=relevant+law"
          }
        ]
      }

      Document Text:
      ${extractedText.slice(0, 8000)}
    `;

    console.log(`[🧠 GEMINI] Extracting legal clauses...`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const aiResponseText = geminiResponse.data.candidates[0].content.parts[0].text;
    
    // Clean markdown backticks and parse JSON
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const aiAnalysis = JSON.parse(jsonMatch[0].replace(/```json|```/g, "").trim());

    // ✅ DELETE FILE AFTER SUCCESS
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    console.log(`[✅ SUCCESS] Analysis complete!`);
    res.json({ status: 'success', analysis: aiAnalysis });

  } catch (error) {
    // ✅ DELETE FILE ON ERROR
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
    
    console.error("\n🔥 Analysis Error Detail:");
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    
    res.status(500).json({ error: 'AI Error. Check server console.' });
  }
});

// 📜 POLICIES ROUTE
app.get('/api/policies', async (req, res) => {
  try {
    const policies = await fetchPolicies();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

app.listen(PORT, () => console.log(`🚀 LegalEase Backend running on port ${PORT}`));