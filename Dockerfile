FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite dev server должен слушать все интерфейсы, а не только localhost
EXPOSE 5173

# Запуск с флагами для работы в Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
