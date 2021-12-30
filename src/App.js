import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Popular from './Popular/Popular';
import Movie from './Movie/Movie';
import Layout from './Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Popular />} />
        <Route path="movies/:id" element={<Movie />} />
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes>
  );
}

export default App;
