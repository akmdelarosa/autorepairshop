
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var appointmentModel = {
  
  createAppointment : function (appointment, OnSuccessfulCallback) {
    
    var insertStatement = "INSERT INTO appointments SET?";
    
    var appointment = {   
      user_id : appointment.customer_id,
      visitor_id : appointment.visitor_id,
      service_id : appointment.service_id,
      date: appointment.date,
      time: appointment.time,
      created : new Date()
    };
    
    console.log(appointment);
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    
    if (connection) {
      
      connection.query(insertStatement, appointment, function (err, result) {
        
        if (err) { }
        
        OnSuccessfulCallback({ status : 'successful' });
        console.log(result)
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
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

}

module.exports.appointmentModel = appointmentModel; 