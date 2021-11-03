//we are in ./utils/dbHelper.js, here we have some helper functions
//const method = () => {
//  console.log("syefsdkfsl");
//}

//module.exports = {
//   method,
//   otherMethod,
   // anotherMethod
//};

module.exports = function(app){

  app.get("/", (req,res) => { // Redirect to login

  res.redirect('/Login');

  });

}
