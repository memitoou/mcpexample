# language: es
@carrito
Característica: Carrito de compras en Automation Exercise
  Como visitante de la tienda
  Quiero agregar y quitar productos del carrito
  Para preparar mi compra

  Antecedentes:
    Dado que el usuario está en la página de productos

  @smoke
  Escenario: Agregar un producto al carrito
    Cuando agrega el producto "Blue Top" al carrito
    Y va al carrito desde el modal
    Entonces el carrito debería contener "Blue Top" con cantidad 1

  Escenario: Agregar varios productos al carrito
    Cuando agrega los siguientes productos al carrito:
      | Blue Top   |
      | Men Tshirt |
    Y abre el carrito
    Entonces el carrito debería tener 2 productos
    Y el carrito debería contener "Blue Top" con cantidad 1
    Y el carrito debería contener "Men Tshirt" con cantidad 1

  Escenario: Eliminar un producto del carrito
    Cuando agrega el producto "Blue Top" al carrito
    Y va al carrito desde el modal
    Y elimina el producto "Blue Top" del carrito
    Entonces debería ver el mensaje de carrito vacío
