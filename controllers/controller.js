const sqlite3 = require('sqlite3').verbose();
// BACKEND FILE FOR MY DATABASES QUERIES

const addOfferToDB = (offerFromTheBrain) => {
    // code to add to the database
    // console.log("From the server I present:", taskFromTheBrain)
      let db = new sqlite3.Database('./db/db.skillbank');
  
      // insert one row into the langs table
      db.run(`INSERT INTO offerArchive (title, desc, name, email, location, img, date, category, offer) VALUES(?, ?, ?, ?, ?, ?, CURRENT_DATE, ?, ?)`, [offerFromTheBrain.inputTitle, offerFromTheBrain.inputDesc, offerFromTheBrain.inputName, offerFromTheBrain.inputEmail, offerFromTheBrain.inputLocation, offerFromTheBrain.inputImage, offerFromTheBrain.inputRadio, offerFromTheBrain.inputType], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
  
      // close the database connection
      db.close();
  }

  const addOfferToDBWPic = (offerFromTheBrain) => {
    // code to add to the database
    // console.log("From the server I present:", taskFromTheBrain)
      let db = new sqlite3.Database('./db/db.skillbank');
  
      // insert one row into the langs table
      db.run(`INSERT INTO offerArchive (title, desc, name, email, location, img, date, category, offer) VALUES(?, ?, ?, ?, ?, ?, CURRENT_DATE, ?, ?)`, [offerFromTheBrain.inputTitle, offerFromTheBrain.inputDesc, offerFromTheBrain.inputName, offerFromTheBrain.inputEmail, offerFromTheBrain.inputLocation, offerFromTheBrain.inputImage, offerFromTheBrain.inputRadio, offerFromTheBrain.inputType], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
  
      // close the database connection
      db.close();
  }

  exports.addOfferToDB = addOfferToDB;
  exports.addOfferToDBWPic = addOfferToDBWPic;

  const fetchAllOffersFromDB = (res) => {
    let dataForTheUser = {input: []}
    let db = new sqlite3.Database('./db/db.skillbank');
  
    let sql = `SELECT * FROM offerArchive`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
        dataForTheUser.input.push(row)
      });
      console.log(dataForTheUser)
      res.send(dataForTheUser)
    });
  
    // close the database connection
    db.close();
  }

  exports.fetchAllOffersFromDB = fetchAllOffersFromDB;