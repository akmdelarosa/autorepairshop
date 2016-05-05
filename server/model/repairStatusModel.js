
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var repairStatusModel = {
  
  getAllRepairStatus : function(callback) {
    var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
    var queryStatement = "SELECT * FROM repair_status where deleted = 0";
    if (connection) {
      
      connection.query(queryStatement, function (err, rows, fields) {
                
        callback(err,rows);
        
      });
      
      connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
    }
  }
}

module.exports.repairStatusModel = repairStatusModel; 