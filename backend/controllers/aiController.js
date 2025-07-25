const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// Initialize Gemini API client
const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Generate interview questions and answers using Gemini
// @route POST /api/questions/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ```json
            .replace(/```$/, "")        // remove ending ```
            .trim();                    // trim spaces

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};

// @desc Generate explanation for a specific question using Gemini
// @route POST /api/questions/generate-explanations
// @access Private
const generateConceptExplanations = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Missing required field: question",
            });
        }

        const prompt = conceptExplainPrompt(question);

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanations,
};
