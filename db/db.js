require('dotenv').config();
const mongoose=require('mongoose')

const db=process.env.URI;
// const db="mongodb+srv://rishabh:rishabh@cluster0.wsib1.mongodb.net/Users?retryWrites=true&w=majority";

mongoose.connect(db,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology: true,
    // useFindAndModify:false 
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
    console.log("No connection");
})