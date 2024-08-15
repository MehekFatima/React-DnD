import React from 'react';
import DnDFlow from './components/DnDFlow'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DnDFlow />
    </DndProvider>
  );
}

export default App;
