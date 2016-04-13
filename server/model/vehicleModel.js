
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var vehicleModel = {
  
  
  getAllVehicle : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM vehicle_model_year ORDER BY year DESC";
    
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getAllMakesByYear : function (year, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT DISTINCT make FROM vehicle_model_year WHERE year = ? ORDER BY make ASC";
    
    if (connection) {
      
      connection.query(queryStatement, [year] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getAllModelsByYearAndMake : function (year, make, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT DISTINCT model FROM vehicle_model_year WHERE year = ? and make = ? ORDER BY model ASC";
    
    if (connection) {
      
      connection.query(queryStatement, [year,make] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

  ,

  getYears : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT DISTINCT year FROM vehicle_model_year ORDER BY year DESC";
    
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

  ,

  getAvailableServices : function (callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT id, name, description FROM services ORDER BY name ASC";
    
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

}

module.exports.vehicleModel = vehicleModel; 