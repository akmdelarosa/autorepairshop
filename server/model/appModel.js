var mysqlModel = require('mysql-model');
var connectionProvider = require('../mysqlConnectionStringProvider.js');
var mysqlConnectionString = require('../mysqlConnectionString.js');
var appModel = mysqlModel.createConnection(
    //connectionProvider.mysqlConnectionStringProvider.getMySqlConnection()
    mysqlConnectionString.mysqlConnectionString.connection.dev
);

/*var mysqlConnectionString = require('../mysqlConnectionString.js');

var appModel = {
  
  createConnection : function () {
    
    var connection = mysqlModel.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);
    
    connection.connect(function (err) {
      
      if (err) { throw err; }
      
      console.log('Connected Successfully');
    });
    return connection;
  },
  
  closeConnection : function (currentConnection) {
    
    if (currentConnection) {
      
      currentConnection.end(function (err) {
        
        if (err) { throw err; }
        
        console.log('connection closed successfully.')
      })
    }
    
  }


}*/
module.exports.appModel = appModel;