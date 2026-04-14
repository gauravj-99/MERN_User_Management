const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const userRoutes=require("./routes/userRoutes");
app.use("/users",userRoutes);
app.listen(5000,()=>{
    console.log("server running 5000");
});