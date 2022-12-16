const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // mongoDb connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected : ${con.connection.host}`);
  } catch (error) {
    console.log("MongoDB Error =", error);
    process.exit(1);
  }
};

module.exports = connectDB;
