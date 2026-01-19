const dotenv =require("dotenv")
const { PORT } = require("./config/config");

dotenv.config()
const connectDB = require("./config/db");
const app=require("./app")
 

connectDB()


app.listen(PORT,()=>{
    console.log(`database connected and running in ${PORT}`);
    
})