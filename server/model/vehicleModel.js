
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var vehicleModel = {
  
  
  getAllVehicle : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM vehicles_list ORDER BY year DESC";
    
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
    var queryStatement = "SELECT DISTINCT make FROM vehicles_list WHERE year = ? ORDER BY make ASC";
    
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
    var queryStatement = "SELECT DISTINCT model FROM vehicles_list WHERE year = ? and make = ? ORDER BY model ASC";
    
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
    var queryStatement = "SELECT DISTINCT year FROM vehicles_list ORDER BY year DESC";
    
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
  ,
  
  getUserVehiclesByUserId : function (userId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT uv.*, v.year, v.make,v.model, v.year, v.vin, v.mileage_read FROM users_vehicles uv INNER JOIN serviced_vehicles v ON v.id = uv.vehicle_id WHERE uv.user_id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [userId] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        console.log(rows);
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
    
  }
  ,
  
  getAllVehicles : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM vehicles_list";
    
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
  
  updateVehicleById: function (vehicle, vehicleId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE vehicles_list SET ? WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [vehicle, vehicleId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        console.log(rows);
        if (rows)
        callback({status : 'success'});
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  createVehicle: function (vehicle, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO vehicles_list SET ?";
    if (connection) {
      
      connection.query(queryStatement, vehicle, function (err, result) {
        
        if (err) { throw err; }
        
        
        console.log(result);
        if (result) {
          callback({status : 'success'});
        }
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getVehicleById: function (id, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM vehicles_list WHERE id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows[0]);
        callback(rows[0]);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

}

module.exports.vehicleModel = vehicleModel; 