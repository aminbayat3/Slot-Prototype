/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/column.component.ts":
/*!********************************************!*\
  !*** ./src/components/column.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slot/slot.utils */ "./src/components/slot/slot.utils.ts");
/* harmony import */ var _spinSet_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spinSet.component */ "./src/components/spinSet.component.ts");
/* harmony import */ var _state_slot_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/slot-state */ "./src/state/slot-state.ts");



class Column {
    constructor() {
        this.spinSingleColumn = (spinSetsOfColumn, endSpinCount, isLastColumn) => {
            const self = this;
            const spinSet = new _spinSet_component__WEBPACK_IMPORTED_MODULE_1__["default"]();
            let distance = 35; // TODO: This has to be changed to account for time since last iteration
            let currentSpinCount = 0;
            (function loop() {
                setTimeout(() => {
                    if (currentSpinCount >= endSpinCount - self.slowDownSpinCount) {
                        distance = Math.max(2, distance / 1.017); // TODO: This has to be changed to account for time since last iteration
                    }
                    spinSetsOfColumn.forEach((set) => {
                        spinSet.spinIconSet(set, distance, endSpinCount - currentSpinCount, isLastColumn)
                            ? currentSpinCount++
                            : currentSpinCount;
                    });
                    if (currentSpinCount >= endSpinCount) {
                        (0,_slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__.resetSpinIconSetPositions)(spinSetsOfColumn);
                        _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.endColumnSpin();
                    }
                    else {
                        loop();
                    }
                }, 0);
            })();
        };
        this.slowDownSpinCount = 2; // Spin Count after which the slowdown takes place
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Column);


/***/ }),

/***/ "./src/components/slot.data.ts":
/*!*************************************!*\
  !*** ./src/components/slot.data.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REEL_ITEMS": () => (/* binding */ REEL_ITEMS)
/* harmony export */ });
const REEL_ITEMS = [
    {
        name: "item1",
        color: "cyan",
        percentage: 0.05,
        value: 100,
    },
    {
        name: "item2",
        color: "blue",
        percentage: 0.05,
        value: 100,
    },
    {
        name: "item3",
        color: "darkblue",
        percentage: 0.05,
        value: 100,
    },
    {
        name: "Route1",
        color: "violet",
        percentage: 0.1,
        value: 50,
    },
    {
        name: "Route2",
        color: "purple",
        percentage: 0.1,
        value: 50,
    },
    {
        name: "a few coins",
        color: "orange",
        percentage: 0.5,
        value: 10,
    },
    {
        name: "many coins",
        color: "yellow",
        percentage: 0.15,
        value: 60,
    },
];


/***/ }),

/***/ "./src/components/slot/slot.component.ts":
/*!***********************************************!*\
  !*** ./src/components/slot/slot.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slot_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slot.data */ "./src/components/slot.data.ts");
/* harmony import */ var _slot_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slot.utils */ "./src/components/slot/slot.utils.ts");
/* harmony import */ var _state_slot_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/slot-state */ "./src/state/slot-state.ts");
/* harmony import */ var _column_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../column.component */ "./src/components/column.component.ts");
/* harmony import */ var _spinSet_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../spinSet.component */ "./src/components/spinSet.component.ts");
var _a;





