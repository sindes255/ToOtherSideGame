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
    window.ai = new Ai();

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
                                        background: 'url(/images/bg/main-bg2.jpg)',
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

        //initMusic('http://174.36.206.197:8000/;stream.nsv');
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
        ai.init();

        webGlOutput = window.webGlOutput = $("#WebGL-output");
        webGlOutput.append(game.renderer.domElement);
        controlses = new THREE.OrbitControls(game.camera, game.renderer.domElement);

        /*================ Check for available cell that choose================*/
        window.canPut = function (el, el2) {//el-moving element, el2 -target element
            var draggingElem,
                targetElem,
                canPut,
                isDraggingElemInGame,
                targetCoords,
                plateCoords,
                anotherPlayer,
                anotherPlayerName,
                anotherPlayerCoords,
                startRow,
                endRow,
                player;

            draggingElem = el;
            targetElem = el2;
            canPut = true;

            if (draggingElem.name.indexOf('Player') != -1) {//if moving element is Player  model
                targetCoords = targetElem.object.coords;
                canPut = game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y][targetCoords.x].available;
            }else if (draggingElem.name.indexOf('Plate') != -1) {//if moving element is Plate  model
                plateCoords = {//multiple of target point and 19, find center of target cell
                    x: (Math.floor(targetElem.point.x / 19) * 19) + 9.5,
                    y: targetElem.point.y + 9,
                    z: (Math.floor(targetElem.point.z / 19) * 19) + 9.5
                };

                targetCoords = {
                    x:0,
                    y:0
                };

                targetCoords.y = game.platesCoordsArr[plateCoords.z];
                targetCoords.x = game.platesCoordsArr[plateCoords.x];

                /*Check near cells for available*/
                if(draggingElem.tmpRotation == 0) {
                    for(var i = -1; i < 2 ; i++) {
                        if(game.stats.players.whitePlayer.fieldArray[targetCoords.y + i][targetCoords.x].available == false){
                            canPut = false;
                            break
                        }
                    }
                }else if(draggingElem.tmpRotation == 1) {
                    for(var i = -1; i < 2 ; i++) {
                        if(game.stats.players.whitePlayer.fieldArray[targetCoords.y][targetCoords.x + i].available == false){
                            canPut = false;
                            break
                        }
                    }
                }

                /*start prepare for checking - can plate going to other side or not?*/
                if(canPut) {
                    canPut = true;

                    if(game.stats.currentPlayer == 'white'){
                        anotherPlayerName = 'black';
                        anotherPlayer = player =game.scene.getObjectByName('secondPlayerModel');
                        startRow = 0;
                        endRow = 16;
                    }else{
                        anotherPlayerName = 'white';
                        anotherPlayer = player =game.scene.getObjectByName('firstPlayerModel');
                        endRow = 0
                        startRow = 16;
                    }

                    anotherPlayerCoords = game.stats.players[anotherPlayerName + 'Player'].coords;

                    isDraggingElemInGame=true;

                    if((player.position.x > game.geometries.plane.x / 2 ||
                        player.position.x < -(game.geometries.plane.x / 2)) ||
                        (player.position.z > game.geometries.plane.y / 2 ||
                        player.position.z < -(game.geometries.plane.y / 2))) {
                        isDraggingElemInGame = false
                    }

                    var startCoords = {x: 0, y:0};
                    if(!isDraggingElemInGame){
                        startCoords.x = 0;
                        startCoords.y = startRow;
                    }else{
                        startCoords.x = anotherPlayerCoords.x;
                        startCoords.y = anotherPlayerCoords.y;
                    }

                    canPut = aStarSearch.showInput({/*use A* searching way algoithm*/
                        startCoords:  startCoords,
                        endRow:  endRow,
                        plate: {
                            coords: targetCoords,
                            rotate: draggingElem.tmpRotation
                        }
                    }).canGo;
                }
            }
            // Can moving element puts to target element
            return canPut
        };

        /*================ Function that mark available or unavailable after turn is over ================*/
        window.checkForAvailable= function (el, el2,type, rot) {
        // el-moving element,
        // el2 -target element,
        // type - type of moving element,
        // rot - rotation of moving element

            var draggingElem,
                targetElem,
                isDraggingElemInGame,
                targetCoords,
                playerCoords,
                plateCoords,
                player,
                directionArr;

            draggingElem = el;
            targetElem = el2;
            isDraggingElemInGame = false;
            if(game.stats.currentPlayer == 'white'){
                player =game.scene.getObjectByName('firstPlayerModel');
            }else{
                player =game.scene.getObjectByName('secondPlayerModel');
            }

            /*=======If dragging element on table game is start for player=======*/

            if (type == 'player') {
                targetCoords = targetElem.object.coords;
                playerCoords = game.stats.players[game.stats.currentPlayer + 'Player'].coords;

                /*If its first player model moving - mark all first row not available fo moving*/
                if (targetCoords.y == 0 || targetCoords.y == 16) {
                    isDraggingElemInGame = true
                }
                if(isDraggingElemInGame){
                    for(var i = 0; i < 17;i = i + 2){
                        game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y][i].available = false;
                    }
                }

                /*Mark target cells in to players arrays not available*/
                game.stats.players.whitePlayer.fieldArray[targetCoords.y][targetCoords.x].available = false;
                game.stats.players.blackPlayer.fieldArray[targetCoords.y][targetCoords.x].available = false;

                directionArr = [
                    {x: 0,y: +1,_x: 0, _y: +2},
                    {x: 0,y: -1,_x: 0, _y: -2},
                    {x: +1,y: 0,_x: +2, _y: 0},
                    {x: -1,y: 0,_x: -2, _y: 0}
                ];

                /*Check near cells*/
                for(var i in directionArr){
                    if(playerCoords.x + directionArr[i]._x >= 0 && playerCoords.x + directionArr[i]._x <= 16 && playerCoords.y + directionArr[i]._y >= 0 && playerCoords.y + directionArr[i]._y <= 16) {//if model on table
                        game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y + directionArr[i]._y][playerCoords.x + directionArr[i]._x].available = false;

                        /*Switch later position to available*/
                        if(playerCoords.y &&
                            game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y + directionArr[i].y][playerCoords.x + directionArr[i].x].filling == '' &&
                            game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y + directionArr[i]._y][playerCoords.x + directionArr[i]._x].filling != ''){
                            game.stats.players.whitePlayer.fieldArray[playerCoords.y][playerCoords.x].available = true;
                            game.stats.players.blackPlayer.fieldArray[playerCoords.y][playerCoords.x].available = true;
                        }
                    }
                    if(targetCoords.x + directionArr[i].x >= 0 && targetCoords.x + directionArr[i].x <= 16 && targetCoords.y + directionArr[i].y >= 0 && targetCoords.y + directionArr[i].y <= 16){//if model on table
                        /*If nearest position is filling switch available to TRUE, else to FALSE*/
                        if(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[i].y][targetCoords.x + directionArr[i].x].filling != '' ||
                            game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[i]._y][targetCoords.x + directionArr[i]._x].filling != ''
                        ){

                            game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[i]._y][targetCoords.x + directionArr[i]._x].available = false;
                        }else{
                            game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[i]._y][targetCoords.x + directionArr[i]._x].available = true;

                        }

                    }

                }


            }else if(type="plate"){
                plateCoords = {
                    x: (Math.floor(targetElem.point.x / 19) * 19) + 9.5,
                    y: targetElem.point.y + 9,
                    z: (Math.floor(targetElem.point.z / 19) * 19) + 9.5
                };

                targetCoords = {
                    x:0,
                    y:0
                };

                directionArr = [
                    [
                        {x: +1,y: +1,_x: -1, _y: +1},
                        {x: -1,y: +1,_x: +1, _y: +1},
                        {x: +1,y: -1,_x: -1, _y: -1},
                        {x: -1,y: -1,_x: +1, _y: -1}
                    ],
                    [
                        {y: +1,x: +1,_y: -1, _x: +1},
                        {y: -1,x: +1,_y: +1, _x: +1},
                        {y: +1,x: -1,_y: -1, _x: -1},
                        {y: -1,x: -1,_y: +1, _x: -1}
                    ]
                ];


            targetCoords.y = game.platesCoordsArr[plateCoords.z];
            targetCoords.x = game.platesCoordsArr[plateCoords.x];

            if(rot == 0) {
                for(var i = -1; i < 2 ; i++) {
                    game.stats.players.whitePlayer.fieldArray[targetCoords.y + i][targetCoords.x].available = false;
                    game.stats.players.blackPlayer.fieldArray[targetCoords.y + i][targetCoords.x].available = false;
                }

            }else if(rot == 1) {
                for(var i = -1; i < 2 ; i++) {
                    game.stats.players.whitePlayer.fieldArray[targetCoords.y][targetCoords.x + i].available = false;
                    game.stats.players.blackPlayer.fieldArray[targetCoords.y][targetCoords.x + i].available = false;
                }
            }
            for(var j in directionArr[rot]){
                if(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[rot][j].y][targetCoords.x + directionArr[rot][j].x].filling != ''){
                    var thisColor;
                    if(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y + directionArr[rot][j].y][targetCoords.x + directionArr[rot][j].x].filling == 'firstPlayerModel'){
                        thisColor = 'white'
                    }else{
                        thisColor = 'black'
                    }
                    game.stats.players[thisColor + 'Player'].fieldArray[targetCoords.y + directionArr[rot][j]._y][targetCoords.x + directionArr[rot][j]._x].available = false;
                }
            }
        }
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

