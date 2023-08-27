/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/dom/GameGridEventListner.js":
/*!*************************************************!*\
  !*** ./src/scripts/dom/GameGridEventListner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gridEventListner: () => (/* binding */ gridEventListner),
/* harmony export */   styleElement: () => (/* binding */ styleElement)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../point */ "./src/scripts/point.js");

const gridEventListner = (playerGrid, checker, continutheGame) => {
  playerGrid.querySelectorAll(".grid-coordinate").forEach(element => {
    element.addEventListener("click", () => {
      let key = parseInt(element.getAttribute("key"));
      let attackPoint = (0,_point__WEBPACK_IMPORTED_MODULE_0__.point)(parseInt(key / 10), parseInt(key % 10));
      let result = checker(attackPoint);
      if (result != null) {
        styleTheResult(element, result);
        continutheGame();
      }
    });
  });
};
const styleElement = (playerGrid, attackPoint, result) => {
  let key = attackPoint.x * 10 + attackPoint.y;
  let element = playerGrid.querySelector(`[key = "${key}"]`);
  styleTheResult(element, result);
};
const styleTheResult = (element, result) => {
  if (result) {
    element.classList.add("hit");
  } else if (result == false) {
    element.classList.add("miss");
  }
};


/***/ }),

/***/ "./src/scripts/dom/addEventListners.js":
/*!*********************************************!*\
  !*** ./src/scripts/dom/addEventListners.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAllEventListeners: () => (/* binding */ addAllEventListeners)
/* harmony export */ });
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup */ "./src/scripts/dom/popup.js");

const addAllEventListeners = () => {
  /* ship alignment event listneres  */
  const shipPlacementToggleBtn = document.querySelector(".rotate-ship");
  shipPlacementToggleBtn.addEventListener("click", () => {
    if (shipPlacementToggleBtn.getAttribute("value") == "h") {
      shipPlacementToggleBtn.setAttribute("value", "v");
      shipPlacementToggleBtn.querySelector(".sticky-rotate").textContent = "vertical";
    } else {
      shipPlacementToggleBtn.setAttribute("value", "h");
      shipPlacementToggleBtn.querySelector(".sticky-rotate").textContent = "horizontal";
    }
  });

  /* start the game window */
  let startBtn = document.querySelector("button.game-start");
  startBtn.addEventListener("click", () => {
    (0,_popup__WEBPACK_IMPORTED_MODULE_0__.hide)("game-start");
    const targetObject = document.querySelector(".grids-container").firstElementChild;
    console.log(targetObject);
    const clonedObject = targetObject.cloneNode(true);
    console.log(clonedObject);
    targetObject.parentNode.replaceChild(clonedObject, targetObject);
    (0,_popup__WEBPACK_IMPORTED_MODULE_0__.show)("enemy-grid");
    let player1Grid = document.querySelector(".grids-container").firstElementChild;
    console.log(player1Grid);
    player1Grid.classList.add("gameon");
  });
};


/***/ }),

/***/ "./src/scripts/dom/createPlayerGrid.js":
/*!*********************************************!*\
  !*** ./src/scripts/dom/createPlayerGrid.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrid: () => (/* binding */ createGrid)
/* harmony export */ });
/* harmony import */ var _input_ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input-ships */ "./src/scripts/dom/input-ships.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ship */ "./src/scripts/ship.js");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../point */ "./src/scripts/point.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup */ "./src/scripts/dom/popup.js");




