import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Main from './pages/MainPage/Main';
import MusicalPage from './pages/ConcertPage/MusicalPage';

import TeamIntroduction from './pages/TeamIntroduction/TeamIntroduction';
import YouTubeList from './pages/YouTubePage/YouTubeList';
import YouTubeDetail from './pages/YouTubePage/YouTubeDetail';
import WritePost from './pages/YouTubePage/WritePost';
import React, { useState } from 'react';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/Mypage/MyPage';
import MyCalendar from './pages/MyCalendarPage/MyCalendar';

import Board from './pages/Community/Board';
import Editor from './components/CommunityPage/Editor';
import BoardPage from './pages/Community/BoardPage';
import ConcertDetail from './pages/ConcertPage/ConcertDetail';
import Comment from './components/CommunityPage/Comment';
import { CookiesProvider, useCookies } from 'react-cookie';
import Footer from './components/Footer/Footer';
import { ChakraProvider } from '@chakra-ui/react';

import { IsSearchedProvider } from './components/ConcertPage/IsSearchedContext';
import Modify from './pages/Community/Modify';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리
  // const [cookie, getCookie] = useCookies(['access_token', 'refresh_token']);

  // YouTube 포스트 데이터
  const [youtubePosts] = useState([
    // 포스트 정보들...
  ]);
  // const [key, setKey] = useState(0);
  // const handleLogout = () => {
  //   setKey((preKey) => preKey + 1);
  // };

  return (
    <AuthProvider>
      <BrowserRouter>
        <CookiesProvider>
          <ChakraProvider>
            <IsSearchedProvider>
              <div className="App">
                <Header />
                <div
                  style={{ position: 'relative', zIndex: 1 }}
                  className="test"
                >
                  <Routes>
                    <Route path="/" element={<Main />} />

                    <Route path="/concert_all" element={<MusicalPage />} />
                    <Route path="/concert/:id" element={<ConcertDetail />} />

                    <Route
                      path="/team-introduction"
                      element={<TeamIntroduction />}
                    />
                    <Route
                      path="/youtube"
                      element={<YouTubeList youtubePosts={youtubePosts} />}
                    />
                    <Route path="/write" element={<WritePost />} />
                    <Route
                      path="/youtube/:id"
                      element={<YouTubeDetail youtubePosts={youtubePosts} />}
                    />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/my_calender" element={<MyCalendar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/:category" element={<BoardPage />} />
                    <Route path="/:category/detail/:id" element={<Board />} />
                    <Route path="/edit/:category" element={<Editor />} />
                    <Route path="/:category/modify/:id" element={<Modify />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </IsSearchedProvider>
          </ChakraProvider>
        </CookiesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