class Slot {
    // constructor
    constructor() {
        this.startSpin = () => {
            if (!_state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.getIsSpinning) {
                _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.setIsSpinning = true;
                _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.setColumnsFinishedSpinning = 0;
                this.spin();
            }
        };
        // initiates the spinning and starts the animation loop
        this.spin = () => {
            console.log("Starting Spin Process.");
            console.log("Determine Outcome...");
            _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.setIsWin = Math.random() < _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.getWinPercentage;
            if (_state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.getIsWin) {
                _state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.setWinningIndex = (0,_slot_utils__WEBPACK_IMPORTED_MODULE_1__.getIconIndexWithValue)(Math.random());
                console.log("WIN! - Nice, you get: " +
                    _slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS[_state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.getWinningIndex].name +
                    "[" +
                    _slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS[_state_slot_state__WEBPACK_IMPORTED_MODULE_2__.slotState.getWinningIndex].color +
                    "]");
            }
            else {
                console.log("Loss! - Better luck next time");
            }
            let columns = document.querySelectorAll(".spin");
            const column = new _column_component__WEBPACK_IMPORTED_MODULE_3__["default"]();
            for (let i = 0; i < columns.length; i++) {
                setTimeout(column.spinSingleColumn, i * 250, columns[i].querySelectorAll(".spin-icon-set"), this.initialEndSpinCount + i * 3, i + 1 === columns.length);
            }
        };
        this.resetSpinIconSets = () => {
            const spinSets = document.querySelectorAll(".spin-icon-set");
            const spinSet = new _spinSet_component__WEBPACK_IMPORTED_MODULE_4__["default"];
            spinSet.resetSpinIconSetContents(spinSets);
            (0,_slot_utils__WEBPACK_IMPORTED_MODULE_1__.resetSpinIconSetPositions)(spinSets);
        };
        this.initialEndSpinCount = 10; // Spin Count after which the spinning stops
    }
}
_a = Slot;
Slot.getInstance = () => {
    if (Slot.instance) {
        return _a.instance;
    }
    _a.instance = new Slot();
    return _a.instance;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slot);


/***/ }),

/***/ "./src/components/slot/slot.utils.ts":
/*!*******************************************!*\
  !*** ./src/components/slot/slot.utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assignIcon": () => (/* binding */ assignIcon),
/* harmony export */   "getIconIndexWithValue": () => (/* binding */ getIconIndexWithValue),
/* harmony export */   "resetSpinIconSetPositions": () => (/* binding */ resetSpinIconSetPositions)
/* harmony export */ });
/* harmony import */ var _slot_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slot.data */ "./src/components/slot.data.ts");

//utility functions
function resetSpinIconSetPositions(spinSets) {
    for (let i = 0; i < spinSets.length; i++) {
        if (i % 3 === 0) {
            spinSets[i].style.top = -spinSets[i].offsetHeight + "px";
        }
        else if (i % 3 === 2) {
            spinSets[i].style.top = spinSets[i].offsetHeight + "px";
        }
        else {
            spinSets[i].style.top = 0 + "px";
        }
    }
}
function getIconIndexWithValue(randomValue) {
    // Via this function all of the icon assignments as well as the outcome in case of a winning spin is determined
    let cumulativePercentage = 0;
    for (let i = 0; i < _slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS.length; i++) {
        cumulativePercentage += _slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS[i].percentage;
        if (randomValue < cumulativePercentage) {
            return i;
        }
    }
    return -1;
}
// Assigns a random icon
function assignIcon(element) {
    let index = getIconIndexWithValue(Math.random());
    element.style.backgroundColor = _slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS[index].color;
    return index;
}



/***/ }),

/***/ "./src/components/spinSet.component.ts":
/*!*********************************************!*\
  !*** ./src/components/spinSet.component.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slot/slot.utils */ "./src/components/slot/slot.utils.ts");
/* harmony import */ var _state_slot_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/slot-state */ "./src/state/slot-state.ts");


class SpinSet {
    constructor() {
        this.assignIconSetIcons = (set, isStopSet, isLastColumn) => {
            let iconElements = set.querySelectorAll(".spin-icon");
            iconElements.forEach((iconElement) => (0,_slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__.assignIcon)(iconElement));
            if (isStopSet && _state_slot_state__WEBPACK_IMPORTED_MODULE_1__.slotState.getIsWin) {
                _state_slot_state__WEBPACK_IMPORTED_MODULE_1__.slotState.assignWinningIcon(iconElements[1]);
            }
            else if (isStopSet && isLastColumn) {
                // This and the following else if prevent an accidental win and can surely be implemented better in the assignment process
                let assignedIndex;
                do {
                    assignedIndex = (0,_slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__.assignIcon)(iconElements[1]);
                } while (this.lastStopSetMiddleAssignment === assignedIndex); // Adding/Removing could be done instead to guarantee a single execution, but this looks more random
                this.lastStopSetMiddleAssignment = assignedIndex;
            }
            else if (isStopSet) {
                this.lastStopSetMiddleAssignment = (0,_slot_slot_utils__WEBPACK_IMPORTED_MODULE_0__.assignIcon)(iconElements[1]);
            }
        };
        // Single Movement of Icon Set during column spinning
        this.spinIconSet = (set, distance, spinsLeft, isLastColumn) => {
            let newIconsAssigned = false;
            let top = Number(set.style.top.slice(0, set.style.top.length - 2));
            let newPos = top + distance;
            if (newPos > set.offsetHeight) {
                newPos = newPos - 3 * set.offsetHeight;
                this.assignIconSetIcons(set, spinsLeft === 3, isLastColumn); // Note: 3 seems weird here, but works because of the order in which everything gets checked, might be possible to simplify though
                newIconsAssigned = true;
            }
            set.style.top = Math.floor(newPos) + "px";
            return newIconsAssigned;
        };
        this.resetSpinIconSetContents = (spinSets) => {
            spinSets.forEach((set) => this.assignIconSetIcons(set, false, false));
        };
        this.lastStopSetMiddleAssignment = 0;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpinSet);


/***/ }),

