const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    //required: true
  },
  dob: {
    type: Date,
    //required: true
  },
  empmn: {
    type: Number,
    //required: true
  },
  department : {
    type: String,
    //required: true
    
},
  empno: {
    type: Number,
    //required: true
  },

  porc: {
    type: String,
    //required: true
  },
  designation: {
    type: String,
    //required: true
  },
  qualification: {
    type: String,
    //required: true
  },
  yog: {
    type: Date,
    //required: true
  },
  doj: {
    type: Date,
    //required: true
  },
  address: {
    type: String,
    //required: true
  },
  aadharno: {
    type: Number,
    //required: true
  },
  panno: {
    type: Number,
    //required: true
  },
  vanno: {
    type: Number,
    //required: true
  },
  pfno: {
    type: Number,
    //required: true
  },

  remarks: {
    type: String,
    //required: true
  },
  prevexp: {
    type: Number,
    //required: true
  },
  arrisexp: {
    type: Number,
    //required: true
  },
  totalexp: {
    type: Number,
    //required: true
  },
  prevcompname: {
    type: String,
    //required: true
  },
  acno: {
    type: String,
  },
  ifsc: {
    type: String,
  },
  bankname: {
    type: String,
  },
  empstatus: {
    type: String,
  },
  // pf : {
  //     type: String,

  // },
  // od1 : {
  //     type: String,

  // },
  bankid: {
    type: String,
  },

  dlname: {
    type: String,
  },

  dlemail: {
    type: String,
  },

  dlphno: {
    type: String,
  },

  ecn: {
    type: String,
  },

  ecpn: {
    type: String,
  },

  bg: {
    type: String,
  },

  pl: {
    type: Date,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  imageUrl: {
    type: String,
  },

  gender: String,
  status: String,
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
