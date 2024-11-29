// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  collection,
  getDocs,
  getDoc,
  where,
  orderBy,
  addDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};*/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addMemberDB = async (chatName) => {
  const memberRef = await addDoc(collection(db, 'members'), {
    name: chatName,
  });
  // Retrieve the document snapshot to access the saved data
  const memberSnapshot = await getDoc(memberRef);

  // Check if the snapshot exists and get data
  const memberData = memberSnapshot.data();
  console.log('Member saved in DB', memberData, 'with id', memberSnapshot.id);

  return {
    id: memberSnapshot.id,
    ...memberData, // Spread the data into the returned object
  };
};

const saveMessageDB = async (chatId, text, timestamp) => {
  const messageRef = await addDoc(collection(db, 'messages'), {
    chatId,
    text,
    timestamp,
  });

  const messageSnapshot = await getDoc(messageRef);
  const messageData = messageSnapshot.data();
  console.log(
    'Message saved in DB',
    messageData,
    'with id',
    messageSnapshot.id,
  );

  return {
    id: messageSnapshot.id,
    ...messageData, // Spread the data into the returned object
  };
};

const getMembersDB = async () => {
  const membersSnapshot = await getDocs(collection(db, 'members'));
  const members = [];
  membersSnapshot.forEach((docSnapshot) => {
    members.push({ id: docSnapshot.id, ...docSnapshot.data() }); // Correct usage of .data()
  });
  return members;
};

const getChatMessagesDB = async (latestMessageTimestamp) => {
  console.log(
    `Getting messages from firestore since ${latestMessageTimestamp}`,
  );
  const messagesRef = collection(db, 'messages');
  let messagesQuery = null;
  if (latestMessageTimestamp === null) {
    console.log('latestMessageTimestamp is null');
    messagesQuery = query(messagesRef, orderBy('timestamp'));
  } else {
    messagesQuery = query(
      messagesRef,
      where('timestamp', '>', latestMessageTimestamp),
      orderBy('timestamp'),
    );
  }

  const messagesSnapshot = await getDocs(messagesQuery);
  const messages = [];
  messagesSnapshot.forEach((docSnapshot) => {
    // convert the chatId reference to a string
    const { chatId, timestamp, text } = docSnapshot.data();
    console.log('Message from firestore', chatId, text, timestamp);
    messages.push({
      id: docSnapshot.id,
      chatId,
      text,
      timestamp,
    }); // Correct usage of .data()
  });
  console.log('Returning messages from firestore', messages);
  return messages; // Return the processed messages array
};

export {
  app,
  db,
  auth,
  addMemberDB,
  getMembersDB,
  getChatMessagesDB,
  saveMessageDB,
};
