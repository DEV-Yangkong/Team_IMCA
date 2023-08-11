import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage/Main';
import MusicalPage from './pages/ConcertPage/MusicalPage';
import Act from './components/ConcertPage/Act';
import TeamIntroduction from './pages/TeamIntroduction/TeamIntroduction';
import YouTubeList from './pages/YouTubePage/YouTubeList';
import YouTubeDetail from './pages/YouTubePage/YouTubeDetail';
import WritePost from './pages/YouTubePage/WritePost';
import React, { useState } from 'react';
// 민정 추가 파일👇🏻 오류해결필요
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/Mypage/MyPage';

const App = () => {
  // YouTube 포스트 데이터
  const [youtubePosts] = useState([
    // 포스트 정보들...
  ]);

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
            <Route
              path="/youtube"
              element={<YouTubeList youtubePosts={youtubePosts} />}
            />
            <Route path="/write" element={<WritePost />} />
            <Route
              path="/youtube/:postId"
              element={<YouTubeDetail youtubePosts={youtubePosts} />}
            />
            {/* 민정 추가 파일👇🏻 오류해결필요 */}
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
