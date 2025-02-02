import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Summary from './Summary';

function Quiz({ onComplete }) {
  const [quizMeta, setQuizMeta] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('/Uw5CrX');
        const data = response.data;
        setQuizMeta(data);
        setQuizQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (selectedOptionIndex) => {
    if (!quizMeta) return;
  
    const currentQuestion = quizQuestions[currentQIndex];
    const selectedOption = currentQuestion.options[selectedOptionIndex];
    const isCorrect = selectedOption.is_correct;
    const correctAnswer = currentQuestion.options.find(option => option.is_correct === true)?.description;
  
    // Here I am recorning ANswer
    const newEntry = {
      question: currentQuestion.question,
      selectedAnswer: selectedOption.description,
      correctAnswer,
      isCorrect,
    };
  
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers, newEntry];

      let updatedScore = score;
      if (isCorrect) {
        updatedScore += parseFloat(quizMeta.correct_answer_marks) || 0;
      } else {
        updatedScore -= parseFloat(quizMeta.negative_marks) || 0;
      }

      setScore(updatedScore);
      return updatedAnswers;
    });

    if (currentQIndex + 1 >= quizQuestions.length) {
      setTimeout(() => {
        setQuizComplete(true);
        onComplete(score, userAnswers); 
      }, 100);
    } else {
      setCurrentQIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quizQuestions || quizQuestions.length === 0)
    return <div>No quiz questions available.</div>;

  return (
    <div className="quiz-container">
      {quizComplete ? (
        <Summary score={score} userAnswers={userAnswers} />
      ) : (
        <>
          <h2>{quizMeta.title}</h2>
          <p><strong>Topic:</strong> {quizMeta.topic}</p>
          <h3>Question {currentQIndex + 1} of {quizQuestions.length}</h3>
          <Question questionData={quizQuestions[currentQIndex]} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
}

export default Quiz;