const createCoordinate = (key, playerBoard, shipsInput) => {
  let shipCoordinate = (0,_point__WEBPACK_IMPORTED_MODULE_2__.point)(parseInt(key / 10), parseInt(key % 10));
  const coordinate = document.createElement("div");
  let alignment = getCurrentAlignment();
  let shipLength = shipsInput.getNextSelectedShip();
  coordinate.setAttribute("key", key);
  shipLength = shipsInput.getNextSelectedShip();
  coordinate.classList.add("grid-coordinate");
  coordinate.addEventListener("mouseover", () => {
    alignment = getCurrentAlignment();
    shipLength = shipsInput.getNextSelectedShip();
    if (isAvalidCoordinate(playerBoard, shipsInput, shipCoordinate, alignment, shipLength)) {
      remvoeClassNameToTheShip("invalid", key, alignment, shipLength);
      addClassNameToTheShip("hover", key, alignment, shipLength);
    } else {
      addClassNameToTheShip("invalid", key, alignment, shipLength);
    }
  });
  coordinate.addEventListener("mouseout", () => {
    remvoeClassNameToTheShip("hover", key, alignment, shipLength);
  });
  coordinate.addEventListener("click", () => {
    if (dropTheShip(playerBoard, shipLength, shipCoordinate, alignment)) {
      addClassNameToTheShip("ship", key, alignment, shipLength);
      shipsInput.updateSelectedShip();
      document.querySelector('.ships-input-prompt').setAttribute("name", `${shipsInput.getShipName()}`);
      if (shipsInput.isOutOfShips()) {
        (0,_popup__WEBPACK_IMPORTED_MODULE_3__.hide)('shipdropping');
        (0,_popup__WEBPACK_IMPORTED_MODULE_3__.show)('header-name');
        (0,_popup__WEBPACK_IMPORTED_MODULE_3__.show)("game-start");
      }
    }
  });
  return coordinate;
};
const dropTheShip = (playerBoard, shipLength, shipCoordinate, alignment) => {
  let newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.ship)(shipLength, shipCoordinate, alignment);
  return playerBoard.placeShip(shipCoordinate, newShip);
};
const isAvalidCoordinate = (playerBoard, shipsInput, shipCoordinate, alignment, shipLength) => {
  return playerBoard.isValidPlace(shipCoordinate, alignment, shipLength);
};
const addClassNameToTheShip = (className, key, alignment, selectedShip) => {
  let arr = getShipsCoordinates(key, alignment, selectedShip);
  arr.map(coordinate => {
    if (coordinate) coordinate.classList.add(className);
  });
};
const remvoeClassNameToTheShip = (className, key, alignment, selectedShip) => {
  let arr = getShipsCoordinates(key, alignment, selectedShip);
  arr.map(coordinate => {
    if (coordinate) coordinate.classList.remove(className);
  });
};
const getShipsCoordinates = (key, alignment, selectedShip) => {
  let arr = [];
  let inc = alignment == "h" ? 1 : 10;
  while (selectedShip--) {
    arr.push(document.querySelector(`[key = "${key}"]`));
    key += inc;
  }
  return arr;
};
const createGrid = (size, playerGameBoard) => {
  const shipsGridContainer = document.querySelector(".ships-input-grid");
  let shipsInput = (0,_input_ships__WEBPACK_IMPORTED_MODULE_0__.selectShips)();
  for (let i = 0; i < size; i++) {
    shipsGridContainer.appendChild(createCoordinate(i, playerGameBoard, shipsInput));
  }
  return shipsGridContainer;
};
const getCurrentAlignment = () => {
  const rotateShipBtn = document.querySelector(".rotate-ship");
  return rotateShipBtn.getAttribute("value");
};


/***/ }),

/***/ "./src/scripts/dom/input-ships.js":
/*!****************************************!*\
  !*** ./src/scripts/dom/input-ships.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectShips: () => (/* binding */ selectShips)
/* harmony export */ });
const selectShips = () => {
  let ships = [0, 0, 1, 2, 1, 1];
  let selectedShip = 5;
  const getNextSelectedShip = () => {
    let key = ships.length - 1;
    while (ships[key] == 0 && key > 0) {
      key--;
    }
    selectedShip = key;
    return key;
  };
  const isOutOfShips = () => {
    return getNextSelectedShip() == 0;
  };
  const updateSelectedShip = () => {
    if (ships[selectedShip] > 0) {
      ships[selectedShip]--;
      return selectedShip;
    }
    ;
    return false;
  };
  const getShipName = () => {
    if (ships[3] == 1) {
      return "Submarine";
    }
    let shipNames = {
      5: "Carrier",
      4: "BattleShip",
      3: "Cruiser",
      2: "Destroyer"
    };
    return shipNames[getNextSelectedShip()];
  };
  return {
    getNextSelectedShip,
    isOutOfShips,
    updateSelectedShip,
    getShipName
  };
};


/***/ }),

/***/ "./src/scripts/dom/popup.js":
/*!**********************************!*\
  !*** ./src/scripts/dom/popup.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   show: () => (/* binding */ show)
/* harmony export */ });
const show = className => {
  document.querySelector(`.${className}`).classList.remove("hide");
};
const hide = className => {
  document.querySelector(`.${className}`).classList.add("hide");
};


/***/ }),

/***/ "./src/scripts/dom/startTheGame.js":
/*!*****************************************!*\
  !*** ./src/scripts/dom/startTheGame.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startTheGame: () => (/* binding */ startTheGame)
/* harmony export */ });
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup */ "./src/scripts/dom/popup.js");

const startTheGame = () => {
  return new Promise((resolve, reject) => {
    /* start the game window */
    let startBtn = document.querySelector("button.game-start");
    startBtn.addEventListener("click", () => {
      (0,_popup__WEBPACK_IMPORTED_MODULE_0__.hide)("game-start");
      const targetObject = document.querySelector(".grids-container").firstElementChild;
      const clonedObject = targetObject.cloneNode(true);
      targetObject.parentNode.replaceChild(clonedObject, targetObject);
      (0,_popup__WEBPACK_IMPORTED_MODULE_0__.show)("enemy-grid");
      let player1Grid = document.querySelector(".grids-container").firstElementChild;
      player1Grid.classList.add("gameon");
      resolve(player1Grid);
    });
  });
};


/***/ }),

