import React, { useState, useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './cardNode.css';
import CardNode from './CardNode';

const initialNodes = [];
const initialEdges = [];
let id = 0;
const getId = () => `dndnode_${id++}`;

// Define nodeTypes outside of the component
const nodeTypes = {
    cardNode: CardNode,
};

const DnDFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [cardText, setCardText] = useState('');

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleAddCard = () => {
        const newNode = {
            id: getId(),
            type: 'cardNode',
            position: { x: 250, y: 5 },
            data: { label: cardText },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div style={{ height: '100vh' }}>
            <div className="form-container">
                <input
                    type="text"
                    value={cardText}
                    onChange={(e) => setCardText(e.target.value)}
                    placeholder="Enter card text"
                    className="input-field"
                />
                <button onClick={handleAddCard} className="add-card-button">Add Card</button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes} // Use the defined nodeTypes here
                fitView
                attributionPosition="bottom-right"
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default DnDFlow;
