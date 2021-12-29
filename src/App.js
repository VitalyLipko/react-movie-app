import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Popular from './Popular/Popular';
import Movie from './Movie/Movie';
import Layout from './Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Popular />} />
          <Route path="movies/:id" element={<Movie />} />
          <Route path="*" element={<Navigate to="" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
