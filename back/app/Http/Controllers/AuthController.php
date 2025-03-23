<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmailMailable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Verified;


class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'avatar'   => 'nullable|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'avatar'   => $request->avatar ?? 'default.svg',
        ]);
    
        // Generar enlace de verificación
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id]
        );
    
        // Enviar correo con Mailtrap
        Mail::to($user->email)->send(new VerifyEmailMailable($verificationUrl));
    
        return response()->json(['message' => 'Registro exitoso. Revisa tu correo para verificar tu cuenta.']);
    }

    // Inicio de sesión
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        // Validar formato de entrada
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        try {
            // Intentar autenticar y obtener token
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }
    
            // Obtener usuario desde el token generado
            $user = JWTAuth::user();
    
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado.'], 404);
            }
    
            // Verificar si el correo ha sido verificado
            if (!$user->hasVerifiedEmail()) {
                return response()->json(['error' => 'Debes verificar tu correo electrónico.'], 403);
            }
    
            // Respuesta con token
            return $this->respondWithToken($token);
            
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'No se pudo crear el token.'], 500);
        }
    }
    

    // Logout
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (JWTException $e) {
            \Log::warning("Intento de logout con token inválido.");
        }

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    // Usuario autenticado
    public function me()
    {
        $user = Auth::guard('api')->user();

        return response()->json([
            'id'       => $user->id,
            'name'     => $user->name,
            'email'    => $user->email,
            'avatar'   => $user->avatar,
            'is_admin' => $user->is_admin,
            'is_verified' => $user->hasVerifiedEmail()
        ]);
    }

    // Refrescar token
    public function refresh()
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();
            return $this->respondWithToken($newToken);
        } catch (JWTException $e) {
            return response()->json(['error' => 'No se pudo refrescar el token'], 401);
        }
    }

    // Respuesta con token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => Auth::guard('api')->factory()->getTTL() * 60,
            'user'         => Auth::guard('api')->user()
        ]);
    }
    public function verifyEmail(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'El correo ya está verificado.'], 200);
        }
    
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }
    
        return response()->json(['message' => 'Correo verificado correctamente. Ahora puedes iniciar sesión.'], 200);
    }
}
