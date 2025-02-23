<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $name
 * @property string $capital
 * @property string $iso2
 * @property string $flag
 * @property string $created_at
 * @property string $updated_at
 */
class Country extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'capital', 'iso2', 'flag'];
}
