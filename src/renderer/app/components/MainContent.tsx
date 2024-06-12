import React from 'react';
import CallItem from './CallItem';
import Chat from './Chat';
import Navbar from './Navbar';

interface MainContentProps {
  activeChatId: number | null;
  view: string;
  setView: (view: string) => void;
}

function MainContent({ activeChatId, view, setView }: MainContentProps) {
  const calls = [
    {
      id: 1,
      type: 'Outgoing',
      name: 'Béla Kolatoy',
      duration: '1m 27s',
      date: 'Today 12:16',
    },
    // More calls can be added here
  ];

  return (
    <div className="main-content">
      <Navbar setView={setView} />
      {view === 'chat' && activeChatId ? (
        <Chat key={activeChatId} chatId={activeChatId} />
      ) : (
        calls.map((call) => (
          <CallItem
            key={call.id}
            type={call.type}
            name={call.name}
            duration={call.duration}
            date={call.date}
          />
        ))
      )}
    </div>
  );
}

export default MainContent;
