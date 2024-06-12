import React from 'react';

interface ChatItemProps {
  name: string;
}

function ChatItem({ name }: ChatItemProps) {
  return (
    <div className="chat-item">
      <p>{name}</p>
    </div>
  );
}

export default ChatItem;
