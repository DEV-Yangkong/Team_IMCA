import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './TodoModal.module.css';
import { useState } from 'react';

const TodoModal = () => {
  // 모달
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 상태를 관리하기 위한 훅
  const [modalTodo, setModalTodo] = useState(''); // 모달 내에서 입력받을 값
  const [todo, setTodo] = useState('');
  const [todoItem, setTodoItem] = useState([]);
  const addTodo = () => {
    setTodoItem([...todoItem, todo]);
  };
  const openModal = () => {
    onOpen(); // 모달 열기
  };

  const closeModal = () => {
    setModalTodo(''); // 모달이 닫힐 때 입력값 초기화
    onClose(); // 모달 닫기
  };

  const handleModalInputChange = (e) => {
    setModalTodo(e.target.value);
  };

  const handleModalSubmit = () => {
    // 모달 내 입력값 처리 로직 추가
    addTodo();
    closeModal(); // 모달 닫기
  };
  return (
    /* 모달 열기 버튼 */
    <div>
      <Button onClick={openModal}>모달 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        overlayClassName={styles.modalOverlay}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>할 일 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="할 일을 입력하세요"
              value={modalTodo}
              onChange={handleModalInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalSubmit}>
              추가
            </Button>
            <Button onClick={closeModal}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TodoModal;
