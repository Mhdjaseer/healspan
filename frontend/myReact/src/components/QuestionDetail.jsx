// QuestionDetail.jsx
import React, { useState, useEffect } from 'react';
import instance from '../Axios';
import { NavBar } from './NavBar';

const QuestionDetail = () => {
  const [questionText, setQuestionText] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addChoice, setAddChoice] = useState('');
  const [submittedChoices, setSubmittedChoices] = useState([]);

  const submitQuestion = async () => {
    try {
      const response = await instance.post('questions/', {
        question_text: questionText,
      });

      console.log('API Response:', response.data);
      alert('Question submitted successfully!');

      setSubmittedQuestion({
        id: response.data.id,
        text: questionText,
      });

      setIsSubmitted(true);
      setSubmittedChoices(response.data.choices);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const submitChoice = async () => {
    try {
      const response = await instance.post('choices/create/', {
        choice_text: addChoice,
        question: submittedQuestion.id,
      });

      console.log('Choice submitted successfully!', response.data);
      alert('Choice submitted successfully!');

      // Reset the input field to empty
      setAddChoice('');

      setSubmittedChoices([...submittedChoices, response.data]);
    } catch (error) {
      console.error('Error submitting choice:', error);
    }
  };

  const handleEdit = () => {
    // Redirect to the edit page with the question ID as a parameter
    window.location.href = `/edit/${submittedQuestion.id}`;
  };

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await instance.get(`questions/${submittedQuestion.id}/choices/`);
        setSubmittedChoices(response.data);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };

    if (submittedQuestion) {
      fetchChoices();
    }
  }, [submittedQuestion]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Question Detail</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitQuestion();
          }}
        >
          {isSubmitted ? (
            <p className=" mt-4">{submittedQuestion.text}</p>
          ) : (
            <label className="block mb-4">
              <span className="text-gray-700">Question:</span>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </label>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 ${
              isSubmitted ? 'hidden' : ''
            }`}
          >
            Submit
          </button>
        </form>

        {submittedQuestion && (
          <div>
            <div>
              <ul className="list-disc pl-6">
                {submittedChoices.map((choice) => (
                  <li key={choice.id}>{choice.choice_text}</li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitChoice();
              }}
            >
              <label className="block mb-4">
                <span className="text-gray-700">Add Choice:</span>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={addChoice}
                  onChange={(e) => setAddChoice(e.target.value)}
                />
              </label>

              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
              >
                Submit Choice
              </button>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                Edit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
