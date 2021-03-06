const upload = require('../middleware/upload');
const express = require('express');
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) =>{
    if(req.file===undefined){
        res.send("You must select a file");
        const imgUrl =`http://localhost/8080/file/${req.file.filename}`;
        return res.send(imgUrl);
    }
})

module.exports= router;