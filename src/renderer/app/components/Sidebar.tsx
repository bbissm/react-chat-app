import React, { useEffect, useState } from 'react';
import { AddCircleFilled, ButtonRegular } from '@fluentui/react-icons';
import {
  Button,
  CounterBadge,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import ChatItem from './ChatItem';
import { getMembers, addMember } from '../utils/db'; // Ensure this is pointing to the correct location of your utility functions
import Settings from './Settings';
import Dialog from './Dialog';

interface SidebarProps {
  setActiveChatId: (id: number) => void;
  setView: (view: string) => void;
}

function Sidebar({ setActiveChatId, setView }: SidebarProps) {
  const [members, setMembers] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function loadMembers() {
      const loadedMembers = await getMembers();
      console.log(loadedMembers);
      setMembers(loadedMembers);
    }

    loadMembers();
  }, []);

  const handleChatClick = (id: number) => {
    console.log(`Chat with ID ${id} clicked`);
    setActiveChatId(id);
    setView('chat'); // Set view to 'chat' when a chat item is clicked
  };

  const addChat = async (chatName) => {
    console.log('Add chat clicked', chatName);
    if (!chatName) return;
    await addMember(chatName);

    const loadedMembers = await getMembers();
    console.log("Loaded members", loadedMembers);
    setMembers(loadedMembers);
  };

  return (
    <div className="sidebar">
      <Button icon={<AddCircleFilled />} onClick={() => setDialogOpen(true)}>
        Start chat
      </Button>
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={addChat}
        action="addNewChat"
      />
      {members.map((member) => (
        <div key={member.id} onClick={() => handleChatClick(member.id)}>
          <ChatItem name={member.name} />
        </div>
      ))}
      <button className="openSettingsBtn" onClick={() => setSettingsOpen(true)}>
        Open Settings
      </button>
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default Sidebar;
