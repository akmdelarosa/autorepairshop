
var connectionProvider = require('../mysqlConnectionStringProvider.js');
var moment = require('moment');
var appointmentServicesModel = {

  createAppointmentServices : function (services, appointment_id, callback) {
    console.log('services passed to the model below');
    console.log(services);
    var insertStatement = "INSERT INTO appointment_services (service_id, appointment_id, created) VALUES ?";
    var servicesStatements = [];
    for (var i in services) {
        var service = services[i];
        var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(service);
        servicesStatements.push([service.id, appointment_id, currentDate]);
      }
      console.log(servicesStatements);
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    if (connection) {
        connection.query(insertStatement, [servicesStatements], function (err, result) {
        
          if (err) { throw err; }
          
          console.log(result);
          callback(result);

        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      }
      
  }
}
module.exports.appointmentServicesModel = appointmentServicesModel;