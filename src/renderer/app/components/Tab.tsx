import React from 'react';

interface TabProps {
  label: string;
  onClick: () => void;
}
function Tab({ label, onClick }: TabProps) {
  return (
    <button className="tab" type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Tab;
