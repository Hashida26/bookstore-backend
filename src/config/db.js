const mongoose=require("mongoose")
const{DB_URI}=require('./config')

  const connectDB=async () => {
    try {
        await mongoose.connect(DB_URI)
         console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("error connecting mongodb",error);
        
        
    }
    
}

module.exports = connectDB;