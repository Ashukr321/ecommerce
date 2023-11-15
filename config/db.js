const mongoose = require("mongoose");
const colors  =  require('colors');

const ConnectDb = async () => {
 await mongoose
    .connect(process.env.DB_URI + "/ecomdb")
    .then(() => {
      console.log(
        `${colors.green("Database connected successfully")}`.underline
      );
    })
    .catch(() => {
      console.log(`${colors.red("Error connecting to the database")}`);
    });
};

module.exports = ConnectDb