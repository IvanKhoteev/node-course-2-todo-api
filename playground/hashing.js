const sha256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');

const data = {
  id: 4,
};

const token = jwt.sign(data, 'salt');
console.log(token.toString());

jwt.verify(token, 'salt').then(result => console.log(result), (err => console.log(err)));
// const message = 'I am a user number 42';
// const hash = sha256(message).toString();
//
// console.log(hash);

// const data = {
//   id: 4,
// };
//
// const token = {
//   data,
//   hash: sha256(JSON.stringify(data) + 'somesecret').toString(),
// };
//
// token.data.id = 5;
//
// const resultHash = sha256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log(resultHash);
//   console.log(token.hash);
// } else {
//   console.log('Data was changed');
// }
