import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './App.css';

function App() {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [view, setView] = useState<string>('calls'); // Manage both chat ID and view at the top level

  return (
    <div className="app-container">
      <Sidebar setActiveChatId={setActiveChatId} setView={setView} />
      <MainContent activeChatId={activeChatId} view={view} setView={setView} />
    </div>
  );
}

export default App;
