import React from 'react';

function Summary({ score, userAnswers }) {
  return (
    <div className="summary-container">
      <h2>Quiz Completed!</h2>
      <h3>Your Final Score: {score}</h3>
      <h3>Question-wise Breakdown:</h3>
      <ul>
        {userAnswers.map((entry, index) => (
          <li key={index} className={entry.isCorrect ? "correct" : "wrong"}>
            <p><strong>Q{index + 1}: {entry.question}</strong></p>
            <p>Your Answer: <span className={entry.isCorrect ? "correct" : "wrong"}>{entry.selectedAnswer}</span></p>
            <p>Correct Answer: {entry.correctAnswer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;
