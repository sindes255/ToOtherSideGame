var GAME_NUMBER = 1,
    EVENT_THROTLLING_THRESHHOLD = 100;

window.gui = new Gui();
window.game = new Game();

$(document).ready(newGame);
function newGame() {
    var webGlOutput,
        controlses,
        canPut,
        gameRefresh,
        animationHandler;

    gui.init();
    game.init();

    window.canPut = function(el, el2){
        //console.log('==============');
        var draggingElem = el;
        var targetElem = el2;
        var canPut = true;
        var isDraggingElemInGame = true;
        if((draggingElem.position.x > game.geometries.plane.x / 2 ||
            draggingElem.position.x < -(game.geometries.plane.x / 2))||
            (draggingElem.position.z > game.geometries.plane.y / 2 ||
            draggingElem.position.z < -(game.geometries.plane.y / 2))){
            isDraggingElemInGame = false
        }

        if(draggingElem.name.indexOf('Player') != -1){
            var  targetCoords = targetElem.object.coords;
            var playerCoords = game.stats.players[ game.stats.currentPlayer + 'Player'].coords;

            if(game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[targetCoords.y][targetCoords.x].filling != '') {
                canPut = false
            }else if(((targetCoords.y != 0 && game.stats.currentPlayer == 'black') ||
                (targetCoords.y != 16 && game.stats.currentPlayer == 'white')) &&
                !isDraggingElemInGame){
                canPut = false
            }else if(isDraggingElemInGame &&
                ((playerCoords.y + 2 != targetCoords.y || playerCoords.x != targetCoords.x)&&
                (playerCoords.y - 2 != targetCoords.y || playerCoords.x != targetCoords.x) &&
                (playerCoords.y != targetCoords.y || playerCoords.x + 2 != targetCoords.x) &&
                (playerCoords.y != targetCoords.y || playerCoords.x - 2 != targetCoords.x))) {
                canPut = false
            }else if(isDraggingElemInGame &&
                ((playerCoords.y + 2 == targetCoords.y && playerCoords.x == targetCoords.x)&&(playerCoords.y + 1 < 17 && game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y + 1][playerCoords.x].filling != ''))||
                ((playerCoords.y - 2 == targetCoords.y && playerCoords.x == targetCoords.x)&&(playerCoords.y - 1 > -1 && game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y - 1][playerCoords.x].filling != ''))||
                ((playerCoords.y == targetCoords.y && playerCoords.x + 2 == targetCoords.x)&&(playerCoords.x + 1 < 17 && game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y][playerCoords.x+1].filling != ''))||
                ((playerCoords.y == targetCoords.y && playerCoords.x - 2 == targetCoords.x)&&(playerCoords.x - 1 > -1 && game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[playerCoords.y][playerCoords.x-1].filling != ''))){
                canPut = false
            }

        }else if(draggingElem.name.indexOf('Plate') != -1){
            var plateCoords = {
                x: (Math.floor(targetElem.point.x / 19) * 19) + 9.5,
                y: targetElem.point.y + 9,
                z: (Math.floor(targetElem.point.z / 19) * 19) + 9.5
            };

            var platesCoordsArr = {
                '-66.5': 1,
                '-47.5': 3,
                '-28.5': 5,
                '-9.5': 7,
                '9.5':9,
                '28.5': 11,
                '47.5': 13,
                '66.5': 15
            };

            var _y = platesCoordsArr[plateCoords.z];
            var _x = platesCoordsArr[plateCoords.x];
            game.triggers.isTurnBlocked = -1;
            var canGoPlatesArr = {};
            var counter1 = 0;

            if(game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[_y][_x].filling != '') {
                canPut = false
            }else if(draggingElem.tmpRotation == 0){
                if(game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[_y + 1][_x].filling != '' || game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[_y - 1][_x].filling != ''){
                    canPut = false;
                }else{
                    canPut = canGo(_x, _y, true);
                }
            }else if(draggingElem.tmpRotation == 1){
                if(game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[_y][_x +1].filling != '' || game.stats.players[ game.stats.currentPlayer + 'Player'].fieldArray[_y][_x - 1].filling != ''){
                    canPut = false;
                }else{
                    canPut = canGo(_x, _y, true);
                    //console.log(canPut)
                }
            }
            function canGo(x,y, isFirst){


                counter1 = counter1 + 1;
                //console.log(counter1);
                var cureentPlate = {};
                var directions = [];
                if (!isFirst) {
                    cureentPlate = game.scene.getObjectByName(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[y][x].filling);
                } else {
                    cureentPlate = draggingElem;
                }


                var cureentPlateRotate = cureentPlate.tmpRotation;

                if (cureentPlateRotate == 1) {
                    directions = [{x: x - 4, y: y, rotation: 1}, {x: x + 4, y: y, rotation: 1 }, {x: x, y: y - 2, rotation: 0 }, {x: x , y: y + 2, rotation: 0}, {x: x - 2, y: y - 2, rotation: 0}, {x: x + 2, y: y + 2, rotation: 0}, {x: x + 2, y: y - 2, rotation: 0}, {x: x -2, y: y + 2, rotation: 0}, {x: x + 2, y: y, rotation: 1}, {x: x - 2, y: y, rotation: 1}];
                } else {
                    directions = [{x: x - 2, y: y, rotation: 1}, {x: x + 2, y: y, rotation: 1}, {x: x, y: y - 4, rotation: 0}, {x: x, y: y + 4, rotation: 0}, {x: x - 2, y: y - 2, rotation: 1}, {x: x + 2, y: y + 2, rotation: 1}, {x: x + 2, y: y - 2, rotation: 1}, {x: x -2, y: y + 2, rotation: 1}, {x: x, y: y + 2, rotation: 1}, {x: x, y: y - 2, rotation: 1}];
                }

                //console.log('------------');
                for (var i in directions) {
                    //console.log( y, x, ' ||| ', directions[i].y, directions[i].x);

                    if (directions[i].y < -1 || directions[i].y > 17 || directions[i].x < -1 || directions[i].x > 17) {
                        //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                        game.triggers.isTurnBlocked = game.triggers.isTurnBlocked + 1;

                    } else if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y]) {
                        if(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x]){
                            if (game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling != '' &&
                                !canGoPlatesArr[game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling] &&
                                game.scene.getObjectByName(game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling).tmpRotation == directions[i].rotation
                            ) {
                                canGoPlatesArr[game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x].filling] = game.stats.players[game.stats.currentPlayer + 'Player'].fieldArray[directions[i].y][directions[i].x];
                                canGo(directions[i].x, directions[i].y, false)
                            }
                        }
                    }

                }
                if(game.triggers.isTurnBlocked >= 1){
                    return false
                }else{
                    return true
                }




            }

        }


        return canPut
    };

    gameRefresh = (function(){
        if(game.stats && game.stats.gameOver){
            delete  window.gui
            delete window.game
            $("#WebGL-output").html('');
            $('.newTurnContainer').remove();
            $('.turnContainer').remove();
            $('.menuIcon').remove();
            var turnContainer = $('#turnContainer');
            var turnSpan = turnContainer.find('span');
            turnSpan.html('White: 1 Turn');
            window.gui = new Gui();
            window.game = new Game();
            GAME_NUMBER += 1;
        }
    })();

    animationHandler = function(trigger, options){

        if (game.triggers[trigger].switch == 1) {

            var options = options;

            if(options[0].duration == false){
                var maxLength = Math.abs(options[0].targetPosition - options[0].startPosition);
                for(var x in options) {

                    if ( parseFloat(x) + 1 < options.length) {
                        if (Math.abs(options[x].targetPosition - options[x].startPosition) > maxLength) {
                            maxLength = Math.abs(options[x].targetPosition - options[x].startPosition);

                        }

                    }

                }

            }

            for(var z in options){
                var animation =  new Animate();

                animation.start = new Date;

                animation.options = options[z] ;
                animation.delta = animation.options.delta || animation.linear;
                animation.options.startPosition = Math.floor(animation.options.startPosition);
                if(animation.options.duration == false && maxLength > 19){

                    animation.options.duration = maxLength*10;
                }else if(maxLength == 19 && animation.options.attr.indexOf('position')!= -1){
                    animation.options.duration = 700
                }
                animation.turnOn = 1;


                game.triggers[trigger].animationArray.push(animation);

            }

            game.triggers[trigger].switch = 0;
        }

        for(var i = 0; i < game.triggers[trigger].animationArray.length; i++){
            var currentAnimation = game.triggers[trigger].animationArray[i];
            if(currentAnimation.turnOn == 1){
                var progress = (new Date -  currentAnimation.start) / currentAnimation.options.duration;

                if (progress > 1) progress = 1;
                currentAnimation.options.step( currentAnimation.delta(progress) ,currentAnimation.options.startPosition, currentAnimation.options.targetPosition, progress );

                if (progress == 1) {
                    game.triggers[trigger].animationArray[i].turnOn = 0;
                    currentAnimation.options.complete && currentAnimation.options.complete();
                }
                if(i == game.triggers[trigger].animationArray.length - 1 && progress == 1) game.triggers[trigger].animationArray = [];
            }
        }
        if((trigger == 'player' || trigger == 'plate') && progress >= 0.95){
            game.triggers.camera.switch = 1;
        }

    };
    webGlOutput = window.webGlOutput = $("#WebGL-output");
    webGlOutput.append(game.renderer.domElement);

    controlses = new THREE.OrbitControls(game.camera, game.renderer.domElement);





    function render() {
        $('#player')[0].volume = gui.playerIconSlider.getValue()* 0.001;
        if( game.stats.gameOver == 0 ) {
            if(!game.pause) {
                //for(var i = 0 ; i < 10; i++) {
                //    this.scene.getObjectByName('firstPayerPlate[' + (i+1) + ']').rotation.z += 0.001 * Math.PI;
                //    this.scene.getObjectByName('secondPayerPlate[' + (i+1) + ']').rotation.z += 0.001 * Math.PI;
                //}

                var animationFunc = new Animate();


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
                        //delta: animationFunc.circ,
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
                            var heightMod = (Math.abs(game.triggers.player.targetPosition.z - game.triggers.player.startPosition.z) + Math.abs(game.triggers.player.targetPosition.x - game.triggers.player.startPosition.x));
                            var rotateMod = 1;
                            var rotateCoord = 'x';

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
                            var heightMod = (Math.abs(game.triggers.plate.targetPosition.z - game.triggers.plate.startPosition.z) + Math.abs(game.triggers.plate.targetPosition.x - game.triggers.plate.startPosition.x));

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


    };

    render();







    game.addEventListeners();


    gui.newTurnContainer.fadeIn();

    setTimeout(function(){gui.newTurnContainer.fadeOut()},3000);


};

