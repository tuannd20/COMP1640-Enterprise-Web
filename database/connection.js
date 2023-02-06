const mongoose = require("mongoose");

const connectionDatabase = async () => {
  // Connect to database
  try {
    const connectionString =
      "mongodb+srv://comp1649enterpriseweb:comp1640tcd0502@comp1640tcd0502.5ejijfe.mongodb.net/COMP1640-Enterprise-Web?retryWrites=true&w=majority";
    mongoose.set("strictQuery", false);
    const value = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (value) console.log("Successfully connected to the database");
  } catch (error) {
    console.log("Could not connect to the database", error);
    process.exit();
  }
};

module.exports = {
  connectionDatabase,
};
