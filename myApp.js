require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number},
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let toddy = new Person({name: "Todd Jones", age: 32, favoriteFoods: ["tofu", "hummus"]});

  toddy.save((err, data) => {
    return err ? console.error(err) : done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => (err ? console.error(err) : done(null, people)));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, docs) => (err ? console.error(err) : done(null, docs)));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, docs) => (err ? console.error(err) : done(null, docs)));
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, docs) => (err ? console.error(err) : done(null, docs)));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
