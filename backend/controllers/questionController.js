const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc add aditional question to session
// @route POST /api/questions/add
// @access Private
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        // Update session to include new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({ createdQuestions });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// @desc pin or unpin a session
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({message:"Question not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({succes: true,question});
    }
    catch (error) {
        res.status(500).json({succes: false,message:"Server error"});
    }
};

// @desc update a note for a question
// @route POST /api/questions/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {
    try {
        const {note} = req.body;
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({message:"Question not found"});
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({succes: true,question});
    }
    catch (error) {
        res.status(500).json({succes: false,message:"Server error"});
    }
};