const mongoose = require('mongoose');

const mongoURL = 'mongodb://asdf:asdf111@ds119113.mlab.com:19113/ecommerce';
mongoose.connect(mongoURL,function(err) {
  if(err){
    console.error("Not connected to database",err);
  }else {
    console.log("connection to database successful");
  }
});

module.exports = mongoose;
