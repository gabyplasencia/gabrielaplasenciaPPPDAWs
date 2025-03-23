<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);

        // Usuario normal
        User::create([
            'name' => 'User Test',
            'email' => 'user@example.com',
            'password' => Hash::make('user123'),
            'email_verified_at' => now(),
            'is_admin' => false,
        ]);
    }
}
