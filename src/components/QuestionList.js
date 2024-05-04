import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    return () => {
      isMounted = false;
    };
  }, []);

  function handleDeleteQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((question) => question.id !== questionId)))
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
