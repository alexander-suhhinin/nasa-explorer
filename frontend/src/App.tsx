import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ApodGallery from './pages/ApodGallery';
import MarsRover from './pages/MarsRover';
import Layout from './components/Layout';
import './App.css';
import NeoWs from './pages/NeoWs';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="apod" element={<ApodGallery />} />
          <Route path="mars" element={<MarsRover />} />
          <Route path="neows" element={<NeoWs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
