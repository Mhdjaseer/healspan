// QuestionList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../Axios'; 
import { NavBar } from './NavBar';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');

   // Function to fetch questions
   const fetchQuestions = async () => {
    try {
      const response = await instance.get('questions/');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    // Initial 
    fetchQuestions();
  }, []);

  const handleVoteClick = (question) => {
    setSelectedQuestion(question);
    setSelectedChoice(null); // Reset selectedChoice when a new question is selected
    setInputValue(''); // Reset inputValue when a new question is selected
    setEmail(''); // Reset email when a new question is selected
  };

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  async function voteSubmit() {
    try {
      
      const response = await instance.post('vote/', {
        choice: selectedChoice.id,
        voter_email: email,
      });
  
      // Handle the API response as needed
      console.log('API Response:', response.data);
      alert('Vote submitted successfully!');
      await fetchQuestions();
      
    } catch (error) {
      // Handle errors from the API call
      console.error('Error submitting vote:', error);
      
    }
  }



  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email before submitting.');
      return;
    }
    if (!selectedChoice) {
      alert('Please select a choice before submitting.');
      return;
    }
    voteSubmit()
   
  };
  

  return (
    <div className="text-center">
      <NavBar />
      <h2 className="text-2xl font-bold mb-4">Polling Questions</h2>
      <ul className="list-none p-0">
        {questions.map(question => (
          <li key={question.id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <p className="text-lg font-semibold">{question.question_text}</p>
              <button
                type="button"
                className="bg-blue-500 px-4 py-2 text-white rounded mt-2"
                onClick={() => handleVoteClick(question)}
              >
                Vote
              </button>
              {selectedQuestion && selectedQuestion.id === question.id && (
                <div className="dropdown">
                  <ul className="dropdown-list">
                    {question.choices.map(choice => (
                      <li
                        key={choice.id}
                        className={`dropdown-item ${selectedChoice && selectedChoice.id === choice.id ? 'selected' : ''}`}
                        onClick={() => handleChoiceClick(choice)}
                      >
                        {choice.choice_text}
                        <span className="ml-2 text-gray-500">Votes: {choice.votes}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedChoice && (
                    <div className="input-field">
                      <label htmlFor="inputEmail">Enter your email:</label>
                      <input
                        type="email"
                        id="inputEmail"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Your email..."
                      />
                    </div>
                  )}
                 
                  <button
                    type="button"
                    className="bg-green-500 px-4 py-2 text-white rounded mt-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;