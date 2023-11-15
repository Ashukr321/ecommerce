const bcrypt = require("bcrypt");

// this fuction is used while we  regerstring
const hashPassword = async password => {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

// this function is use while we login
const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = { comparePassword, hashPassword };
