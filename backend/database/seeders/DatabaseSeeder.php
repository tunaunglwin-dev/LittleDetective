<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Prototype Admin',
                'email' => 'admin@littledetective.test',
                'role' => 'admin',
                'provider' => null,
            ],
            [
                'name' => 'Demo Student',
                'email' => 'student@littledetective.test',
                'role' => 'user',
                'provider' => null,
            ],
            [
                'name' => 'Aye Chan',
                'email' => 'aye.chan@example.test',
                'role' => 'user',
                'provider' => 'google',
            ],
            [
                'name' => 'Min Thu',
                'email' => 'min.thu@example.test',
                'role' => 'user',
                'provider' => null,
            ],
            [
                'name' => 'Nilar Win',
                'email' => 'nilar.win@example.test',
                'role' => 'user',
                'provider' => 'google',
            ],
            [
                'name' => 'Htet Aung',
                'email' => 'htet.aung@example.test',
                'role' => 'user',
                'provider' => null,
            ],
            [
                'name' => 'Su Myat',
                'email' => 'su.myat@example.test',
                'role' => 'admin',
                'provider' => null,
            ],
            [
                'name' => 'Kaung Htet',
                'email' => 'kaung.htet@example.test',
                'role' => 'user',
                'provider' => 'google',
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make('password'),
                    'role' => $user['role'],
                    'provider' => $user['provider'],
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
