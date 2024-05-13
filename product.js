const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ShopApp')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: [0, 'Price minus is not allowed'],
        required: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true,
        default: 'New',
    },
    stock: {
        type: Number,
        min: 0,
        default: 0,
    },
    size: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true,
        maxLength: 150,
    },
    availability: {
        online: {
            type: Boolean,
            required: true,
        },
        offline: {
            type: Boolean,
            required: true,
        }
    }
})

productSchema.methods.outStock = function () {
    this.stock = 0;
    this.availability.online = false;
    this.availability.offline = false;
    return this.save();
}

productSchema.statics.closeStore = function () {
    return this.updateMany({}, {
        stock: 0,
        "availability.online": false,
        "availability.offline": false,
    })
}

const Product = mongoose.model('Product', productSchema);

// const changeStock = async (id) => {
//     const foundProduct = await Product.findById(id);
//     await foundProduct.outStock();
//     console.log('Updated successfully');
// }

// changeStock('664197aa89013b180fed2e2e');

Product.closeStore()
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err.errors);
    });

// --- create single data
// const tshirt = new Product({
//     'name': 'T Shirt C',
//     'price': 150000,
//     'condition': 'Used',
//     'stock': 100,
//     'size': ['L', 'XL'],
//     'description': 'Lorem Ipsum Dolor Sit Amet',
//     'availability': {
//         'online': true,
//         'offline': false,
//     }
// }).save()
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err.errors);
//     });

// --- update single data
// Product.findOneAndUpdate({name: 'T Shirt C'}, {price: 200}, {new: true, runValidators: true})
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err.errors);
//     });