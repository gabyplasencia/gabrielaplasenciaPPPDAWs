@component('mail::message')
# Hi!

Thanks for registering with **Mundiquiz** 🎉

Click the button below to **verify your email address**:

@component('mail::button', ['url' => $verificationUrl])
Verify Email
@endcomponent

This link will expire in 60 minutes.

If you didn’t create this account, you can ignore this message.

Thanks,<br>
The Mundiquiz Team
@endcomponent