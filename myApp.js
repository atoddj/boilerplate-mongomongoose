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
  Person.findById({_id: personId}, (err, person) => {
    if(err) return console.error(err);
    person.favoriteFoods = [...person.favoriteFoods, foodToAdd];
    person.save((err,updatedPerson) => (err ? console.error(err) : done(null, updatedPerson)));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const filter = {name: personName}
  Person.findOneAndUpdate(
    filter, 
    {age: ageToSet}, //update
    {new: true}, //updated document
    (err, person) => (err ? console.error(err) : done(null, person)));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => (err ? console.error(err) : done(null, person)));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, docs) => (err ? console.error(err) : done(null, docs)));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .select({age: 0})
  .limit(2)
  .exec((err, docs) => (err ? console.error(err) : done(null, docs)));
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
