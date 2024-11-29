import React, { useState } from 'react';

function Settings({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-content">
        <h2>Settings</h2>
        <button onClick={onClose}>Close</button>
        {/* Add your settings fields here */}
        <div>
          <label>
            Some Setting:
            <input type="checkbox" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
