module.exports = function (app, db) {
  /** Display the homepage (index.html) */
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  /** Display the about page (about.html) */
  app.get('/about', function (req, res) {
    res.render('about.html');
  });

  /** Get device values from the database to display in the All devices Page (viewDevices.html) */
  app.get('/viewDevices', function (req, res) {
    let sqlquery = 'SELECT * FROM devices';

    // execute the sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect('/');
      } else {
        res.render('viewDevices.html', {
          availableDevices: result,
        });
      }
    });
  });

  /** Display the Add device page (addDevice.html) */
  app.get('/addDevice', function (req, res) {
    res.render('addDevice.html');
  });

  /** Insert values passed in from addDevice.html form into the database */
  app.post('/addDevice', function (req, res) {
    let sqlquery =
      'INSERT INTO devices (device_name, device_type, status, temperature, volume, speed) VALUES (?,?,?,?,?,?)';

    // set value of temperature, volume or speed to null before querying the db
    // if the field is empty (means it is not required for that device type)
    if (req.body.temperature == '') req.body.temperature = null;
    if (req.body.volume == '') req.body.volume = null;
    if (req.body.speed == '') req.body.speed = null;

    let newrecord = [
      req.body.name,
      req.body.devices,
      req.body.status,
      req.body.temperature,
      req.body.volume,
      req.body.speed,
    ];

    // execute sql query
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect('/addDevice');
      } else {
        res.render('addSuccess.html', {
          name: req.body.name,
          devices: req.body.devices,
          status: req.body.status,
          temperature: req.body.temperature,
          volume: req.body.volume,
          speed: req.body.speed,
        });
      }
    });
  });

  /** Get device values for a specific device from the database to display in the device status page (view.html) */
  app.get('/view', function (req, res) {
    let sqlquery = 'SELECT * FROM devices WHERE device_name = ?';

    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        res.redirect('/viewDevices');
      }
      res.render('view.html', { availableDevices: result });
    });
  });

  /** Get device values for a specific device from the database to display in the edit device page (editDevice.html) */
  app.get('/edit', function (req, res) {
    let sqlquery = 'SELECT * FROM devices WHERE device_name = ?';

    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        res.redirect('/viewDevices');
      } else {
        res.render('editDevice.html', { availableDevices: result });
      }
    });
  });

  /** Update the database with values passed in from the editDevice.html form */
  app.post('/edit', function (req, res) {
    if (req.body.temperature == '') req.body.temperature = null;
    if (req.body.volume == '') req.body.volume = null;
    if (req.body.speed == '') req.body.speed = null;

    let sqlquery =
      'UPDATE devices SET device_type = ?, status = ?, temperature = ?, volume = ?, speed = ? WHERE device_name = ?';

    var updated = [
      req.body.devices,
      req.body.status,
      req.body.temperature,
      req.body.volume,
      req.body.speed,
      req.body.name,
    ];

    db.query(sqlquery, updated, function (err, result) {
      if (err) {
        res.redirect('/viewDevices');
      } else {
        res.render('editSuccess.html', {
          name: req.body.name,
          devices: req.body.devices,
          status: req.body.status,
          temperature: req.body.temperature,
          volume: req.body.volume,
          speed: req.body.speed,
        });
      }
    });
  });

  /** Get all values from the database that matches the device name
   * (used for delete function in delete.html)
   */
  app.get('/deleteD', function (req, res) {
    let sqlquery = 'SELECT * FROM devices';

    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect('viewDevices');
      } else {
        res.render('delete.html', {
          availableDevices: result,
        });
      }
    });
  });

  /** Delete the device using the name (primary key) of the device */
  app.post('/deleteD', function (req, res) {
    let sqlquery = 'DELETE FROM devices WHERE device_name = ?';

    db.query(sqlquery, req.body.name, function (err, result) {
      if (err) {
        console.log(err);
        res.redirect('/viewDevices');
      } else {
        res.render('deleteSuccess.html');
      }
    });
  });

  /** Deleting the device that matches the specific device name
   * (after clicking on the delete button in viewDevices.html) */
  app.get('/delete', function (req, res) {
    let sqlquery = 'DELETE FROM devices WHERE device_name = ?';

    db.query(sqlquery, req.query.name, (err, result) => {
      if (err) {
        res.redirect('/viewDevices');
      }
      res.render('deleteSuccess.html');
    });
  });

  /** Display the search.html page */
  app.get('/search', function (req, res) {
    res.render('search.html');
  });

  /** Search for devices containing the keyword in its name */
  app.get('/search-result', function (req, res) {
    let word = [`%${req.query.keyword}%`]; // %keyword% for dynamic search

    let sqlquery = 'SELECT * FROM devices WHERE device_name LIKE ?';

    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect('/search');
      } else {
        res.render('search_result.html', {
          availableDevices: result,
          userInput: [`'${req.query.keyword}'`],
        });
      }
    });
  });
};
