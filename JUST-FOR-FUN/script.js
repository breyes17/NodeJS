
/**
 * This script was used to upload dummy data to database.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../models/tourModel');

dotenv.config({ path: `./config.env` });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected!'))
  .catch((e) => console.log(e));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dummy-data.json`, 'utf-8')
);

const newTours = tours.map((data) => {
  const { id, ...newTour } = data;
  return newTour;
});

//transfer data from file to server
const transfer = async () => {
  try {
    await Tour.create(newTours);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  transfer();
} else {
  deleteData();
}
