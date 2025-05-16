# Этап сборки
FROM node:20-alpine as build

# Создание директории приложения
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование всех файлов проекта
COPY . .

# Сборка приложения
RUN npm run build

# Этап production
FROM nginx:stable-alpine

# Копирование собранного приложения из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
