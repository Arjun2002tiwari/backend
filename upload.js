const multer=require("multer");
const path=require("path");
const express = require("express");
const router = express.Router();
const Articles = require("./articleModel");

var Image="";
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    },
});
const upload=multer({
    storage:storage,
})

const handleErrors = (err) => {
    let errors = { title: "", description: "", url: "", content: "" };
  
    if (err.message.includes("title")) {
      errors.title = "title already exists";
      return errors;
    }
    if (err.message.includes("description")) {
      errors.description = "description already exists";
      return errors;
    }
    if (err.message.includes("url")) {
      errors.url = "url already exists";
      return errors;
    }
    if (err.message.includes("content")) {
      errors.content = "content already exists";
      return errors;
    }
  };
router.post("/",upload.single('uploads'),(req,res)=>{
    try{
        console.log(req.file.filename);
        const image=`https://epatrakaar.onrender.com/uploads/${req.file.filename}`;
        console.log(req.body);
    const { author, title,description, content ,category, tags, keywords } =
      req.body;
    const keyword = keywords.replace(/,/g, " ");
    const tag = tags.replace(/,/g, " ");
    const article = new Articles({
          author: author,
          title: title,
          images: image,
          description: description,
          content: content,
          category: category,
          tags: tag,
          keywords: keyword,
    });
    article.save();
    res.status(201).json({ created: true });
    } 
    catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.json({ err, created: false });
    }   
});
module.exports = router;