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
      host: 'us-cdbr-iron-east-03.cleardb.net',
      user: 'b48c8a0d0f1b10',
      password : 'ad01b514',
      database : 'heroku_6cecfd8d370547f'
    }
    
  }

};

module.exports.mysqlConnectionString = mysqlConnectionString;