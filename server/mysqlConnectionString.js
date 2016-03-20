var mysqlConnectionString = {
  
  connection  : {
    
    dev : {
      host: 'localhost',
      user: 'angel',
      password : '',
      database : 'product_test'
    },
    
    qa : {
      host: 'localhost',
      user: 'root',
      password : 'passsword',
      database : 'product_test'
    },
    
    prod : {
      host: 'localhost',
      user: 'root',
      password : 'passsword',
      database : 'product_test'
    }
    
  }

};

module.exports.mysqlConnectionString = mysqlConnectionString;