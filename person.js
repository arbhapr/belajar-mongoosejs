const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ShopApp')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });
    
const personSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
})

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
})

personSchema.pre('save', async function() {
    this.firstName = 'Luna';
    this.lastName = 'Lovegood';
    console.log('pre-save function');
})

personSchema.post('save', async function() {
    console.log('data saved');
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    firstName: 'Harry',
    lastName: 'Potter',
});

person.save()
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

console.log(person.fullName);