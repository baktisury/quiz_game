import React, { useState, useEffect } from 'react';
import { quiz_game_backend } from 'declarations/quiz_game_backend';
import './index.scss';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');
  const [result, setResult] = useState(null);

  const loadQuestion = async () => {
    const question = await quiz_game_backend.getCurrentQuiz();
    setCurrentQuestion(question);
    setResult(null);
    setUserAnswer('');
    setNewQ('');
    setNewA('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await quiz_game_backend.submit(newQ, newA, userAnswer);
    setResult(res);
    await loadQuestion();
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <div className="quiz-container">
      <h1>Quiz Game</h1>
      <p><strong>Pertanyaan:</strong> {currentQuestion}</p>
      <form onSubmit={handleSubmit}>
        <input
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Pertanyaan baru"
          required
        />
        <input
          value={newA}
          onChange={(e) => setNewA(e.target.value)}
          placeholder="Jawaban baru"
          required
        />
        <input
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Jawaban untuk pertanyaan di atas"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {result !== null && (
        <p className={result ? 'success' : 'error'}>
          {result ? 'Jawaban kamu benar!' : 'Jawaban kamu salah!'}
        </p>
      )}
    </div>
  );
}

export default App;
