import Category from '../../components/CommunityPage/Category';
import styles from './BoardPage.module.css';
import Pages from '../../components/CommunityPage/Pages';
import Header from '../../components/CommunityPage/Header';

export const dataList = [
  {
    id: 1,
    img: 'https://i.pinimg.com/474x/12/10/74/121074634270ef317603a02120b1f2a9.jpg',
    title: '1번째 제목',
    content: '온라인 코딩테스트1',
    date: '2023-08-01',
    views: 10,
    like_num: 1,
    reviews: 10,
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/474x/12/10/74/121074634270ef317603a02120b1f2a9.jpg',
    title: '2번째 제목',
    content: '온라인 코딩테스트2',
    date: '2023-08-02',
    views: 20,
    like_num: 2,
    reviews: 20,
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/474x/12/10/74/121074634270ef317603a02120b1f2a9.jpg',
    title: '3번째 제목',
    content: '온라인 코딩테스트3',
    date: '2023-08-03',
    views: 30,
    like_num: 3,
    reviews: 30,
  },
  {
    id: 4,
    img: 'https://i.pinimg.com/474x/12/10/74/121074634270ef317603a02120b1f2a9.jpg',
    title: '4번째 제목',
    content: '온라인 코딩테스트4',
    date: '2023-08-04',
    views: 40,
    like_num: 4,
    reviews: 40,
  },
];

const BoardPage = () => {
  return (
    <div className={styles.BoardPage}>
      <Category />
      <Header />
      <Pages />
    </div>
  );
};

export default BoardPage;
