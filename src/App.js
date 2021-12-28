import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Popular from './Popular/Popular';
import Movie from './Movie/Movie';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Popular />} />
        <Route path="movies/:id" element={<Movie />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
