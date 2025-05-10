<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ScoreController;

// 🟢 Rutas públicas
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // 🔵 Ruta para verificar email (enlace desde Mailtrap)
    Route::get('verify-email/{id}', [AuthController::class, 'verifyEmail'])->name('verification.verify')->middleware('signed'); //;

    // 🔒 Rutas protegidas por JWT
    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

// Rutas accesible con JWT, pero fuera del grupo "auth"
Route::middleware('auth:api')->get('/countries/all', [CountryController::class, 'countries']);
Route::middleware('auth:api')->post('/modify-avatar', [AvatarController::class, 'updateAvatar']);
Route::middleware('auth:api')->post('/scores', [ScoreController::class, 'store']);
Route::middleware('auth:api')->get('/scores', [ScoreController::class, 'userScores']);

// 🔐 Rutas solo para administradores
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/countries', [CountryController::class, 'index']);
    Route::post('/countries', [CountryController::class, 'store']);
    Route::put('/countries/{id}', [CountryController::class, 'update']);
    Route::delete('/countries/{id}', [CountryController::class, 'destroy']);
});
