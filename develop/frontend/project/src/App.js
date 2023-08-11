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

import Community from './pages/Community/Community';
import Board from './pages/Community/Board';
import New from './pages/Community/New';
import Edit from './pages/Community/Edit';
import BoardPage from './pages/Community/BoardPage';

const App = () => {
  // Community List time
  console.log(new Date().getTime());

  // YouTube 포스트 데이터
  const [youtubePosts, setYoutubePosts] = useState([
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
            <Route path="/" element={<YouTubeList />} />
            <Route path="/youtube" element={<YouTubeList />} />
            <Route
              exact
              path="/"
              render={() => <YouTubeList youtubePosts={youtubePosts} />}
            />
            <Route
              path="/youtube/:postId"
              render={(props) => (
                <YouTubeDetail {...props} youtubePosts={youtubePosts} />
              )}
            />
            <Route path="/write" element={<WritePost />} />
            <Route path="/community_all" element={<Community />} />
            <Route path="/:board" element={<BoardPage />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/board/:id" element={<Board />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
