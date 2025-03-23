<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|string',
        ]);

        $user = $request->user();
        $user->avatar = $request->avatar;
        $user->save();

        return response()->json(['message' => 'Avatar actualizado correctamente']);
    }
}
