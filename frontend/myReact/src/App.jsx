// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/add/" element={<QuestionDetail />} />
        
      </Routes>
    </Router>
  );
}

export default App;
