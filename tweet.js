const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relation_db')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const userSchema = mongoose.Schema({
    username: String,
    age: Number,
});
const User = mongoose.model('User', userSchema);

const tweetSchema = mongoose.Schema({
    text: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async () => {
    // const user = new User({
    //     username: 'JohnDoe',
    //     age: 20
    // })
    const user = await User.findOne({username: 'JohnDoe'});
    const tweet = new Tweet({
        text: 'Hello World 3',
        likes: 0,
    })
    tweet.user = user
    // user.save()
    tweet.save()
}

// makeTweet()

const showTweets = async (id) => {
    const tweets = await Tweet.findById(id).populate('user')
    console.log(tweets)
}

showTweets('664337b8416f216bc745d87a')