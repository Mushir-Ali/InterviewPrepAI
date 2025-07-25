const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc Create a new session and linked questions
// @route POST /api/sessions/create
// @access Private
exports.createSession = async (req, res) => {
    try{
        const {role,experience,topicsToFocus,description,questions} = req.body;
        const userId = req.user.id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        return res.status(201).json({success: true,session});
    }
    catch(error){
        res.status(500).json({succes: false,message:"Server error"});
    }
}

// @desc Get my sessions
// @route GET /api/sessions/my-sessions
// @access Private
exports.getMySessions = async(req,res)=>{
    try{

    }
    catch(error){
        res.status(500).json({succes: false,message:"Server error"});
    }
}

// @desc Get session by id with populated questions
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById = async(req,res)=>{
    try{

    }
    catch(error){
        res.status(500).json({succes: false,message:"Server error"});
    }
}

// @desc Delete session by id
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async(req,res)=>{
    try{

    }
    catch(error){
        res.status(500).json({succes: false,message:"Server error"});
    }
}