

module.exports.mainController = (req, res, next) => {
  
  res.render('index');
}

module.exports.printDirections = (req, res, next) => {
  console.log(req.query);
  let origin = req.query.origin.split(',');
  let destination = req.query.destiny.split(',');
  res.render('directions', {
    origin: origin,
    destination: destination
  }); 
}