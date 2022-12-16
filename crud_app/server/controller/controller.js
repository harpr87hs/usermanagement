const Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Conent can not be empty" });
    return;
  }

  // new User
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in database
  user
    .save(user)
    .then((data) => {
      res.redirect("/add-user");
      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

//retrive and retun all user and single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error || "Error retrieving user by id ",
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retriving user",
        });
      });
  }
};

//updated a new identifi user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: error || "Error udpate user infomation" });
    });
};

// delete user by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ Message: `Cannot delete user with ${id}. May be its wrong` });
      } else {
        res.send({
          message: "User was deleted successsfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error || "Could not delete User Id =" + id,
      });
    });
};
