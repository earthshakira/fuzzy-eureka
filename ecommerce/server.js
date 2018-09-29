const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./app/db/mongoConnection');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const TShirt = require('./app/models/shirt');
// Connect to mongoDB database assuming our database name is "angular-app"
//logging
app.use(morgan('dev'));
//  Serve frontend view
app.use(express.static('public'));

// Specify backend route
router.get('/api', (request, response) => {
    response.status(200).send({message: 'Hello World!'})
});

router.get('/api/tshirts', (request, response) => {
  TShirt.find((err,data) => {
    if(err){
      response.status(501,err);
      return;
    }
    response.status(200).send(data);
  });
  ;
});
app.use(router);

let port = process.env.PORT || 3000;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);
