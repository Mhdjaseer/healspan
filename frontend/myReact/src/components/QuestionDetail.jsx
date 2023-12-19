import React, { useState } from 'react';
import instance from '../Axios';
import { NavBar } from './NavBar';

const QuestionDetail = () => {
  const [questionText, setQuestionText] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState(null);

  async function submitQuestion() {
    try {
      const response = await instance.post('questions/', {
        question_text: questionText,
      });

      // Handle the API response as needed
      console.log('API Response:', response.data);
      alert('Question submitted successfully!');
      
      // Set the submitted question and its ID
      setSubmittedQuestion({
        id: response.data.id,
        text: questionText,
      });
      
      // Optionally, you can fetch questions after submission
      // await fetchQuestions();
    } catch (error) {
      // Handle errors from the API call
      console.error('Error submitting question:', error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Question Detail</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitQuestion();
        }}>
          <label className="block mb-4">
            <span className="text-gray-700">Question:</span>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Submit Question
          </button>
        </form>

        {submittedQuestion && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Submitted Question:</h2>
            <p>ID: {submittedQuestion.id}</p>
            <p>Text: {submittedQuestion.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
