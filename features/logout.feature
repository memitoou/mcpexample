# language: es
@logout
Característica: Cerrar sesión en Automation Exercise
  Como usuario autenticado
  Quiero cerrar mi sesión
  Para proteger mi cuenta

  @smoke
  Escenario: Logout exitoso
    Dado que el usuario inició sesión con el usuario válido
    Cuando presiona el enlace Logout
    Entonces debería ser redirigido a la página de login
    Y ya no debería ver la sesión iniciada
