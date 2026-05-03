import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config.js';

const tasksCollection = collection(db, 'tasks');

export async function addTask(title) {
  const docRef = await addDoc(tasksCollection, {
    title,
    completed: false,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export async function fetchTasks() {
  const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}
