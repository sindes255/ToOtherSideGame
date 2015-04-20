var GAME_NUMBER = 0,
    EVENT_THROTLLING_THRESHHOLD = 100;

/*
    PURPOSE OF THE GAME
To be the first to reach the line opposite to one's base line.

When the game starts the fences are placed in their storage area (10 for each player).
Each player places his pawn in the centre of his base line.
White player starts first.

    How To Play The Game To other side:
Each player in turn, chooses to move his pawn or to put up one of his fences.
When he has run out of fences, the player must move his pawn.

    Pawn moves
The pawns are moved one square at a time, horizontally or vertically, forwards or backwards.
The pawns must get around the fences.

    Positioning of the fences
The fences must be placed between 2 sets of 2 squares.
The fences can be used to facilitate the player’s progress or to impede that of the opponent, however, an access to the goal line must always be left open.

    Face to face
When two pawns face each other on neighboring squares which are not separated
by a fence, the player whose turn it is can jump the opponent’s pawn
(and place himself behind him), thus advancing an extra square. If there is a fence behind the said pawn, the player can place his pawn to the left or the right of the other pawn.

    END OF GAME
The first player who reaches one of the 9 squares opposite his base line is the winner.
*/

if(window.outerWidth > 1024 && !document.all) {
    window.gui = new Gui();
    window.game = new Game();
    window.events = new Events();


    $(document).ready(function () {
        var body = $('body');

        /*================ Player function ================*/
        function initMusic(url) {//url of streaming radio
            var audioTpl,
                playerIconContainer,
                playerIcon,
                player,
                playerIconSlider;

            audioTpl = "<video autoplay='' id='player' name='media' style='display: none' data-volume='0.00' preload='none'><source src='" + url + "' type='audio/mpeg'></video>";
            body.prepend(audioTpl);
            document.getElementById('player').volume = 0.05;
            body.prepend(getTemplateByClass('playerIconContainer'));

            playerIconContainer = $('#playerIconContainer');
            playerIcon = playerIconContainer.find('.playerIcon');
            playerIconContainer.append("<div id='sl' class='sl'></div>");
            player = $('#player')[0];
            playerIconSlider = new slider('sl', 100, 0, 100, 1, function (x) {
                $('#player')[0].volume = x * 0.001
            });
            playerIconSlider.setValue(50);

            playerIcon.on('click', function () {
                if (game.player.play) {
                    game.player.play = 0;
                    game.player.volume = playerIconSlider.getValue() * 0.001;
                    playerIconSlider.setValue(0);

                    animate({
                        duration: 1000,
                        step: function (progress) {//progress of animation ( 0 - 1)
                            document.getElementById('player').volume = game.player.volume * (1 - progress);
                        }
                    });

                    $(this).removeClass('playerIcon__trigger_on').removeClass('playerIcon__on').addClass('playerIcon__off');
                } else {
                    game.player.play = 1;
                    playerIconSlider.setValue(game.player.volume / 0.001);

                    animate({
                        duration: 1000,
                        step: function (progress) {//progress of animation ( 0 - 1)
                            document.getElementById('player').volume = game.player.volume * progress;
                        }
                    });

                    $(this).removeClass('playerIcon__trigger_off').removeClass('playerIcon__off').addClass('playerIcon__on');
                }
            });

            playerIcon.mouseenter(function () {
                if (game.player.play) {
                    $(this).removeClass('playerIcon__on').addClass('playerIcon__trigger_on');
                } else {
                    $(this).removeClass('playerIcon__off').addClass('playerIcon__trigger_off');
                }
            }).mouseleave(function () {
                if (game.player.play) {
                    $(this).removeClass('playerIcon__trigger_on').addClass('playerIcon__on');
                } else {
                    $(this).removeClass('playerIcon__trigger_off').addClass('playerIcon__off');
                }
            });
        }

        /*================ Оbject to showing modal window function ================*/
        window.menuObj = {
            header: '<img class="logo-img" src="/images/icon128.png" width="58"/>To other side',
            text: '<p>This is a game where the goal is to reach the opposite end of the table and prevent the enemy to do it.</p>',
            buttons: [
                {
                    text: 'New Game',
                    background: 'url(/images/darkwood.jpg); color: #999',
                    callback: function (event) {
                        var ev = event;

                        updateModal({
                            header: 'New Game',
                            text: getTemplateByClass('new-game__settings'),
                            switch: 1,
                            back: function () {
                                updateModal(ev.data);
                            },
                            submit: {
                                text: 'Start Game!',
                                callback: function () {
                                    var surrArr = $('#new-game__settings').serializeArray();
                                    game.stats.players.whitePlayer.AI = surrArr[0].value;
                                    game.stats.players.blackPlayer.AI = surrArr[1].value;
                                    updateModal({
                                        header: '<img class="logo-img" src="/images/icon128.png" width="58"/>To other side',
                                        text: 'To rotate view use arrow keys on your keyboard or click left key and drag.',
                                        background: 'url(/images/bg/main-bg2.jpg) no-repeat center center fixed',
                                        load: 1,
                                        callback: newGame
                                    });
                                }
                            }
                        });

                    }

                }, {
                    text: 'Help',
                    callback: function (event) {
                        var ev = event;
                        updateModal({
                            header: 'Help',
                            text: getTemplateByClass('rules'),
                            submit: {
                                text: 'OK',
                                callback: function () {
                                    updateModal(ev.data);
                                }
                            },
                            back: function () {
                                updateModal(ev.data);
                            }
                        });
                    }

                }, {
                    text: 'Show in GitHub',
                    callback: function () {
                        document.location.href = '/';
                    }
                }
            ]
        };

        initMusic('http://174.36.206.197:8000/;stream.nsv');
        showModal(menuObj);
    });

    /*================ function that creeate New Game ================*/
    function newGame() {
        var webGlOutput,
            controlses,
            gameRefresh,
            animationHandler;

        GAME_NUMBER += 1;
        gameRefresh = (function () {
            // if game is over delete all objects, and refresh game DOM container  and create new app objects
            if (game.stats && game.stats.gameOver) {
                delete  window.gui
                delete window.game
                $("#WebGL-output").html('');
                $('#newTurnContainer').remove();
                $('#turnContainer').remove();
                $('#menuIcon').remove();
                window.gui = new Gui();
                window.game = new Game();
            }
        })();

        gui.init();
        game.init();
        events.init();

        webGlOutput = window.webGlOutput = $("#WebGL-output");
        webGlOutput.append(game.renderer.domElement);
        controlses = new THREE.OrbitControls(game.camera, game.renderer.domElement);

        /*================ Function that test table cells for availible ================*/
        window.canPut = function (el, el2) {//draggingElem - el; targetElem - el2;
            var draggingElem,
                targetElem,
                canPut,
                isDraggingElemInGame,
                targetCoords,
                playerCoords,
                plateCoords,
                platesCoordsArr,
                _y,
                _x,
                canGoPlatesArr,
                counter1;

            draggingElem = el;
            targetElem = el2;
            canPut = true;
            isDraggingElemInGame = true;

            /*=======If dragging element on table game is start for player=======*/
            if ((draggingElem.position.x > game.geometries.plane.x / 2 ||
                draggingElem.position.x < -(game.geometries.plane.x / 2)) ||
                (draggingElem.position.z > game.geometries.plane.y / 2 ||
                draggingElem.position.z < -(game.geometries.plane.y / 2))) {
                isDraggingElemInGame = false
            }
            /*=======If current object is player model=======*/
            if (draggingElem.name.indexOf('Player') != -1) {
                targetCoords = targetElem.object.coords;
                playerCoords = game.stats.players[game.stats.currentPlayer + 'Player'].coords;

                if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y][targetCoords.x].filling != '') {
                    //cant put to this cell, because this cell is occupied
                    canPut = false
                } else if (((targetCoords.y != 0 && game.stats.currentPlayer == 'black') ||
                    (targetCoords.y != 16 && game.stats.currentPlayer == 'white')) && !isDraggingElemInGame) {
                    //cant put to this cell, because is player model not in the table and this is not first row for the player
                    canPut = false
                } else if (isDraggingElemInGame &&
                    ((playerCoords.y + 2 != targetCoords.y || playerCoords.x != targetCoords.x) &&
                    (playerCoords.y - 2 != targetCoords.y || playerCoords.x != targetCoords.x) &&
                    (playerCoords.y != targetCoords.y || playerCoords.x + 2 != targetCoords.x) &&
                    (playerCoords.y != targetCoords.y || playerCoords.x - 2 != targetCoords.x))) {
                    //cant put to this cell, because this cell is not neighbor to the player model
                    canPut = false
                } else if (isDraggingElemInGame &&
                    ((playerCoords.y + 2 == targetCoords.y && playerCoords.x == targetCoords.x) && (playerCoords.y + 1 < 17 && game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y + 1][playerCoords.x].filling != '')) ||
                    ((playerCoords.y - 2 == targetCoords.y && playerCoords.x == targetCoords.x) && (playerCoords.y - 1 > -1 && game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y - 1][playerCoords.x].filling != '')) ||
                    ((playerCoords.y == targetCoords.y && playerCoords.x + 2 == targetCoords.x) && (playerCoords.x + 1 < 17 && game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y][playerCoords.x + 1].filling != '')) ||
                    ((playerCoords.y == targetCoords.y && playerCoords.x - 2 == targetCoords.x) && (playerCoords.x - 1 > -1 && game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y][playerCoords.x - 1].filling != ''))) {
                    canPut = false
                }
            } else if (draggingElem.name.indexOf('Plate') != -1) {
                /*=======If current object is plate model=======*/
                plateCoords = {
                    x: (Math.floor(targetElem.point.x / 19) * 19) + 9.5,
                    y: targetElem.point.y + 9,
                    z: (Math.floor(targetElem.point.z / 19) * 19) + 9.5
                };

                platesCoordsArr = {
                    '-66.5': 1,
                    '-47.5': 3,
                    '-28.5': 5,
                    '-9.5': 7,
                    '9.5': 9,
                    '28.5': 11,
                    '47.5': 13,
                    '66.5': 15
                };

                _y = platesCoordsArr[plateCoords.z];
                _x = platesCoordsArr[plateCoords.x];
                game.triggers.isTurnBlocked = -1;
                canGoPlatesArr = {};
                counter1 = 0;

                if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[_y][_x].filling != '') {
                    //cant put to this cell, because this cell is occupied
                    canPut = false
                } else if (draggingElem.tmpRotation == 0) {
                    //cant put to this cell, because current plate have crossing plates
                    if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[_y + 1][_x].filling != '' || game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[_y - 1][_x].filling != '') {
                        canPut = false;
                    } else {
                        canPut = canGo(_x, _y, true);
                    }
                } else if (draggingElem.tmpRotation == 1) {
                    if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[_y][_x + 1].filling != '' || game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[_y][_x - 1].filling != '') {
                        canPut = false;
                    } else {
                        canPut = canGo(_x, _y, true);
                    }
                }

                /*================ Function that table dont block horizontal or vertical ================*/
                function canGo(x, y, isFirst) {//x,y - coords of target plate position;isFirst - is this turn first for player
                    var cureentPlate,
                        directions,
                        cureentPlateRotate;

                    counter1 = counter1 + 1;
                    cureentPlate = {};
                    directions = [];

                    if (!isFirst) {
                        cureentPlate = game.scene.getObjectByName(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[y][x].filling);
                    } else {
                        cureentPlate = draggingElem;
                    }

                    cureentPlateRotate = cureentPlate.tmpRotation;

                    if (cureentPlateRotate == 1) {
                        directions = [{x: x - 4, y: y, rotation: 1}, {x: x + 4, y: y, rotation: 1}, {
                            x: x,
                            y: y - 2,
                            rotation: 0
                        }, {x: x, y: y + 2, rotation: 0}, {x: x - 2, y: y - 2, rotation: 0}, {
                            x: x + 2,
                            y: y + 2,
                            rotation: 0
                        }, {x: x + 2, y: y - 2, rotation: 0}, {x: x - 2, y: y + 2, rotation: 0}, {
                            x: x + 2,
                            y: y,
                            rotation: 1
                        }, {x: x - 2, y: y, rotation: 1}];
                    } else {
                        directions = [{x: x - 2, y: y, rotation: 1}, {x: x + 2, y: y, rotation: 1}, {
                            x: x,
                            y: y - 4,
                            rotation: 0
                        }, {x: x, y: y + 4, rotation: 0}, {x: x - 2, y: y - 2, rotation: 1}, {
                            x: x + 2,
                            y: y + 2,
                            rotation: 1
                        }, {x: x + 2, y: y - 2, rotation: 1}, {x: x - 2, y: y + 2, rotation: 1}, {
                            x: x,
                            y: y + 2,
                            rotation: 1
                        }, {x: x, y: y - 2, rotation: 1}];
                    }
                    /*
                      Search for neighbor plates and if two plates on the border of the table you cant put to this cell.
                      Plates cant crossing table, because player can go to other side without blockable
                      */
                    for (var i in directions) {
                        if (directions[i].y < -1 || directions[i].y > 17 || directions[i].x < -1 || directions[i].x > 17) {
                            game.triggers.isTurnBlocked = game.triggers.isTurnBlocked + 1;
                        } else if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y]) {
                            if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x]) {
                                if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling != '' && !canGoPlatesArr[game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling] &&
                                    game.scene.getObjectByName(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling).tmpRotation == directions[i].rotation
                                ) {
                                    canGoPlatesArr[game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling] = game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x];
                                    canGo(directions[i].x, directions[i].y, false)
                                }
                            }
                        }
                    }
                    //return false if chain of plates have two ends on the border of the table, if all is ok - return true
                    return game.triggers.isTurnBlocked <= 1
                }
            }
            //return true if plate or player model can puts to current cell, else return false
            return canPut
        };

        /*================ Function that playing when triggers on and anmate camera, player  or plate ================*/
        animationHandler = function (trigger, optionsObj) {// trigger - name of animation object; optionsObj - options
            /*optionsObj options:
             duration - duration of animation (if false - duration is balansed to 1000,
             elem - animation element,
             attr - attribute of this element, that animate. For example obj.position.y,
             startPosition - start position of attribute,
             targetPosition - target position of attribute,
             step - fn, that apply for any step of animation
             */
            if (game.triggers[trigger].switch == 1) {
                var options,
                    maxLength,
                    animation,
                    currentAnimation,
                    progress;

                options = optionsObj;
                /*=======set duration of all animations=======*/
                if (options[0].duration == false) {
                    maxLength = Math.abs(options[0].targetPosition - options[0].startPosition);
                    for (var x in options) {
                        if (parseFloat(x) + 1 < options.length) {
                            if (Math.abs(options[x].targetPosition - options[x].startPosition) > maxLength) {
                                maxLength = Math.abs(options[x].targetPosition - options[x].startPosition);
                            }
                        }
                    }
                }
                /*=======do animate for any attr of animating object=======*/
                for (var z in options) {
                    animation = new Animate();

                    animation.start = new Date;

                    animation.options = options[z];
                    animation.delta = animation.options.delta || animation.linear;
                    animation.options.startPosition = Math.floor(animation.options.startPosition);
                    if (animation.options.duration == false && maxLength > 19) {
                        animation.options.duration = maxLength * 10;
                    } else if (maxLength == 19 && animation.options.attr.indexOf('position') != -1) {
                        animation.options.duration = 700
                    }

                    animation.turnOn = 1;
                    game.triggers[trigger].animationArray.push(animation);
                }
                game.triggers[trigger].switch = 0;
            }

            for (var i = 0; i < game.triggers[trigger].animationArray.length; i++) {
                currentAnimation = game.triggers[trigger].animationArray[i];

                if (currentAnimation.turnOn == 1) {
                    progress = (new Date - currentAnimation.start) / currentAnimation.options.duration;

                    if (progress > 1) progress = 1;

                    currentAnimation.options.step(currentAnimation.delta(progress), currentAnimation.options.startPosition, currentAnimation.options.targetPosition, progress);

                    if (progress == 1) {
                        game.triggers[trigger].animationArray[i].turnOn = 0;
                        currentAnimation.options.complete && currentAnimation.options.complete();
                    }
                    if (i == game.triggers[trigger].animationArray.length - 1 && progress == 1) game.triggers[trigger].animationArray = [];
                }
            }

            if ((trigger == 'player' || trigger == 'plate') && progress >= 0.95) {
                game.triggers.camera.switch = 1;
            }
        };


        /*================ Renderer function that rewrite frame ================*/
        function render() {
            if (game.stats.gameOver == 0) {
                if (!game.pause) {
                    var animationFunc;

                    animationFunc = new Animate();
                    /*=======set animation function for animation all objects if current trigger on=======*/
                    animationHandler('camera', [{
                        elem: game.camera,
                        attr: 'position.z',
                        duration: 2000,
                        startPosition: game.camera.position.z,
                        targetPosition: game.stats.players[game.stats.currentPlayer + 'Player'].camera.z,
                        step: function (delta, startPosition, targetPosition) {
                            game.camera.position.z = ((targetPosition - startPosition) * delta) + startPosition

                        }

                    },
                        {
                            elem: game.camera,
                            attr: 'position.x',
                            duration: 2000,
                            startPosition: game.camera.position.x,
                            targetPosition: game.stats.players[game.stats.currentPlayer + 'Player'].camera.x,
                            step: function (delta, startPosition, targetPosition, progress) {
                                game.camera.position.x = ((targetPosition - startPosition) * delta) + startPosition
                            }
                        },
                        {
                            elem: game.camera,
                            attr: 'position.y',
                            duration: 2000,
                            startPosition: game.camera.position.y,
                            targetPosition: game.stats.players[game.stats.currentPlayer + 'Player'].camera.y,
                            step: function (delta, startPosition, targetPosition) {
                                game.camera.position.y = ((targetPosition - startPosition) * delta) + startPosition
                            }
                        }
                    ]);

                    animationHandler('player', [{
                        elem: game.triggers.player.obj,
                        attr: 'position.z',
                        duration: false,
                        startPosition: game.triggers.player.startPosition.z,
                        targetPosition: game.triggers.player.targetPosition.z,
                        step: function (delta, startPosition, targetPosition) {
                            game.triggers.player.obj.position.z = ((targetPosition - startPosition) * delta) + startPosition
                        }
                    },
                        {
                            elem: game.triggers.player.obj,
                            attr: 'position.x',
                            duration: false,
                            startPosition: game.triggers.player.startPosition.x,
                            targetPosition: game.triggers.player.targetPosition.x,
                            step: function (delta, startPosition, targetPosition) {
                                game.triggers.player.obj.position.x = ((targetPosition - startPosition) * delta) + startPosition
                            }
                        },
                        {
                            elem: game.triggers.player.obj,
                            attr: 'position.y',
                            duration: false,
                            startPosition: game.triggers.player.startPosition.y,
                            targetPosition: game.triggers.player.targetPosition.y,
                            step: function (delta, startPosition, targetPosition, progress) {
                                var heightModer,
                                    rotateMod,
                                    rotateCoord;

                                heightMod = (Math.abs(game.triggers.player.targetPosition.z - game.triggers.player.startPosition.z) + Math.abs(game.triggers.player.targetPosition.x - game.triggers.player.startPosition.x));
                                rotateMod = 1;
                                rotateCoord = 'x';

                                if ((game.triggers.player.startPosition.x > game.geometries.plane.x / 2 ||
                                    game.triggers.player.startPosition.x < -(game.geometries.plane.x / 2)) ||
                                    (game.triggers.player.startPosition.z > game.geometries.plane.y / 2 ||
                                    game.triggers.player.startPosition.z < -(game.geometries.plane.y / 2))) {
                                    heightMod = 100;
                                    if (game.stats.currentPlayer == 'black') rotateMod = -1;
                                } else {
                                    if (game.triggers.player.startPosition.x > game.triggers.player.targetPosition.x) {
                                        rotateCoord = 'z';
                                        rotateMod = 1;
                                    } else if (game.triggers.player.startPosition.x < game.triggers.player.targetPosition.x) {
                                        rotateMod = -1;
                                        rotateCoord = 'z';
                                    } else if (game.triggers.player.startPosition.z > game.triggers.player.targetPosition.z) {
                                        rotateMod = -1;
                                    } else if (game.triggers.player.startPosition.z < game.triggers.player.targetPosition.z) {
                                        rotateMod = 1;
                                    }
                                }
                                game.triggers.player.obj.position.y = (((targetPosition + ( heightMod * animationFunc.parabola(progress))) - startPosition) * delta) + startPosition
                                if (progress > .5) {
                                    rotateMod = rotateMod * -1;
                                }
                                game.triggers.player.obj.rotation[rotateCoord] = (Math.PI * (rotateMod * (animationFunc.doubleParabola(progress) / 2)));
                            }
                        }
                    ]);

                    animationHandler('plate', [{
                        elem: game.triggers.plate.obj,
                        attr: 'position.z',
                        duration: false,
                        startPosition: game.triggers.plate.startPosition.z,
                        targetPosition: game.triggers.plate.targetPosition.z,
                        step: function (delta, startPosition, targetPosition) {
                            game.triggers.plate.obj.position.z = ((targetPosition - startPosition) * delta) + startPosition
                        }

                    },
                        {
                            elem: game.triggers.plate.obj,
                            attr: 'position.x',
                            duration: false,
                            startPosition: game.triggers.plate.startPosition.x,
                            targetPosition: game.triggers.plate.targetPosition.x,
                            step: function (delta, startPosition, targetPosition, progress) {
                                game.triggers.plate.obj.rotation.x = (progress - 1) * Math.PI;
                                game.triggers.plate.obj.position.x = ((targetPosition - startPosition) * delta) + startPosition;
                            }
                        },
                        {
                            elem: game.triggers.plate.obj,
                            attr: 'position.y',
                            duration: false,
                            startPosition: game.triggers.plate.startPosition.y,
                            targetPosition: game.triggers.plate.targetPosition.y + 1,
                            step: function (delta, startPosition, targetPosition, progress) {
                                var heightMod;

                                heightMod = (Math.abs(game.triggers.plate.targetPosition.z - game.triggers.plate.startPosition.z) + Math.abs(game.triggers.plate.targetPosition.x - game.triggers.plate.startPosition.x));

                                game.triggers.plate.obj.position.y = (((targetPosition + ( heightMod * animationFunc.parabola(progress))) - startPosition) * delta) + startPosition

                                if (game.triggers.plate.obj.tmpRotation == 1) {
                                    game.triggers.plate.obj.rotation.y = (-0.5 + progress) * Math.PI;
                                }
                            }
                        }
                    ]);

                    controlses.update();
                    game.renderer.render(game.scene, game.camera);
                }
                requestAnimationFrame(render);
            }
        }

        render();
    }
}

