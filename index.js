// lib and imports
const express = require("express");
const app = express();
const cloudinary = require('cloudinary').v2;
// cloudinary 
cloudinary.config({ 
  cloud_name: 'dcgjw1jo2', 
  api_key: '112798183422761', 
  api_secret: 'e8yTNBYPerT_K8iQc-lJJBIFSDE' 
});

const controller = require("./controllers/controller")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");



// pages
app.get('/',(req, res) => {
  res.render('home.ejs');
});


// Create here your api setup

app.post('/api/skillBank/addOffer', (req, res) => {
  console.log('from the brain i print:', req.body);
  controller.addOfferToDB(req.body);
});

app.post('/api/skillBank/allOffers', (req, res) => {
  controller.fetchAllOffersFromDB(res);
})




app.listen(3000, () => console.log("Server Up and running"));
