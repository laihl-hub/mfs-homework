const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
  database: 'mfs_db'
});

connection.query(
    'SELECT * FROM `student` ',
    function(err, results, fields) {
        if(err){
            console.log(err)
        }
       
      console.log(results); // results contains rows returned by server
    //   console.log(fields); 
      // fields contains extra meta data about results, if available
    }
  );

  connection.query(
    'SELECT * FROM `student` WHERE `Sname` = ? ',
    ['王芳'],
    function(err, results) {
        console.log('-------------------------');
        if(err){
            console.log(err);
        }
      console.log(results);
    }
  );