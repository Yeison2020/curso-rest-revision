const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base online and running");
  } catch (error) {
    console.log(error);
    throw new Error("Error when Initializing database");
  }
};

module.exports = {
  dbConnection,
};