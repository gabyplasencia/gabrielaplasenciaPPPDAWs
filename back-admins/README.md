***COMANDOS***

//composer create-project laravel/laravel mi-proyecto (esta no especifica la version de laravel) 
//composer create-project laravel/laravel nombre-del-proyecto "^10.0" (esta si especifica la version de laravel, el 10 es la ultima version compatible con krlove)
//php artisan make:migration add_columns_to_productos_table --table=productos (agregar columna a una tabla)
//php artisan make:migration migracionproductos --create=productos (crear una tabla)
//php artisan make:controller ProductoRESTController --resource --model=Producto --api (crear rutas)
En routes/api.php:
//Route::apiResource('tasks', 'TasksController'); (crear rutas para mis metodo en modeloREST)
//php artisan make:resource TaskDTO (crearDTOs)

//composer require krlove/eloquent-model-generator --dev 
Añadir lo siguiente a config->app.php en la seccion de providers 
//Krlove\EloquentModelGenerator\Provider\GeneratorServiceProvider::class 
//php artisan krlove:generate:model Producto --table-name=productos --no-timestamps (especificas la tabla y que no usas timestamps, si no tengo que poner a mano timestapms = false)

//composer require laravel/breeze:* --dev 
//php artisan breeze:install

//composer require tymon/jwt-auth
Añadir en config/app.php, en la parte de ‘providers’:
//Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
//php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" (crear el fichero config/jwt.php)
//php artisan jwt:secret (añade al .env la clave secreta)
Añadir en config/auth.php en la parte de guards debajo de web:
'api' => [
'driver' => 'jwt',
'provider' => 'users',
],