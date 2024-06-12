// utils/db.js
import { openDB } from 'idb';

const DATABASE_NAME = 'chatApp';
const DATABASE_VERSION = 1;
const STORE_MESSAGES = 'messages';
const STORE_MEMBERS = 'members';

// Default members
const defaultMembers = [
  { id: 1, name: 'Tharsan Ravitharan' },
  { id: 2, name: 'David Reich' },
  { id: 3, name: 'Maria Anders' },
  { id: 4, name: 'Ana Trujillo' },
];

async function initDB() {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_MEMBERS)) {
                db.createObjectStore(STORE_MEMBERS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
                db.createObjectStore(STORE_MESSAGES, { keyPath: 'id', autoIncrement: true });
            }
        },
    });

    // Check and populate default members
    const tx = db.transaction(STORE_MEMBERS, 'readwrite');
    const store = tx.objectStore(STORE_MEMBERS);
    const count = await store.count();
    if (count === 0) {
        defaultMembers.forEach(member => {
            store.add(member);
        });
    }
    await tx.done;

    return db;
}

export async function getMembers() {
console.log('getMembers');
  const db = await initDB();
  console.log('db', db);
  const tx = db.transaction(STORE_MEMBERS, 'readonly');
  const store = tx.objectStore(STORE_MEMBERS);
  console.log('store', store);
  const members = await store.getAll();
  console.log('members', members);
  await tx.complete;
  return members;
}

export async function addMessage(chatId, text) {
  const db = await initDB();
  const tx = db.transaction(STORE_MESSAGES, 'readwrite');
  const store = tx.objectStore(STORE_MESSAGES);
  const message = { chatId, text, timestamp: new Date() };
  await store.add(message);
  await tx.complete;
}

export async function getMessages(chatId) {
  const db = await initDB();
  const tx = db.transaction(STORE_MESSAGES, 'readonly');
  const store = tx.objectStore(STORE_MESSAGES);
  const messages = await store.getAll();
  await tx.complete;
  return messages
    .filter((msg) => msg.chatId === chatId)
    .sort((a, b) => b.timestamp - a.timestamp);
}
