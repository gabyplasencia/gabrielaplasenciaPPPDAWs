<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    public function index(Request $request)
    {
        $query = Country::query();
        
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('iso2', 'like', "%{$search}%")
                  ->orWhere('capital', 'like', "%{$search}%");
            });
        }

        return $query->select('id', 'name', 'capital', 'iso2', 'flag')
                    ->orderBy('name')
                    ->get();
    }

    public function countries()
    {
        return Country::select('id', 'name', 'capital', 'iso2', 'flag')->orderBy('name')->get();
    }

    public function update(Request $request, $id)
{
    $country = Country::findOrFail($id);
    
    $validated = $request->validate([
        'capital' => 'nullable|string',
        'iso2'    => 'required|string|size:2|unique:countries,iso2,'.$country->id,
    ]);

    $flag = 'https://flagcdn.com/' . strtolower($validated['iso2']) . '.svg';
    $validated['capital'] = $validated['capital'] ?? 'none';

    $country->update([
        'capital' => $validated['capital'],
        'iso2'    => strtoupper($validated['iso2']),
        'flag'    => $flag
    ]);

    return response()->json(['message' => 'País actualizado correctamente', 'country' => $country]);
}
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string',
            'capital' => 'nullable|string',
            'iso2'    => 'required|string|size:2|unique:countries,iso2',
        ]);

        $flag = 'https://flagcdn.com/' . strtolower($validated['iso2']) . '.svg';
        $validated['capital'] = $validated['capital'] ?? 'none';

        $country = Country::create([
            'name'    => $validated['name'],
            'capital' => $validated['capital'],
            'iso2'    => strtoupper($validated['iso2']),
            'flag'    => $flag
        ]);

        return response()->json(['message' => 'País agregado correctamente', 'country' => $country], 201);
    }

    public function destroy($id)
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return response()->json(['message' => 'País eliminado']);
    }
}

