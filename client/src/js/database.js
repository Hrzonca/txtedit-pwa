import { openDB } from 'idb';

const initdb = async () => {
  console.log('init');
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  })
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log(result.content);
  console.log('saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
//Input??
export const getDb = async () => {
  console.log('GET implemented');
  const jateDb = await openDB('jate', 1);
  console.log('opened db successfully');
  const text = jateDb.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('get from database', result.value);
  return result.value;
};

initdb();
