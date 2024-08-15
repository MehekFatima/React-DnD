import React, { useState } from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableCardContainer = styled(ResizableBox)`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  cursor: move;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CardText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ShowMoreButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
`;

const Card = ({ data, onResize, onDrag, onDragStop }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowMore = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!data) return null; // Prevent rendering if data is undefined

  return (
    <>
      <ResizableCardContainer
        width={data.width || 200}
        height={data.height || 100}
        minConstraints={[100, 100]}
        maxConstraints={[400, 400]}
        onResizeStop={(e, { size }) => onResize(size.width, size.height)}
        style={{ left: data.position?.x || 0, top: data.position?.y || 0, position: 'absolute' }}
        onMouseDown={(e) => onDrag(e)}
      >
        <CardText>{data.text}</CardText>
        <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
      </ResizableCardContainer>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{data.text}</h2>
            <p>{data.fullText}</p>
            <button onClick={handleCloseModal}>Close</button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Card;
