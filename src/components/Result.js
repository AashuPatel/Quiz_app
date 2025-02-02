import React from 'react';
import Summary from './Summary';

function Result({ score, restartQuiz, userAnswers }) {
  const getMessage = () => {
    if (score > 20) return 'Excellent! You are a quiz master!';
    if (score > 10) return 'Great job! Keep it up!';
    return 'Good effort! Try again to improve your score!';
  };

  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <p>
        Your total score is: <strong>{score}</strong>
      </p>
      <p>{getMessage()}</p>
      
      {}
      <Summary score={score} userAnswers={userAnswers} />

      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

export default Result;
