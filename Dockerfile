FROM node:20-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости (чистая установка)
RUN npm ci

# Копируем исходники (кроме того, что в .dockerignore)
COPY . .

# Порт, который слушает Vite dev-сервер
EXPOSE 5173

# Запуск в режиме разработки
CMD ["npm", "run", "dev"]