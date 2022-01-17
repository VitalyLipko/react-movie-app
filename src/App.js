import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components';
import { Favorites, Movie, Popular } from './pages';

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
