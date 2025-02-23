<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Pais;

class PaisSeeder extends Seeder
{
    public function run()
    {
        $jsonPath = database_path('data/countries.json');

        $countries = json_decode(file_get_contents($jsonPath), true);

        foreach ($countries as $country) {
            Pais::updateOrCreate(
                ['id' => $country['id']],
                [
                    'name' => $country['name'],
                    'capital' => $country['capital'] ?? "None",
                    'iso2' => $country['iso2'],
                    'flag' => "https://flagcdn.com/" . strtolower($country['iso2']) . ".svg"
                ]
            );
        }
    }
}

