/* This file contains all javascript functions used */

/* This function shows or hides input fields based on the type of device selected
   Used in addDevice.html (line 42) */
function showHideInfo(value) {
  var notemp = document.getElementById('temp').style.display = 'none'; // don't display temperature
  var novol = document.getElementById('vol').style.display = 'none'; // don't display volume
  var nospeed = document.getElementById('spd').style.display = 'none'; // don't display speed 
  
  // don't display temperature, volume and speed if device type is "light" or "camera"
  if (value == "Light" || value == "Camera") {
    notemp; novol; nospeed;
  }

  // don't display volume and speed if device type is "Air Conditioner" or "Refrigerator"
  else if (value == "Air Conditioner" || value == "Refrigerator") {
    novol; nospeed;
    document.getElementById('temp').style.display = 'block'; // display temperature
  }

  // don't display temperature and speed if device type is television or speaker
  else if (value == "Television" || value == "Speaker") {
    notemp; nospeed;
    document.getElementById('vol').style.display = 'block'; // display volume
  }

  // don't display temperature and volume if device type is "fan"
  else if (value == "Fan") {
    notemp; novol;
    document.getElementById('spd').style.display = 'block'; // display speed
  }

  else { // Otherwise, display everything
    document.getElementById('temp').style.display = 'block'; // temp
    document.getElementById('vol').style.display = 'block'; // vol
    document.getElementById('spd').style.display = 'block'; //speed
  }  
}

/* Counts the total number of rows in a table (not including the table heading)
   Used in viewDevices.html */
function count() {
  var rowCount = document.getElementById('table1').rows.length;
  document.getElementById("value").innerHTML = rowCount - 1;
}