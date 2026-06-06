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
    const rawLanguage = req.body.language || "en";
    const targetLanguage = rawLanguage.split('-')[0].toLowerCase(); 

    if (!file) return res.status(400).json({ error: 'No document uploaded' });

    console.log(`\n[🤖 AI ENGINE] Auditing ${docType}. Target Language ISO: "${targetLanguage}"`);

    let extractedText = "";
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } else if (file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(file.path, 'eng');
      extractedText = result.data.text;
    }

    // 🧠 SYSTEM PROMPT: Crystal clear instructions matching ISO language structures natively
    const prompt = `
      You are a legal document auditing engine. Your absolute requirement is to translate the output language fields to match the code "${targetLanguage}" perfectly.
      
      CRITICAL INSTRUCTION:
      Analyze this ${docType} raw text payload for legal compliance, risks, and terms.
      Extract 5-8 core clauses.
      
      For each clause item:
      - The "text" key property field MUST be an exact, literal, word-for-word quote extracted from the raw Document Text Source below. Do not translate this string value.
      - The fields "title", "suggestion", and "relevantLawTitle" MUST be completely and accurately translated into the language matching the code "${targetLanguage}".
      - Every key field within the "translatedHeaders" object MUST be completely translated into the language matching the code "${targetLanguage}".

      Document Text Source:
      ${extractedText.slice(0, 8000)}
    `;

    console.log(`[🧠 GEMINI] Running contextual compliance breakdown analysis...`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    // Enforcing strict response schema validation boundaries
    const geminiResponse = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            score: { type: "INTEGER" },
            scoreColor: { type: "STRING" },
            translatedHeaders: {
              type: "OBJECT",
              properties: {
                complianceHeader: { type: "STRING", description: `The phrase 'Compliance Analysis Complete' translated completely into language code ${targetLanguage}` },
                risksHeader: { type: "STRING", description: `The phrase 'Detected Legal Risks' translated completely into language code ${targetLanguage}` },
                issuesFoundLabel: { type: "STRING", description: `The phrase 'Issues Found' translated completely into language code ${targetLanguage}` },
                safetyScoreLabel: { type: "STRING", description: `The phrase 'Legal Safety Score' translated completely into language code ${targetLanguage}` },
                policyAlignmentLabel: { type: "STRING", description: `The phrase 'Policy & Law Alignment' translated completely into language code ${targetLanguage}` },
                verifyAgainstLabel: { type: "STRING", description: `The phrase 'Verify against' translated completely into language code ${targetLanguage}` }
              },
              required: ["complianceHeader", "risksHeader", "issuesFoundLabel", "safetyScoreLabel", "policyAlignmentLabel", "verifyAgainstLabel"]
            },
            clauses: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING", description: `The name/type of the clause completely translated into language code ${targetLanguage}` },
                  titleColor: { type: "STRING" },
                  bgColor: { type: "STRING" },
                  borderColor: { type: "STRING" },
                  text: { type: "STRING", description: "Verbatim raw original quote text from the contract. Do not translate this." },
                  suggestion: { type: "STRING", description: `Detailed legal advice and simplification comments completely translated into language code ${targetLanguage}` },
                  relevantLawTitle: { type: "STRING", description: `The applicable law title or act completely translated into language code ${targetLanguage}` },
                  relevantLawLink: { type: "STRING" }
                },
                required: ["title", "titleColor", "bgColor", "borderColor", "text", "suggestion", "relevantLawTitle", "relevantLawLink"]
              }
            }
          },
          required: ["score", "scoreColor", "translatedHeaders", "clauses"]
        }
      }
    });

    const aiResponseText = geminiResponse.data.candidates[0].content.parts[0].text;
    const aiAnalysis = JSON.parse(aiResponseText.trim());

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    console.log(`[✅ SUCCESS] Generative translation payload compiled.`);
    res.json({ status: 'success', analysis: aiAnalysis });

  } catch (error) {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
    console.error("\n🔥 Analysis Error Detail:", error.message);
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

// 💬 CONTEXT-AWARE AI CHAT ROUTE
app.post('/api/chat', async (req, res) => {
  try {
    const { message, documentContext, docType, language } = req.body;
    const targetLanguage = (language || "en").split('-')[0].toLowerCase();

    console.log(`\n[💬 CHAT ENGINE] Follow-up question in language code: "${targetLanguage}"`);

    let systemPrompt = `You are an expert conversational legal analysis assistant for the platform LegalEase.\n`;
    
    if (documentContext) {
      systemPrompt += `The user has successfully audited a legal document classified as a "${docType}".\n`;
      systemPrompt += `Here is the structured analysis layout of the risks discovered inside that document:\n`;
      systemPrompt += `${JSON.stringify(documentContext)}\n\n`;
      
      systemPrompt += `CRITICAL INTERACTION DIRECTIONS:\n`;
      systemPrompt += `1. Answer the user's questions based strictly on this file text data context.\n`;
      systemPrompt += `2. Do not hallucinate or wander into unrelated legal rules.\n`;
      systemPrompt += `3. USER LANGUAGE CONSTRAINT: The user's interface language is code "${targetLanguage}". You MUST write your entire response completely and fluently in the language corresponding to code "${targetLanguage}" (e.g., Hindi, Tamil, Telugu, Marathi). Do not respond in English.\n`;
      systemPrompt += `4. Keep answers precise, helpful, conversational, and direct.\n`;
    }

    const combinedPrompt = `${systemPrompt}\nUser Question: ${message}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const geminiResponse = await axios.post(url, {
      contents: [{ parts: [{ text: combinedPrompt }] }]
    });

    const botReply = geminiResponse.data.candidates[0].content.parts[0].text;
    
    res.json({ reply: botReply });

  } catch (error) {
    console.error("\n🔥 Chat API Error Detail:", error.message);
    res.status(500).json({ error: "Failed to process chat conversation message text." });
  }
});

app.listen(PORT, () => console.log(`🚀 LegalEase Backend running on port ${PORT}`));