# Use uma imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia o restante do código da aplicação para dentro do contêiner
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta da aplicação (se estiver usando a porta 3000)
EXPOSE 3000

# Comando para rodar a aplicação NestJS
CMD ["npm", "run", "start:prod"]
