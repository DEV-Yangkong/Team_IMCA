import { useNavigate, useParams } from 'react-router-dom';
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
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
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

  return (
    <>
      <Nav>
        <Button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => {
            const pageNumber = i + 1;

            if (pageNumber >= 10 && Math.abs(pageNumber - page) >= 10) {
              return null;
            }

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
