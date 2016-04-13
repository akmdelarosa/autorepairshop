
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
}

module.exports.vehicleServicesModel = vehicleServicesModel; 