/***/ "./src/scripts/game-board.js":
/*!***********************************!*\
  !*** ./src/scripts/game-board.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoard: () => (/* binding */ gameBoard)
/* harmony export */ });
const gameBoard = () => {
  let board = Array(10).fill(null).map(() => Array(10).fill(null));
  let ships = {};
  const isValidPlace = (sPoint, alignment, length) => {
    if (alignment == "h") {
      let y = sPoint.y;
      let len = length - 1;
      if (y + length > 10) return false;else {
        while (len >= 0) {
          if (board[sPoint.x][y + len] != null) {
            return false;
          }
          len--;
        }
        return true;
      }
    } else if (alignment == "v") {
      let len = length - 1;
      let x = sPoint.x;
      if (x + length > 10) return false;else {
        while (len >= 0) {
          if (board[x + len][sPoint.y] != null) {
            return false;
          }
          len--;
        }
        return true;
      }
    }
    return null;
  };
  const addAmove = (attackPoint, state) => {
    board[attackPoint.x][attackPoint.y] = state;
  };
  const placeShip = (sPoint, ship) => {
    let validPlace = isValidPlace(sPoint, ship.alignment, ship.length);
    if (validPlace) {
      let key = `${sPoint.x}:${sPoint.y}`;
      ships[key] = ship;
      let len = 0;
      while (len < ship.length) {
        let alignment = ship.alignment;
        if (alignment == "h") {
          board[sPoint.x][sPoint.y + len] = key;
        } else if (alignment == "v") {
          board[sPoint.x + len][sPoint.y] = key;
        }
        len++;
      }
      return true;
    }
    return false;
  };
  const attackTheShip = attackPoint => {
    let shipsArray = Object.values(ships);
    for (let i = 0; i < shipsArray.length; i++) {
      let ship = shipsArray[i];
      ship.isHit(attackPoint);
    }
  };
  const receiveAttack = attackPoint => {
    if (board[attackPoint.x][attackPoint.y] == 0) return null;else if (board[attackPoint.x][attackPoint.y] === null) {
      addAmove(attackPoint, 0);
      return false;
    } else {
      let ship = ships[board[attackPoint.x][attackPoint.y]];
      attackTheShip(attackPoint);
      addAmove(attackPoint, 0);
      return ship.length;
    }
  };
  const isAllSank = () => {
    let shipsArray = Object.values(ships);
    for (let i = 0; i < shipsArray.length; i++) {
      let ship = shipsArray[i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };
  return {
    placeShip,
    receiveAttack,
    isAllSank,
    isValidPlace
  };
};


/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   game: () => (/* binding */ game)
/* harmony export */ });
const game = (p1, pl1Grid, p2, pl2Grid) => {
  let turn = 1;
  let player1 = p1;
  let player2 = p2;
  const startGame = game => {
    player1.setGame(player2, game, pl1Grid);
    player2.setGame(player1, game, pl2Grid);
    nexMove();
  };
  const nexMove = () => {
    if (player2.isLost()) {
      console.log('player1 won');
    }
    if (player1.isLost()) {
      console.log('player2 won');
    }
    console.log({
      turn
    });
    if (turn === 1) {
      if (!player2.isLost()) {
        console.log('player1 make a move');
        player1.requestAnAttack();
      }
    } else if (turn === 2) {
      if (!player1.isLost()) {
        console.log('player2  make a move');
        player2.requestAnAttack();
      }
    }
  };
  const continueGame = () => {
    turn = turn === 1 ? 2 : 1;
    nexMove();
  };
  return {
    continueGame,
    startGame
  };
};


/***/ }),

/***/ "./src/scripts/player-ai.js":
/*!**********************************!*\
  !*** ./src/scripts/player-ai.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ai: () => (/* binding */ ai)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./src/scripts/point.js");
/* harmony import */ var _dom_GameGridEventListner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/GameGridEventListner */ "./src/scripts/dom/GameGridEventListner.js");



const ai = () => {
  let lastResult = null;
  let gameEnemy;
  let currentGame;
  let grid;
  const fillArray = len => {
    let pointsArr = [];
    for (let i = 0; i < len; i++) {
      pointsArr.push(i);
    }
    return pointsArr;
  };
  let pointsArr = fillArray(100);
  let proto = Object.create((0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("ai"));
  const ChooseRandomAttackPoint = () => {
    let query = Math.floor(Math.random() * (pointsArr.length - 1));
    let queryValue = pointsArr[query];
    let queryPoint = (0,_point__WEBPACK_IMPORTED_MODULE_1__.point)(parseInt(queryValue / 10), parseInt(queryValue % 10));
    pointsArr = pointsArr.filter(value => {
      return value != queryValue;
    });
    return queryPoint;
  };
  const requestAnAttack = () => {
    let randomPoint = ChooseRandomAttackPoint();
    lastResult = gameEnemy.enemyAttack(randomPoint);
    while (lastResult === null) {
      randomPoint = ChooseRandomAttackPoint();
      lastResult = gameEnemy.enemyAttack(randomPoint);
    }
    if (grid) {
      (0,_dom_GameGridEventListner__WEBPACK_IMPORTED_MODULE_2__.styleElement)(grid, randomPoint, lastResult);
    }
    currentGame.continueGame();
    return lastResult;
  };
  const enemyAttack = attackPoint => {
    let result = proto.board.receiveAttack(attackPoint);
    return result;
  };
  const isLost = () => {
    return proto.board.isAllSank();
  };
  const setGame = (enemy, game, playerGrid) => {
    gameEnemy = enemy;
    currentGame = game;
    grid = playerGrid;
  };
  const getLastAttackResult = () => lastResult;
  return Object.assign(proto, {
    getLastAttackResult,
    requestAnAttack,
    enemyAttack,
    isLost,
    setGame
  });
};


/***/ }),

