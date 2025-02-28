<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $user_id
 * @property string $game_mode
 * @property string $category
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 */
class Score extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'game_mode', 'category', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
