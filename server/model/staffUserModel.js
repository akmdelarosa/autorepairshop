
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var bcrypt   = require('bcrypt-nodejs');

var staffUserModel = {
  
  getUserByEmail : function (email, callback) {
    console.log("getUserByEmail staff called");
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM users WHERE role = 'staff' and email = ?";
    
    if (connection) {
      
      connection.query(queryStatement, [email] , function (err, rows, fields) {
        
        if (err) { throw err; }
        
        
        console.log(rows);
        console.log('getUserByEmail rows above staff')
        
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

module.exports.staffUserModel = staffUserModel; 