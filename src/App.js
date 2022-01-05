import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Popular from './Popular/Popular';
import Movie from './Movie/Movie';
import Layout from './Layout/Layout';
import Favorites from './Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Popular />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="movies/:id" element={<Movie />} />
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes>
  );
}

export default App;
