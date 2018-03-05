const admin = require('firebase-admin');
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://how-to-firebase-tutorials.firebaseio.com',
});

const people = require('../data/people.json');

const records = people.map(({ name, height, hair_color, url, mass, eye_color, gender }) => {
  const urlParts = url.split('/');
  let id = String(urlParts[urlParts.length - 2]);
  let charactersToPad = 3 - id.length;
  while (charactersToPad--) {
    id = '0' + id;
  }

  return {
    id,
    name,
    height: +height,
    hair_color,
    mass: +mass,
    eye_color,
    gender,
  };
});

const db = admin.firestore();
const collection = db
  .collection('public')
  .doc('cloud-firestore')
  .collection('star-wars-people');
const batch = db.batch();

records.forEach(({ id, name, height, hair_color, mass, eye_color, gender }) => {
  batch.set(collection.doc(id), { name, height, hair_color, mass, eye_color, gender });
});

batch.commit().then(() => {
  console.log('people records saved');
});
