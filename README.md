# Expressserver
Servidor de API de prueba implementado en ExpressJS

## Uso
* Clonar el repositorio
* Ejecutar npm install para descargar las dependencias
* Crear una base de datos en mysql con el archivo sql ubicado en conf/schema.sql
* Copiar el archivo .env.example a .env (En este archivo se encuentra la configuracion de conexion a base de datos y el puerto del servicio)
* Ejecutar node index.js y esperar a que muestre el mensaje: "Conectado a la base de datos"

## Dependencias
"bcrypt": "^3.0.2",
"body-parser": "^1.18.3",
"cors": "^2.8.5",
"dotenv": "^6.2.0",
"express": "^4.16.4",
"jsonwebtoken": "^8.4.0",
"mysql2": "^1.6.4",
"sequelize": "^4.41.2"
