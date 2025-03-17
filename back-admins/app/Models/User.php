<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * Los atributos que se pueden asignar masivamente.
     */
    protected $fillable = ['name', 'email', 'email_verified_at', 'password', 'avatar'];

    /**
     * Oculta estos atributos en JSON.
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Obtiene el identificador del JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Devuelve los claims personalizados del JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}

