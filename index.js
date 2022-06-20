require('dotenv').config();
const express = require('express');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const connection = require('./db');
const upload = require('./routes/upload');
const app = express();

let gfs;


connection();
 
const conn = mongoose.connection;

conn.once("open", function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
})

app.use("/file",upload);

//media
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({filename:req.params.filename});
        const readStream =gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("NOT FOUND");
    }
})

app.delete("/file/:filename", async (req, res) =>{
    try {
        await gfs.files.deleteOne({filename:req.params.filename});
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
})
const port = process.env.PORT|| 8080
app.listen(port, console.log(`Listening on port ${port}.......`));