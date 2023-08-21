import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AdminPage.module.css';
import { useParams } from 'react-router-dom';

const AdminPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams(); // 실제 API의 ID로 대체해야 합니다.

  useEffect(() => {
    axios
      .get(
        `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/report/${id}/`,
      )
      .then((response) => {
        setData(response.data);
      });
  }, [id]);

  return (
    <div className={styles.AdminPage}>
      <h1>관리자 페이지</h1>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            예: <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
