const monoose = require("mongoose");

const connectDB = async () => {
  try {
    await monoose.connect(process.env.MONGO_URL);
    console.log("MONGODB CONNECTED SUCCESSFULLY..🚀");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
