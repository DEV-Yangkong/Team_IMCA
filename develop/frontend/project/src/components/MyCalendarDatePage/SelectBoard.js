import { useState } from 'react';
import SelectedMemoDate from './SeletedMemoDate';

const SelectBoard = (props, detailData) => {
  const [memo, setMemo] = useState('');
  const [memoList, setMemoList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // const filteredSelectedItems = selectedDate.filter(
  //   (item) => item.date === selectedDate,
  // );
  //   const handleMemo = () => {
  //     if (memo.trim() !== '') {
  //       setMemoList([...memoList, memo]);
  //       setMemo('');
  //     }
  //   };
  //   const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };
  //   const filteredSelectDates = selectedDate.filter(
  // (item) => item.start_date === selectedDate,
  //   );

  return (
    <div>
      {/* {filteredSelectDates.map((item) => ( */}
      <SelectedMemoDate
        key={SelectedMemoDate.id}
        {...SelectedMemoDate}
        detailData={detailData}
      />
      {/* ))} */}
    </div>
  );
};
export default SelectBoard;
