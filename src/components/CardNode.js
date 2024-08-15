import React, { useState, useRef, useEffect } from 'react';
import { Handle } from 'reactflow';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './cardNode.css';

const CardNode = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const cardNodeRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (isModalOpen && wrapperRef.current) {
            const cardNodeRect = wrapperRef.current.getBoundingClientRect();
            setModalPosition({
                top: cardNodeRect.top - 400, // Adjust as needed to place the modal above
                left: cardNodeRect.left + cardNodeRect.width + 10, // Position to the right of the card
            });
        }
    }, [isModalOpen]);

    const handleShowMoreClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div ref={wrapperRef} className="card-node-container">
            <ResizableBox
                width={200}
                height={100}
                minConstraints={[100, 50]}
                maxConstraints={[400, 200]}
                className="card-node"
                resizeHandles={['se']}
            >
                <div className="card-content" ref={cardNodeRef}>
                    {data.label}
                </div>
                <button onClick={handleShowMoreClick} className="show-more-button">Show More</button>
                <Handle type="target" position="left" />
                <Handle type="source" position="right" />
            </ResizableBox>

            {isModalOpen && (
                <div
                    className="modal"
                    style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
                >
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{data.label}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardNode;
