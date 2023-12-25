import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../Axios';
import { NavBar } from './NavBar';

const Edit = () => {
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editedQuestionText, setEditedQuestionText] = useState('');
  const [editedChoices, setEditedChoices] = useState([]);
  const [newChoice, setNewChoice] = useState('');
  const [showAddChoice, setShowAddChoice] = useState(false); // State to track if the "Add" button is clicked
  const { questionId: paramQuestionId } = useParams();

  const fetchQuestions = async () => {
    try {
      const response = await instance.get('questions/');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const filteredQuestion = questions.find((q) => q.id === parseInt(paramQuestionId));
    setQuestion(filteredQuestion);
    setEditedQuestionText(filteredQuestion?.question_text || '');
    setEditedChoices(
      filteredQuestion?.choices.map((choice) => ({ id: choice.id, text: choice.choice_text })) || []
    );
  }, [paramQuestionId, questions]);

  const handleDelete = async () => {
    try {
      await instance.delete(`questions/${paramQuestionId}`);
      // Navigate to another page after successful deletion
      // history.push('/another-page');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await instance.put(`questions/${paramQuestionId}/`, {
        question_text: editedQuestionText,
      });
      // Navigate to another page after successful editing
      // history.push('/another-page');
      alert('Updated success fully ')
    } catch (error) {
      console.error('Error editing question:', error.message);
      // Display a user-friendly error message
      // You can use a state variable to manage the error message in your component
    }
  };

  const handleAddChoiceApi = async (newChoiceText) => {
    try {
      // Assuming you have a separate endpoint to add choices
      // Adjust the API endpoint accordingly
      const response = await instance.post(`choices/create/`, {
        choice_text: newChoiceText,
        question: paramQuestionId,
      });

      // Optionally, you can fetch the updated question data after adding choices
      fetchQuestions();
      return response.data;
    } catch (error) {
      console.error('Error adding choices:', error);
      // Display a user-friendly error message if needed
      throw error;
    }
  };

  const handleAddChoice = async () => {
    try {
      // Add the new choice using the API
      const newChoiceData = await handleAddChoiceApi(newChoice);

      // Add the new choice locally in the component state
      setEditedChoices([...editedChoices, { id: newChoiceData.id, text: newChoiceData.choice_text }]);

      // Clear the new choice input and hide the input field and submit button
      setNewChoice('');
      setShowAddChoice(false);
    } catch (error) {
      // Handle error (display a message or log it)
    }
  };

  const handleChoiceChange = (index, value) => {
    setEditedChoices((prevChoices) => {
      const newChoices = [...prevChoices];
      newChoices[index].text = value;
      return newChoices;
    });
  };

  const handleChoiceSubmit = async (choiceId) => {
    // Find the edited choice in the state
    const editedChoice = editedChoices.find((choice) => choice.id === choiceId);

    if (editedChoice) {
      try {
        // Update the choice using the API
        await instance.put(`choices/${choiceId}/`, {
          choice_text: editedChoice.text,
          question: paramQuestionId,
        });
      } catch (error) {
        console.error('Error updating choice:', error);
        // Handle error (display a message or log it)
      }
    }
  };

  const handleDeleteChoiceApi = async (choiceId) => {
    try {
      // Assuming you have a separate endpoint to delete choices
      // Adjust the API endpoint accordingly
      await instance.delete(`choices/${choiceId}`);
      // Optionally, you can fetch the updated question data after deleting choices
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting choice:', error);
      // Display a user-friendly error message if needed
      throw error;
    }
  };

  const handleDeleteButtonClick = async (choiceId) => {
    // Remove the choice from the state when the "Delete" button is clicked
    setEditedChoices((prevChoices) => prevChoices.filter((choice) => choice.id !== choiceId));

    // Delete the choice using the API
    await handleDeleteChoiceApi(choiceId);
  };

  return (
    <div>
      <NavBar/>
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
      <p className="text-gray-500">Question ID: {paramQuestionId}</p>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault(); // prevent default form submission
          handleEdit();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-sm font-medium text-gray-600"
          >
            Question Text:
          </label>
          <input
            type="text"
            id="questionText"
            className="mt-1 p-2 w-full border rounded-md"
            value={editedQuestionText}
            onChange={(e) => setEditedQuestionText(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="choices"
            className="block text-sm font-medium text-gray-600"
          >
            Choices: 
          </label>
          <ul className="list-disc pl-4">
            {editedChoices.map((choice, index) => (
              <li key={index} className="text-gray-800">
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                  onClick={() => handleChoiceSubmit(choice.id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDeleteButtonClick(choice.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {showAddChoice ? (
            <div className="flex mt-2">
              <input
                type="text"
                className="p-2 border rounded-md"
                placeholder="New Choice"
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={handleAddChoice}
              >
                Submit
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowAddChoice(true)}
            >
              Add Choice
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Edit;
