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

const fetchBears = (queryObj, callback) => {
  if (queryObj.zip_code) {
    queryObj.zip_code = parseInt(queryObj.zip_code);
  };

  let {
    start_date,
    end_date,
    bear_type,
    zip_code,
    sort,
  } = queryObj;

  const searchObj = {};

  if (start_date) {
    if (!searchObj.date) {
      searchObj.date = {};
    }
    searchObj.date.$gte = start_date;
  };
  if (end_date) {
    if (!searchObj.date) {
      searchObj.date = {};
    }
    searchObj.date.$lte = end_date;
  };
  if (bear_type) {
    searchObj.bear_type = bear_type;
  };
  if (zip_code) {
    searchObj.zip_code = zip_code;
  };

  // Does not work with current version of Node (v5.6.0) 
  // read more here: http://node.green/#ES2018-features-object-rest-spread-properties-object-spread-properties
  // 
  // const searchObj = {
  //   ...(start_date ? {start_date: {$lte: start_date}} : {}),
  //   ...(end_date ? {end_date: {$gte: end_date}} : {}),
  //   ...(bear_type ? {bear_type: bear_type} : {}),
  //   ...(zip_code ? {zip_code: zip_code} : {}),
  // };

  console.log('searchObj: ', searchObj);

  bearModel.find(searchObj, (err, result) => {
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
