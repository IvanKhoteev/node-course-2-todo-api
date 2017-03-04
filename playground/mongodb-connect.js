const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo DB server');
  }
  console.log('Connected to mongo DB server');

  // db.collection('Todos').insertOne({
  //   title: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Ivan',
    age: 33,
    location: 'Russia',
  }, (err, result) => {
    if (err) {
      console.log('Unable to insert user', err);
    }
    console.log(result.ops, undefined, 2);
  });

  db.close();
});