/***/ "./src/scripts/player-human.js":
/*!*************************************!*\
  !*** ./src/scripts/player-human.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   human: () => (/* binding */ human)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _dom_GameGridEventListner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/GameGridEventListner */ "./src/scripts/dom/GameGridEventListner.js");


const human = name => {
  let gameEnemy;
  let currentGame;
  let turn = false;
  let lastResult = null;
  let proto = Object.create((0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("name"));
  const enemyAttack = attackPoint => {
    let result = proto.board.receiveAttack(attackPoint);
    return result;
  };
  const isLost = () => {
    return proto.board.isAllSank();
  };
  const setGame = (enemy, game, playerGrid) => {
    gameEnemy = enemy;
    currentGame = game;
    if (playerGrid) {
      (0,_dom_GameGridEventListner__WEBPACK_IMPORTED_MODULE_1__.gridEventListner)(playerGrid, makeAnAttack, continueGame);
    }
  };
  const requestAnAttack = () => {
    turn = true;
  };
  const makeAnAttack = attackPoint => {
    if (turn) {
      lastResult = gameEnemy.enemyAttack(attackPoint);
      return lastResult;
    } else {
      return null;
    }
    /* here: game.nextMove() */
  };

  const continueGame = () => {
    turn = false;
    console.log('player1  mad a move');
    currentGame.continueGame();
  };
  const getLastAttackResult = () => lastResult;
  /*here: addEventListners & check if turn is true */
  return Object.assign(proto, {
    getLastAttackResult,
    requestAnAttack,
    makeAnAttack,
    enemyAttack,
    isLost,
    setGame
  });
};


/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/scripts/game-board.js");
/* harmony import */ var _randomShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomShips */ "./src/scripts/randomShips.js");


const player = name => {
  let playerBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  let proto = {
    dropRandomShips(shipsNumber) {
      (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__.RandomShips)().dropRandomShipsCoordinates(shipsNumber, playerBoard);
    }
  };
  return Object.create(proto, {
    name: {
      value: name
    },
    board: {
      value: playerBoard
    }
  });
};


/***/ }),

/***/ "./src/scripts/point.js":
/*!******************************!*\
  !*** ./src/scripts/point.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   point: () => (/* binding */ point)
/* harmony export */ });
const point = (x, y) => {
  return {
    x,
    y
  };
};


/***/ }),

/***/ "./src/scripts/randomShips.js":
/*!************************************!*\
  !*** ./src/scripts/randomShips.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RandomShips: () => (/* binding */ RandomShips)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/scripts/point.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/scripts/ship.js");


const RandomShips = () => {
  let board = Array(100).fill(0);
  const getRandomAlignment = () => {
    let randomAlignment = Math.ceil(Math.random() * 4);
    return randomAlignment == 1 || randomAlignment == 2 ? "h" : "v";
  };
  const dropRandomShipsCoordinates = (shipSizes, gameBoard) => {
    /* inputships: ships [0, 0, 1, 2, 1, 1] */
    /* gameboard :  isValidPlace */
    shipSizes.filter((value, index) => {
      while (shipSizes[index]--) {
        placeRandomShip(index, getRandomPoint(index), getRandomAlignment(), gameBoard);
      }
    });
  };
  const placeRandomShip = (shipLength, sPoint, alignment, gameBoard) => {
    while (!gameBoard.isValidPlace(sPoint, alignment, shipLength)) {
      sPoint = getRandomPoint(shipLength);
    }
    if (!gameBoard.placeShip(sPoint, (0,_ship__WEBPACK_IMPORTED_MODULE_1__.ship)(shipLength, sPoint, alignment))) {}
  };
  const filterBoard = (shipLength, alignment) => {
    return board.filter((value, index) => {
      if (alignment == "v") {
        let x = index > 9 ? Math.floor(index / 10) : 0;
        return x + shipLength <= 10;
      } else {
        let y = index > 9 ? Math.floor(index % 10) : index;
        return y + shipLength <= 10;
      }
    });
  };
  const getRandomPoint = shipLength => {
    let filteredBoard = filterBoard(shipLength);
    let randomIndex = Math.floor(Math.random() * filteredBoard.length);
    return (0,_point__WEBPACK_IMPORTED_MODULE_0__.point)(Math.floor(randomIndex / 10), Math.floor(randomIndex % 10));
  };
  return {
    filterBoard,
    getRandomPoint,
    dropRandomShipsCoordinates,
    placeRandomShip
  };
};


