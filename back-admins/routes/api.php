<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas protegidas con JWT
Route::middleware('auth:api')->group(function () {
    Route::get('/protected-route', function () {
        return response()->json(['message' => 'Ruta protegida con JWT']);
    });
});

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']); // Registro de usuario
    Route::post('login', [AuthController::class, 'login']); // Inicio de sesión

    Route::middleware('auth:api')->group(function () { // JWT protegido
        Route::post('logout', [AuthController::class, 'logout']); // Cerrar sesión
        Route::get('me', [AuthController::class, 'me']); // Datos del usuario autenticado
        Route::post('refresh', [AuthController::class, 'refresh']); // Refrescar token
    });
});




