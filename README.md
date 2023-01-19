# README

## SETUP

Voici les informations pour initialiser le projet sur votre machine.
Il s'agit d'une application React hydratée par un API Rails [vous trouverez ici](https://github.com/benoitbarges/kinoba-technical-test). La version 17 de React est utilisée, avec Node `16.13.1`

Les différentes étapes sont les suivantes :
1. Cloner le repository
2. Fetcher et basculer sur la branche `kinoba-technical-test`
3. Lancer en console `yarn install`
4. Seeder et lancer l'API sur le port `3000`
5. Lancer en console `yarn start` pour faire tourner un serveur local (port `3001`par défaut)

## Contexte

Cette application a été conçue pour un test technique dont voici les principales fonctionnalités demandées :
1. Mettre en place une API REST Rails
2. Ajouter la possibilité de créer un compte, de se connecter et se déconnecter
3. En tant qu’utilisateur connecté, je veux pouvoir ajouter/supprimer un pokémon à la liste
de mes Pokémons capturés
4. En tant qu’utilisateur connecté, je veux pouvoir filtrer la liste des pokémons par pokémons capturés / non-capturés / date de capture
5. En tant que visiteur, je veux pouvoir voir la liste complète des pokémons de toutes les
générations avec une pagination de 10 par 10 pokémons (scroll infini)
6. En tant qu’utilisateur connecté, je veux pouvoir partager un lien public vers mon Pokédex
pour consultation

Ce repository était déjà existant, le but de ce test était de rajouter des features, et de livrer les améliorations sous la forme d'une Pull Request.

## Login 

Vous devez d'abord effectuer un sign up pour vous connecter. Le backend va nous renvoyer un Json Web Token (JWT) ([explication de son fonctionnement sur le repo API](https://github.com/benoitbarges/kinoba-technical-test/blob/main/README.md#login)).
Une fois récupérer, il faut utiliser ce token pour authentifier chaque requête envpyer au backend. J'ai décidé de le conserver dans le `localStorage` du browser par soucis de rapidité et simplicité, mais si cette application était vouée à être utilisée et déployée en production, j'opterais plutôt pour conserver le token dans les cookies du browser pour mieux se protéger des attaques (XSS & CSRF).

Pour gérer les différentes requêtes, j'ai utilisé la librairie `axios`. On peut utiliser des `interceptors`, que j'ai configuré dans le fichier `PrivateRoute.js`. Cela permet de mettre le token dans les headers de chacune des requêtes HTTP. On l'utilisera également pour gérer les erreurs `401` quand le token est expiré (paramétré sur 1 jour sur l'API) pour rediriger l'utilisateur sur le formulaire de sign in.

Au moment de la déconnexion, le token supprimé du `localStorage`.

## Features

1) Lister
La page principale est l'index des pokémons par génération. Pour la pagination et le scroll infini, j'ai utilisé la librairie `react-infinite-scroller`. Elle nous permet de gérer facilement les requêtes supplémentaires.

2) Filtrer
On peut filter par pokémons attrapés ou non, et par ordre de capture (du plus récent au plus ancien et inversement). La pagination est également présente lorsqu'on filtre, et les différents `state` sont gérer par le hook `useReducer` de React.

3) Marquer comme attrapé
Pour cela il faut aller sur la show d'un pokemon `/pokemons/:id`. Une requête `POST` ou `DELETE` est envoyée au backend suivant si le pokemon est déjà marqué comme attrapé.

4) Partager son pokedex
Sur l'index des pokemons, un boutton pour copier son lien est disponible, il se construit de la sorte `http://localhost:3001/pokedex/:trainerId`. La page de partage n'étant pas dans la layout privé, on peut donc y accéder sans être authentifié. Le layout privé est géré via React Router (V5).

