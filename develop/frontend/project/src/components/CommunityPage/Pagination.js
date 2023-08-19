import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 20px 0px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: white;
  color: #ececece;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const [data, setData] = useState([]); // API에서 받아온 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  const fetchData = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch(
        `api/v1/community_board/?page=${pageNumber}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      setData(jsonData.results); // API에서 받아온 데이터의 results 필드를 저장
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page); // 페이지가 변경될 때마다 데이터를 가져옴
  }, [page]);

  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              value={1}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
      {/* API에서 받아온 데이터를 활용하여 표시 */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default Pagination;