/***/ "./src/state/slot-state.ts":
/*!*********************************!*\
  !*** ./src/state/slot-state.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slotState": () => (/* binding */ slotState)
/* harmony export */ });
/* harmony import */ var _components_slot_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/slot.data */ "./src/components/slot.data.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class SlotState extends State {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new SlotState();
        return this.instance;
    }
    // getters and setters
    get getIsSpinning() {
        return this.isSpinning;
    }
    set setIsSpinning(value) {
        this.isSpinning = value;
    }
    get getIsWin() {
        return this.isWin;
    }
    set setIsWin(value) {
        this.isWin = value;
    }
    get getWinningIndex() {
        return this.winningIndex;
    }
    set setWinningIndex(value) {
        this.winningIndex = value;
    }
    get getWinPercentage() {
        return this.winPercentage;
    }
    set setWinPercentage(probability) {
        if (probability > 0 && probability < 1) {
            this.winPercentage = probability;
        }
        throw new Error("WinPercentage cannot be more than 1 and less than or equal to 0");
    }
    get getColumnsFinishedSpinning() {
        return this.columnsFinishedSpinning;
    }
    set setColumnsFinishedSpinning(value) {
        this.columnsFinishedSpinning = value;
    }
    constructor() {
        super();
        // Assigns the winning icon
        this.assignWinningIcon = (element) => {
            element.style.backgroundColor = _components_slot_data__WEBPACK_IMPORTED_MODULE_0__.REEL_ITEMS[this.winningIndex].color;
            return this.winningIndex;
        };
        this.showEndScreen = () => {
            // TODO: Display whatever we need after a spin
        };
        // Activates the possibility to spin again
        this.endColumnSpin = () => {
            this.columnsFinishedSpinning++;
            if (this.columnsFinishedSpinning >= 3) {
                this.showEndScreen();
                this.isSpinning = false;
            }
        };
        this.isSpinning = false; // used to prevent further spinnings
        this.isWin = false; // determines if the player wins (-> middle object icon of the spin icon set on which the spinning stops will be swapped with the correct icon)
        this.winningIndex = 0; // Color for this prototype, will most likely be some sort of object that contains a reference image
        this.winPercentage = 0.5; // ~every 2nd spin should be a win
        this.columnsFinishedSpinning = 0;
    }
}
const slotState = SlotState.getInstance();


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_slot_slot_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/slot/slot.component */ "./src/components/slot/slot.component.ts");

