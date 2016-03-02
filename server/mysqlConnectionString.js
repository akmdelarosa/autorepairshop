var mysqlConnectionString = {
  
  connection  : {
    
    dev : {
      host: 'localhost',
      user: 'angel',
      password : '',
      database : 'productmanagement'
    },
    
    qa : {
      host: 'localhost',
      user: 'root',
      password : 'passsword',
      database : 'productmanagement'
    },
    
    prod : {
      host: 'localhost',
      user: 'root',
      password : 'passsword',
      database : 'productmanagement'
    }
    
  }

};

module.exports.mysqlConnectionString = mysqlConnectionString;