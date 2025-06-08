require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

const dataBase = require('./db.js');

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.get('/api/all', function(req, res) {
  res.json(dataBase.cargarDatos());
});

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  const ultRegistro = dataBase.ultimoRegistro();

  dataBase.guardarUnDato({
    original_url: url,
    short_url: ultRegistro.short_url + 1
  });  
  
  res.json(dataBase.ultimoRegistro());
});

app.get('/api/shorturl/:id', (req, res) => {
  const db = dataBase.cargarDatos(); // Carga un array de objetos
  console.log('Datos cargados:', db);
  
  const idBuscado = parseInt(req.params.id, 10); // Asegura que sea un número. (base 10 es sistema decimal)
  
  if (isNaN(idBuscado)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const encontrado = db.find(entry => entry.short_url === idBuscado);

  if (!encontrado) {
    return res.status(404).json({ error: 'No short URL found for the given input' });
  }

  res.redirect(encontrado.original_url); // Redirige a la original_url
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});