const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/ursa`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Ursa DB connected to localhost!');
});

const bearSchema = mongoose.Schema({
  bear_type: String,
  notes: String,
  zip_code: Number,
  num_bears: Number,
  date: Date,
});

const bearModel = mongoose.model('bearModel', bearSchema);

const storeBear = (bearObj) => {
  bearObj.date = Date.now();
  bearModel.create(bearObj, (err, result) => {
    if (err) {
      console.error('err: ', err);
    }
  })
}

const fetchBears = (callback) => {
  bearModel.find({}, (err, result) => {
    if (err) {
      console.log('err: ', err);
      callback(err, null);
    } else {
      console.log('result: ', result);
      callback(null, result);
    }
  })
}

const clearBears = () => {
  bearModel.remove({}, (err, result) => {
    console.log('wiped bears DB!');
  })
}

module.exports.bearModel = bearModel;
module.exports.storeBear = storeBear;
module.exports.fetchBears = fetchBears;
module.exports.clearBears = clearBears;
