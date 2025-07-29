const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// Initialize Gemini API client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

        const rawText = await response.text(); // ✅ FIXED: Await this!
        // console.log("Gemini raw response:", rawText);

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText); // ✅ Should now work correctly

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

    const rawText = await response.text();
    // console.log("Gemini raw explanation response:", rawText);

    // Try to extract JSON string inside code block
    let cleanedText = rawText.trim();

    // Remove ```json or ``` from start and ``` from end
    if (cleanedText.startsWith("```json") || cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/^```\s*/, "");
      cleanedText = cleanedText.replace(/```$/, "").trim();
    }

    try {
      const data = JSON.parse(cleanedText);
      return res.status(200).json(data);
    } catch (jsonErr) {
      // Print exact error and raw text to debug malformed JSON
      console.error("JSON parse error:", jsonErr);
      console.error("Cleaned response that caused error:", cleanedText);

      return res.status(500).json({
        message: "Failed to parse JSON from AI response",
        error: jsonErr.message,
        rawText,
        cleanedText,
      });
    }

  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};



module.exports = {
    generateInterviewQuestions,
    generateConceptExplanations,
};
