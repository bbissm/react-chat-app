// utils/db.js
import { openDB } from 'idb';
import {
  addMemberDB,
  saveMessageDB,
  getChatMessagesDB,
  getMembersDB,
} from './firebase';

const DATABASE_NAME = 'chatApp';
const DATABASE_VERSION = 1;
const STORE_MESSAGES = 'messages';
const STORE_MEMBERS = 'members';

async function initDB() {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_MEMBERS)) {
        db.createObjectStore(STORE_MEMBERS, {
          keyPath: 'id',
        });
      }
      if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
        db.createObjectStore(STORE_MESSAGES, {
          keyPath: 'id',
        });
      }
    },
  });

  console.log('Initialized DB');
  // Synchronize IndexedDB with Firestore on startup
  await syncFirestoreToLocal(db);
  return db;
}

const syncFirestoreToLocal = async (db) => {
  const latestMessageTimestamp = localStorage.getItem('latestMessageTimestamp');
  const tx = db.transaction([STORE_MEMBERS, STORE_MESSAGES], 'readwrite');
  const memberStore = tx.objectStore(STORE_MEMBERS);
  const messageStore = tx.objectStore(STORE_MESSAGES);

  // Sync members
  /* const dbMembers = await getMembersDB();
   if (dbMembers.length > 0) {
    console.log(`Retrieving ${dbMembers} members`);
    dbMembers.forEach((member) => {
      console.log('Member from firebase', member);
      // doc is an object with id and name
      memberStore.add(member);
    });
  } */

  // Sync messages
  /* const dbMessages = await getChatMessagesDB(latestMessageTimestamp);
  if (dbMessages.length > 0) {
    console.log(`Retrieving ${dbMessages.length} new messages`);
    dbMessages.forEach((message) => {
      console.log('Message from firebase', message);
      // doc is an object with id, chatId, text, and timestamp
      messageStore.add({
        id: message.id,
        chatId: message.chatId,
        text: message.text,
        timestamp: message.timestamp,
      });
    });
    const latestTimestamp = dbMessages[0].timestamp;
    localStorage.setItem('latestMessageTimestamp', latestTimestamp);
  } */

  await tx.done;
};

export async function getMembers() {
  const db = await initDB();
  const tx = db.transaction(STORE_MEMBERS, 'readonly');
  const store = tx.objectStore(STORE_MEMBERS);
  const members = await store.getAll();

  await tx.complete;
  return members;
}

export async function addMember(name) {
  const member = await addMemberDB(name);

  const db = await initDB();
  const tx = db.transaction(STORE_MEMBERS, 'readwrite');
  const store = tx.objectStore(STORE_MEMBERS);
  await store.add(member);
  await tx.complete;
}

export async function addMessage(chatId, text) {
  const message = await saveMessageDB(chatId, text, new Date());
  const db = await initDB();
  const tx = db.transaction(STORE_MESSAGES, 'readwrite');
  const store = tx.objectStore(STORE_MESSAGES);
  await store.add(message);
  localStorage.setItem('latestMessageTimestamp', message.timestamp);
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
    .sort((a, b) => a.timestamp - b.timestamp);
}
