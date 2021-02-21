# Projet6
Projet 6 de la formation Développeur Web Junior chez OpenClassRooms

Création d'une API sécurisée pour la société So Peckoko 

Contexte du projet

So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

Réalisation de l’API

Points de vigilance

L’entreprise ayant subi quelques attaques sur son site web ces dernières semaines, le fondateur souhaite que les données des utilisateurs soient parfaitement protégées. Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.

Exigences concernant la sécurité :

● l’API doit respecter le RGPD et les standards OWASP ;
● le mot de passe des utilisateurs doit être chiffré ;
● 2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
● la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
● l’authentification est renforcée sur les routes requises ;
● les mots de passe sont stockés de manière sécurisée ;
● les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

Technologies à utiliser

● framework : Express ;
● serveur : NodeJS ;
● base de données : MongoDB ;
● toutes les opérations de la base de données doivent utiliser le pack Mongoose avec
des schémas de données stricts.


Pour le Front End

Le lien du dépôt GitHub pour la partie frontend est le suivant : https://github.com/OpenClassrooms-Student-Center/dwj-projet6


Le projet a été généré avec Angular CLI version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

Development server

Démarrer ng serve pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

Pour le Back end fournit ici

Utiliser la ligne de commande nodemon server
