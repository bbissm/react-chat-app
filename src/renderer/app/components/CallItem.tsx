import React from 'react';

interface CallItemProps {
  type: string;
  name: string;
  duration: string;
  date: string;
}
function CallItem({ type, name, duration, date }: CallItemProps) {
  return (
    <div className="call-item">
      <span>{name}</span>
      <span>{type}</span>
      <span>{duration}</span>
      <span>{date}</span>
    </div>
  );
}

export default CallItem;
