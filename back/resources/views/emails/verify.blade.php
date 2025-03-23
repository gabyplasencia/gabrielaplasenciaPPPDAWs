@component('mail::message')
# ¡Hola!

Gracias por registrarte en **Mundiquiz** 🎉

Haz clic en el botón de abajo para **verificar tu correo electrónico**:

@component('mail::button', ['url' => $verificationUrl])
Verificar correo
@endcomponent

Este enlace expirará en 60 minutos.

Si no creaste esta cuenta, puedes ignorar este mensaje.

Gracias,<br>
El equipo de Mundiquiz
@endcomponent