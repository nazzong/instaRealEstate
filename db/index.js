const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connect = () => {
  if (process.env.NODE_ENV !== `production`) {
    mongoose.set(`debug`, true);
  }

  const HOST =
    process.env.NODE_ENV === `development`
      ? process.env.DB_HOST
      : process.env.DB_DEPLOY_HOST;

  mongoose.connect(
    `mongodb://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${HOST}:${process.env.DB_PORT}/${process.env.DB_USER}`,
    {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.error(`❌ Failed To Connect MongoDB`);
      } else {
        console.log(`🍀 Success To Connect MongoDB`);
      }
    }
  );
};

mongoose.connection.on(`error`, (error) => {
  console.error(`❌ Failed To Connect MongoDB`);
});

mongoose.connection.on(`disconnected`, () => {
  console.log(`📌 Hapen Disconnected! Try Re Connect`);

  setTimeout(() => {
    connect();
  }, 3000);
});

module.exports = connect;
