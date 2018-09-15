# Game Of Life

## Overview

### ¿Qué es Game of Life?

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) es un set de reglas governando la destrucción, persistencia o propagación de celdas vecinas en un grid - una pseudo-simulación de vida. Fue creada por John Horton Conway en 1970, en un esfuerzo de simplificar un concepto por el matematico John von Neumann en los '40s. El proposito y el poder del juego no es simular realisticamente la vida, pero en servir como un simple sistema que produce comportamiento complejo. De hecho, el Game of Life es una [maquina de Turing universal](https://en.wikipedia.org/wiki/Turing_machine), capaz de modelar cualquier calculación algoritmica.

Aquí hay un [video de ejemplo](https://www.youtube.com/watch?v=C2vgICfQawE) demostrando varios de los patrones complejos que Game of Life puede producir.  

### ¿Qué vamos a hacer?

Vamos a programar un version en Javascript de Game of Life. Durante este proceso vamos continuar aprendiendo y practicando programación funcional, manipulación del DOM, y mas. 

### ¿Cómo jugar el juego?

El Game of Life es jugado en un tablero de 2D, facilmente modelado en un arreglo de 2D), donde cada celda tiene dos estados posibles: viva, o muerta. Para cada iteracion del estado del tablero, el destino de cada celda es determinado por estas cuatro reglas: 

1. Cualquier celda viva con dos o tres vecinos vivos, vive en la próxima generación.
2. Cualquier celda viva con menos de dos vecinos vivos muere, causada por despoblación.
3. Cualquier celda viva con mas de tres vecinos vivos muere, por sobrepoblación.
4. Cualquier celda muerta con **exactamente** tres vecinos se convierte en una celda viva, por reproducción.

El patrón inicial constituye de semilla para el sistema. La primera generación es creada aplicando las reglas de arriba simultaneamente sobre cada celula en la semilla - en otras palabras, cada generación es una función pura de la que precede. El momento en el que todos los nacimientos y muertes ocurren es normalmente llamada un *tick*. Las reglas son aplicadas repetidamente para crear mas generaciones (una nueva generacion por tick).

## Construyendo Game of Life

### Elementos del Juego

#### Un Tablero

Necesitas diseñar un tablero 2-d que puede ser de una dimensión variable. Vas a necesitar preguntar al usuario por un width y un height del tablero. En HTML la mejor forma de mostrar un tablero es usando el tag `<table>` y colores de fondo para cada una de las celdas de la tabla representando o vivas o muertas. Debes crear el tablero en Javascript solamente.

> Nota: Un tablero 12x12 es provisto para ti en el repo. Permitir al usuario customizar las dimensions debería ser considerado extra credito.

#### Posición inicial del Tablero

El tablero va a necesitar una pocisión inicial antes de que el juego comienze. Podés setear es posición inicial de dos formas.

- Random - Tu decides una configuración random cada vez que la pagina del juego cargue.
- Deja al usuario decidir - Esta es la mas preferible. Antes de que el juego comienze, haz cada celda de la tabla en tu HTML clickeable para togglear entre viva y muerta.

#### Panel de Control

Deberías tener un panel de control con estos cinco botones:

- Step
- Auto-Play
- Pause
- Reset Random
- Clear

Necesitás implementas las cinco de estas acciones para el juego.


### Evolución

#### Evolición del Juego

El juego debe evolucionar, visualmente, tick a tick. Esto significa que vas a necesitar una función `step()` que va por el board entero y determina y actualiza el estado de cada celda (sea viva o muerta) basado en las condiciones de las celdas vecinas.

#### Auto-evolución

Una vez que tengas un función `step` funcionando, deberías agregar una función de auto-play, que corra la función step cada 100 milisegundos. Puedes hacer este tiempo variable si quieres checkear la evolución del juego.

### Setup

Vas a necesitar solo un archivo HTML, un archivo CSS y un archivo JS para completar este proyecto. Puedes usar la librería de Bootstrap. Hemos configurado este proyecto en GitHub para que lo forkies.

#### Nota

No puedes usar JQuery o ninguna otra libreria de JavaScript para hacer este proyecto. Queremos que aprendas vanilla Javascript antes de empezar a usar librerias.

### Generación del Tablero