/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ship: () => (/* binding */ ship)
/* harmony export */ });
const ship = (length, sPoint, alignment) => {
  let returnValue;
  let hitCount = 0;
  let grid = Array(length).fill(0);
  const getHitCount = () => hitCount;
  const distance = hitPoint => {
    return hitPoint.x - sPoint.x + (hitPoint.y - sPoint.y);
  };
  const isHit = hitPoint => {
    let pointDistance = distance(hitPoint);
    if (grid[pointDistance] == 1) returnValue = null;else {
      let valid = false;
      if (alignment == "h") {
        if (hitPoint.x != sPoint.x) returnValue = false;else valid = true;
      } else if (alignment == "v") {
        if (hitPoint.y != sPoint.y) returnValue = false;else valid = true;
      }
      if (pointDistance >= 0 && pointDistance < length && valid) {
        returnValue = true;
      } else {
        returnValue = false;
      }
    }
    if (returnValue) {
      grid[pointDistance] = 1;
      hitCount += 1;
    }
    return returnValue;
  };
  const isSunk = () => {
    return hitCount === length ? true : false;
  };
  return {
    length,
    sPoint,
    alignment,
    isHit,
    isSunk,
    getHitCount
  };
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./src/styles/game.css":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./src/styles/game.css ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --dark-blue: #272343;
  --light-blue: #e3f6f5;
  --medium-blue: #bae8e8;
  --ship-color: rgb(77, 138, 19);
  --hit-color: rgb(106, 99, 208);
  --miss-color: #ff0000;
  --green-color: #1bf5af;
}
* {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
body {
  background-color: var(--dark-blue);
}
/*  */
/* section.introduction-container {
  width: 70%;
  margin: auto;
  overflow: hidden;
}
.content-container{
  display: flex;
  align-items: center;
  gap: 4rem;
  height: 30rem;
}

.introduction-content {
  background-color: var(--light-blue);
  padding: 1.5rem 2rem;
  color: var(--dark-blue);
  border-radius: 0.7rem;
  height: fit-content;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 3rem;
  transform: translate(0, 0);
  transition: transform 0.5s ease-in-out 0.4s, height 0.3s ease 0.9s;
}
section.introduction-container button.proceed {
  padding: 0.5rem 2rem;
  border-radius: 0.7rem;
  transition: transform 0.5s ease-in-out 0.6s, height 0.3s ease 1s;
}
section.introduction-container img {
  transform: translate(0, 0);
  transition: transform 0.5s ease-in-out 0.4s, height 0.3s ease 0.7s;
}
.game-rules::before {
  content: "Battleship Game:";
  font-weight: bold;
}
section.introduction-container.hide .introduction-content {
  transform: translate(-70rem, 0);
  height: 0;
}
section.introduction-container.hide img.instruction-img {
  transform: translate(60rem, 0);
  height: 0;
}

section.introduction-container.hide {
  height: 0;
}
section.introduction-container .introduction-header {
  font-size: 6rem;
    margin: 2rem 0 5rem 0;
    text-align: center;
  transform: translate(0, 0);
  color: var(--light-blue);
  transition: transform 0.3s ease-in-out 0.5s, font-size 0.01s ease-in-out 0.8s;
}
section.introduction-container.hide .introduction-header {
  transform: translate(0, 70rem);
  font-size: 0;
  text-align: center;
} */

/*  */
header.header-name{
  font-size: 6rem;
  font-weight: bold;
  position: relative;
  right: 0;
  transform: translate(0, 0);
  transition: font-size  ease-in-out 300ms, right 700ms ease-in-out, transform 300ms 100ms;
}
.shipdropping {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  position: relative;
  right: 0;
  height: 14rem;
  transition: height 300ms ease-out 400ms,right 700ms ease-in-out, transform 300ms 100ms;
}
.shipdropping.hide {
  right: 80rem;
  transform: translate(2rem, 0);
  height: 0;
}
header.header-name.hide {
  right: -54rem;
  transform: translate(-2rem, 0);
  font-size: 0;
}
header.ships-input-prompt {
  font-size: 4rem;
  font-weight: bold;
  position: relative;
  right: 0;
  transform: translate(0, 0);
  transition: font-size  ease-in-out 1.2s, right 700ms ease-in-out, transform 300ms 100ms;
}
header.ships-input-prompt.hide {
  right: 54rem;
  transform: translate(2rem, 0);
  font-size: 0;
}

header.ships-input-prompt::after {
  content: "Carrier";
  color: var(--medium-blue);
}
header.ships-input-prompt[name = "BattleShip"]::after {
  content: "BattleShip";
}
 header.ships-input-prompt[name = "Cruiser"]::after {
  content: "Cruiser";
}
header.ships-input-prompt[name= Submarine ]::after {
  content: "Submarine";
}
header.ships-input-prompt[name= Destroyer ]::after {
  content: "Destroyer";
}
section.ships-input-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  gap: 3rem;
  color: var(--light-blue);
  transform: scale(1);
  transition: transform 300ms ease-in-out;
}
section.ships-input-container.hide {
  transform: scale(0);
}

