
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var appointmentModel = {
  
  createAppointment : function (appointment, callback) {
    console.log(appointment);
    
    var insertStatement = "INSERT INTO appointments SET?";

    var isCustomer = true;
    var appointmentData = {   
      date: appointment.date,
      time: appointment.time,
      year: appointment.year,
      make: appointment.make,
      model: appointment.model
      created : new Date()
    };

    if (appointment.user_id) {
      appointmentData.user_id = appointment.user_id;
      isCustomer = false;
    }

    var insertCustomerStatement = "INSERT INTO customers SET?";
    var customerData = {
                  first_name : appointment.first_name,
                  last_name : appointment.last_name,
                  email : appointment.email,
                  phone_number : appointment.phone_number
              };
    

    var services_data = appointment.services;
    var insertServiceStatement = "INSERT INTO appointment_services SET service_id = ? , appointment_id = ?, created = ?";

    var appointment_id = 0;
    var serviceResults = [];

    console.log(customer_data);
    console.log(services_data);
    
    var connection;
    if (isCustomer) {
      connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
      
        connection.query(insertCustomerStatement, customerData, function (err, result) {
          
          if (err) { throw err; }
          
          console.log(result);
          appointmentData.customer_id = result.insertId;
        });
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      }
    }
    
    connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    if (connection) {
      
      connection.query(insertStatement, appointmentData, function (err, result) {
        
        if (err) { throw err; }
        
        console.log(result);
        appointment_id = result.insertId;
      });
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }

    var servicesStatements = "";
    
    for (var i in services_data) {
      var service = services_data[i];
      var currentDate = new Date();
      console.log(service);
      servicesStatements += "INSERT INTO appointment_services (service_id, appointment_id, created) VALUES (" +service.id +","+ appointment_id+","currentDate+");";
    }

    connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(servicesStatements, function (err, result) {
        
          if (err) { throw err; }
          
          console.log(result);

          serviceResults.push(result);
        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      /*
      connection.query(insertStatement, appointmentData, function (err, result) {
        
        if (err) { throw err; }
        
        console.log(result);
        appointment_id = result.insertId;
        
      });
      /*
      for (var i in services_data) {
        var service = services_data[i];
        var currentDate = new Date();
        console.log(service);
        connection.query(insertServiceStatement, [service.id, appointment_id, currentDate], function (err, result) {
        
          if (err) { throw err; }
          
          console.log(rows);

          serviceResults.push(result.insertId);
        });
      
      }*/

      callback({status : 'successful', appointment_id : appointment_id});
      
      //connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    //}
  }
  
  ,
  
  getAllAppointment : function (user, callback) {
    
    var user_query = user.visitor_id ? 'visitor_id' : 'user_id';
    var user_id = user.visitor_id ? user.visitor_id : user.user_id;
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM appointments WHERE " + user_query + " = ? AND deleted - 0 ORDER BY ID DESC";
    
    if (connection) {
      
      connection.query(queryStatement, [user_id], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getAppointmentById : function (appointmentId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM appointments WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [appointmentId] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  
  ,
  
  updateAppointment: function (date, time, service, appointmentId, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE  appointments SET date = ? ,  time = ?, service = ?  WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [date, time, service, appointmentId] , function (err, rows, fields) {
        if (err) { throw err; }
        console.log(rows);
        
        if (rows) {
          
          
          callback({ status : 'successful' });
        }
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  cancelAppointment : function (appointmentId, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE appointments SET deleted = 1 WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [appointmentId] , function (err, rows, fields) {
        if (err) { throw err; }
        console.log(rows);
        
        if (rows) {
          
          callback({ status : 'successful' });
        }
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

  ,

  createApppointmentServices : function (serviceID, appointmentID, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO appointment_services SET service_id = ?, appointment_id = ?, created = NOW()";
    
    if (connection) {
      
      connection.query(queryStatement, [serviceID, appointmentID] , function (err, rows, fields) {
        if (err) { throw err; }
        console.log(rows);
        
        if (rows) {
          
          callback({ status : 'successful' });
        }
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

}

module.exports.appointmentModel = appointmentModel; 