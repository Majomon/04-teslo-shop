# Descripción


## Correr en dev


1. Clonar  el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar las dependencias ```npm install```.
4. Levantar la base de datos ```docker compose up -d```.
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
    5.1 -> Si el de arriba no funciona intentar con  ```npx prisma migrate dev --name 0_init```
6. Ejecutar el seed ```npx prisma migrate deploy``.
7. Ejecutar el seed ```npm run seed``.
8. Limpiar el localStorage del navegador.
9. Correr el proyecto ```npm run dev```.

## Correr en prod