const Articles = require("./articleModel");


// getting the posts from database
module.exports.getArticle = async (req, res, next) => {
  console.log(req.query);

  var data = await Articles.find({
    author: { $regex: new RegExp("^" + req.query.author, "i") },
  }).exec();
  res.send(data);
};