.btn {
  background: var(--light-blue);
  border-radius: 0.7rem;
  font-weight: bold;
  cursor: pointer;
}
.btn:hover {
  transform: scale(1.05);
  transition: transform 150ms ease-in-out;
}
button.rotate-ship {
  padding: 0.4rem 15rem;
  font-size: 2.5rem;
  position: relative;
}
p.sticky-rotate{
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translate(0, -50%);
  background: var(--medium-blue);
  font-size: 1.5rem;
  padding: 0.2rem 1.5rem;
  border-radius: 1rem;
}
main.ships-input-grid {
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  width: 30rem;
  height: 30rem;
  gap: 2px;
}
main.ships-input-grid > .grid-coordinate {
  background-color: var(--light-blue);
  border-radius: 0.3rem;
}
main.ships-input-grid > .grid-coordinate.hover {
  background-color: var(--medium-blue);
}
main.ships-input-grid > .grid-coordinate.ship {
  background-color: var(--ship-color);
}
main.ships-input-grid > .grid-coordinate.invalid {
  cursor: not-allowed;
}
main.ships-input-grid > .grid-coordinate.hit {
  background-color: var(--hit-color);
}
main.ships-input-grid > .grid-coordinate.miss {
  background-color: var(--miss-color);
}
main.ships-input-grid.gameon {
  transform: scale(0.8);
  transition: transform 1s ease;
}
main.ships-input-grid.enemy-grid{
  position: relative;
  transform: translate(0, 0);
  width: 30rem;
  transition: transform 1s ease, width 300ms ease;
}
main.ships-input-grid.enemy-grid.hide{
  width: 0;
  transform: translate(45rem, 0);
}
button.game-start {
  padding: 0.3rem 3rem;
  font-size: 2rem;
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  /* transform: scale(1); */
  width: auto;
  transition:  right 300ms ease-in-out;
}

