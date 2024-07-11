const express = require('express');
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const key = process.env.MONGODB_URI;
main().catch(err => console.error(err));

async function main() {
    try {
        await mongoose.connect(key);
    } catch(err){
        console.error(err);
    }
    return;
}

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/image", imageRoutes);

app.listen(5000, () => {
    console.log("Listenining on port 5000");
})