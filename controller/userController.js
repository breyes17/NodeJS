exports.getAllUsers = (req, res) => {
  res.status(500).send({
    message: 'Not yet done for now.',
  });
};

exports.getUser = (req, res) => {
  res.status(500).send({
    message: 'Not yet done for now.',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).send({
    message: 'Not yet done for now.',
  });
};

exports.checkUserId = (req, res, next, val) => {
  console.log(`You are in param middleware - ID is ${val}`);
  next();
};

exports.createUser = (req, res) => {
  res.status(500).send({
    message: 'Not yet done for now.',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).send({
    message: 'Not yet done for now.',
  });
};
