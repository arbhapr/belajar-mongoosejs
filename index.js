const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relation_db')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    name: String,
    addresses: [{
        _id: false,
        street: String,
        city: String,
        country: String,
    }]
});
const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const user = new User({
        name: 'John Doe',
    })
    user.addresses.push({
        street: 'Alpha Street',
        city: 'London',
        country: 'United Kingdom'
    });
    const res = await user.save();
    console.log(res);
}

// makeUser()

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '123 Main St',
        city: 'Anytown',
        country: 'INA',
    })
    const res = await user.save()
    console.log(res)
}

// addAddress('66432a5c473dd3581dd2d1bc')