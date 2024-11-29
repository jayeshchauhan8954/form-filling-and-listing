import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage'; // MainPage (default page)
import ListCandidatePage from './pages/ListCandidate';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list-candidate" element={<ListCandidatePage />} />
        <Route path="/admin-login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
