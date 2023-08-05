import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './YouTubeList.css';
import 'font-awesome/css/font-awesome.min.css'; // font-awesome 스타일시트 임포트

function getPostsForPage(posts, currentPage, postsPerPage) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return posts.slice(startIndex, endIndex);
}

const YouTubeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const youtubePosts = [
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/BYhttUcMkYM/maxresdefault.jpg',
      title:
        '2023 진주M2 페스티벌 l다이나믹듀오, 김연자, 길구봉구, 트라이비, 케이시, 포마스 l MUSIC & MEDIA',
      date: '2023-08-05',
      views: '128',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/XtEhGI6Ka9g/maxresdefault.jpg',
      title: '[LIVE] 2023 경포썸머페스티벌 Day 6 경포 K-POP 콘서트 ',
      date: '2023-08-05',
      views: '1000',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/CL1SkluCpnQ/maxresdefault.jpg',
      title: '이건 좋았고, 저건 실망스러웠던 ‘서울재즈페스티벌 2023’',
      date: '2023-08-05',
      views: '34',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/Tv68IxCjDhY/maxresdefault.jpg',
      title:
        '2023년 EDM 페스티벌의 모든 것! (UMF / EDC / Cream Field Festival )',
      date: '2023-08-03',
      views: '100',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/lKqGJelgm6s/maxresdefault.jpg',
      title:
        '2023 펜타포트 락페 예습 플리 (토요일) 🤘| 스트록스, 검정치마, 이디오테잎',
      date: '2023-08-02',
      views: '82',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/mJ6zmMOUaU8/maxresdefault.jpg',
      title: '엘르가든(Ellegarden) FULL VER. @ 2023 인천펜타포트락페스티벌',
      date: '2023-08-01',
      views: '50',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/NmioE2aapRM/maxresdefault.jpg',
      title: '2023 펜타포트 락 페스티벌 Day 1 - Ellegarden(엘르가든)',
      date: '2023-07-29',
      views: '78',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/f0wrYy-qHgQ/maxresdefault.jpg',
      title:
        '2023 펜타포트 락 페스티벌 라인업 읽어주는 남자🎸 Feat. 스트록스, 엘르가든, 검정치마',
      date: '2023-07-28',
      views: '597',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/73Yg3h35-Co/maxresdefault.jpg',
      title:
        '올해도 대박난 라인업! 2023 펜타포트 락페스티벌 하이라이트 미리듣기',
      date: '2023-07-21',
      views: '720',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/TlKqiV-cENM/maxresdefault.jpg',
      title: '크리스토퍼(Christopher) - BAD | 서울재즈페스티벌 2023',
      date: '2023-07-20',
      views: '1200',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/BYhttUcMkYM/maxresdefault.jpg',
      title:
        '2023 진주M2 페스티벌 l다이나믹듀오, 김연자, 길구봉구, 트라이비, 케이시, 포마스 l MUSIC & MEDIA',
      date: '2023-08-05',
      views: '128',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/XtEhGI6Ka9g/maxresdefault.jpg',
      title: '[LIVE] 2023 경포썸머페스티벌 Day 6 경포 K-POP 콘서트 ',
      date: '2023-08-05',
      views: '1000',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/CL1SkluCpnQ/maxresdefault.jpg',
      title: '이건 좋았고, 저건 실망스러웠던 ‘서울재즈페스티벌 2023’',
      date: '2023-08-05',
      views: '34',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/Tv68IxCjDhY/maxresdefault.jpg',
      title:
        '2023년 EDM 페스티벌의 모든 것! (UMF / EDC / Cream Field Festival )',
      date: '2023-08-03',
      views: '100',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/lKqGJelgm6s/maxresdefault.jpg',
      title:
        '2023 펜타포트 락페 예습 플리 (토요일) 🤘| 스트록스, 검정치마, 이디오테잎',
      date: '2023-08-02',
      views: '82',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/mJ6zmMOUaU8/maxresdefault.jpg',
      title: '엘르가든(Ellegarden) FULL VER. @ 2023 인천펜타포트락페스티벌',
      date: '2023-08-01',
      views: '50',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/NmioE2aapRM/maxresdefault.jpg',
      title: '2023 펜타포트 락 페스티벌 Day 1 - Ellegarden(엘르가든)',
      date: '2023-07-29',
      views: '78',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/f0wrYy-qHgQ/maxresdefault.jpg',
      title:
        '2023 펜타포트 락 페스티벌 라인업 읽어주는 남자🎸 Feat. 스트록스, 엘르가든, 검정치마',
      date: '2023-07-28',
      views: '597',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/73Yg3h35-Co/maxresdefault.jpg',
      title:
        '올해도 대박난 라인업! 2023 펜타포트 락페스티벌 하이라이트 미리듣기',
      date: '2023-07-21',
      views: '720',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/TlKqiV-cENM/maxresdefault.jpg',
      title: '크리스토퍼(Christopher) - BAD | 서울재즈페스티벌 2023',
      date: '2023-07-20',
      views: '1200',
    },
  ];

  const postsPerPage = 9; // 페이지당 포스트 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPageCount = Math.ceil(youtubePosts.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentPosts = getPostsForPage(youtubePosts, currentPage, postsPerPage);

  return (
    <div className="youtube-list">
      <h1>YouTube Contents</h1>
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
      <div className="post-list">
        {currentPosts
          .filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((post, index) => (
            <div className="post-item" key={index}>
              <Link to={`/youtube/${index}`} className="post-title-link">
                <img src={post.thumbnailUrl} alt={post.title} />
                <div className="post-title">{post.title}</div>
              </Link>
              <div className="post-info">
                <span className="post-date">{post.date}</span>
                <span className="post-views">조회수 {post.views}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="page-navigation">
        {Array.from({ length: totalPageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YouTubeList;
