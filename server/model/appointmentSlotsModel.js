
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var appointmentSlotsModel = {
  
  getAllAppointmentSlots : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM appointment_slots";
    
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

  getAvailableAppointmentDates : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    /*
    var queryStatement = "SELECT DISTINCT
                              date
                          FROM
                              (SELECT 
                                  s.date, s.time, s.slots, a.cnt
                              FROM
                                  appointment_slots s
                              LEFT JOIN (SELECT 
                                  date, time, COUNT(id) cnt
                              FROM
                                  appointments
                              WHERE
                                  deleted = 0
                              GROUP BY date , time) a ON a.date = s.date AND a.time = s.time
                              WHERE
                                  s.date >= NOW()
                                      AND s.date < NOW() + INTERVAL 3 MONTH
                              GROUP BY date , time
                              HAVING cnt IS NULL OR cnt < slots) js
                              ORDER BY date";
                              */
      var queryStatement = "SELECT DISTINCT date FROM (SELECT s.date, s.time, s.slots, a.cnt FROM appointment_slots s LEFT JOIN (SELECT date, time, COUNT(id) cnt FROM appointments WHERE deleted = 0 GROUP BY date , time) a ON a.date = s.date AND a.time = s.time WHERE s.date >= NOW() AND s.date < NOW() + INTERVAL 3 MONTH GROUP BY date , time HAVING cnt IS NULL OR cnt < slots) js ORDER BY date";
    
    //var queryStatement = "SELECT DISTINCT date FROM appointment_slots ORDER BY date";
    
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

  getAvailableTimeSlotsForDate : function (date, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    /*
    var queryStatement = "SELECT DISTINCT
                              time
                          FROM
                              (SELECT 
                                  s.date, s.time, s.slots, a.cnt
                              FROM
                                  appointment_slots s
                              LEFT JOIN (SELECT 
                                  date, time, COUNT(id) cnt
                              FROM
                                  appointments
                              WHERE
                                  deleted = 0
                              GROUP BY date , time) a ON a.date = s.date AND a.time = s.time
                              WHERE
                                  s.date = ?
                              GROUP BY date , time
                              HAVING cnt IS NULL OR cnt < slots) js
                              ORDER BY time";
    */
    var queryStatement = "SELECT DISTINCT time FROM (SELECT s.date, s.time, s.slots, a.cnt FROM appointment_slots s LEFT JOIN (SELECT date, time, COUNT(id) cnt FROM appointments WHERE deleted = 0 GROUP BY date , time) a ON a.date = s.date AND a.time = s.time WHERE s.date = ? GROUP BY date , time HAVING cnt IS NULL OR cnt < slots) js ORDER BY time";
    //var queryStatement = "SELECT DISTINCT time FROM appointment_slots ORDER BY time";
    
    if (connection) {
      
      connection.query(queryStatement, [date], function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

  ,
  
  getAppointmentSlotsById : function (slotId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM appointment_slots WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [slotId] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  
  ,
  
  updateAppointmentSlots: function (date, time, service, slotId, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE  appointment_slots SET date = ? ,  time = ?, service = ?  WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [date, time, service, slotId] , function (err, rows, fields) {
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
  
  cancelAppointmentSlots : function (slotId, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "UPDATE appointment_slots SET deleted = 1 WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [slotId] , function (err, rows, fields) {
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
  getAllAvailableAppointmentSlots : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM (SELECT s.date, s.time, s.slots, a.cnt FROM appointment_slots s LEFT JOIN (SELECT date, time, COUNT(id) cnt FROM appointments WHERE deleted = 0 GROUP BY date , time) a ON a.date = s.date AND a.time = s.time WHERE s.date >= NOW() AND s.date < NOW() + INTERVAL 3 MONTH GROUP BY date , time HAVING cnt IS NULL OR cnt < slots) js ORDER BY date";
    
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
        
        callback(err, rows);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }

}

module.exports.appointmentSlotsModel = appointmentSlotsModel; 