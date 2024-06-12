import React, { useEffect, useState } from 'react';
import { getMembers, getMessages, addMessage } from '../utils/db';

function Chat({ chatId }) {
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [chatMemberName, setChatMemberName] = useState('');  // State to store the chat member's name

    useEffect(() => {
        async function loadInitialData() {
            const loadedMembers = await getMembers();
            setMembers(loadedMembers);

            // Find the member by chatId and set the name
            const member = loadedMembers.find(member => member.id === chatId);
            setChatMemberName(member ? member.name : 'Unknown Member');

            const msgs = await getMessages(chatId);
            setMessages(msgs);
        }

        loadInitialData();
    }, [chatId]);

    const sendMessage = async () => {
        if (inputText.trim() !== '') {
            await addMessage(chatId, inputText);
            setInputText('');
            setMessages(await getMessages(chatId)); // Reload messages
        }
    };

    return (
        <div className="chat">
            <div className="chat-header">
                <h3>{chatMemberName}</h3>  {/* Display the name of the chat member */}
            </div>
            <div className="messages">
                {messages.map((msg, index) => <p key={index}>{msg.text}</p>)}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
