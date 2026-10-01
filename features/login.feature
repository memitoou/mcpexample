# language: es
@login
Característica: Login en Automation Exercise
  Como usuario de Automation Exercise
  Quiero iniciar sesión con mi email y contraseña
  Para acceder a mi cuenta

  Antecedentes:
    Dado que el usuario está en la página de login

  @smoke
  Escenario: Login exitoso con un usuario registrado
    Dado que existe un usuario registrado
    Cuando ingresa las credenciales del usuario registrado
    Y presiona el botón Login
    Entonces debería ver que inició sesión correctamente

  @negativo
  Esquema del escenario: Login fallido con credenciales inválidas
    Cuando ingresa el email "<email>"
    Y ingresa la contraseña "<password>"
    Y presiona el botón Login
    Entonces debería ver el mensaje de credenciales incorrectas

    Ejemplos:
      | email                  | password   |
      | example@example.com    | 123456     |
      | noexiste@example.com   | abcdef     |
      | usuario.falso@test.com | Password1! |
