import {React, useState, useEffect } from 'react';
import instance from '../Axios';
import { NavBar } from './NavBar';

const QsEditList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await instance.get('questions/');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
   <div>
    <NavBar/>
    <div className="container mx-auto mt-8">
         
      <h2 className="text-2xl font-bold mb-4">Edit Questions List</h2>
      <ul className="list-disc pl-4">
        {questions.map((question) => (
          <li key={question.id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <p className="text-lg font-semibold mb-2">{question.question_text}</p>
              {/* You can use a Link or a button to navigate to the EditQuestion page */}
              {/* Replace "/edit-question" with your actual route for editing */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => window.location.href = `/edit/${question.id}`}
              >
                Edit Question
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

   </div>
  );
};

export default QsEditList;
