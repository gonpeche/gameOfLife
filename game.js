var gameOfLife = {

  width: 24,
  height: 24, // dimensiones alto y ancho del tablero
  stepInterval: null, // debería ser usada para guardar referencia a una intervalo que esta siendo jugado
  getCellCoords: function(cell) {
    return cell.id.split('-').map(coord => parseInt(coord));
  },
  createAndShowBoard: function () {

    // crea el elemento <table>
    var goltable = document.createElement("tbody");

    // Construye la Tabla HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // agrega la tabla a #board
    var board = document.getElementById('board');
    board.appendChild(goltable);
    // una vez que los elementos html son añadidos a la pagina le añadimos los eventos
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
      Escribe forEachCell aquí. Vas a necesitar visitar
      cada celda en el tablero, llama la "iteratorFunc",
      y pasa a la funcion, la celda y la coordenadas x & y
      de la celda. Por ejemplo: iteratorFunc(cell, x, y)
    */
    // gvar cells = document.querySelectorAll('td');
    // cells.forEach((cell) => {
    //   var [x, y] = this.getCellCoords(cell);
    //   iteratorFunc(cell, x, y);
    // });
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        var cell = document.getElementById(i+'-'+j);
        iteratorFunc(cell, i, j);
      }
    }

  },

  setupBoardEvents: function() {
    // cada celda del tablero tiene un id CSS en el formato "x-y"
    // donde x es la coordinada-x e y es la coordenada-y
    // usa este hecho para loopear a traves de todos los ids y asignales
    // "click" events que permite a un usuario clickear en
    // celdas para configurar el estado inicial del juego
    // antes de clickear  "Step" o "Auto-Play"

    // clickear en una celda deberia alternar la celda entre "alive" y "dead"
    // por ejemplo: una celda "alive"  este pintado de azul, y una celda "dead" puede mantenerse blanco

    // EJEMPLO PARA UNA CELDA
    // Aquí esta como tendríamos un click event en sol una celda 0-0
    // Necesitas agregar el click event en cada celda en el tablero

    var onCellClick = function (e) {
      // Pregunta para hacerte a ti mismo: Que es this en este contexto?

      // como setear el estilo de la celda cuando es clickeada
      if (this.dataset.status === 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      }

    };

    this.forEachCell(function(cell) {
      cell.addEventListener('click', onCellClick)
    })
  },
  getCellWithCoords: function(x, y) {
    return document.getElementById(x + '-' + y)
  },

  getCellNeighbors: function(cell) {
    var neighbors = [];
    var [x, y] = this.getCellCoords(cell);
    for (var i = x - 1; i <= x + 1; i++) {
      for (var j = y - 1; j <= y + 1; j++) {
        if (j !== y || x !== i) {
          neighbors.push(this.getCellWithCoords(i, j));
        }
      }
    }
    return neighbors.filter(neighbor => neighbor);
  },
  getAliveNeighbors: function(cell) {
    var neighbors = this.getCellNeighbors(cell);
    return neighbors.filter(neighbor => {
      return neighbor.dataset.status === 'alive';
    });
  },

  setStatus: function (cell, status) {
    cell.className = status;
    cell.dataset.status = status;
  },

  toggleStatus: function(cell) {
    if (cell.dataset.status === 'alive') {
     this.setStatus(cell, 'dead');
    } else {
      this.setStatus(cell, 'alive');
    }
  },

  step: function () {
    // Acá es donde querés loopear a través de las celdas
    // en el tablero y determina, basado en tus vecinos,
    // si la celda debe estar viva o muerta en la siguiente
    // evolución del juego.

    // Necesitas:
    // 1. Cuenta vecinos vivos para todas las celdas
    // 2. Sete el siguiente estado de todas las celdas basado en las vecinas vivas
    var cellsToChange = []
    this.forEachCell(cell => {
      var aliveCount = this.getAliveNeighbors(cell).length;
      if (cell.dataset.status === 'alive') {
        if(aliveCount < 2 || aliveCount > 3) {
          cellsToChange.push(cell);
        }
      } else if (aliveCount === 3) {
        cellsToChange.push(cell);
      }
    });

    cellsToChange.forEach((cell) => {
      this.toggleStatus(cell);
    });
  },

  enableAutoPlay: function () {
    // Comienza Auto-Play corriendo la función step
    // automaticamente de forma reptida cada intervalo de tiempo fijo
    this.stepInterval = setInterval(this.step.bind(this), 10)
  },
  disableAutoPlay: function() {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  },
  resetRandom: function() {
    this.forEachCell((cell) => {
      var random = Math.random();
      if(random < 0.2) {
        this.setStatus(cell, 'alive');
      } else {
        this.setStatus(cell, 'dead');
      }
    });
  },
  clear: function() {
    this.forEachCell((cell) => {
      this.setStatus(cell, 'dead');
    });
  }
};

gameOfLife.createAndShowBoard();


var stepBtn = document.querySelector('#step_btn');
var playBtn = document.querySelector('#play_btn');
var resetBtn = document.querySelector('#reset_btn');
var clearBtn = document.querySelector('#clear_btn');

stepBtn.addEventListener('click', gameOfLife.step.bind(gameOfLife));

playBtn.addEventListener('click', function() {
  if (!gameOfLife.stepInterval) {
    this.textContent = 'Stop';
    gameOfLife.enableAutoPlay();
  } else {
    this.textContent = 'Play';
    gameOfLife.disableAutoPlay();
  }
});

resetBtn.addEventListener('click', gameOfLife.resetRandom.bind(gameOfLife));

clearBtn.addEventListener('click', gameOfLife.clear.bind(gameOfLife));

