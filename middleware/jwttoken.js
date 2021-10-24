const jwt = require("jsonwebtoken");

function createtoken(id, email) {
  const token = jwt.sign({ user_id: id, email: email }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE_HR,
  });
  return token;
}

module.exports = {
  createtoken,
};
