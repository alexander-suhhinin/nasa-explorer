import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApodGallery from './pages/ApodGallery';
import MarsRover from './pages/MarsRover';
import Layout from './components/Layout';
import './App.css';
import NeoWs from './pages/NeoWs';
import Dashboard from './pages/Dashboard';
import NeoWs3D from './pages/NeoWs3D';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="apod" element={<ApodGallery />} />
          <Route path="mars" element={<MarsRover />} />
          <Route path="neows" element={<NeoWs />} />
          <Route path="3d-neows" element={<NeoWs3D />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
