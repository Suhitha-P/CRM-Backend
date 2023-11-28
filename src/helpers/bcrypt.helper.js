const bcrypt = require("bcryptjs");
const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

const comparePassword = (plainPass, passFromDb) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, passFromDb)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
    hashPassword,
    comparePassword,
};
