const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const config = require('./config/config');

const app = express();
app.use(express.json());

const connectionPool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

app.get('/location/:key', (req, res) => {
  const key = req.params.key;
  connectionPool.query('SELECT * FROM locations WHERE pass=?', key, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
    }
  });
});

app.get('/location/card/:id/ravens', (req, res) => {
  const id = req.params.id;
  connectionPool.query('SELECT * FROM ravens WHERE location=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
    }
  });
});

app.get('/location/send/:ravenId/:id', (req, res) => {
  const id = req.params.id;
  connectionPool.query('SELECT * FROM locations WHERE id !=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin })));
    }
  });
});

app.get('/location/admin/:adminId', (req, res) => {
  connectionPool.query('SELECT * FROM locations', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name, isAdmin: el.isAdmin, pass: el.pass })));
    }
  });
});

app.get('/admin/location/:id/pass', (req, res) => {
  const id = req.params.id;

  connectionPool.query('SELECT pass FROM locations WHERE id=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/admin/location/:locationId/ravens', (req, res) => {
  let locationId = req.params.locationId;
  connectionPool.query('SELECT * FROM ravens WHERE location=?', locationId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.map(el => ({ id: el.id, name: el.name })));
    }
  });
});

app.get('/location/card/:locationId/messages/:status', (req, res) => {
  const id = req.params.locationId;
  const status = req.params.status;
  connectionPool.query(
    'SELECT * FROM messages WHERE locationId=? AND reading=?',
    [id, status],
    (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(data.map(el => ({ id: el.id, text: el.message })));
      }
    }
  );
});

app.get('/location/card/:locationId/message/:id', (req, res) => {
  const id = req.params.id;
  connectionPool.query('SELECT * FROM messages WHERE id=?', id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.map(el => ({ id: el.id, text: el.message, status: el.reading })));
    }
  });
});

app.post('/location/card/:locationId/message/:id/delete', (req, res) => {
  const sql = `DELETE FROM messages WHERE id=(?)`;
  connectionPool.query(sql, [req.body.id], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/location/card/:locationId/message/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE messages SET reading=(?) WHERE id=${id}`;
  connectionPool.query(sql, [req.body.reading], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
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
        res.sendStatus(204);
      }
    }
  );
});

app.post('/admin/location/:locationId/addRaven', (req, res) => {
  const sql = 'INSERT INTO ravens (name, location) VALUES (?, ?)';
  connectionPool.query(sql, [req.body.name, req.body.location], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/admin/edit/raven/:id/delete', (req, res) => {
  const sql = 'DELETE FROM ravens WHERE id=?';
  connectionPool.query(sql, req.body.id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/admin/edit/raven/:id/edit', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE ravens SET name=(?) WHERE id=${id}`;
  connectionPool.query(sql, req.body.name, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post('/admin/location/:id/editpass', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE locations SET pass=(?) WHERE id=${id}`;
  connectionPool.query(sql, req.body.pass, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.port, () => {
  console.log('Server is run');
});
