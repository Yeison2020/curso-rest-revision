const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base online and running Connection succed");
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error when Initializing database Check database folder or where It's been used"
    );
  }
};

module.exports = {
  dbConnection,
};
