Voici une proposition de **README.md** complète et professionnelle pour ton projet. Elle met en avant ton architecture (DAO, Validation) et la structure logique de ton API.

---

# 📚 bibliosBackend

**bibliosBackend** est une API REST robuste construite avec **Node.js** et **TypeScript**. Elle permet de gérer une bibliothèque complète : livres, auteurs, utilisateurs et le suivi des emprunts (Loans).

L'architecture repose sur un pattern **DAO (Data Access Object)** générique pour une gestion propre et centralisée des accès à la base de données **MySQL**.

---

## 🛠️ Stack Technique

* **Runtime** : Node.js
* **Langage** : TypeScript
* **Framework** : Express.js
* **Validation de données** : Zod (Schémas de données stricts)
* **Base de données** : MySQL
* **Outil de développement** : `tsx` / `nodemon`

---

## ⚙️ Installation

1. **Cloner le projet** :
```bash
git clone <url-du-repo>
cd bibliosBackend/back

```


2. **Installer les dépendances** :
```bash
npm install

```


3. **Configurer l'environnement** :
Créez un fichier `.env` à la racine du dossier `back` et inspirez-vous de la configuration suivante :
```env
PORT_SERVER=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=bibliotheque
DB_TABLE="bb"

```


4. **Lancer le serveur** :
```bash
npm run dev

```


Le serveur sera accessible sur `http://localhost:3000`.

---

## 🚀 Documentation de l'API

L'API est organisée par ressources. Chaque ressource suit une structure CRUD standard :

| Méthode | Route | Description |
| --- | --- | --- |
| **GET** | `/resource` | Récupérer la liste (supporte les filtres `req.query`) |
| **GET** | `/resource/:id` | Récupérer un élément par son ID unique |
| **POST** | `/resource/user`* | Créer une nouvelle entrée |
| **PUT** | `/resource/:id` | Mettre à jour les informations d'un élément |
| **PUT** | `/resource/:id/delete` | **Soft Delete** (Passe `isActive` à 0) |

**Note : Pour les livres, auteurs, loans, la route de création suit le nom de la ressource.*

### Ressources disponibles :

* `users` : Gestion des membres de la bibliothèque.
* `books` : Catalogue des ouvrages.
* `authors` : Répertoire des auteurs.
* `loans` : Gestion des emprunts globaux.
* `loans-detail` : Détails précis de chaque article emprunté.

---

## 🏗️ Architecture du Projet

Le projet utilise une séparation stricte des responsabilités :

1. **Routes** : Définissent les points d'entrée et dirigent vers le bon contrôleur.
2. **Controllers** : Gèrent la logique de la requête (récupération des params, appel au DAO, réponse HTTP).
3. **DAO (Data Access Object)** : Classe générique effectuant les requêtes SQL (SELECT, INSERT, UPDATE).
4. **Schemas (Zod)** : Garantissent que les données entrantes (body/query) sont valides avant traitement.

---

## 🛡️ Sécurité & Bonnes Pratiques

* **Validation Zod** : Empêche l'insertion de données corrompues ou incomplètes.
* **Soft Delete** : Aucune donnée n'est supprimée physiquement de la BDD. On utilise un flag `isActive` pour préserver l'historique des emprunts.
* **Requêtes Préparées** : Utilisation de placeholders (`?`) dans le DAO pour se prémunir contre les injections SQL.

---
