const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("data base online");
  } catch (error) {
    console.log(error);
    throw new Error("Error when Initializing database");
  }
};

module.exports = {
  dbConnection,
};

```
I need to check why they are not supported not more

useCreateIndex: true,
useFindAndModify: false

```;
