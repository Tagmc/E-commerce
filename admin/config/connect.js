const { default: mongoose } = require('mongoose');
const connect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    //check xem connect thanh cong hay chua
    if (con.connection.readyState === 1) {
      console.log("Connect Success!");
    } else {
      console.log("connecting!");
    }
  } catch (error) {
    console.log('Connect Error!');
    throw new Error(error);
  }
}

module.exports = connect;