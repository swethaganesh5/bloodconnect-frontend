import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import RequestBlood from './pages/RequestBlood';
import Leaderboard from './pages/Leaderboard';
import Guide from './pages/Guide';
import PreSurgery from './pages/PreSurgery';
import About from './pages/About';
import 'leaflet/dist/leaflet.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C62828',
      light: '#FF5F52',
      dark: '#8E0000',
    },
    secondary: {
      main: '#FFEBEE',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<RequestBlood />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/presurgery" element={<PreSurgery />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;