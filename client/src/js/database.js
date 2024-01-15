import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const contactDb = await openDB('contact', 1);
  const tx = await contactDb.transaction('contact', 'readwrite');
  const store = await tx.objectStore('contact');
  const request = await store.put(content);

  const result = await request;
  console.log('request.value', result);
  return result;

  // console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB('contact', 1);
  const tx = await contactDb.transaction('contact', 'readonly');
  const store = await tx.objectStore('contact');
  const request = store.getAll();

  const result = await request;
  console.log('request.value', result);
  return result

  // console.error('getDb not implemented');
}

initdb();
