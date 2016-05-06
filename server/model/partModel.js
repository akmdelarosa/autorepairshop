
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var partModel = {
  
  // return services_parts.id, parts.name, parts.description
  getPartsByServiceId : function (serviceId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT sp.id, p.name, p.description FROM services_parts sp INNER JOIN parts p ON p.id = sp.part_id WHERE sp.service_id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [serviceId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  removeServicePart : function (servicePartId, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var deleteStatement = "DELETE FROM services_parts where id = ?";
    
    if (connection) {
      
      connection.query(deleteStatement, [servicePartId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        if(rows) {
            callback({status : 'success'});
        }        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

  ,
  getAllParts : function(callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM parts ORDER BY name ASC";
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
        
        callback(err,rows);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getPartById : function(id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM parts where id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows[0]);
        
        callback(rows[0]);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  updatePartById : function (part, id,callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE parts SET ? where id = ?";
    if (connection) {
      
      connection.query(queryStatement, [part,id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        if (rows) {
          callback({status : 'success'});
        }
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  createPart: function (part, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO parts SET ?";
    if (connection) {
      
      connection.query(queryStatement, part, function (err, result) {
        
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
  
  getAllPartsPrices: function (callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT vpp.id, v.year, v.make, v.model, p.name, vpp.min_price, vpp.max_price FROM vehicles_parts_prices vpp INNER JOIN vehicles_list v ON v.id = vpp.vehicle_id INNER JOIN parts p ON p.id = vpp.part_id ORDER BY v.year DESC, v.make ASC, v.model ASC";
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
  getPriceById: function (id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT vpp.id, v.year, v.make, v.model, p.name, vpp.min_price, vpp.max_price FROM vehicles_parts_prices vpp INNER JOIN vehicles_list v ON v.id = vpp.vehicle_id INNER JOIN parts p ON p.id = vpp.part_id WHERE vpp.id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows[0]);
        callback(rows[0]);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  updatePriceById: function (price, id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE vehicles_parts_prices SET ? WHERE id = ?";
    if (connection) {
      
      connection.query(queryStatement, [price,id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        if (rows) {
          callback({status : 'success'});
        }
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,  
  createVehiclePartPrice: function (vehiclePartPrice, callback) {
    console.log(vehiclePartPrice);
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO vehicles_parts_prices (part_id, min_price, max_price, vehicle_id) SELECT ?, ?, ?, id FROM vehicles_list WHERE year = ? AND make = ? AND model = ? ON DUPLICATE KEY UPDATE min_price = VALUES(min_price), max_price = VALUES(max_price)";
    if (connection) {
      
      connection.query(queryStatement, [vehiclePartPrice.part_id,vehiclePartPrice.min_price,vehiclePartPrice.max_price,vehiclePartPrice.year,vehiclePartPrice.make,vehiclePartPrice.model], function (err, result) {

        callback(err,result);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  markDeleted : function(id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "DELETE p.*, sp.*, vpp.* FROM parts p left join services_parts sp on sp.part_id = p.id left join vehicles_parts_prices vpp on vpp.part_id = p.id where p.id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, result) {
        
        callback(err, result);
               
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.partModel = partModel; 