const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo DB server');
  }
  console.log('Connected to mongo DB server');

  // db.collection('Todos').deleteMany({text: 'Some todo'}).then(result => {
  //   console.log(result);
  //   // console.log(JSON.stringify(result, undefined, 2));
  // });
  //
  // db.collection('Todos').deleteOne({text: 't'}).then(result => {
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndDelete({text: 't'}).then(result => {
    console.log(result);
  });
  // db.close();
});