button.game-start.hide {
  /* transform: scale(0); */
  right: -11rem;
}
.grids-container{
  display: flex;
  gap:  2rem;
  position: relative;
  transform: translate(0,0);
  transition: transform 0.5s ease-in-out 0.1s, height 0.4s ease-in-out 0.6s;
}
.grids-container.hide{
  transform: translate(0, 50rem);
  height: 0;
}`, "",{"version":3,"sources":["webpack://./src/styles/game.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,8BAA8B;EAC9B,8BAA8B;EAC9B,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,SAAS;EACT,SAAS;EACT,sBAAsB;EACtB,qBAAqB;EACrB,gBAAgB;AAClB;AACA;EACE,kCAAkC;AACpC;AACA,KAAK;AACL;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GA8DG;;AAEH,KAAK;AACL;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,QAAQ;EACR,0BAA0B;EAC1B,wFAAwF;AAC1F;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,kBAAkB;EAClB,QAAQ;EACR,aAAa;EACb,sFAAsF;AACxF;AACA;EACE,YAAY;EACZ,6BAA6B;EAC7B,SAAS;AACX;AACA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;AACd;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,QAAQ;EACR,0BAA0B;EAC1B,uFAAuF;AACzF;AACA;EACE,YAAY;EACZ,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,qBAAqB;AACvB;CACC;EACC,kBAAkB;AACpB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,wBAAwB;EACxB,mBAAmB;EACnB,uCAAuC;AACzC;AACA;EACE,mBAAmB;AACrB;;AAEA;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,iBAAiB;EACjB,eAAe;AACjB;AACA;EACE,sBAAsB;EACtB,uCAAuC;AACzC;AACA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,QAAQ;EACR,6BAA6B;EAC7B,8BAA8B;EAC9B,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,gDAAgD;EAChD,YAAY;EACZ,aAAa;EACb,QAAQ;AACV;AACA;EACE,mCAAmC;EACnC,qBAAqB;AACvB;AACA;EACE,oCAAoC;AACtC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,mBAAmB;AACrB;AACA;EACE,kCAAkC;AACpC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qBAAqB;EACrB,6BAA6B;AAC/B;AACA;EACE,kBAAkB;EAClB,0BAA0B;EAC1B,YAAY;EACZ,+CAA+C;AACjD;AACA;EACE,QAAQ;EACR,8BAA8B;AAChC;AACA;EACE,oBAAoB;EACpB,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;EACX,oCAAoC;AACtC;;AAEA;EACE,yBAAyB;EACzB,aAAa;AACf;AACA;EACE,aAAa;EACb,UAAU;EACV,kBAAkB;EAClB,yBAAyB;EACzB,yEAAyE;AAC3E;AACA;EACE,8BAA8B;EAC9B,SAAS;AACX","sourcesContent":[":root {\n  --dark-blue: #272343;\n  --light-blue: #e3f6f5;\n  --medium-blue: #bae8e8;\n  --ship-color: rgb(77, 138, 19);\n  --hit-color: rgb(106, 99, 208);\n  --miss-color: #ff0000;\n  --green-color: #1bf5af;\n}\n* {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  box-sizing: border-box;\n  text-decoration: none;\n  list-style: none;\n}\nbody {\n  background-color: var(--dark-blue);\n}\n/*  */\n/* section.introduction-container {\n  width: 70%;\n  margin: auto;\n  overflow: hidden;\n}\n.content-container{\n  display: flex;\n  align-items: center;\n  gap: 4rem;\n  height: 30rem;\n}\n\n.introduction-content {\n  background-color: var(--light-blue);\n  padding: 1.5rem 2rem;\n  color: var(--dark-blue);\n  border-radius: 0.7rem;\n  height: fit-content;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  line-height: 3rem;\n  transform: translate(0, 0);\n  transition: transform 0.5s ease-in-out 0.4s, height 0.3s ease 0.9s;\n}\nsection.introduction-container button.proceed {\n  padding: 0.5rem 2rem;\n  border-radius: 0.7rem;\n  transition: transform 0.5s ease-in-out 0.6s, height 0.3s ease 1s;\n}\nsection.introduction-container img {\n  transform: translate(0, 0);\n  transition: transform 0.5s ease-in-out 0.4s, height 0.3s ease 0.7s;\n}\n.game-rules::before {\n  content: \"Battleship Game:\";\n  font-weight: bold;\n}\nsection.introduction-container.hide .introduction-content {\n  transform: translate(-70rem, 0);\n  height: 0;\n}\nsection.introduction-container.hide img.instruction-img {\n  transform: translate(60rem, 0);\n  height: 0;\n}\n\nsection.introduction-container.hide {\n  height: 0;\n}\nsection.introduction-container .introduction-header {\n  font-size: 6rem;\n    margin: 2rem 0 5rem 0;\n    text-align: center;\n  transform: translate(0, 0);\n  color: var(--light-blue);\n  transition: transform 0.3s ease-in-out 0.5s, font-size 0.01s ease-in-out 0.8s;\n}\nsection.introduction-container.hide .introduction-header {\n  transform: translate(0, 70rem);\n  font-size: 0;\n  text-align: center;\n} */\n\n/*  */\nheader.header-name{\n  font-size: 6rem;\n  font-weight: bold;\n  position: relative;\n  right: 0;\n  transform: translate(0, 0);\n  transition: font-size  ease-in-out 300ms, right 700ms ease-in-out, transform 300ms 100ms;\n}\n.shipdropping {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 4rem;\n  position: relative;\n  right: 0;\n  height: 14rem;\n  transition: height 300ms ease-out 400ms,right 700ms ease-in-out, transform 300ms 100ms;\n}\n.shipdropping.hide {\n  right: 80rem;\n  transform: translate(2rem, 0);\n  height: 0;\n}\nheader.header-name.hide {\n  right: -54rem;\n  transform: translate(-2rem, 0);\n  font-size: 0;\n}\nheader.ships-input-prompt {\n  font-size: 4rem;\n  font-weight: bold;\n  position: relative;\n  right: 0;\n  transform: translate(0, 0);\n  transition: font-size  ease-in-out 1.2s, right 700ms ease-in-out, transform 300ms 100ms;\n}\nheader.ships-input-prompt.hide {\n  right: 54rem;\n  transform: translate(2rem, 0);\n  font-size: 0;\n}\n\nheader.ships-input-prompt::after {\n  content: \"Carrier\";\n  color: var(--medium-blue);\n}\nheader.ships-input-prompt[name = \"BattleShip\"]::after {\n  content: \"BattleShip\";\n}\n header.ships-input-prompt[name = \"Cruiser\"]::after {\n  content: \"Cruiser\";\n}\nheader.ships-input-prompt[name= Submarine ]::after {\n  content: \"Submarine\";\n}\nheader.ships-input-prompt[name= Destroyer ]::after {\n  content: \"Destroyer\";\n}\nsection.ships-input-container {\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem 0;\n  gap: 3rem;\n  color: var(--light-blue);\n  transform: scale(1);\n  transition: transform 300ms ease-in-out;\n}\nsection.ships-input-container.hide {\n  transform: scale(0);\n}\n\n.btn {\n  background: var(--light-blue);\n  border-radius: 0.7rem;\n  font-weight: bold;\n  cursor: pointer;\n}\n.btn:hover {\n  transform: scale(1.05);\n  transition: transform 150ms ease-in-out;\n}\nbutton.rotate-ship {\n  padding: 0.4rem 15rem;\n  font-size: 2.5rem;\n  position: relative;\n}\np.sticky-rotate{\n  position: absolute;\n  left: 2rem;\n  top: 50%;\n  transform: translate(0, -50%);\n  background: var(--medium-blue);\n  font-size: 1.5rem;\n  padding: 0.2rem 1.5rem;\n  border-radius: 1rem;\n}\nmain.ships-input-grid {\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  width: 30rem;\n  height: 30rem;\n  gap: 2px;\n}\nmain.ships-input-grid > .grid-coordinate {\n  background-color: var(--light-blue);\n  border-radius: 0.3rem;\n}\nmain.ships-input-grid > .grid-coordinate.hover {\n  background-color: var(--medium-blue);\n}\nmain.ships-input-grid > .grid-coordinate.ship {\n  background-color: var(--ship-color);\n}\nmain.ships-input-grid > .grid-coordinate.invalid {\n  cursor: not-allowed;\n}\nmain.ships-input-grid > .grid-coordinate.hit {\n  background-color: var(--hit-color);\n}\nmain.ships-input-grid > .grid-coordinate.miss {\n  background-color: var(--miss-color);\n}\nmain.ships-input-grid.gameon {\n  transform: scale(0.8);\n  transition: transform 1s ease;\n}\nmain.ships-input-grid.enemy-grid{\n  position: relative;\n  transform: translate(0, 0);\n  width: 30rem;\n  transition: transform 1s ease, width 300ms ease;\n}\nmain.ships-input-grid.enemy-grid.hide{\n  width: 0;\n  transform: translate(45rem, 0);\n}\nbutton.game-start {\n  padding: 0.3rem 3rem;\n  font-size: 2rem;\n  position: absolute;\n  right: 3rem;\n  bottom: 3rem;\n  /* transform: scale(1); */\n  width: auto;\n  transition:  right 300ms ease-in-out;\n}\n\nbutton.game-start.hide {\n  /* transform: scale(0); */\n  right: -11rem;\n}\n.grids-container{\n  display: flex;\n  gap:  2rem;\n  position: relative;\n  transform: translate(0,0);\n  transition: transform 0.5s ease-in-out 0.1s, height 0.4s ease-in-out 0.6s;\n}\n.grids-container.hide{\n  transform: translate(0, 50rem);\n  height: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/game.css":
/*!*****************************!*\
  !*** ./src/styles/game.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_game_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./game.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./src/styles/game.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_game_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_game_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_player_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/player-ai */ "./src/scripts/player-ai.js");
/* harmony import */ var _scripts_player_human__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/player-human */ "./src/scripts/player-human.js");
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");
/* harmony import */ var _styles_game_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/game.css */ "./src/styles/game.css");
/* harmony import */ var _scripts_dom_createPlayerGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/dom/createPlayerGrid */ "./src/scripts/dom/createPlayerGrid.js");
/* harmony import */ var _scripts_dom_addEventListners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/dom/addEventListners */ "./src/scripts/dom/addEventListners.js");
/* harmony import */ var _scripts_dom_startTheGame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts/dom/startTheGame */ "./src/scripts/dom/startTheGame.js");
/* harmony import */ var _scripts_dom_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scripts/dom/popup */ "./src/scripts/dom/popup.js");








(0,_scripts_dom_addEventListners__WEBPACK_IMPORTED_MODULE_5__.addAllEventListeners)();

/* document.querySelector('section.introduction-container button.proceed').addEventListener('click', () => {
    hide('introduction-container');
    show('shipdropping');
    show('grids-container');
}) */

let player1 = (0,_scripts_player_human__WEBPACK_IMPORTED_MODULE_1__.human)("anas");
let player2 = (0,_scripts_player_ai__WEBPACK_IMPORTED_MODULE_0__.ai)();
let player1tempGrid = (0,_scripts_dom_createPlayerGrid__WEBPACK_IMPORTED_MODULE_4__.createGrid)(100, player1.board);
player2.dropRandomShips([0, 0, 1, 2, 1, 1]);
let player2Grid = player1tempGrid.cloneNode(true);
player2Grid.classList.add("enemy-grid", "hide");
document.querySelector(".grids-container").appendChild(player2Grid);
(0,_scripts_dom_startTheGame__WEBPACK_IMPORTED_MODULE_6__.startTheGame)().then(player1Grid => {
  let newGame = (0,_scripts_game__WEBPACK_IMPORTED_MODULE_2__.game)(player1, player2Grid, player2, player1Grid);
  newGame.startGame(newGame);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.8d5fd6b88dba1fce0336.js.map