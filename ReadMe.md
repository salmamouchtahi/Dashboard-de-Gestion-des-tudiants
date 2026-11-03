## Gestion des Étudiants — Dashboard Full Stack

Application web full stack de gestion des étudiants et des filières, avec authentification et tableau de bord statistique interactif.


## À propos

Ce projet a été réalisé dans le cadre du module de **développement web full stack**. Il répond à la problématique suivante :

> Comment concevoir une application web sécurisée et performante permettant la gestion efficace des étudiants et des filières, tout en respectant une architecture REST et une séparation claire entre frontend et backend ?

La digitalisation de la gestion académique limite les erreurs de la gestion manuelle, fait gagner du temps et offre une meilleure visibilité globale. L'application propose un tableau de bord accessible uniquement après authentification.

## Fonctionnalités

-**Authentification** : inscription et connexion des utilisateurs
- **Routes protégées** par un `AuthGuard` (accès au dashboard réservé aux utilisateurs connectés)
-**Gestion des étudiants** : ajout, consultation, modification, suppression (CRUD)
-  **Gestion des filières** : ajout, consultation, modification, suppression (CRUD)
-  **Statistiques dynamiques** : nombre d'étudiants et de filières, avec graphiques circulaire et en barres (Chart.js)
-  **Déconnexion** avec redirection vers la page de login
-  **Interface claire** avec barre latérale de navigation

## Architecture

Architecture **client–serveur** en trois couches :

| Couche | Technologie | Rôle |
|---|---|---|
| Présentation (Frontend) | Angular | Interface utilisateur, routing, guards |
| Logique métier (Backend) | Node.js + Express | API REST, authentification |
| Données | SQLite | Stockage relationnel |

Le frontend communique avec le backend via des requêtes HTTP (GET, POST, PUT, DELETE) au format **JSON**.

```
┌──────────────┐   HTTP / JSON   ┌──────────────────┐   SQL   ┌──────────┐
│   Angular    │ ──────────────► │ Node.js + Express │ ──────► │  SQLite  │
│  (Frontend)  │ ◄────────────── │   (API REST)      │ ◄────── │ (app.db) │
└──────────────┘                 └──────────────────┘         └──────────┘
```

## Stack technique

**Backend**
- [Node.js](https://nodejs.org/) : environnement d'exécution JavaScript côté serveur
- [Express.js](https://expressjs.com/) : framework pour les API REST
- [SQLite](https://www.sqlite.org/) via le module `sqlite3`
- `cors` : autorisation des requêtes cross-origin
- `body-parser` : gestion des requêtes JSON

**Frontend**
- [Angular](https://angular.dev/) (TypeScript) : composants, services, guards
- `HttpClient` : communication avec l'API (Observables)
- [Chart.js](https://www.chartjs.org/) : visualisation des statistiques
- `localStorage` : stockage de l'état de connexion

## Modèle de données

La base `app.db` est créée automatiquement au démarrage (tables créées si elles n'existent pas).

**`users`**

| Champ | Description |
|---|---|
| `id` | Identifiant unique |
| `email` | Email de l'utilisateur (unique) |
| `password` | Mot de passe |

**`students`**

| Champ | Description |
|---|---|
| `id` | Identifiant unique |
| `name` | Nom de l'étudiant |
| `filiere` | Filière associée |

**`filieres`**

| Champ | Description |
|---|---|
| `id` | Identifiant unique |
| `name` | Nom de la filière |

## API REST

Le serveur écoute sur le port **3000**. Chaque route renvoie du JSON avec des codes HTTP adaptés.

### Authentification

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/register` | Inscription d'un nouvel utilisateur |
| `POST` | `/login` | Connexion d'un utilisateur existant |

### Étudiants

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/students` | Liste des étudiants |
| `POST` | `/students` | Ajouter un étudiant |
| `PUT` | `/students/:id` | Modifier un étudiant |
| `DELETE` | `/students/:id` | Supprimer un étudiant |

### Filières

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/filieres` | Liste des filières |
| `POST` | `/filieres` | Ajouter une filière |
| `PUT` | `/filieres/:id` | Modifier une filière |
| `DELETE` | `/filieres/:id` | Supprimer une filière |



### Prérequis

- [Node.js](https://nodejs.org/) (version LTS recommandée) et npm
- [Angular CLI](https://angular.dev/tools/cli) : `npm install -g @angular/cli`



### 2. Lancer le backend

```bash
cd backend
npm install
node server.js
```

Le serveur démarre sur `http://localhost:3000` et crée automatiquement la base `app.db`.

### 3. Lancer le frontend

Dans un second terminal :

```bash
cd frontend
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200`.

### 4. Utilisation

1. Créer un compte via la page **Inscription**
2. Se connecter via la page **Connexion**
3. Gérer les étudiants et les filières, puis consulter les statistiques

## Structure du projet

```
.
├── backend/
│   ├── server.js        # Point d'entrée : Express, middlewares, routes REST
│   ├── database.js      # Connexion SQLite et création des tables
│   └── app.db           # Base de données SQLite
│
└── frontend/
    └── src/app/
        ├── pages/       # login, register, dashboard, students, filieres, stats
        ├── services/    # api.service.ts, auth.service.ts
        └── guards/      # Guard d'authentification
```

## Aperçu

> Ajoutez vos captures d'écran dans `docs/screenshots/` puis ajustez les chemins ci-dessous.

| Connexion | Inscription |
|---|---|
| ![Connexion](docs/screenshots/login.png) | ![Inscription](docs/screenshots/register.png) |

| Dashboard | Étudiants |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Étudiants](docs/screenshots/students.png) |

| Filières | Statistiques |
|---|---|
| ![Filières](docs/screenshots/filieres.png) | ![Statistiques](docs/screenshots/stats.png) |

## Tests réalisés

Des tests fonctionnels, accompagnés de captures d'écran, ont validé :

-  Inscription et connexion des utilisateurs
-  Opérations CRUD sur les étudiants
-  Opérations CRUD sur les filières
-  Mise à jour dynamique des statistiques après chaque modification
-  Déconnexion et blocage des routes protégées sans nouvelle authentification

##  Limites et perspectives

**Limites actuelles**
- Les mots de passe sont stockés **en clair** dans la base de données (faiblesse de sécurité) : ce projet est à but pédagogique et ne doit pas être déployé tel quel en production.
- Statistiques limitées à des indicateurs de base
- Gestion des rôles utilisateurs simple (pas de distinction administrateur / utilisateur)

**Pistes d'amélioration**
- [ ] Chiffrement des mots de passe (ex. `bcrypt`)
- [ ] Statistiques plus détaillées et interactives (graphiques avancés, indicateurs de performance)
- [ ] Gestion des rôles et des autorisations
- [ ] Déploiement sur un serveur distant



