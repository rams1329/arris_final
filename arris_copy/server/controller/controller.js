var Userdb = require("../model/model");
const fs = require("fs");

// create and save new user
exports.create = (req, res) => {
  console.log("REQ.FILE ", req.file);
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
    dob: req.body.dob,
    empmn: req.body.empmn,
    department:req.body.department,
    empno: req.body.empno,
    porc: req.body.porc,
    designation: req.body.designation,
    qualification: req.body.qualification,
    yog: req.body.yog,
    doj: req.body.doj,
    address: req.body.address,
    aadharno: req.body.aadharno,
    panno: req.body.panno,
    vanno: req.body.vanno,
    pfno: req.body.pfno,
    remarks: req.body.remarks,
    prevexp: req.body.prevexp,
    arrisexp: req.body.arrisexp,
    totalexp: req.body.totalexp,
    prevcompname: req.body.prevcompname,
    acno: req.body.acno,
    ifsc: req.body.ifsc,
    bankname: req.body.bankname,
    empstatus: req.body.empstatus,
    bankid: req.body.bankid,
    dlname: req.body.dlname,
    dlemail: req.body.dlemail,
    dlphno: req.body.dlphno,
    ecn: req.body.ecn,
    ecpn: req.body.ecpn,
    bg: req.body.bg,
    pl: req.body.pl,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
    imageUrl: req.file.path,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((users) => {
        console.log("USERS ", users);
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};


exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const departments = await Userdb.find({
      $or: [
        { department: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        
      ],
    });

    res.render("search", {
      departments,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};