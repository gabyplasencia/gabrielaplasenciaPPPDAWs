<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $table = 'scores';
    protected $fillable = ['user_id', 'category', 'mode', 'score'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

