
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var bcrypt   = require('bcrypt-nodejs');

/*var model = require('./appModel.js');

console.log(model);

var User = model.appModel.extend({
	tableName: "users",
});

console.log(User);

var newUser = new User();

console.log(newUser.toJSON());

//newUser.set('id', 1);
//console.log(newUser.read('email'));
console.log(newUser.toJSON());
//newUser.find('all', {where: "id = 1"});
var x = newUser.find('all', {where: "id = 1"}, function(err, all) {
    console.log("all below");
		console.log(all[0]);
       
        
        return all[0];
});
//console.log(newUser.query("SELECT * from users where id = 1"));
console.log("x below");
console.log(x);
*/
var userModel = {
    
  signUpUser : function (user, callback) {
    
    var insertStatement = "INSERT INTO users SET?";
    
    var new_user = {   
        first_name : "",
        last_name : "",
        address_id : 0,
        email : user.email,
        password : this.generateHash(user.password),
        phone_number : "",
        deleted : 0,
        created : new Date()
    };
    
    console.log(new_user);
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    
    if (connection) {
      
      connection.query(insertStatement, new_user, function (err, result) {
        
        if (err) { throw err }
        
        callback(result);
        console.log('signUpUser result below');
        console.log(result)
        console.log('model below for ' + result.insertId);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  createUser : function (user, OnSuccessfulCallback) {
    
    var insertStatement = "INSERT INTO user SET?";
    
    var new_user = {   
        first_name : user.first_name,
        last_name : user.last_name,
        address_id : 0,
        email : user.email,
        password : this.generateHash(user.password),
        phone_number : user.phone_number,
        deleted : 0,
        created : new Date()
    };
    
    console.log(new_user);
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    
    if (connection) {
      
      connection.query(insertStatement, new_user, function (err, result) {
        
        if (err) { }
        
        OnSuccessfulCallback({ status : 'successful' });
        console.log(result)
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getAllUser : function (callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM users ORDER BY ID DESC";
    
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
  
  getUserById : function (userId, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM users WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [userId] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        
        callback(rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  getUserByEmail : function (email, callback) {
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM users WHERE email = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [email] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        console.log('getUserByEmail rows above')
        
        callback(err, rows);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  
  ,
  
  updateUser: function (userUpdates, id, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

    var queryStatement = "UPDATE  users SET ? WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [userUpdates, {id : id}] , function (err, rows, fields) {
        if (err) { throw err; }
        
        if (rows) {
          
          
          callback({ status : 'successful'});
        }
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
  ,
  
  deleteUserById : function (userId, callback) {
    
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "DELETE  FROM  users   WHERE id = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [userId] , function (err, rows, fields) {
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
  
  // generating a hash
  generateHash : function(password) {
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  ,
  
  // checking if password is valid
 validPassword : function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  ,
  
  getVehicles : function(userId, callback) {
      var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
      var queryStatement = "SELECT v.year, v.make, v.model, v.mileage_read, MAX(s.completed) last_serviced FROM vehicles v INNER JOIN users_vehicles uv ON uv.vehicle_id = v.id LEFT JOIN service_history s ON s.vehicle_id = v.id AND uv.user_id WHERE uv.user_id = ? GROUP BY v.id";
    
      if (connection) {
      
        connection.query(queryStatement, [userId] , function (err, rows, fields) {
          if (err) { throw err; }
          console.log(rows);
        
          if (rows) {
          
            callback(rows);
          }
        });
      
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      }
  },
  
  getAppointments: function(userId, callback) {
      var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
	  var queryStatement = "SELECT a.date, a.time, a.year, a.make,a.model, s.name FROM appointments a INNER JOIN appointment_services aps ON aps.appointment_id = a.id INNER JOIN services s ON s.id = aps.service_id WHERE a.user_id = ? ORDER BY a.date DESC";
      if (connection) {
      
        connection.query(queryStatement, [userId] , function (err, rows, fields) {
          if (err) { throw err; }
          console.log(rows);
        
          if (rows) {
          
            callback(rows);
          }
        });
      
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      }
  },
  
  getServiceHistory: function(userId, callback) {
      var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
	  var queryStatement = "SELECT v.year, v.make, v.model, sh.mileage_read, sh.completed AS `date`, IFNULL(a.id, 0) scheduled, s.name FROM service_history sh INNER JOIN vehicles v ON v.id = sh.vehicle_id LEFT JOIN appointments a ON a.id = sh.appointment_id INNER JOIN services s ON s.id = sh.service_id WHERE sh.user_id = ? GROUP BY sh.id ORDER BY sh.completed DESC";
      if (connection) {
      
        connection.query(queryStatement, [userId] , function (err, rows, fields) {
          if (err) { throw err; }
          console.log(rows);
        
          if (rows) {
          
            callback(rows);
          }
        });
      
        connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
      }
  }

}

module.exports.userModel = userModel; 