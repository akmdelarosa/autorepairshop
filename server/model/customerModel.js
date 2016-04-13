
var connectionProvider = require('../mysqlConnectionStringProvider.js');
var moment = require('moment');
var bcrypt   = require('bcrypt-nodejs');

var customerModel = {
  
  createCustomer : function (data, callback) {
    
    var insertStatement = "INSERT INTO customers SET?";
    
    data.created = moment().format('YYYY-MM-DD HH:mm:ss')
    
    console.log("data passed to createCustomer below");
    console.log(data);
    
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    
    if (connection) {
      
      connection.query(insertStatement, data, function (err, result) {
        
        if (err) { throw err; }
        
        callback(result);
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
};

module.exports.customerModel = customerModel; 