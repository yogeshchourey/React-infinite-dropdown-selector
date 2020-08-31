/* Import Schema like mockDataSchema */

const jsf = require('json-schema-faker');
const fs = require('fs');
const _ = require('lodash');
const mockAirportList = require('./schema/jsons/AirportList.json');

function doMerge(jsonObjects) {
  // Custom merge function ORs together non-object values, recursively
  // calls itself on Objects.
  const merger = function (a, b) {
    if (_.isObject(a)) {
      return _.merge({}, a, b, merger);
    }
    return a || b;
  };

  // Allow roles to be passed to _.merge as an array of arbitrary length
  const args = _.flatten([{}, jsonObjects, merger]);
  return _.merge(...args);
}

// Add list of schema(s) to this do_merge array
const json = JSON.stringify(doMerge([
  mockAirportList
]));

// include json from schema/json

/* Write the file to be server with JSON server */
fs.writeFile('fakeServer/json/db.json', json, (err) => {
  if (err) {
    return console.log(err);
  }
});