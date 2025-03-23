<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountriesSeeder extends Seeder
{
    public function run()
    {
        $jsonPath = database_path('data/countries.json');

        $countries = json_decode(file_get_contents($jsonPath), true);

        foreach ($countries as $country) {
            Country::updateOrCreate(
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
