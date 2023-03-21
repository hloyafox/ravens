const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const connectionPool = mysql.createPool({
  host: '127.0.0.1',
  user: 'admin',
  password: '123456',
  database: 'ravens',
});

app.get('/location/:key', (req, res) => {
  const key = req.params.key;
  connectionPool.query('SELECT * FROM locations WHERE pass=?', key, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
      console.log(data);
    }
  });
});

app.get('/location/card/:id/ravens', (req, res) => {
  const id = req.params.id;
  connectionPool.query('SELECT * FROM ravens WHERE location=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
      console.log(data);
    }
  });
});

app.get('/location/send/:ravenId/:id', (req, res) => {
  const id = req.params.id;
  connectionPool.query('SELECT * FROM locations WHERE id !=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
      console.log(data);
    }
  });
});

app.post('/location/card/:id/ravens/send', (req, res) => {
  const sql = 'INSERT INTO messages (message, ravenId, locationId, reading) VALUES (?, ?, ?, ?)';
  connectionPool.query(
    sql,
    [req.body.text, req.body.ravenId, req.body.locationId, req.body.reading],
    (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log(data);
        res.sendStatus(204);
      }
    }
  );
});

app.post('/location/card/:id/ravens/change', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE ravens SET location=(?) WHERE id=${id}`;
  connectionPool.query(sql, [req.body.newId], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.listen(5999, () => {
  console.log('Server is run');
});
