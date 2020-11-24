const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

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
  .then(() => console.log('Successfully connected!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 6.9,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Bryan Panugan Reyes',
  price: 58,
});

testTour
  .save()
  .then(() => console.log('Successfully Created!'))
  .catch((err) => console.log('Something is wrong. Sorry ', err));

app.listen(process.env.PORT, () => {
  console.log(`Server running at port=${process.env.PORT}`);
});
