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
      user: 'akmdelarosa',
      password : '',
      database : 'c9'
    },
    
    prod : {
      host: 'localhost',
      user: 'akmdelarosa',
      password : '',
      database : 'c9'
    }
    
  }

};

module.exports.mysqlConnectionString = mysqlConnectionString;