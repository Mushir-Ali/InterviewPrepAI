const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} technical interview questions.
- For each question, generate a clear and beginner-friendly answer.
- If the answer requires a code example, include the code as a plain string inside the "answer" field.
  For example:
  "answer": "You can create a server using Express like this: const app = express();"

Return only a valid JSON array.
Do NOT use markdown or wrap anything in backticks (like \`\`\`).
Do NOT add any explanation or extra formatting.

Return output ONLY like this:

[
  {
    "question": "Explain the concept of closures in JavaScript.",
    "answer": "A closure gives you access to an outer function’s scope from an inner function. For example: function outer() { let x = 10; return function inner() { console.log(x); }; }"
  }
]
`);



const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:

- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
  "title": "Short title here?",
  "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
