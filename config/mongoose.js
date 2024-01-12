import mongoose from 'mongoose'

 const connectUsingMongoose = async () => {
    try {
        await mongoose.connect("mongodb+srv://chandan:zxcvbnm1234567@cluster0.0wqsqlk.mongodb.net/?retryWrites=true&w=majority" , {
           useNewUrlParser: true,
           useUnifiedTopology: true
       });
        console.log("MongoDB connected using mongoose");
    } catch (err) {
        console.log(err);
    }
}
export default connectUsingMongoose;