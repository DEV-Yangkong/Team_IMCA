import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './YouTubeList.css';
import 'font-awesome/css/font-awesome.min.css';

const YouTubeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [youtubePosts, setYoutubePosts] = useState([]);

  const postsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/youtube_videos/',
        );
        setYoutubePosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          {/* Rendering the filtered posts */}
          {filteredPosts.map((post) => (
            <div className="post-item" key={post.id}>
              <Link to={`/youtube/${post.id}`} className="post-title-link">
                <img src={post.thumbnail_url} alt={post.title} />
                <div className="post-title">{post.title}</div>
              </Link>
              <div className="post-info">
                <span className="post-date">{post.created_at}</span>
                <span className="post-views">조회수 {post.views}</span>
              </div>
            </div>
          ))}
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
