
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var vehicleServicesModel = {
  
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
    var queryStatement = "SELECT IFNULL(SUM(vpp.min_price),0) AS min_price, IFNULL(SUM(vpp.max_price),0) AS max_price, IFNULL(vsr.min_rate,0) AS min_rate, IFNULL(vsr.max_rate,0) AS max_rate FROM vehicle_model_year v INNER JOIN vehicles_service_rates vsr ON vsr.vehicle_id = v.id INNER JOIN services s ON s.id = vsr.service_id LEFT JOIN services_parts sp ON sp.service_id = s.id LEFT JOIN  parts p ON p .id = sp.part_id LEFT JOIN vehicles_parts_prices vpp ON vpp.part_id = p.id AND vpp.vehicle_id = v.id WHERE v.year = ? AND v.make = ? AND v.model = ? AND vsr.service_id = ? GROUP BY vsr.service_id";
    
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
    var queryStatement = "SELECT p.name, p.description FROM parts p INNER JOIN services_parts sp ON sp.part_id = p.id INNER JOIN vehicles_parts_prices vpp ON vpp.part_id = p.id INNER JOIN vehicle_model_year v ON v.id = vpp.vehicle_id WHERE v.year = ? AND v.make = ? AND v.model = ? AND sp.service_id = ?";
    if (connection) {
      
      connection.query(queryStatement, [year,make,model,serviceId], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.vehicleServicesModel = vehicleServicesModel; 