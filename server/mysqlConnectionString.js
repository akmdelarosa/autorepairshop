var mysqlConnectionString = {
  
  connection  : {
    
    dev : {
      host: 'localhost',
      user: 'angel',
      password : '',
      database : 'autoshop'
    },
    
    qa : {
      host: 'localhost',
      user: 'akmdelarosa',
      password : '',
      database : 'c9'
    },
    
    prod : {
      host: 'us-cdbr-iron-east-04.cleardb.net',
      user: 'b4966a8708dd49',
      password : 'efbe9ad0',
      database : 'heroku_3a39c43265af859'
    }
    
  }

};

module.exports.mysqlConnectionString = mysqlConnectionString;