# Prueba_Junior

## Frontend

Comandos instalación
```
npm create vite@latest client --template react
cd client
npm install
npm install bootstrap
```

## Backend 
```
mkdir server
cd server
npm init -y
npm install express
npm install --save-dev nodemon
```

## Instalar PostgreSQL

```
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=env \
  -e POSTGRES_USER=Andres \
  -e POSTGRES_DB=prueba \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  -d postgres
  
```