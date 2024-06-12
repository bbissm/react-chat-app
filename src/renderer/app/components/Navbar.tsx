import React from 'react';
import Tab from './Tab';

interface NavbarProps {
  setView: (view: string) => void;
}

function Navbar({ setView }: NavbarProps) {
  const tabs = ['All Calls', 'Outgoing', 'Missed', 'Incoming', 'Voicemail'];

  return (
    <div className="navbar">
      {tabs.map(tab => (
        <Tab key={tab} label={tab} onClick={() => setView(tab.toLowerCase())} />
      ))}
    </div>
  );
}

export default Navbar;
