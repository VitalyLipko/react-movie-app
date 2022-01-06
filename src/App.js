import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import { Favorites, Movie, Popular } from './Pages';

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
