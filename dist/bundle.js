/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! exports provided: SimpleGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleGame", function() { return SimpleGame; });
/// <reference path="phaser.d.ts" />
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SimpleGame;
(function (SimpleGame) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            var _this = _super.call(this, 'start-screen') || this;
            _this.config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: _this
            };
            _this.score = 0;
            _this.game = new Phaser.Game(_this.config);
            return _this;
        }
        Level1.prototype.preload = function () {
            this.load.image('sky', './assets/sky.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('star', './assets/star.png');
            this.load.image('bomb', './assets/bomb.png');
            this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        };
        Level1.prototype.create = function () {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.add.sprite(400, 300, 'sky');
            this.bombs = this.physics.add.group();
            this.createPlatforms();
            this.createPlayer();
            this.createAnimations();
            this.createStars();
            this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.createColliders();
            this.physics.add.overlap(this.player, this.stars, this.collectStars, null, this);
        };
        Level1.prototype.update = function () {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
        };
        Level1.prototype.createPlayer = function () {
            this.player = this.physics.add.sprite(100, 450, 'dude');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
        };
        Level1.prototype.createPlatforms = function () {
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 250, 'ground');
            this.platforms.create(750, 220, 'ground');
        };
        Level1.prototype.collectStars = function (player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                }, this);
                var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
            }
        };
        Level1.prototype.createColliders = function () {
            this.physics.add.collider(this.player, this.platforms);
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        };
        Level1.prototype.hitBomb = function (player, bomb) {
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameover = true;
        };
        Level1.prototype.createStars = function () {
            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });
            this.stars.children.iterate(function (child) {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            }, this);
        };
        Level1.prototype.createAnimations = function () {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNames('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        };
        return Level1;
    }(Phaser.Scene));
    SimpleGame.Level1 = Level1;
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            var _this = _super.call(this, 'start-screen') || this;
            _this.config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: _this
            };
            _this.score = 0;
            _this.game = new Phaser.Game(_this.config);
            return _this;
        }
        Level2.prototype.preload = function () {
            this.load.image('sky', './assets/sky.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('star', './assets/star.png');
            this.load.image('bomb', './assets/bomb.png');
            this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        };
        Level2.prototype.create = function () {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.add.sprite(400, 300, 'sky');
            this.bombs = this.physics.add.group();
            this.createPlatforms();
            this.createPlayer();
            this.createAnimations();
            this.createStars();
            this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.createColliders();
            this.physics.add.overlap(this.player, this.stars, this.collectStars, null, this);
        };
        Level2.prototype.update = function () {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
        };
        Level2.prototype.createPlayer = function () {
            this.player = this.physics.add.sprite(100, 450, 'dude');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
        };
        Level2.prototype.createPlatforms = function () {
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 250, 'ground');
            this.platforms.create(750, 220, 'ground');
        };
        Level2.prototype.collectStars = function (player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                }, this);
                var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
            }
        };
        Level2.prototype.createColliders = function () {
            this.physics.add.collider(this.player, this.platforms);
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        };
        Level2.prototype.hitBomb = function (player, bomb) {
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameover = true;
        };
        Level2.prototype.createStars = function () {
            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });
            this.stars.children.iterate(function (child) {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            }, this);
        };
        Level2.prototype.createAnimations = function () {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNames('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        };
        return Level2;
    }(Phaser.Scene));
    SimpleGame.Level2 = Level2;
})(SimpleGame || (SimpleGame = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.ts");

window.onload = function () {
    var game = new _game__WEBPACK_IMPORTED_MODULE_0__["SimpleGame"].Level1();
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUFBLG9DQUFvQzs7Ozs7Ozs7Ozs7QUFFOUIsSUFBVyxVQUFVLENBNlMxQjtBQTdTRCxXQUFpQixVQUFVO0lBQ3ZCO1FBQTRCLDBCQUFZO1FBY3BDO1lBQUEsWUFDSSxrQkFBTSxjQUFjLENBQUMsU0FFeEI7WUFoQkQsWUFBTSxHQUFHO2dCQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsT0FBTyxFQUFFO29CQUNMLE9BQU8sRUFBRSxRQUFRO29CQUNqQixNQUFNLEVBQUU7d0JBQ0osT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQzt3QkFDakIsS0FBSyxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0o7Z0JBQ0QsS0FBSyxFQUFFLEtBQUk7YUFDZDtZQVdELFdBQUssR0FBVyxDQUFDLENBQUM7WUFSZCxLQUFJLENB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LEVBN1NnQixVQUFVLEtBQVYsVUFBVSxRQTZTMUI7Ozs7Ozs7Ozs7Ozs7OztBQy9TbUM7QUFHcEMsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNaLElBQUksSUFBSSxHQUFHLElBQUksZ0RBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInBoYXNlci5kLnRzXCIgLz5cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU2ltcGxlR2FtZSB7ICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIExldmVsMSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBQaGFzZXIuQVVUTyxcclxuICAgICAgICAgICAgd2lkdGg6IDgwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgIHBoeXNpY3M6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdhcmNhZGUnLFxyXG4gICAgICAgICAgICAgICAgYXJjYWRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3Jhdml0eToge3k6IDMwMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjZW5lOiB0aGlzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcignc3RhcnQtc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSh0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZ2FtZTogUGhhc2VyLkdhbWU7XHJcbiAgICAgICAgcGxhdGZvcm1zOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3RhdGljR3JvdXA7XHJcbiAgICAgICAgcGxheWVyOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlO1xyXG4gICAgICAgIGN1cnNvcnM6IEN1cnNvcktleXM7XHJcbiAgICAgICAgc3RhcnM6IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5Hcm91cDtcclxuICAgICAgICBzY29yZTogbnVtYmVyID0gMDtcclxuICAgICAgICBzY29yZVRleHQ6IFBoYXNlci5HYW1lT2JqZWN0cy5UZXh0O1xyXG4gICAgICAgIGJvbWJzOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuR3JvdXA7XHJcbiAgICAgICAgZ2FtZW92ZXI6IEJvb2xlYW47XHJcbiAgICBcclxuICAgICAgICBwcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NreScsICcuL2Fzc2V0cy9za3kucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ3JvdW5kJywgJy4vYXNzZXRzL3BsYXRmb3JtLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0YXInLCAnLi9hc3NldHMvc3Rhci5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib21iJywgJy4vYXNzZXRzL2JvbWIucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnZHVkZScsICcuL2Fzc2V0cy9kdWRlLnBuZycsIHsgZnJhbWVXaWR0aDogMzIsIGZyYW1lSGVpZ2h0OiA0OH0pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzID0gdGhpcy5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkLnNwcml0ZSg0MDAsMzAwLCAnc2t5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9tYnMgPSB0aGlzLnBoeXNpY3MuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxhdGZvcm1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUZXh0ID0gdGhpcy5hZGQudGV4dCgxNiwgMTYsICdzY29yZTogMCcsIHsgZm9udFNpemU6ICczMnB4JywgZmlsbDogJyMwMDAnIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbGxpZGVycygpO1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuc3RhcnMsIHRoaXMuY29sbGVjdFN0YXJzLCBudWxsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnNldFZlbG9jaXR5WCgtMTYwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ2xlZnQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMTYwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ3JpZ2h0JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5hbmltcy5wbGF5KCd0dXJuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnNvcnMudXAuaXNEb3duICYmIHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0VmVsb2NpdHlZKC0zMzApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVQbGF5ZXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5waHlzaWNzLmFkZC5zcHJpdGUoMTAwLCA0NTAsICdkdWRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNldEJvdW5jZSgwLjIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhdGZvcm1zID0gdGhpcy5waHlzaWNzLmFkZC5zdGF0aWNHcm91cCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNDAwLCA1NjgsICdncm91bmQnKS5zZXRTY2FsZSgyKS5yZWZyZXNoQm9keSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNjAwLCA0MDAsICdncm91bmQnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDUwLCAyNTAsICdncm91bmQnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDc1MCwgMjIwLCAnZ3JvdW5kJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgY29sbGVjdFN0YXJzKHBsYXllcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSwgc3RhcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSkge1xyXG4gICAgICAgICAgICBzdGFyLmRpc2FibGVCb2R5KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlVGV4dC5zZXRUZXh0KCdTY29yZTogJyArIHRoaXMuc2NvcmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnMuY291bnRBY3RpdmUodHJ1ZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnMuY2hpbGRyZW4uaXRlcmF0ZShmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVuYWJsZUJvZHkodHJ1ZSwgY2hpbGQueCwgMCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9ICh0aGlzLnBsYXllci54IDwgNDAwKSA/IFBoYXNlci5NYXRoLkJldHdlZW4oNDAwLCA4MDApIDogUGhhc2VyLk1hdGguQmV0d2VlbigwLCA0MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib21iID0gdGhpcy5ib21icy5jcmVhdGUoeCwgMTYsICdib21iJyk7XHJcbiAgICAgICAgICAgICAgICBib21iLnNldEJvdW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIGJvbWIuc2V0Q29sbGlkZVdvcmxkQm91bmRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYm9tYi5zZXRWZWxvY2l0eShQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yMDAsIDIwMCksIDIwKTtcclxuICAgICAgICAgICAgICAgIGJvbWIuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbGxpZGVycygpIHtcclxuICAgICAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcih0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLmNvbGxpZGVyKHRoaXMuc3RhcnMsIHRoaXMucGxhdGZvcm1zKTtcclxuICAgICAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcih0aGlzLmJvbWJzLCB0aGlzLnBsYXRmb3Jtcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIodGhpcy5wbGF5ZXIsIHRoaXMuYm9tYnMsIHRoaXMuaGl0Qm9tYiwgbnVsbCwgdGhpcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaXRCb21iKHBsYXllcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSwgYm9tYjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0VGludCgweGZmMDAwMCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ3R1cm4nKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lb3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVTdGFycygpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFycyA9IHRoaXMucGh5c2ljcy5hZGQuZ3JvdXAoe1xyXG4gICAgICAgICAgICAgICAga2V5OiAnc3RhcicsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IDExLFxyXG4gICAgICAgICAgICAgICAgc2V0WFk6IHt4OiAxMiwgeTogMCwgc3RlcFg6IDcwfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnMuY2hpbGRyZW4uaXRlcmF0ZShmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc2V0Qm91bmNlWShQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC40LCAwLjgpKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVBbmltYXRpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTnVtYmVycygnZHVkZScsIHtzdGFydDogMCwgZW5kOiAzfSksXHJcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleTogJ3R1cm4nLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVzOiBbe2tleTogJ2R1ZGUnLCBmcmFtZTogNH1dLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlOiAyMFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleTogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoJ2R1ZGUnLCB7c3RhcnQ6IDUsIGVuZDogOH0pLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlOiAxMCxcclxuICAgICAgICAgICAgICAgIHJlcGVhdDogLTFcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIExldmVsMiBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBQaGFzZXIuQVVUTyxcclxuICAgICAgICAgICAgd2lkdGg6IDgwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgIHBoeXNpY3M6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdhcmNhZGUnLFxyXG4gICAgICAgICAgICAgICAgYXJjYWRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3Jhdml0eToge3k6IDMwMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjZW5lOiB0aGlzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcignc3RhcnQtc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSh0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZ2FtZTogUGhhc2VyLkdhbWU7XHJcbiAgICAgICAgcGxhdGZvcm1zOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3RhdGljR3JvdXA7XHJcbiAgICAgICAgcGxheWVyOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlO1xyXG4gICAgICAgIGN1cnNvcnM6IEN1cnNvcktleXM7XHJcbiAgICAgICAgc3RhcnM6IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5Hcm91cDtcclxuICAgICAgICBzY29yZTogbnVtYmVyID0gMDtcclxuICAgICAgICBzY29yZVRleHQ6IFBoYXNlci5HYW1lT2JqZWN0cy5UZXh0O1xyXG4gICAgICAgIGJvbWJzOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuR3JvdXA7XHJcbiAgICAgICAgZ2FtZW92ZXI6IEJvb2xlYW47XHJcbiAgICBcclxuICAgICAgICBwcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NreScsICcuL2Fzc2V0cy9za3kucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ3JvdW5kJywgJy4vYXNzZXRzL3BsYXRmb3JtLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0YXInLCAnLi9hc3NldHMvc3Rhci5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib21iJywgJy4vYXNzZXRzL2JvbWIucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnZHVkZScsICcuL2Fzc2V0cy9kdWRlLnBuZycsIHsgZnJhbWVXaWR0aDogMzIsIGZyYW1lSGVpZ2h0OiA0OH0pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzID0gdGhpcy5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkLnNwcml0ZSg0MDAsMzAwLCAnc2t5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9tYnMgPSB0aGlzLnBoeXNpY3MuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxhdGZvcm1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQW5pbWF0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVUZXh0ID0gdGhpcy5hZGQudGV4dCgxNiwgMTYsICdzY29yZTogMCcsIHsgZm9udFNpemU6ICczMnB4JywgZmlsbDogJyMwMDAnIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbGxpZGVycygpO1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuc3RhcnMsIHRoaXMuY29sbGVjdFN0YXJzLCBudWxsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnNldFZlbG9jaXR5WCgtMTYwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ2xlZnQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMTYwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ3JpZ2h0JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5hbmltcy5wbGF5KCd0dXJuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnNvcnMudXAuaXNEb3duICYmIHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0VmVsb2NpdHlZKC0zMzApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVQbGF5ZXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5waHlzaWNzLmFkZC5zcHJpdGUoMTAwLCA0NTAsICdkdWRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNldEJvdW5jZSgwLjIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhdGZvcm1zID0gdGhpcy5waHlzaWNzLmFkZC5zdGF0aWNHcm91cCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNDAwLCA1NjgsICdncm91bmQnKS5zZXRTY2FsZSgyKS5yZWZyZXNoQm9keSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNjAwLCA0MDAsICdncm91bmQnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDUwLCAyNTAsICdncm91bmQnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDc1MCwgMjIwLCAnZ3JvdW5kJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgY29sbGVjdFN0YXJzKHBsYXllcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSwgc3RhcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSkge1xyXG4gICAgICAgICAgICBzdGFyLmRpc2FibGVCb2R5KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlVGV4dC5zZXRUZXh0KCdTY29yZTogJyArIHRoaXMuc2NvcmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnMuY291bnRBY3RpdmUodHJ1ZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnMuY2hpbGRyZW4uaXRlcmF0ZShmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVuYWJsZUJvZHkodHJ1ZSwgY2hpbGQueCwgMCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9ICh0aGlzLnBsYXllci54IDwgNDAwKSA/IFBoYXNlci5NYXRoLkJldHdlZW4oNDAwLCA4MDApIDogUGhhc2VyLk1hdGguQmV0d2VlbigwLCA0MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib21iID0gdGhpcy5ib21icy5jcmVhdGUoeCwgMTYsICdib21iJyk7XHJcbiAgICAgICAgICAgICAgICBib21iLnNldEJvdW5jZSgxKTtcclxuICAgICAgICAgICAgICAgIGJvbWIuc2V0Q29sbGlkZVdvcmxkQm91bmRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYm9tYi5zZXRWZWxvY2l0eShQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yMDAsIDIwMCksIDIwKTtcclxuICAgICAgICAgICAgICAgIGJvbWIuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbGxpZGVycygpIHtcclxuICAgICAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcih0aGlzLnBsYXllciwgdGhpcy5wbGF0Zm9ybXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLmNvbGxpZGVyKHRoaXMuc3RhcnMsIHRoaXMucGxhdGZvcm1zKTtcclxuICAgICAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcih0aGlzLmJvbWJzLCB0aGlzLnBsYXRmb3Jtcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIodGhpcy5wbGF5ZXIsIHRoaXMuYm9tYnMsIHRoaXMuaGl0Qm9tYiwgbnVsbCwgdGhpcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaXRCb21iKHBsYXllcjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSwgYm9tYjogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0VGludCgweGZmMDAwMCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ3R1cm4nKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lb3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVTdGFycygpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFycyA9IHRoaXMucGh5c2ljcy5hZGQuZ3JvdXAoe1xyXG4gICAgICAgICAgICAgICAga2V5OiAnc3RhcicsXHJcbiAgICAgICAgICAgICAgICByZXBlYXQ6IDExLFxyXG4gICAgICAgICAgICAgICAgc2V0WFk6IHt4OiAxMiwgeTogMCwgc3RlcFg6IDcwfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnMuY2hpbGRyZW4uaXRlcmF0ZShmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc2V0Qm91bmNlWShQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC40LCAwLjgpKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVBbmltYXRpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTnVtYmVycygnZHVkZScsIHtzdGFydDogMCwgZW5kOiAzfSksXHJcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleTogJ3R1cm4nLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVzOiBbe2tleTogJ2R1ZGUnLCBmcmFtZTogNH1dLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlOiAyMFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleTogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoJ2R1ZGUnLCB7c3RhcnQ6IDUsIGVuZDogOH0pLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlOiAxMCxcclxuICAgICAgICAgICAgICAgIHJlcGVhdDogLTFcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSAgICAgICAgXHJcbn0iLCJpbXBvcnQgeyBTaW1wbGVHYW1lIH0gZnJvbSAnLi9nYW1lJztcclxuXHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgdmFyIGdhbWUgPSBuZXcgU2ltcGxlR2FtZS5MZXZlbDEoKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==