exports.getAllTours = (req, res) => {
    res.status(200).json({ message: "Sucess" });
}

exports.getTour = (req, res) => {
    console.log(req.params);
    res.send(`Your variable is id=${req.params.id}`);
}

exports.createTour = (req, res) => {
    console.log(req.body);
    res.status(201).json({
        message: 'success',
        data: req.body,
    })
}

exports.updateTour = (req, res) => {
    res.send(`Updating id=${req.params.id}`);
}

exports.deleteTour = (req, res) => {
    res.send(`Deleting id=${req.params.id}`);
}
