# language: es
@productos
Característica: Productos en Automation Exercise
  Como visitante de la tienda
  Quiero ver y buscar productos
  Para encontrar lo que quiero comprar

  Antecedentes:
    Dado que el usuario está en la página de productos

  @smoke
  Escenario: Ver el listado de productos
    Entonces debería ver el título "All Products"
    Y debería ver al menos 1 producto

  Esquema del escenario: Buscar productos por nombre
    Cuando busca el producto "<producto>"
    Entonces debería ver el título "Searched Products"
    Y todos los resultados deberían contener "<producto>"

    Ejemplos:
      | producto |
      | Blue Top |
      | Jeans    |
