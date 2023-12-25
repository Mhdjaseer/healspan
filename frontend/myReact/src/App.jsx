// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import './App.css'
import  Edit  from './components/Edit';
import  QsEditList  from './components/QsEditList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/add/" element={<QuestionDetail />} />
        <Route path="/edit/:questionId" element={<Edit />} />
        <Route path="/list/" element={<QsEditList />} />
      </Routes>
    </Router>
  );
}

export default App;
