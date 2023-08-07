import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage/Main';
import MusicalPage from './pages/ConcertPage/MusicalPage';
import Act from './components/ConcertPage/Act';
import TeamIntroduction from './pages/TeamIntroduction/TeamIntroduction';
import YouTubeList from './pages/YouTubePage/YouTubeList';
import YouTubeDetail from './pages/YouTubePage/YouTubeDetail';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/Mypage/MyPage';

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
            <Route path="/" element={<YouTubeList />} />
            <Route path="/youtube" element={<YouTubeList />} />
            <Route path="/youtube/:postId" element={<YouTubeDetail />} />
            <Route path="/myCalender" element={<myCalender />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
