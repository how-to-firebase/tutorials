'use strict';
const admin = require('firebase-admin');
const config = require('./config.json');
const quiverFunctions = require('quiver-functions');
const Login = quiverFunctions.Login;
const OnCreate = quiverFunctions.OnCreate;
const mocks = quiverFunctions.mocks;
const _ = require('lodash');

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
  databaseURL: config.firebase.databaseURL
});

const database = admin.database();
const rootRef = database.ref('quiver-functions/test');

const mockUser = {
  uid: 'fake-uid',
  email: 'chris@chrisesplin.com',
  password: '123456',
  displayName: 'Chris Esplin',
  photoURL: 'https://lh4.googleusercontent.com/-ly98tZeA6F0/AAAAAAAAAAI/AAAAAAAAADk/G-1n2ID9bOw/photo.jpg?sz=64',
  disabled: false,
  emailVerified: false
};

function cleanUp(done) {
  return rootRef.remove().then(done);
};

beforeEach(done => cleanUp(done));
afterAll(done => cleanUp(done));

describe('Login', () => {
  let fakeUser, userRef, loginEvent, loginFunction;
  beforeEach(() => {
    const login = new Login({
      usersPath: '/quiver-functions/test/users',
      adminUsers: ['chris@chrisesplin.com']
    });
    const loginQueueRef = rootRef.child('/queues/login');

    fakeUser = _.cloneDeep(mockUser);
    userRef = rootRef.child('users').child(fakeUser.uid);
    loginEvent = new mocks.MockDBEvent(loginQueueRef, { uid: fakeUser.uid }, fakeUser);
    loginFunction = login.getFunction();
  });

  it('should process a user login queue item', done => {
    loginFunction(loginEvent).then(() => userRef.once('value')).then(snap => {
      const user = snap.val();

      expect(snap.key).toEqual(fakeUser.uid);
      done();
    });
  });
});

describe('onCreate', () => {
  let fakeUser, userRef, onCreateEvent, onCreateFunction;
  beforeEach(() => {
    const onCreate = new OnCreate({
      usersPath: '/quiver-functions/test/users',
      database: database
    });
    
    fakeUser = _.cloneDeep(mockUser);
    userRef = rootRef.child('users').child(fakeUser.uid);
    onCreateEvent = new mocks.MockAuthEvent(fakeUser);
    onCreateFunction = onCreate.getFunction();
  });

  it('should process auth onCreate', done => {

    onCreateFunction(onCreateEvent).then(() => userRef.once('value')).then(snap => {
      const user = snap.val();

      expect(user.uid).toEqual(fakeUser.uid);
      done();
    });
  });
});
