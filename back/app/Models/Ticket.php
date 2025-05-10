<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'description', 'status', 'taken_by'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function takenBy()
    {
        return $this->belongsTo(User::class, 'taken_by');
    }
}

