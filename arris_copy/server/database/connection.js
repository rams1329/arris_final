const multer=require('multer')
const mongoose = require('mongoose');
MONGO_URI='mongodb+srv://rams1304:Saibabaa19@atlascluster.3ghos8h.mongodb.net/CRUD?retryWrites=true&w=majority'
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB