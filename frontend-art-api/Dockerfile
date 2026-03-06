# Usa una imagen oficial de Node.js ligera
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del frontend
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Levanta el servidor de desarrollo
CMD ["npm", "run", "dev"]