const startButton = document.querySelector(".start-button");
const slot = _components_slot_slot_component__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
// Initalize stuff
slot.resetSpinIconSets();
startButton.addEventListener("click", slot.startSpin);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsNkRBQVU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQixrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ087Ozs7Ozs7VUM1RVA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vRDtBQUNwRDtBQUNBLGFBQWEsbUZBQWdCO0FBQzdCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3RvdHlwZS8uL3NyYy9jb21wb25lbnRzL2NvbHVtbi5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vcHJvdG90eXBlLy4vc3JjL2NvbXBvbmVudHMvc2xvdC5kYXRhLnRzIiwid2VicGFjazovL3Byb3RvdHlwZS8uL3NyYy9jb21wb25lbnRzL3Nsb3Qvc2xvdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vcHJvdG90eXBlLy4vc3JjL2NvbXBvbmVudHMvc2xvdC9zbG90LnV0aWxzLnRzIiwid2VicGFjazovL3Byb3RvdHlwZS8uL3NyYy9jb21wb25lbnRzL3NwaW5TZXQuY29tcG9uZW50LnRzIiwid2VicGFjazovL3Byb3RvdHlwZS8uL3NyYy9zdGF0ZS9zbG90LXN0YXRlLnRzIiwid2VicGFjazovL3Byb3RvdHlwZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm90b3R5cGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb3RvdHlwZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb3RvdHlwZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb3RvdHlwZS8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzZXRTcGluSWNvblNldFBvc2l0aW9ucyB9IGZyb20gXCIuL3Nsb3Qvc2xvdC51dGlsc1wiO1xuaW1wb3J0IFNwaW5TZXQgZnJvbSBcIi4vc3BpblNldC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHNsb3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9zbG90LXN0YXRlXCI7XG5jbGFzcyBDb2x1bW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNwaW5TaW5nbGVDb2x1bW4gPSAoc3BpblNldHNPZkNvbHVtbiwgZW5kU3BpbkNvdW50LCBpc0xhc3RDb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3Qgc3BpblNldCA9IG5ldyBTcGluU2V0KCk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSAzNTsgLy8gVE9ETzogVGhpcyBoYXMgdG8gYmUgY2hhbmdlZCB0byBhY2NvdW50IGZvciB0aW1lIHNpbmNlIGxhc3QgaXRlcmF0aW9uXG4gICAgICAgICAgICBsZXQgY3VycmVudFNwaW5Db3VudCA9IDA7XG4gICAgICAgICAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTcGluQ291bnQgPj0gZW5kU3BpbkNvdW50IC0gc2VsZi5zbG93RG93blNwaW5Db3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLm1heCgyLCBkaXN0YW5jZSAvIDEuMDE3KTsgLy8gVE9ETzogVGhpcyBoYXMgdG8gYmUgY2hhbmdlZCB0byBhY2NvdW50IGZvciB0aW1lIHNpbmNlIGxhc3QgaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3BpblNldHNPZkNvbHVtbi5mb3JFYWNoKChzZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5TZXQuc3Bpbkljb25TZXQoc2V0LCBkaXN0YW5jZSwgZW5kU3BpbkNvdW50IC0gY3VycmVudFNwaW5Db3VudCwgaXNMYXN0Q29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY3VycmVudFNwaW5Db3VudCsrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjdXJyZW50U3BpbkNvdW50O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTcGluQ291bnQgPj0gZW5kU3BpbkNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFNwaW5JY29uU2V0UG9zaXRpb25zKHNwaW5TZXRzT2ZDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdFN0YXRlLmVuZENvbHVtblNwaW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zbG93RG93blNwaW5Db3VudCA9IDI7IC8vIFNwaW4gQ291bnQgYWZ0ZXIgd2hpY2ggdGhlIHNsb3dkb3duIHRha2VzIHBsYWNlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29sdW1uO1xuIiwiZXhwb3J0IGNvbnN0IFJFRUxfSVRFTVMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcIml0ZW0xXCIsXG4gICAgICAgIGNvbG9yOiBcImN5YW5cIixcbiAgICAgICAgcGVyY2VudGFnZTogMC4wNSxcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJpdGVtMlwiLFxuICAgICAgICBjb2xvcjogXCJibHVlXCIsXG4gICAgICAgIHBlcmNlbnRhZ2U6IDAuMDUsXG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiaXRlbTNcIixcbiAgICAgICAgY29sb3I6IFwiZGFya2JsdWVcIixcbiAgICAgICAgcGVyY2VudGFnZTogMC4wNSxcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZTFcIixcbiAgICAgICAgY29sb3I6IFwidmlvbGV0XCIsXG4gICAgICAgIHBlcmNlbnRhZ2U6IDAuMSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlJvdXRlMlwiLFxuICAgICAgICBjb2xvcjogXCJwdXJwbGVcIixcbiAgICAgICAgcGVyY2VudGFnZTogMC4xLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYSBmZXcgY29pbnNcIixcbiAgICAgICAgY29sb3I6IFwib3JhbmdlXCIsXG4gICAgICAgIHBlcmNlbnRhZ2U6IDAuNSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIm1hbnkgY29pbnNcIixcbiAgICAgICAgY29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgIHBlcmNlbnRhZ2U6IDAuMTUsXG4gICAgICAgIHZhbHVlOiA2MCxcbiAgICB9LFxuXTtcbiIsInZhciBfYTtcbmltcG9ydCB7IFJFRUxfSVRFTVMgfSBmcm9tIFwiLi4vc2xvdC5kYXRhXCI7XG5pbXBvcnQgeyByZXNldFNwaW5JY29uU2V0UG9zaXRpb25zLCBnZXRJY29uSW5kZXhXaXRoVmFsdWUgfSBmcm9tIFwiLi9zbG90LnV0aWxzXCI7XG5pbXBvcnQgeyBzbG90U3RhdGUgfSBmcm9tIFwiLi4vLi4vc3RhdGUvc2xvdC1zdGF0ZVwiO1xuaW1wb3J0IENvbHVtbiBmcm9tIFwiLi4vY29sdW1uLmNvbXBvbmVudFwiO1xuaW1wb3J0IFNwaW5TZXQgZnJvbSBcIi4uL3NwaW5TZXQuY29tcG9uZW50XCI7XG5jbGFzcyBTbG90IHtcbiAgICAvLyBjb25zdHJ1Y3RvclxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN0YXJ0U3BpbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghc2xvdFN0YXRlLmdldElzU3Bpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICBzbG90U3RhdGUuc2V0SXNTcGlubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdFN0YXRlLnNldENvbHVtbnNGaW5pc2hlZFNwaW5uaW5nID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gaW5pdGlhdGVzIHRoZSBzcGlubmluZyBhbmQgc3RhcnRzIHRoZSBhbmltYXRpb24gbG9vcFxuICAgICAgICB0aGlzLnNwaW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIFNwaW4gUHJvY2Vzcy5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRldGVybWluZSBPdXRjb21lLi4uXCIpO1xuICAgICAgICAgICAgc2xvdFN0YXRlLnNldElzV2luID0gTWF0aC5yYW5kb20oKSA8IHNsb3RTdGF0ZS5nZXRXaW5QZXJjZW50YWdlO1xuICAgICAgICAgICAgaWYgKHNsb3RTdGF0ZS5nZXRJc1dpbikge1xuICAgICAgICAgICAgICAgIHNsb3RTdGF0ZS5zZXRXaW5uaW5nSW5kZXggPSBnZXRJY29uSW5kZXhXaXRoVmFsdWUoTWF0aC5yYW5kb20oKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXSU4hIC0gTmljZSwgeW91IGdldDogXCIgK1xuICAgICAgICAgICAgICAgICAgICBSRUVMX0lURU1TW3Nsb3RTdGF0ZS5nZXRXaW5uaW5nSW5kZXhdLm5hbWUgK1xuICAgICAgICAgICAgICAgICAgICBcIltcIiArXG4gICAgICAgICAgICAgICAgICAgIFJFRUxfSVRFTVNbc2xvdFN0YXRlLmdldFdpbm5pbmdJbmRleF0uY29sb3IgK1xuICAgICAgICAgICAgICAgICAgICBcIl1cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvc3MhIC0gQmV0dGVyIGx1Y2sgbmV4dCB0aW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNwaW5cIik7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBuZXcgQ29sdW1uKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNvbHVtbi5zcGluU2luZ2xlQ29sdW1uLCBpICogMjUwLCBjb2x1bW5zW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3Bpbi1pY29uLXNldFwiKSwgdGhpcy5pbml0aWFsRW5kU3BpbkNvdW50ICsgaSAqIDMsIGkgKyAxID09PSBjb2x1bW5zLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVzZXRTcGluSWNvblNldHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcGluU2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3Bpbi1pY29uLXNldFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNwaW5TZXQgPSBuZXcgU3BpblNldDtcbiAgICAgICAgICAgIHNwaW5TZXQucmVzZXRTcGluSWNvblNldENvbnRlbnRzKHNwaW5TZXRzKTtcbiAgICAgICAgICAgIHJlc2V0U3Bpbkljb25TZXRQb3NpdGlvbnMoc3BpblNldHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRpYWxFbmRTcGluQ291bnQgPSAxMDsgLy8gU3BpbiBDb3VudCBhZnRlciB3aGljaCB0aGUgc3Bpbm5pbmcgc3RvcHNcbiAgICB9XG59XG5fYSA9IFNsb3Q7XG5TbG90LmdldEluc3RhbmNlID0gKCkgPT4ge1xuICAgIGlmIChTbG90Lmluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBfYS5pbnN0YW5jZTtcbiAgICB9XG4gICAgX2EuaW5zdGFuY2UgPSBuZXcgU2xvdCgpO1xuICAgIHJldHVybiBfYS5pbnN0YW5jZTtcbn07XG5leHBvcnQgZGVmYXVsdCBTbG90O1xuIiwiaW1wb3J0IHsgUkVFTF9JVEVNUyB9IGZyb20gXCIuLi9zbG90LmRhdGFcIjtcbi8vdXRpbGl0eSBmdW5jdGlvbnNcbmZ1bmN0aW9uIHJlc2V0U3Bpbkljb25TZXRQb3NpdGlvbnMoc3BpblNldHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwaW5TZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgICAgc3BpblNldHNbaV0uc3R5bGUudG9wID0gLXNwaW5TZXRzW2ldLm9mZnNldEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpICUgMyA9PT0gMikge1xuICAgICAgICAgICAgc3BpblNldHNbaV0uc3R5bGUudG9wID0gc3BpblNldHNbaV0ub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3BpblNldHNbaV0uc3R5bGUudG9wID0gMCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEljb25JbmRleFdpdGhWYWx1ZShyYW5kb21WYWx1ZSkge1xuICAgIC8vIFZpYSB0aGlzIGZ1bmN0aW9uIGFsbCBvZiB0aGUgaWNvbiBhc3NpZ25tZW50cyBhcyB3ZWxsIGFzIHRoZSBvdXRjb21lIGluIGNhc2Ugb2YgYSB3aW5uaW5nIHNwaW4gaXMgZGV0ZXJtaW5lZFxuICAgIGxldCBjdW11bGF0aXZlUGVyY2VudGFnZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSRUVMX0lURU1TLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1bXVsYXRpdmVQZXJjZW50YWdlICs9IFJFRUxfSVRFTVNbaV0ucGVyY2VudGFnZTtcbiAgICAgICAgaWYgKHJhbmRvbVZhbHVlIDwgY3VtdWxhdGl2ZVBlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbi8vIEFzc2lnbnMgYSByYW5kb20gaWNvblxuZnVuY3Rpb24gYXNzaWduSWNvbihlbGVtZW50KSB7XG4gICAgbGV0IGluZGV4ID0gZ2V0SWNvbkluZGV4V2l0aFZhbHVlKE1hdGgucmFuZG9tKCkpO1xuICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUkVFTF9JVEVNU1tpbmRleF0uY29sb3I7XG4gICAgcmV0dXJuIGluZGV4O1xufVxuZXhwb3J0IHsgcmVzZXRTcGluSWNvblNldFBvc2l0aW9ucywgZ2V0SWNvbkluZGV4V2l0aFZhbHVlLCBhc3NpZ25JY29uIH07XG4iLCJpbXBvcnQgeyBhc3NpZ25JY29uIH0gZnJvbSBcIi4vc2xvdC9zbG90LnV0aWxzXCI7XG5pbXBvcnQgeyBzbG90U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvc2xvdC1zdGF0ZVwiO1xuY2xhc3MgU3BpblNldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXNzaWduSWNvblNldEljb25zID0gKHNldCwgaXNTdG9wU2V0LCBpc0xhc3RDb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGxldCBpY29uRWxlbWVudHMgPSBzZXQucXVlcnlTZWxlY3RvckFsbChcIi5zcGluLWljb25cIik7XG4gICAgICAgICAgICBpY29uRWxlbWVudHMuZm9yRWFjaCgoaWNvbkVsZW1lbnQpID0+IGFzc2lnbkljb24oaWNvbkVsZW1lbnQpKTtcbiAgICAgICAgICAgIGlmIChpc1N0b3BTZXQgJiYgc2xvdFN0YXRlLmdldElzV2luKSB7XG4gICAgICAgICAgICAgICAgc2xvdFN0YXRlLmFzc2lnbldpbm5pbmdJY29uKGljb25FbGVtZW50c1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0b3BTZXQgJiYgaXNMYXN0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBhbmQgdGhlIGZvbGxvd2luZyBlbHNlIGlmIHByZXZlbnQgYW4gYWNjaWRlbnRhbCB3aW4gYW5kIGNhbiBzdXJlbHkgYmUgaW1wbGVtZW50ZWQgYmV0dGVyIGluIHRoZSBhc3NpZ25tZW50IHByb2Nlc3NcbiAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWRJbmRleDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkSW5kZXggPSBhc3NpZ25JY29uKGljb25FbGVtZW50c1sxXSk7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAodGhpcy5sYXN0U3RvcFNldE1pZGRsZUFzc2lnbm1lbnQgPT09IGFzc2lnbmVkSW5kZXgpOyAvLyBBZGRpbmcvUmVtb3ZpbmcgY291bGQgYmUgZG9uZSBpbnN0ZWFkIHRvIGd1YXJhbnRlZSBhIHNpbmdsZSBleGVjdXRpb24sIGJ1dCB0aGlzIGxvb2tzIG1vcmUgcmFuZG9tXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U3RvcFNldE1pZGRsZUFzc2lnbm1lbnQgPSBhc3NpZ25lZEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNTdG9wU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U3RvcFNldE1pZGRsZUFzc2lnbm1lbnQgPSBhc3NpZ25JY29uKGljb25FbGVtZW50c1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNpbmdsZSBNb3ZlbWVudCBvZiBJY29uIFNldCBkdXJpbmcgY29sdW1uIHNwaW5uaW5nXG4gICAgICAgIHRoaXMuc3Bpbkljb25TZXQgPSAoc2V0LCBkaXN0YW5jZSwgc3BpbnNMZWZ0LCBpc0xhc3RDb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdJY29uc0Fzc2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgdG9wID0gTnVtYmVyKHNldC5zdHlsZS50b3Auc2xpY2UoMCwgc2V0LnN0eWxlLnRvcC5sZW5ndGggLSAyKSk7XG4gICAgICAgICAgICBsZXQgbmV3UG9zID0gdG9wICsgZGlzdGFuY2U7XG4gICAgICAgICAgICBpZiAobmV3UG9zID4gc2V0Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgIG5ld1BvcyA9IG5ld1BvcyAtIDMgKiBzZXQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduSWNvblNldEljb25zKHNldCwgc3BpbnNMZWZ0ID09PSAzLCBpc0xhc3RDb2x1bW4pOyAvLyBOb3RlOiAzIHNlZW1zIHdlaXJkIGhlcmUsIGJ1dCB3b3JrcyBiZWNhdXNlIG9mIHRoZSBvcmRlciBpbiB3aGljaCBldmVyeXRoaW5nIGdldHMgY2hlY2tlZCwgbWlnaHQgYmUgcG9zc2libGUgdG8gc2ltcGxpZnkgdGhvdWdoXG4gICAgICAgICAgICAgICAgbmV3SWNvbnNBc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXQuc3R5bGUudG9wID0gTWF0aC5mbG9vcihuZXdQb3MpICsgXCJweFwiO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0ljb25zQXNzaWduZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVzZXRTcGluSWNvblNldENvbnRlbnRzID0gKHNwaW5TZXRzKSA9PiB7XG4gICAgICAgICAgICBzcGluU2V0cy5mb3JFYWNoKChzZXQpID0+IHRoaXMuYXNzaWduSWNvblNldEljb25zKHNldCwgZmFsc2UsIGZhbHNlKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGFzdFN0b3BTZXRNaWRkbGVBc3NpZ25tZW50ID0gMDtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTcGluU2V0O1xuIiwiaW1wb3J0IHsgUkVFTF9JVEVNUyB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Nsb3QuZGF0YVwiO1xuY2xhc3MgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XG4gICAgfVxufVxuY2xhc3MgU2xvdFN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2xvdFN0YXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyBnZXR0ZXJzIGFuZCBzZXR0ZXJzXG4gICAgZ2V0IGdldElzU3Bpbm5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU3Bpbm5pbmc7XG4gICAgfVxuICAgIHNldCBzZXRJc1NwaW5uaW5nKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaXNTcGlubmluZyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZ2V0SXNXaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzV2luO1xuICAgIH1cbiAgICBzZXQgc2V0SXNXaW4odmFsdWUpIHtcbiAgICAgICAgdGhpcy5pc1dpbiA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZ2V0V2lubmluZ0luZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aW5uaW5nSW5kZXg7XG4gICAgfVxuICAgIHNldCBzZXRXaW5uaW5nSW5kZXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy53aW5uaW5nSW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGdldFdpblBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpblBlcmNlbnRhZ2U7XG4gICAgfVxuICAgIHNldCBzZXRXaW5QZXJjZW50YWdlKHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGlmIChwcm9iYWJpbGl0eSA+IDAgJiYgcHJvYmFiaWxpdHkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLndpblBlcmNlbnRhZ2UgPSBwcm9iYWJpbGl0eTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaW5QZXJjZW50YWdlIGNhbm5vdCBiZSBtb3JlIHRoYW4gMSBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDBcIik7XG4gICAgfVxuICAgIGdldCBnZXRDb2x1bW5zRmluaXNoZWRTcGlubmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1uc0ZpbmlzaGVkU3Bpbm5pbmc7XG4gICAgfVxuICAgIHNldCBzZXRDb2x1bW5zRmluaXNoZWRTcGlubmluZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbHVtbnNGaW5pc2hlZFNwaW5uaW5nID0gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvLyBBc3NpZ25zIHRoZSB3aW5uaW5nIGljb25cbiAgICAgICAgdGhpcy5hc3NpZ25XaW5uaW5nSWNvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFJFRUxfSVRFTVNbdGhpcy53aW5uaW5nSW5kZXhdLmNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lubmluZ0luZGV4O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNob3dFbmRTY3JlZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBEaXNwbGF5IHdoYXRldmVyIHdlIG5lZWQgYWZ0ZXIgYSBzcGluXG4gICAgICAgIH07XG4gICAgICAgIC8vIEFjdGl2YXRlcyB0aGUgcG9zc2liaWxpdHkgdG8gc3BpbiBhZ2FpblxuICAgICAgICB0aGlzLmVuZENvbHVtblNwaW4gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNGaW5pc2hlZFNwaW5uaW5nKys7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2x1bW5zRmluaXNoZWRTcGlubmluZyA+PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RW5kU2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NwaW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaXNTcGlubmluZyA9IGZhbHNlOyAvLyB1c2VkIHRvIHByZXZlbnQgZnVydGhlciBzcGlubmluZ3NcbiAgICAgICAgdGhpcy5pc1dpbiA9IGZhbHNlOyAvLyBkZXRlcm1pbmVzIGlmIHRoZSBwbGF5ZXIgd2lucyAoLT4gbWlkZGxlIG9iamVjdCBpY29uIG9mIHRoZSBzcGluIGljb24gc2V0IG9uIHdoaWNoIHRoZSBzcGlubmluZyBzdG9wcyB3aWxsIGJlIHN3YXBwZWQgd2l0aCB0aGUgY29ycmVjdCBpY29uKVxuICAgICAgICB0aGlzLndpbm5pbmdJbmRleCA9IDA7IC8vIENvbG9yIGZvciB0aGlzIHByb3RvdHlwZSwgd2lsbCBtb3N0IGxpa2VseSBiZSBzb21lIHNvcnQgb2Ygb2JqZWN0IHRoYXQgY29udGFpbnMgYSByZWZlcmVuY2UgaW1hZ2VcbiAgICAgICAgdGhpcy53aW5QZXJjZW50YWdlID0gMC41OyAvLyB+ZXZlcnkgMm5kIHNwaW4gc2hvdWxkIGJlIGEgd2luXG4gICAgICAgIHRoaXMuY29sdW1uc0ZpbmlzaGVkU3Bpbm5pbmcgPSAwO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBzbG90U3RhdGUgPSBTbG90U3RhdGUuZ2V0SW5zdGFuY2UoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNsb3QgZnJvbSBcIi4vY29tcG9uZW50cy9zbG90L3Nsb3QuY29tcG9uZW50XCI7XG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtYnV0dG9uXCIpO1xuY29uc3Qgc2xvdCA9IFNsb3QuZ2V0SW5zdGFuY2UoKTtcbi8vIEluaXRhbGl6ZSBzdHVmZlxuc2xvdC5yZXNldFNwaW5JY29uU2V0cygpO1xuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNsb3Quc3RhcnRTcGluKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==