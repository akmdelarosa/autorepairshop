var mysql = require('mysql');

var mysqlConnectionString = require('./mysqlConnectionString.js');

var mysqlConnectionStringProvider = {
  
  getMySqlConnection : function () {
    
    var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.prod);
    
    connection.connect(function(err) {
        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });
    connection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });
    connection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: " + err);
    });
    return connection;
  },
  
  closeMySqlConnection : function (currentConnection) {
    
    if (currentConnection) {
      
      currentConnection.end(function (err) {
        
        if (err) { console.log("CONNECTION ERROR ON END: " + err); }
        
        console.log('CONNECTION CLOSED SUCCESSFULLY.')
      })
    }
    
  }


}

module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;