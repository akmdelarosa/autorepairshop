
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var servicedVehicleModel = {
  
  getServicedVehicleById : function(id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM serviced_vehicles where id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) { return next(err); }
        
        
        console.log(rows[0]);
        
        callback(rows[0]);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  },
  
  createServicedVehicleByAppointmentId : function(id,mileage,vin,callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO serviced_vehicles (year,make,model,mileage_read,vin,created) SELECT year, make, model, ?, ?, NOW() FROM appointments WHERE id = ? ON DUPLICATE KEY UPDATE mileage_read = ?";
    if (connection) {
      
      connection.query(queryStatement, [mileage, vin, id, mileage], function (err, result) {
        
        if (err) { return next(err); }

        console.log(result);
        callback(result);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.servicedVehicleModel = servicedVehicleModel; 