Instrucciones:

- instalar las dependencias de composer: composer install

- Instalar las dependencias de Node: npm install


si el comando anterior tuvo un fallo probar con: npm install --legacy-peer-deps


el archivo .env se subira en este commit para evitar configurar el entorno

la base de datos debe de estar cinectada a SQlite y esta debe de encontrarse en database/database.sqlite

compilar el proyecto con npm run dev para el frontend

correr el servidor del backend con php artisan serve o con ayuda de laravel herd / laravel homestead, el que se este usando


