import React, { useState } from 'react';

function Question({ questionData, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (index) => {
    setSelectedAnswer(index); // I will here update selected answer when an option is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer === null) return;

    const selectedOption = questionData.options[selectedAnswer];
    const isCorrect = selectedOption.is_correct;

    setFeedback(isCorrect ? 'Correct! Well done.' : 'Incorrect answer.');
    onAnswer(selectedAnswer);
  };

  return (
    <div className="question-container">
      <h3>{questionData.description}</h3>
      <form onSubmit={handleSubmit}>
        {questionData.options.map((option, index) => (
          <div key={option.id} className="answer-option">
            <label>
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleSelect(index)}
              />
              {option.description}
            </label>
          </div>
        ))}
        <button type="submit" disabled={selectedAnswer === null}>
          Submit Answer
        </button>
      </form>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default Question;
