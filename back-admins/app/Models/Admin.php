<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $created_at
 * @property string $updated_at
 */
class Admin extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'created_at', 'updated_at'];
}
