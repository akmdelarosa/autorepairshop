
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var bcrypt   = require('bcrypt-nodejs');

var adminUserModel = {
  
  getUserByEmail : function (email, callback) {
    console.log("getUserByEmail admin called");
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM users WHERE role = 'admin' and email = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [email] , function (err, rows, fields) {
       
        callback(err, rows);
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
}

module.exports.adminUserModel = adminUserModel; 