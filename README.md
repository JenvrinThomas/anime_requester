🎌 Anime Requester

Projet de groupe en JavaScript / HTML / CSS permettant d’interroger une base de données d’animes via une API et d’afficher dynamiquement les résultats.

🚀 Objectifs pédagogiques

Utiliser une API conformément à sa documentation
Effectuer des requêtes HTTP (Fetch API)
Manipuler le DOM pour intégrer dynamiquement du contenu
Interagir avec la mise en forme via JavaScript
Structurer le code en modules et respecter les bonnes pratiques

🛠️ Technologies utilisées

JavaScript,HTML5,CSS3,Git / GitHub,Visual Studio Code

📌 Fonctionnalités
Version 1 (V1)

Formulaire de recherche par :
nom d’anime
identifiant
classement

Affichage sous forme de cartes (max. 10 résultats) avec :
titre
image (si disponible)
synopsis
genres / catégories
classement
nombre d’épisodes

Boutons :
Rechercher
Réinitialiser
Version 2 (V2)
Recherche par genre (cases à cocher / liste)
Hébergement sur GitHub Pages
Stockage de la clé API en sessionStorage
Mode clair/sombre avec persistance en sessionStorage
Interface responsive et conforme aux standards d’accessibilité WCAG AA 2.0

🔑 API utilisée

Anime DB via RapidAPI
Documentation : Quick Start Guide

⚠️ Vous devez disposer d’une clé API personnelle.

Créez un compte sur RapidAPI
Récupérez votre clé dans votre tableau de bord
Saisissez-la dans l’interface lors de la première utilisation (stockée en sessionStorage)

📂 Organisation du code

index.html → structure de la page
style.css → mise en forme (responsive, mode clair/sombre)
script/
api.js → fonctions pour requêtes API
ui.js → création et affichage des cartes
main.js → logique principale et gestion des événements

🌐 Déploiement

Accessible via GitHub Pages (lien à compléter après déploiement).

✅ Contraintes & bonnes pratiques

Code valide selon les validateurs W3C HTML & CSS
Séparation des responsabilités dans le code JavaScript
Respect des standards d’accessibilité (WCAG 2.0 AA)