El primer paso de este proyecto es ser capaz de generar el tablero. Ya hemos corrido una funcion para vos que hace este llamado `createAndShowBoard`. Toma un tiempo para ver y entender como el tablero es dibujado y como cada celda es identificada.

### Configurando el Tablero

Una vez que el tablero es generado, necesitas permitir al usuario setiar una configuración inicial del tablero. Esto va a tener que ser hecho usando "click" events sobre cada celda. Toma un vistazo a como la función `onCellClick` funciona. Una celda `"alive"`(viva) es azul y una celda `"dead"`(muerta) es blanca.

El ejemplo dentro de la función `setupBoardEvents`  que proveimos solamente setea un click event en la celda de la esquina arriba a la derecha del tablero (cell 0-0). Es tu tarea pensar como hacer que **todas** las celdas del tablero sean clickeables. 

Es altamente recomendado que crees la funcionalidad de la función `forEachCell`, que deberia permitirte tener acceso a cada celda de tu tablero con una función iteradora (similar a como array.forEach funciona). Esto va ser útil pur un montón de funcionalidades incluyendo: setear un click event en una celda, construyendo un "step", limpiando el tablero, seteando un state random a cada celda, etc. 

### Limpiando y Randomizando

Ahora que tienes una función `forEachCell`  y celdas convirtiendose en "dead" 
ó "alive" cuando las clickeamos, tu podrías ser capaz de facilmente reusar `forEachCell` para implementar la funcionalidad de limpiar y randomizar el tablero. 

- Limpiando: `forEachCell` ---> setea la celda a "dead"
- Randomizando: `forEachCell` ---> una chace de que la celda este muerta y otra chance de que este viva.

Un requerimiento y la forma mas fácil de testear estas funciones es anexar la ejecución de la funcion a los botones de Clear y Reset Random en el DOM.


### Gameplay

Una vez que tu tablero esta configurado por el usuario, necesitas programar tu funcion `step()`, la cual toma la pocision actual del tablero y evoluciona todas las celulas a su nuevo estado de acuerdo a las reglas del juego.

Manten estas cosas en mente:

- Ten cuidado con que `this`(el contexto) puede ser una determinada invocación de la función. Es recomendad que hagas `console.log(this)` antes de que trates de usarlo en una nueva función para asegurarse que es lo que esperas que sea.
- Basado en las reglas del juego (cantidad de vecinos vivos), las celdas van a cambiar su estado. Pero, ellos no deberían cambiar su estado hasta que hayas computado los vecinos con vida para todas las otras celdas del tablero. Si cambias el estado de una celda muy rápido, vas a escensialmente corromper la siguiente generación para las celdas a su alrededor.
- Si seteás una linea horizontal con tres celdas vivas, el paso siguiente de esa forma va a ser una linea vertical de 3 celdas vivas. Cada paso debería alternar esta forma. Esta forma es conocida como un ["Blinker"](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif) (intermitente) y es una forma muy util para testear para saber si tu generación esta trabajando correctamente.
- Cada vez que guardás tu código y refresheas, puedes encontrarte teniendo que clickear en un par de celdas para testear si tu función step produce la siguiente generación en una manera esperada. Considera temporalmente poner unas pocas lineas en unas de tus funciones de inicialización (createAndShowBoard, setupBoardEvents) que van a setear el status de un particular set de celdas a vivas así no tenes que perder el tiempo clickeando vos mismo.


### Auto Gameplay con velicidades variables

Una vez que tenemos una funcion `step`, debería ser fácil de escribir la función `enableAutoPlay` que automatiza el juego al hacer pasos en intervalos de tiempo, como 100ms, 200ms, etc. `setInterval` deberia ser muy util para vos acá

#### TIPS

Si ya estás usando un intervalo para crear un autoplay, asegurate que multiples clicks al boton de autoplay no instancian multiples intervalos. Nota la propiedad `stepInterval` que es instanciada como null en el código. Esta propiedad esta para vos para guardar una referencia a intervalo que esta corriendo para que pueda ser cancelado.

Y, como antes, ten cuidado con lo que `this` puede ser! Recuerda que el contexto esta seteado a la invocación de la función, no su definición. En otras palabras, solo porque tu `this` era correcto en tu función `step` antes, puede ser diferente si la función es llamada de una forma distinta.
