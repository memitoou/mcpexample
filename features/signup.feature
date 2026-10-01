# language: es
@registro
Característica: Registro de usuarios en Automation Exercise
  Como visitante de la tienda
  Quiero crear una cuenta
  Para poder comprar con mis datos guardados

  Antecedentes:
    Dado que el usuario está en la página de login

  @smoke
  Escenario: Registrar un usuario nuevo y eliminar la cuenta
    Cuando inicia el registro con un usuario nuevo
    Y completa la información de la cuenta
    Y presiona el botón Create Account
    Entonces debería ver que la cuenta fue creada
    Cuando presiona Continue
    Entonces debería ver que inició sesión correctamente
    Cuando elimina su cuenta
    Entonces debería ver que la cuenta fue eliminada

  @negativo
  Escenario: Registro con un email ya registrado
    Dado que existe un usuario registrado
    Cuando inicia el registro con el email del usuario registrado
    Entonces debería ver el mensaje de email ya registrado
