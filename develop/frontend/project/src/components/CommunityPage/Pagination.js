import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
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

const Pagination = ({ total, limit, page, setPage }) => {
  const navigate = useNavigate();
  const { board } = useParams();
  const numPages = Math.ceil(total / limit);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= numPages) {
      setPage(pageNumber);
      navigate(`/${board}?page=${pageNumber}`);
    }
  };

  const buttonsPerPage = 10;
  const totalPages = Math.ceil(total / limit);

  const startPage =
    Math.floor((page - 1) / buttonsPerPage) * buttonsPerPage + 1;
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);

  return (
    <>
      <Nav>
        <Button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;

          return (
            <Button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              aria-current={page === pageNumber ? 'page' : null}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default Pagination;
