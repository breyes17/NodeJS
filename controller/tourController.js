exports.checkTourId = (req, res, next, val) => {
  console.log(`You are in param middleware - ID is ${val}`);
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({ message: 'Sucess' });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  res.send(`Your variable is id=${req.params.id}`);
};

exports.createTour = (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: 'success',
    data: req.body,
  });
};

exports.updateTour = (req, res) => {
  res.send(`Updating id=${req.params.id}`);
};

exports.deleteTour = (req, res) => {
  res.send(`Deleting id=${req.params.id}`);
};

exports.checkBody = (req, res, next) => {
  console.log(req.body.name, req.body.price);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }
  next();
};
