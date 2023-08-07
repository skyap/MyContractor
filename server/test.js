import mysql from 'mysql2'

// const connection = mysql.createConnection({
//   host: 'localhost', // the hostname of the MySQL server. Use 'db' if you're connecting from another Docker container
//   user: 'root',
//   password: '1234', // your root password you set in docker-compose.yml
//   database: 'crud' // replace with your database name
// });

// connection.connect(err => {
//   if (err) {
//     console.error('An error occurred while connecting to the DB')
//     console.error(err)
//     return
//   }

//   console.log('Connected to the database.');


//   connection.query('SHOW TABLES', (err, tables) => {
//     if (err) {
//       console.error('An error occurred while executing the query')
//       console.error(err)
//       return
//     }
    
//     console.log('Tables in database:');
//     tables.forEach((table) => {
//       // Each "table" object will have a single property. The property's name will be of the form "Tables_in_<database name>"
//       // We can use `Object.values()` to get the table name without knowing the property's name
//       console.log(Object.values(table)[0]);
//     });
//   });
// });

// // Don't forget to close the connection when done
// connection.end(err => {
//   if (err) {
//     console.error('An error occurred while closing the connection')
//     console.error(err)
//     return
//   }

//   console.log('Connection successfully closed');
// });




const connection = mysql.createConnection({
  host: 'localhost', // the hostname of the MySQL server. Use 'db' if you're connecting from another Docker container
  user: 'root',
  password: '1234', // your root password you set in docker-compose.yml
  database: 'crud' // replace with your database name
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB')
    console.error(err)
    return
  }

  console.log('Connected to the database.');

  // Query to show all tables
  connection.query('SELECT * FROM contractors', (err, tables) => {
    if (err) {
      console.error('An error occurred while executing the query')
      console.error(err)
    } else {
      console.log('Tables in database:');
      tables.forEach((table) => {
        console.log(Object.values(table)[0]);
      });
    }

    // Now close the connection
    connection.end(err => {
      if (err) {
        console.error('An error occurred while closing the connection')
        console.error(err)
      } else {
        console.log('Connection successfully closed');
      }
    });
  });
});
