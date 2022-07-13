module.exports = function (app) {
  
  /** Display the homepage (index.html) */
  app.get("/", function (req, res) {
    res.render("index.html") // render the index.html page
  });

  /** Display the about page (about.html) */
  app.get("/about", function (req, res) {
    res.render("about.html") // render the about.html page
  });

  /** Get device values from the database to display in the All devices Page (viewDevices.html) */
  app.get("/viewDevices", function (req, res) {
    // sql query to get all data of all devices in the database
    let sqlquery = "SELECT * FROM devices";
    
    // execute the sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/"); // redirect to the homepage (index.html) if unsuccessful
      }
      else { // If successful render the “viewDevices.html” file and pass the result as a parameter
        res.render("viewDevices.html", { 
          availableDevices: result 
        });        
      }
    });
  });

  /** Display the Add device page (addDevice.html) */
  app.get("/addDevice", function (req, res) {
    res.render("addDevice.html");
  });

  /** Insert values passed in from addDevice.html form into the database */
  app.post("/addDevice", function (req, res) {
    // sql query to insert a new record into the database, based on the values taken from the form in addDevice.html
    let sqlquery = "INSERT INTO devices (device_name, device_type, status, temperature, volume, speed) VALUES (?,?,?,?,?,?)";

    // set value of temperature, volume or speed to null before querying the db
    // if the field is empty (means it is not required for that device type)
    if (req.body.temperature == '') req.body.temperature = null;
    if (req.body.volume == '') req.body.volume = null;
    if (req.body.speed == '') req.body.speed = null;

    // Form inputs taken from addDevice.html (to insert into the database)
    let newrecord = [req.body.name, req.body.devices, req.body.status, req.body.temperature, req.body.volume, req.body.speed];
    
    // execute sql query
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) { // if the sql query is executed unsuccessfully, redirect back to the "addDevice.html" page.
        console.log(err);
        res.redirect("/addDevice");
      } 
      else { // if the sql query is executed successfully, pass the values to the addSuccess.html page
        res.render('addSuccess.html', {
          name: req.body.name,
          devices : req.body.devices, 
          status : req.body.status, 
          temperature : req.body.temperature, 
          volume : req.body.volume, 
          speed : req.body.speed
        });
      }
    });
  })

  /** Get device values for a specific device from the database to display in the device status page (view.html) */
  app.get("/view", function (req, res) {
    // sql statement to get records where the device name matches req.query.name
    let sqlquery = "SELECT * FROM devices WHERE device_name = ?";
    // execute sql query
    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        res.redirect("/viewDevices");
      }
      // If successful, pass the result as a parameter to view.html page
      res.render("view.html", { availableDevices: result });
    });
  });

  /** Get device values for a specific device from the database to display in the edit device page (editDevice.html) */
  app.get("/edit", function (req, res) {
    // sql query to get records with the specified device name
    let sqlquery = "SELECT * FROM devices WHERE device_name = ?";
    // execute sql query
    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        res.redirect("/viewDevices"); // redirect to view devices page if unsuccessful
      }
      else { // If successful, pass the result as a parameter to editDevice.html page
        res.render("editDevice.html", { 
          availableDevices: result 
        });
      }
    });
  });

  /** Update the database with values passed in from the editDevice.html form */
  app.post("/edit", function (req, res) {
    // set value of temperature, volume or speed to null if the field is empty (means it is not required for that device type)
    if (req.body.temperature == '') req.body.temperature = null;
    if (req.body.volume == '') req.body.volume = null;
    if (req.body.speed == '') req.body.speed = null;

    // sql query to update device with new values
    let sqlquery = "UPDATE devices SET device_type = ?, status = ?, temperature = ?, volume = ?, speed = ? WHERE device_name = ?";

    // values to be used to update device
    var updated = [ req.body.devices, req.body.status, 
                    req.body.temperature, req.body.volume, 
                    req.body.speed, req.body.name]
      
    db.query(sqlquery, updated, function(err, result) {
      if (err) {
        res.redirect("/viewDevices"); // redirect to view devices page if unsuccessful
      }
      else { // If successful, pass the values into the editSuccess page
        res.render('editSuccess.html', {
          name: req.body.name,
          devices: req.body.devices,
          status: req.body.status,
          temperature: req.body.temperature,
          volume: req.body.volume,
          speed: req.body.speed
        });
      }
   })
  })

  /** Get all values from the database that matches the device name 
   * (used for delete function in delete.html)
  */
  app.get("/deleteD", function (req, res) {
    // sql query to get records
    let sqlquery = "SELECT * FROM devices";

    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("viewDevices"); // redirect to view devices page if unsuccessful
      }
      else { // If successful, pass the result as a parameter to delete.html page
        res.render("delete.html", { 
          availableDevices: result 
        });
      }
    });
  });
  
  /** Delete the device using the name (primary key) of the device */
  app.post("/deleteD", function (req, res) {
    // sql statement to delete device information relating to device_name
    let sqlquery = "DELETE FROM devices WHERE device_name = ?";
    
    // execute sql query
    db.query(sqlquery, req.body.name, function(err, result) {
      if (err) {
        console.log(err);
        res.redirect("/viewDevices"); // redirect to view devices page if unsuccessful
      }
      else { // If successful, render the deleteSuccess.html page
        res.render('deleteSuccess.html');
      }
    })
  })

  /** Deleting the device that matches the specific device name 
 * (after clicking on the delete button in viewDevices.html) */
    app.get("/delete", function (req, res) {
    // sql statement to delete the device with the name of req.query.name
    let sqlquery = "DELETE FROM devices WHERE device_name = ?";

    // query the database using the sql statement above
    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        // redirect back to viewDevices page if the query fails
        res.redirect("/viewDevices");
      }
      // display the deleteSuccess.html page after deleting the device from the database.
      res.render("deleteSuccess.html")
    });
  });

  /** Display the search.html page */
  app.get("/search", function (req, res) {
    res.render("search.html");
  });

  /** Search for devices containing the keyword in its name */
  app.get("/search-result", function (req, res) {
    // the keyword input by user
    let word = [`%${req.query.keyword}%`]; // %keyword% for dynamic search
    
    // sql statement to search for the item in the database
    let sqlquery = "SELECT * FROM devices WHERE device_name LIKE ?";

    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) { // redirect back to the search page if query fails
        res.redirect("/search"); 
      } 
      else { // If successful, resder the search_result.html page and pass the search resuls as a parameter
        res.render('search_result.html', { 
        availableDevices: result,
        userInput: [`'${req.query.keyword}'`] // to pass req.query.keyword into search_result.html
      });
      }
    });
  });

}