<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function updateAvatar(Request $request)
    {
        $user = Auth::user();

        // Procesar avatar subido
        if ($request->hasFile('avatar')) {
            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Eliminar avatar anterior si no es uno predeterminado
            if ($user->avatar && !in_array($user->avatar, [
                'chiken.png', 'dog.png', 'elephan.png', 
                'panda.png', 'frog.png', 'kitty.png', 
                'lion.png', 'mouse.png'
            ])) {
                Storage::delete('public/avatars/' . basename($user->avatar));
            }

            $file = $request->file('avatar');
            $filename = 'avatar_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // Guardar en storage
            $path = $file->storeAs('public/avatars', $filename);
            
            // Actualizar usuario
            $user->avatar = 'avatars/' . $filename;
            $user->save();

            return response()->json([
                'message' => 'Avatar personalizado actualizado',
                'avatar' => 'avatars/'.$filename,
                'avatar_url' => asset("storage/$filename") 
            ]);
        }

        // Procesar avatar predeterminado
        $request->validate([
            'avatar' => 'required|string|in:chiken.png,dog.png,elephan.png,panda.png,frog.png,kitty.png,lion.png,mouse.png',
        ]);

        // Eliminar avatar personalizado anterior si existe
        if ($user->avatar && !in_array($user->avatar, [
            'chiken.png', 'dog.png', 'elephan.png', 
            'panda.png', 'frog.png', 'kitty.png', 
            'lion.png', 'mouse.png'
        ])) {
            Storage::delete('public/avatars/' . basename($user->avatar));
        }

        $user->avatar = $request->avatar;
        $user->save();

        return response()->json([
            'message' => 'Avatar predeterminado actualizado',
            'avatar' => $request->avatar
        ]);
    }
}
