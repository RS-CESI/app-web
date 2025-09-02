# Dockerfile pour le développement Next.js avec hot reload
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev"]