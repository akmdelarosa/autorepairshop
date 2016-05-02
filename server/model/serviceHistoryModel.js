
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var serviceHistoryModel = {
  
  getServiceHistoryById : function(id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM sevice_history where id = ?";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) { return next(err); }
        
        
        console.log(rows[0]);
        
        callback(rows[0]);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  },
  
  createServiceHistory : function(appointment_id, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "INSERT INTO service_history (start_date, service_id,appointment_id,user_id,customer_id,mileage_read,vehicle_id,status_id, created) SELECT start_date, service_id,appointment_id,user_id,customer_id,mileage_read,vehicle_id,13,NOW() FROM (SELECT a.date as start_date, a.id as appointment_id,v.mileage_read,v.id as vehicle_id, IFNULL(c.id,0) AS customer_id, IFNULL(u.id,0) AS user_id, s.id AS service_id FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN appointment_services s1 ON s1.appointment_id = a.id LEFT JOIN services s ON s.id = s1.service_id LEFT JOIN serviced_vehicles v ON v.year = a.year AND v.make = a.make AND v.model = a.model WHERE a.id = ?) a";
    if (connection) {
      
      connection.query(queryStatement, [appointment_id], function (err, result) {
        
        if (err) {
          console.log(err); 
          return next(err); 
        }

        console.log(result);
        callback(result);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  getServiceHistoryByDate : function(date, callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    /*
        SELECT 
            a.id AS appointment_id,
            v.year,
            v.make,
            v.model,
            IFNULL(c.first_name, u.first_name) AS first_name,
            IFNULL(c.last_name, u.last_name) AS last_name,
            IFNULL(c.email, u.email) AS email,
            IFNULL(c.phone_number, u.phone_number) AS phone_number,
            IFNULL(c.id, 0) AS customer_id,
            IFNULL(u.id, 0) AS user_id,
            s.name AS service_name,
            s.description AS service_description,
            s.id AS service_id,
            a.date,
            a.time
        FROM
            service_history sh
                INNER JOIN
            appointments a ON a.id = sh.appointment_id
                LEFT JOIN
            customers c ON c.id = a.customer_id
                LEFT JOIN
            users u ON u.id = a.user_id
                LEFT JOIN
            appointment_services s1 ON s1.appointment_id = a.id
                INNER JOIN
            services s ON s.id = s1.service_id
                INNER JOIN
            serviced_vehicles v ON v.id = sh.vehicle_id
        WHERE
            sh.completed_date IS NULL
                && sh.start_date <= ?;
    */
    var queryStatement = "SELECT sh.id, v.vin, a.id as appointment_id, v.year,v.make,v.model,IFNULL(c.first_name, u.first_name) AS first_name,IFNULL(c.last_name, u.last_name) AS last_name,IFNULL(c.email, u.email) AS email,IFNULL(c.phone_number, u.phone_number) AS phone_number, IFNULL(c.id,0) as customer_id, IFNULL(u.id,0) as user_id, s.name AS service_name,s.description AS service_description,s.id as service_id, a.date,a.time FROM service_history sh INNER JOIN appointments a ON a.id = sh.appointment_id LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN appointment_services s1 ON s1.appointment_id = a.id INNER JOIN services s ON s.id = s1.service_id INNER JOIN serviced_vehicles v on v.id = sh.vehicle_id WHERE sh.completed_date is NULL && sh.start_date <= ?";
    if (connection) {
      
      connection.query(queryStatement, [date], function (err, rows, fields) {
        
        if (err) {
          return next(err); 
        }

        console.log(rows);
        callback(rows);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  updateStatus: function (id, status, callback) {
    var queryStatement = "UPDATE service_history sh, repair_status rs SET sh.status_id = rs.id WHERE sh.id = ? AND rs.status = ?";
    if (connection) {
      
      connection.query(queryStatement, [id,status], function (err, rows, fields) {
        
        if (err) {
          return next(err); 
        }

        callback({status: 'success'});
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  markCompleted: function (id, callback) {
    var queryStatement = "UPDATE service_history sh, repair_status rs SET sh.status_id = rs.id, completed_date = DATE_FORMAT(NOW(),'%Y-%m-%d') WHERE sh.id = ? AND rs.status = 'completed'";
    if (connection) {
      
      connection.query(queryStatement, [id], function (err, rows, fields) {
        
        if (err) {
          return next(err); 
        }

        callback({status: 'success'});
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.serviceHistoryModel = serviceHistoryModel; 