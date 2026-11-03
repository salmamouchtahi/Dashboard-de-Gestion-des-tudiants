const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ------------------ ROUTES ------------------

// Route test
app.get('/', (req, res) => {
    res.send('Backend fonctionne !');
});

// ------------------ AUTHENTIFICATION ------------------

// Register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });


    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (row) return res.status(400).json({ message: "Email déjà utilisé" });

        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
            if (err) return res.status(500).json({ message: "Erreur lors de l'inscription" });
            res.json({ message: "Inscription réussie", userId: this.lastID });
        });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });

    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (!row) return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        res.json({ message: "Connexion réussie", userId: row.id });
    });
});

// ------------------ CRUD ÉTUDIANTS ------------------

// Lister tous les étudiants
app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
});

// Ajouter un étudiant
app.post('/students', (req, res) => {
    const { name, filiere } = req.body;
    if (!name || !filiere) return res.status(400).json({ message: "Nom et filière requis" });

    db.run('INSERT INTO students (name, filiere) VALUES (?, ?)', [name, filiere], function (err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Étudiant ajouté", studentId: this.lastID });
    });
});

// Modifier un étudiant
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, filiere } = req.body;

    if (!name || !filiere) return res.status(400).json({ message: "Nom et filière requis" });

    db.run(
        'UPDATE students SET name = ?, filiere = ? WHERE id = ?',
        [name, filiere, id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "Étudiant non trouvé" });
            res.json({ message: "Étudiant modifié" });
        }
    );
});

// Supprimer un étudiant
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Étudiant non trouvé" });
        res.json({ message: "Étudiant supprimé" });
    });
});
// ------------------ CRUD FILIÈRES ------------------

// Lister les filières
app.get('/filieres', (req, res) => {
  db.all('SELECT * FROM filieres', [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// Ajouter une filière
app.post('/filieres', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Nom requis" });

  db.run(
    'INSERT INTO filieres (name) VALUES (?)',
    [name],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Filière ajoutée", id: this.lastID });
    }
  );
});

// ✏️ Modifier une filière
app.put('/filieres/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Nom requis" });

  db.run(
    'UPDATE filieres SET name = ? WHERE id = ?',
    [name, id],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      if (this.changes === 0)
        return res.status(404).json({ message: "Filière introuvable" });
      res.json({ message: "Filière modifiée" });
    }
  );
});

// 🗑️ Supprimer une filière
app.delete('/filieres/:id', (req, res) => {
  const id = Number(req.params.id);

  db.run(
    'DELETE FROM filieres WHERE id = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });
      if (this.changes === 0)
        return res.status(404).json({ message: "Filière introuvable" });
      res.json({ message: "Filière supprimée" });
    }
  );
});

// ------------------ LANCEMENT DU SERVEUR ------------------
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
