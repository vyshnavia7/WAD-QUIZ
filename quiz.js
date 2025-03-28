const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];


app.get("/question", (req, res) => {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  res.json({ id: randomQuestion.id, question: randomQuestion.question, options: randomQuestion.options });
});


app.post("/answer", (req, res) => {
  const { id, answer } = req.body;
  const question = questions.find(q => q.id === id);
  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }
  const isCorrect = question.answer === answer;
  res.json({ correct: isCorrect });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
