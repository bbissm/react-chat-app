import { useState } from 'react';

export default function Dialog({ isOpen, onClose, onConfirm, action }) {
  if (!isOpen) return null;
  const [chatName, setChatName] = useState('');

  const renderContent = (action: string) => {
    switch (action) {
      case 'addNewChat':
        return (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>Create New Chat</h2>
              <div>
                <label>
                  Chat Name:
                  <input
                    type="text"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                  />
                </label>
              </div>
              <button onClick={() => onConfirm(chatName)}>Create</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>Dialog</h2>
              {/* Add your dialog content here */}
              <div>
                <label>
                  Dialog Content:
                  <input type="text" />
                </label>
              </div>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Dialog</h2>
        {/* Add your dialog content here */}
        <div>
          <label>
            Dialog Content:
            {renderContent(action)}
          </label>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
