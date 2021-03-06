const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo DB server');
  }
  console.log('Connected to mongo DB server');

  db.collection('Users').find({
    name: 'Ivan',
  }).toArray().then(docs => {
    console.log('Users:');
    console.log(JSON.stringify(docs, undefined, 2));
    // docs.forEach(doc => console.log(JSON.stringify(doc, undefined, 2)));
  }, err => {
    console.log('Unable to fetch todos:', err);
  });

  db.collection('Users').find().count().then(count => {
    console.log('Users count:', count);
  }, err => {
    console.log('Unable to fetch todos:', err);
  });

  // db.close();
});
