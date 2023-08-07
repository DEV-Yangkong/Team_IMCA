import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './YouTubeList.css';
import 'font-awesome/css/font-awesome.min.css';

function getPostsForPage(posts, currentPage, postsPerPage) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, posts.length);
  return posts.slice(startIndex, endIndex);
}

const YouTubeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const youtubePosts = [
    {
      id: 1, // 각 포스트에 고유한 ID 추가
      title: '테스트1 2023 진주M2 페스티벌',
      thumbnailUrl: 'https://i.ytimg.com/vi/BYhttUcMkYM/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=BYhttUcMkYM',
      date: '2023-08-05',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 2, // 각 포스트에 고유한 ID 추가
      title: '테스트2 2023 진주M2 페스티벌',
      thumbnailUrl: 'https://i.ytimg.com/vi/BYhttUcMkYM/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=BYhttUcMkYM',
      date: '2023-08-05',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 3,
      title:
        '2023 진주M2 페스티벌 l다이나믹듀오, 김연자, 길구봉구, 트라이비, 케이시, 포마스 l MUSIC & MEDIA',
      thumbnailUrl: 'https://i.ytimg.com/vi/BYhttUcMkYM/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=BYhttUcMkYM',
      date: '2023-08-05',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 4,
      title: '[LIVE] 2023 경포썸머페스티벌 Day 6 경포 K-POP 콘서트 ',
      thumbnailUrl: 'https://i.ytimg.com/vi/XtEhGI6Ka9g/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=XtEhGI6Ka9g',
      date: '2023-08-05',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 5,
      title: '이건 좋았고, 저건 실망스러웠던 ‘서울재즈페스티벌 2023’',
      thumbnailUrl: 'https://i.ytimg.com/vi/CL1SkluCpnQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=CL1SkluCpnQ',
      date: '2023-08-05',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 6,
      title:
        '2023년 EDM 페스티벌의 모든 것! (UMF / EDC / Cream Field Festival )',
      thumbnailUrl: 'https://i.ytimg.com/vi/Tv68IxCjDhY/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Tv68IxCjDhY/',
      date: '2023-08-03',
      views: 128,
      likes: 50,
      comments: 10,
    },
    {
      id: 7,
      title:
        '2023 펜타포트 락페 예습 플리 (토요일) 🤘| 스트록스, 검정치마, 이디오테잎',
      thumbnailUrl: 'https://i.ytimg.com/vi/lKqGJelgm6s/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=lKqGJelgm6s/',
      date: '2023-08-02',
      views: 82,
      likes: 50,
      comments: 10,
    },
    {
      id: 8,
      title:
        '2023 펜타포트 락 페스티벌 라인업 읽어주는 남자🎸 Feat. 스트록스, 엘르가든, 검정치마',
      thumbnailUrl: 'https://i.ytimg.com/vi/f0wrYy-qHgQ/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=f0wrYy-qHgQ/',
      date: '2023-07-28',
      views: 597,
      likes: 50,
      comments: 10,
    },
    {
      id: 9,
      title:
        '올해도 대박난 라인업! 2023 펜타포트 락페스티벌 하이라이트 미리듣기',
      thumbnailUrl: 'https://i.ytimg.com/vi/73Yg3h35-Co/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=73Yg3h35-Co/',
      date: '2023-07-21',
      views: 597,
      likes: 50,
      comments: 10,
    },
    {
      id: 10,
      title: '크리스토퍼(Christopher) - BAD | 서울재즈페스티벌 2023',
      thumbnailUrl: 'https://i.ytimg.com/vi/TlKqiV-cENM/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=TlKqiV-cENM/',
      date: '2023-07-20',
      views: 1200,
      likes: 50,
      comments: 10,
    },
    {
      id: 11,
      title: '본격 음악 페스티벌 리뷰 채널 페벌리버!',
      thumbnailUrl: 'https://i.ytimg.com/vi/zoceIksCY9E/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=zoceIksCY9E/',
      date: '2022-09-01',
      views: 2123,
      likes: 50,
      comments: 10,
    },
    {
      id: 12,
      title:
        '미국여행 온 이유! 코첼라 페스티벌 2022 후기 DAY 2,3 빌리아일리시 투에니원 도자캣 Coachella festival 2022 VLOG💖',
      thumbnailUrl: 'https://i.ytimg.com/vi/7cbFZiS-syo/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=7cbFZiS-syo/',
      date: '2022-08-31',
      views: 78,
      likes: 50,
      comments: 10,
    },
  ];

  // id의 숫자를 기준으로 역순으로 정렬
  youtubePosts.sort((a, b) => b.id - a.id);

  const postsPerPage = 9;

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 130) {
        setScrollButtonVisible(true);
      } else {
        setScrollButtonVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filteredPosts = youtubePosts.filter(
    (post) =>
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPageCount = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="youtube-list">
      <h1>YouTube</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      {searchTerm && (
        <div className="search-result">
          <p>검색 결과: "{searchTerm}"</p>
        </div>
      )}
      {filteredPosts.length === 0 && searchTerm !== '' ? (
        <div className="no-results">검색 결과가 없습니다.</div>
      ) : (
        <div className="post-list">
          {getPostsForPage(filteredPosts, currentPage, postsPerPage).map(
            (post, index) => (
              <div className="post-item" key={post.id}>
                <Link to={`/youtube/${post.id}`} className="post-title-link">
                  <img src={post.thumbnailUrl} alt={post.title} />
                  <div className="post-title">{post.title}</div>
                </Link>
                <div className="post-info">
                  <span className="post-date">{post.date}</span>
                  <span className="post-views">조회수 {post.views}</span>
                </div>
              </div>
            ),
          )}
        </div>
      )}
      {scrollButtonVisible && (
        <button className="top-button" onClick={scrollToTop}>
          TOP
        </button>
      )}
      {totalPageCount > 1 && (
        <div className="page-navigation">
          {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={page === currentPage ? 'active' : ''}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>
      )}
      <div className="write-button-container">
        <Link to="/write" className="write-button">
          UPLOAD
        </Link>
      </div>
    </div>
  );
};

export default YouTubeList;
