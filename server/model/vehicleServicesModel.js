
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var vehicleServicesModel = {
  
  getAvailableServices : function (callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT id, name, description FROM services WHERE deleted = 0 ORDER BY name ASC";
    
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
  
  getAllServices : function (callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM services ORDER BY name ASC";
    
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

  createAppointmentService : function (service_id, appointment_id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO appointment_services SET service_id = ? , appointment_id = ?, created = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [service_id,appointment_id, new Date()], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getPricesAndRates : function (year,make,model,serviceId,callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT IFNULL(SUM(vpp.min_price),0) AS min_price, IFNULL(SUM(vpp.max_price),0) AS max_price, IFNULL(vsr.min_rate,0) AS min_rate, IFNULL(vsr.max_rate,0) AS max_rate FROM vehicles_list v INNER JOIN vehicles_service_rates vsr ON vsr.vehicle_id = v.id INNER JOIN services s ON s.id = vsr.service_id LEFT JOIN services_parts sp ON sp.service_id = s.id LEFT JOIN  parts p ON p .id = sp.part_id LEFT JOIN vehicles_parts_prices vpp ON vpp.part_id = p.id AND vpp.vehicle_id = v.id WHERE v.year = ? AND v.make = ? AND v.model = ? AND vsr.service_id = ? GROUP BY vsr.service_id";
    
    if (connection) {
      
      connection.query(queryStatement, [year,make,model,serviceId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows[0]);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getPartsByVehicleAndService : function (year,make,model,serviceId,callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT p.name, p.description FROM parts p INNER JOIN services_parts sp ON sp.part_id = p.id INNER JOIN vehicles_parts_prices vpp ON vpp.part_id = p.id INNER JOIN vehicles_list v ON v.id = vpp.vehicle_id WHERE v.year = ? AND v.make = ? AND v.model = ? AND sp.service_id = ?";
    if (connection) {
      
      connection.query(queryStatement, [year,make,model,serviceId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  getServiceById : function (id,callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM services where id = ?";
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
  
  updateServiceById : function (service, id,callback) {

    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE services SET ? where id = ?";
    if (connection) {
      
      connection.query(queryStatement, [service,id], function (err, rows, fields) {
        
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
  
  createService: function (service, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO services SET ?";
    if (connection) {
      
      connection.query(queryStatement, service, function (err, result) {
        
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
  getAllServicesRates: function (callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT vsr.id, v.year, v.make, v.model, s.name, vsr.min_rate, vsr.max_rate FROM vehicles_service_rates vsr INNER JOIN vehicles_list v ON v.id = vsr.vehicle_id INNER JOIN services s ON s.id = vsr.service_id ORDER BY v.year DESC";
    if (connection) {
      
      connection.query(queryStatement, function (err, result) {
        
        callback(err,result);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  getServiceRateById: function (id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT vsr.id, v.year, v.make, v.model, s.name, vsr.min_rate, vsr.max_rate FROM vehicles_service_rates vsr INNER JOIN vehicles_list v ON v.id = vsr.vehicle_id INNER JOIN services s ON s.id = vsr.service_id WHERE vsr.id = ?";
    if (connection) {
      
      connection.query(queryStatement, id, function (err, result) {

        callback(err,result[0]);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  updateServiceRateById: function (rate, id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE vehicles_service_rates SET ? WHERE id = ?";
    if (connection) {
      
      connection.query(queryStatement, [rate,id], function (err, rows, fields) {
        
        if (err) { callback({error : err.code}); }
        
        
        console.log(rows);
        if (rows) {
          callback({status : 'success'});
        }
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  createVehicleServiceRate: function (vehicleRate, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO vehicles_service_rates (service_id, min_rate, max_rate, vehicle_id) SELECT ?, ?, ?, id FROM vehicles_list WHERE year = ? AND make = ? AND model = ? ON DUPLICATE KEY UPDATE min_rate = VALUES(min_rate), max_rate = VALUES(max_rate)";
    if (connection) {
      
      connection.query(queryStatement, [vehicleRate.service_id,vehicleRate.min_rate,vehicleRate.max_rate,vehicleRate.year,vehicleRate.make,vehicleRate.model], function (err, result) {

        callback(err,result);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.vehicleServicesModel = vehicleServicesModel; 