# appli nodeJs avec Express, ejs et mysql 

Une partie authentification (enregistrement utilisateur, connection), et une partie 'blog' minimaliste, avec des simples mises en pages bootstrap. Un peu d'ajax.   

![cap](cap.png)  


## base de données :   

La base de données est basée sur une image docker mysql 8.
Le dossier mysql est à créer avant d'exécuter la commande 

``` bash
docker-compose up -d --build
``` 

## npm :  

```bash
npm init  
nodemon index.js
```
L'application est disponible en localhost, port 8080.
