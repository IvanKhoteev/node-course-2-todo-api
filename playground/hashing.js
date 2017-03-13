const sha256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'password';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//     bcrypt.compare(password, '$2a$10$PqtfJxEHxwUfQ6lRgy09mOH7Q4Fj5h2hdr3UGv.G0GiwSN1LskoYC', (err, res) => {
//       console.log(res);
//     });
//   });
// });
//
// // const data = {
//   id: 4,
// };
//
// const token = jwt.sign(data, 'salt');
// console.log(token.toString());
//
// jwt.verify(token, 'salt').then(result => console.log(result), (err => console.log(err)));
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
