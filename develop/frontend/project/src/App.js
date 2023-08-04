import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage/Main';
import MusicalPage from './pages/ConcertPage/MusicalPage';
import Act from './components/ConcertPage/Act';
import TeamIntroduction from './pages/TeamIntroduction/TeamIntroduction'; // 추가: TeamIntroduction 컴포넌트 import

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div style={{ position: 'relative', zIndex: 1 }} className="test">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/concert_act" element={<Act />} />
            <Route path="/concert_musical" element={<MusicalPage />} />
            <Route path="/team-introduction" element={<TeamIntroduction />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
