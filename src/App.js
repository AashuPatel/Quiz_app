import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleQuizCompletion = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setQuizCompleted(false);
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App with Gamification</h1>
      </header>
      <main>
        {quizCompleted ? (
          <Result score={score} userAnswers={userAnswers} restartQuiz={restartQuiz} />
        ) : (
          <Quiz onComplete={handleQuizCompletion} />
        )}
      </main>
    </div>
  );
}

export default App;
