
var connectionProvider = require('../mysqlConnectionStringProvider.js');
var moment = require('moment');

var appointmentModel = {
	createAppointment : function (appointment, callback) {

		var insertStatement = "INSERT INTO appointments SET?";
		appointment.created = moment().format('YYYY-MM-DD HH:mm:ss');
		

		var appointment_data = {
			date : moment(appointment.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
			time : moment(appointment.time, 'LT').format('HH:mm:ss'),
			year : appointment.year,
			make : appointment.make,
			model : appointment.model,
			created : moment().format('YYYY-MM-DD HH:mm:ss')
		};

		if (appointment.user_id) {
			appointment_data.user_id = appointment.user_id;
		} else {
			appointment_data.customer_id = appointment.customer_id;
		}

		console.log("appointment query below");
		console.log(appointment_data);
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		if (connection) {

			connection.query(insertStatement, appointment_data, function (err, result) {
			  
			  if (err) { return next(err); }
			  
			  console.log(result);
			  callback(result);
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}

	    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
	}

	,

	getAppointment : function (id, callback) {
	  var queryStatement = "SELECT a.id,a.year,a.make,a.model,IFNULL(c.first_name, u.first_name) AS first_name,IFNULL(c.last_name, u.last_name) AS last_name,IFNULL(c.email, u.email) AS email,IFNULL(c.phone_number, u.phone_number) AS phone_number,s.name AS service_name,s.description AS service_description,a.date,a.time FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN appointment_services s1 ON s1.appointment_id = a.id LEFT JOIN services s ON s.id = s1.service_id WHERE a.id = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [id], function (err, rows, fields) {
        
          if (err) { return next(err); }
          
          console.log(rows);
          callback(rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}

	,

	createOwnerInformation : function (data, callback) {
		data.created = moment().format('YYYY-MM-DD HH:mm:ss');
		console.log(data);
		var insertCustomerStatement = "INSERT INTO customers SET?";
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		if (connection) {

			connection.query(insertCustomerStatement, data, function (err, result) {
			  
			  if (err) { return next(err); }
			  
			  console.log(result);
			  callback(result);
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	}
	,

	cancelAppointment : function (id, callback) {
	  var queryStatement = "UPDATE appointments SET deleted = 1 WHERE id = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [id], function (err, result) {
        
          if (err) { return next(err); }
          
          console.log(result);
          callback(result);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	
	getAllAppointments : function (callback) {
		var queryStatement = "SELECT a.*, IFNULL(c.first_name, u.first_name) first_name, IFNULL(c.last_name, u.last_name) last_name FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id ORDER BY date DESC";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, function (err, rows, fields) {
        
          if (err) { return next(err); }
          
          console.log(rows);
          callback(rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	
	getAllAppointmentsServices : function (callback) {
		var queryStatement = "SELECT aps.appointment_id, s.name FROM appointment_services aps INNER JOIN services s ON s.id = aps.service_id";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, function (err, rows, fields) {
        
          if (err) { return next(err); }
          
          console.log(rows);
          callback(rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	
	getAppointmentDetailsById : function (id, callback) {
		var queryStatement = "SELECT a.year,a.make,a.model,IFNULL(c.first_name, u.first_name) AS first_name,IFNULL(c.last_name, u.last_name) AS last_name,IFNULL(c.email, u.email) AS email,IFNULL(c.phone_number, u.phone_number) AS phone_number,s.name AS service_name,s.description AS service_description,a.date,a.time FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN appointment_services s1 ON s1.appointment_id = a.id LEFT JOIN services s ON s.id = s1.service_id WHERE a.id = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [id], function (err, rows, fields) {
        
         if (err) { return next(err); }
          
          console.log(rows);
          callback(rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	getAppointmentsByDate: function(date,callback) {
		var queryStatement = "SELECT a.*, IFNULL(c.first_name, u.first_name) first_name, IFNULL(c.last_name, u.last_name) last_name FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id WHERE a.date = ? ORDER BY time ASC";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [date], function (err, rows, fields) {
					
					if (err) { return next(err); }
        
          callback(err,rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	getAppointmentsServicesByDate : function (date, callback) {
		var queryStatement = "SELECT aps.appointment_id, s.name FROM appointment_services aps INNER JOIN services s ON s.id = aps.service_id INNER JOIN appointments a ON a.id = aps.appointment_id WHERE a.date = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [date], function (err, rows, fields) {
        	
					if (err) { return next(err); }
					
          callback(err, rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	getAvailableAppointmentsByDate: function(date,callback) {
		var queryStatement = "SELECT a.*, IFNULL(c.first_name, u.first_name) first_name, IFNULL(c.last_name, u.last_name) last_name FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN service_history sv on sv.appointment_id = a.id WHERE sv.id IS NULL AND a.date = ? ORDER BY time ASC";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [date], function (err, rows, fields) {
					
					if (err) { return next(err); }
        
          callback(err,rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,
	getAvailableAppointmentsServicesByDate : function (date, callback) {
		var queryStatement = "SELECT aps.appointment_id, s.name FROM appointment_services aps INNER JOIN services s ON s.id = aps.service_id INNER JOIN appointments a ON a.id = aps.appointment_id LEFT JOIN service_history sv on sv.appointment_id = a.id WHERE sv.id IS NULL AND a.date = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [date], function (err, rows, fields) {
        	
					if (err) { return next(err); }
					
          callback(err, rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
	,

	getAppointmentDataForServiceById : function (id, callback) {
	  var queryStatement = "SELECT a.id as appointment_id,a.year,a.make,a.model,IFNULL(c.first_name, u.first_name) AS first_name,IFNULL(c.last_name, u.last_name) AS last_name,IFNULL(c.email, u.email) AS email,IFNULL(c.phone_number, u.phone_number) AS phone_number, IFNULL(c.id,0) AS customer_id, IFNULL(u.id,0) AS user_id, s.id AS service_id, s.name AS service_name,s.description AS service_description,a.date,a.time FROM appointments a LEFT JOIN customers c ON c.id = a.customer_id LEFT JOIN users u ON u.id = a.user_id LEFT JOIN appointment_services s1 ON s1.appointment_id = a.id LEFT JOIN services s ON s.id = s1.service_id WHERE a.id = ?";
	  var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      if (connection) {
        connection.query(queryStatement, [id], function (err, rows, fields) {
        
          if (err) { return next(err); }
          
          console.log(rows);
          callback(rows);

        });
      }
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
	}
};

module.exports.appointmentModel = appointmentModel; 