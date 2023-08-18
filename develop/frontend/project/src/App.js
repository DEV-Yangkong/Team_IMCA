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
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/Mypage/MyPage';
import MyCalendar from './pages/MyCalendarPage/MyCalendar';
import Community from './pages/Community/Community';
import Board from './pages/Community/Board';
import New from './pages/Community/New';
import Editor from './components/CommunityPage/Editor';
import BoardPage from './pages/Community/BoardPage';
import ConcertDetail from './pages/ConcertPage/ConcertDetail';

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
            <Route path="/concert/:id" element={<ConcertDetail />} />

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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/my_calender" element={<MyCalendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/community_all" element={<Community />} />
            <Route path="/:board" element={<BoardPage />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Editor />} />
            <Route path="/board/:id" element={<Board />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
