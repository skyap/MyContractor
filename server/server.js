// import express from 'express'
// import mysql from 'mysql2'
// import cors from 'cors'

// const app = express();
// app.use(cors());

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"1234",
//     database:"crud",

// })



// app.get("/",(req,res)=>{
//     console.log("FUCK");
//     // console.log(db);
//     db.connect(function(err) {
//         if (err) {
//           return res.json({Message:'Error connecting: ' + err.stack});
          
//         }
//         return res.json({Message:'Connected as id ' + connection.threadId});
//     });

//     // const sql = "SELECT * FROM contractors";
//     // db.query(sql,(err,result)=>{
//     //     if(err) return res.json({Message:"Error inside server"});
//     //     return res.json(result);
//     // })
// })

// app.listen(8081,()=>{
//     console.log("Listening");
// });



import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
const app = express();
app.use(cors());
const port = 8081;

const connection = mysql.createConnection({
  host: 'localhost', // the hostname of the MySQL server. Use 'db' if you're connecting from another Docker container
  user: 'root',
  password: '1234', // your root password you set in docker-compose.yml
  database: 'crud' // replace with your database name
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM contractors', (err, tables) => {
    if (err) {
      console.error('An error occurred while executing the query')
      console.error(err)
      res.status(500).json({ error: 'An error occurred while executing the query' });
      return
    }

    const tableNames = tables.map(table => Object.values(table)[0]);
    return res.json({ tables: tableNames });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
