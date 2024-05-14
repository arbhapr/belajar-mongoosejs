const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relation_db')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['spring', 'summer', 'fall', 'winter'],
    }
})
const Product = mongoose.model('Product', productSchema);

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});
const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
    const farm = new Farm({
        name: 'Farm',
        city: 'Anytown',
    });
    const melon = await Product.findOne({name: 'Melon'})
    farm.products.push(melon)
    await farm.save();
    console.log(farm)
}

// makeFarm();

// Product.insertMany([
//     {
//         name: 'Melon',
//         price: 10,
//         season: 'summer',
//     },
//     {
//         name: 'Watermelon',
//         price: 12,
//         season: 'summer',
//     },
//     {
//         name: 'Strawberry',
//         price: 10,
//         season: 'fall',
//     },
// ]);

const addProduct = async (id) => {
    const farm = await Farm.findById(id)
    const watermelon = await Product.findOne({name: 'Watermelon'})
    
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm)
}

// addProduct('66433000a9dc83fc9114cd5e');

Farm.findOne({name: 'Farm'}).populate('products', 'name').then((farm) => {
    console.log(farm)
    for (const product of farm.products) {
        console.log(product)
    }
})