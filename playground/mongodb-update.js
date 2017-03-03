const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo DB server');
  }
  console.log('Connected to mongo DB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('58b7f822e9764d50be7b2e8c')
  }, {
    $set: {
      text: 'rrrr'
    }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log(result);
  });

  // db.close();
});
