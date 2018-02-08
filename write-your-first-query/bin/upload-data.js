const admin = require('firebase-admin');
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://how-to-firebase-tutorials.firebaseio.com',
});

const people = require('../data/people.json');

const records = people.map(({ name, height, hair_color, url }) => {
  const urlParts = url.split('/');
  let id = String(urlParts[urlParts.length - 2]);
  let charactersToPad = 3 - id.length;
  while (charactersToPad--) {
    id = '0' + id;
  }

  return {
    id,
    name,
    height,
    hair_color,
  };
});

const db = admin.firestore();
const collection = db
  .collection('public')
  .doc('write-your-first-query')
  .collection('star-wars-people');
const batch = db.batch();

records.forEach(({ id, name, height, hair_color }) => {
  batch.set(collection.doc(id), { name, height, hair_color });
});

batch.commit().then(() => {
  console.log('people records saved');
});
