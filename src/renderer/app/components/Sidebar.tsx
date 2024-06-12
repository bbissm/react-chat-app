import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { getMembers } from '../utils/db'; // Ensure this is pointing to the correct location of your utility functions
import Settings from './Settings';

interface SidebarProps {
  setActiveChatId: (id: number) => void;
  setView: (view: string) => void;
}

function Sidebar({ setActiveChatId, setView }: SidebarProps) {
    const [members, setMembers] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        async function loadMembers() {
            const loadedMembers = await getMembers();
            console.log(loadedMembers)
            setMembers(loadedMembers);
        }

        loadMembers();
    }, []);

    const handleChatClick = (id: number) => {
        console.log(`Chat with ID ${id} clicked`);
        setActiveChatId(id);
        setView('chat'); // Set view to 'chat' when a chat item is clicked
    };

    return (
        <div className="sidebar">
            {members.map((member) => (
                <div key={member.id} onClick={() => handleChatClick(member.id)}>
                    <ChatItem name={member.name} />
                </div>
            ))}
            <button className={"openSettingsBtn"} onClick={() => setSettingsOpen(true)}>Open Settings</button>
            <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    );
}

export default Sidebar;
