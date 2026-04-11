require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const axios = require('axios'); 
const pdfParse = require('pdf-parse'); 
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

// 🚀 THE CORE AI ROUTE (GOVERNMENT COMPLIANCE MODE)
app.post('/api/analyze', upload.single('document'), async (req, res) => {
  try {
    const file = req.file;
    const docType = req.body.docType; 

    if (!file) return res.status(400).json({ error: 'No document uploaded' });

    console.log(`\n[🤖 AI ENGINE] Processing ${docType}...`);

    // 1. Read PDF
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // 2. Set up the POLICY & COMPLIANCE Gemini Prompt
    const prompt = `
      You are an expert government compliance and legal AI assistant. You are analyzing a ${docType}.
      Your ONLY job is to extract risky, notable, or unfair clauses and analyze them strictly against standard government policies, statutory laws, and consumer rights.
      
      Return ONLY a valid JSON object with the following exact structure. Do not include markdown formatting.
      {
        "score": <number between 0 and 100 representing legal compliance and safety>,
        "scoreColor": "<if score < 50 use 'text-red-500', if 50-79 use 'text-yellow-500', if 80+ use 'text-green-500'>",
        "clauses": [
          {
            "title": "<Name of the risky, unfair, or notable clause>",
            "titleColor": "<text-red-800 or text-yellow-800>",
            "bgColor": "<bg-red-50 or bg-yellow-50>",
            "borderColor": "<border-red-200 or border-yellow-200>",
            "text": "<The exact text extracted from the document>",
            "suggestion": "<Strictly explain which government policy, act, or legal standard this clause violates or involves. Explain the legal reality, not just negotiation advice.>",
            "relevantLawTitle": "<The exact name of the law or section violated, e.g., 'Section 27, Indian Contract Act'>",
            "relevantLawLink": "<Provide a valid Google search URL to research this specific law, e.g., 'https://www.google.com/search?q=Section+27+Indian+Contract+Act+1872'>"
          }
        ]
      }

      Document Text:
      ${extractedText}
    `;

    console.log(`[🧠 GEMINI] Asking AI to analyze (Direct REST API Bypass)...`);

    // 3. Call Gemini (THE NUCLEAR OPTION - BYPASSING THE BUGGY SDK)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const aiResponseText = geminiResponse.data.candidates[0].content.parts[0].text;

    // 4. Parse JSON safely
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    const aiAnalysis = JSON.parse(jsonMatch[0]);

    console.log(`[✅ SUCCESS] Analysis complete!`);
    
    // Send REAL data to frontend
    res.json({ status: 'success', analysis: aiAnalysis });

  } catch (error) {
    // 🚨 This will print the EXACT error Google sends back if it fails
    console.error("\n🔥 Analysis Error:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ error: 'Server error during AI analysis' });
  }
});

// 📜 POLICIES ROUTE: Fetch Government Policies via Scraper
app.get('/api/policies', async (req, res) => {
  try {
    console.log(`\n[📜 SCRAPER] React requested policies... scraping PRS India...`);
    const policies = await fetchPolicies();
    
    res.json(policies);
    console.log(`[✅ SCRAPER] Successfully sent ${policies.length} policies to frontend.`);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

app.listen(PORT, () => console.log(`🚀 LegalEase Backend running on port ${PORT}`));