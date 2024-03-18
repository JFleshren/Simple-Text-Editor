import { openDB } from 'idb';

const initdb = async () => {
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => {
  try {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
} catch (error) {
  console.error('Error storing content in IndexedDB:', error);
  throw error;
}
};

export const getDb = async () => {
  try {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  return store.getAll();
} catch (error) {
  console.error('Error retrieving content from IndexedDB:', error);
  throw error;
}
};

initdb();
export default { putDb, getDb };
  