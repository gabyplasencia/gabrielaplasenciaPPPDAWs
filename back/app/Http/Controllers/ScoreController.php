<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|in:flags,capitals',
            'mode'     => 'required|in:infinity,turbo',
            'score'    => 'required|integer|min:0',
        ]);

        $user = Auth::user();

        // Insertar el nuevo score
        $newScore = Score::create([
            'user_id'  => $user->id,
            'category' => $request->category,
            'mode'     => $request->mode,
            'score'    => $request->score,
        ]);

        // Obtener los scores existentes para ese user/categoría/modo
        $scores = Score::where('user_id', $user->id)
            ->where('category', $request->category)
            ->where('mode', $request->mode)
            ->orderByDesc('score')
            ->get();

        // Si hay más de 3, eliminar los más bajos
        if ($scores->count() > 3) {
            $scores->slice(3)->each->delete();
        }

        return response()->json(['message' => 'Score guardado correctamente'], 201);
    }

    public function userScores()
    {
        $user = Auth::user();

        $scores = Score::where('user_id', $user->id)
            ->orderBy('category')
            ->orderBy('mode')
            ->orderByDesc('score')
            ->get()
            ->groupBy(function ($score) {
                return $score->category . '-' . $score->mode;
            });

        return response()->json($scores);
    }
}
