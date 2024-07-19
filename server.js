const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Servir archivos estáticos como index.html y style.css

app.post('/list-files', (req, res) => {
  const { email, password } = req.body;

  exec(`python auth.py ${email} ${password}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error ejecutando el script de Python');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error en el script de Python');
    }

    try {
      const files = JSON.parse(stdout);
      res.json(files);
    } catch (parseError) {
      console.error(`Parse Error: ${parseError.message}`);
      res.status(500).send('Error parsing the script output');
    }
  });
});

// Manejo de la ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});