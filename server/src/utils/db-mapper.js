

// {
//     "addr": "address",
//     "address": "address"
//   }
//   Then check in the code if the property corresponds to a mapped property.

//   let mappings = require('mappings.json');
//   let MyModel = require('models/myModel');

// (input, callback)
const objectMapper = async (obj, mapper) => {
    let options = {};
    for (let property in input) {
        if (input.hasOwnProperty(property) && mappings[property]) {
            options[mappings[property]] = input[property];
        }
    }
    let newObject = new MyModel(options);
    newObject.save(callback);
}

module.exports = objectMapper;