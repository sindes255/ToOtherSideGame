function Ai(){

    this.aiPlayer = '';
    this.anotherPlayer = '';
    this.difficult = '';
    this.aiFinishRow = '';
    this.anotherPlayerFinishRow = '';

    this.init = function(dif){//some inits
        this.difficult = dif | 'easy';
        if(game.stats.players.whitePlayer.AI == "1") {
            this.aiPlayer = 'whitePlayer';
            this.anotherPlayer = 'blackPlayer';
            this.aiFinishRow = 0;
            this.anotherPlayerFinishRow = 16;
        }else if(game.stats.players.blackPlayer.AI == "1"){
            this.aiPlayer = 'blackPlayer';
            this.anotherPlayer = 'whitePlayer';
            this.aiFinishRow = 16;
            this.anotherPlayerFinishRow = 0;
        }

        this.doTurn = function(fn){//callback function
            var TIMEOUT = 2000;

            var currentCell,
                canGo,
                currentName,
                currentF,
                maxObject,
                equalArray,
                fieldArray,
                isEqual,
                aiFinishRow,
                anotherPlayerFinishRow,
                rotMod,
                anotherPlayer,
                aiPlayer,
                aiStartCoords,
                anotherStartCoords,
                isAiDraggingElemInGame,
                isAnotherDraggingElemInGame,
                anotherManhattanCoof,
                aiManhattanCoof,
                randomCoof,
                firstTurnMod,
                anotherCurrentWay,
                numberOfAiPlates,
                numberOfAnotherPlates,
                aiFutureWay,
                anotherFutureWay,
                aiCurentWay,
                curentWay;


            fieldArray = game.stats.players[this.aiPlayer].fieldArray;
            maxObject = {//result object of searching weight of stroke
                name: '',
                coords: {
                    x: false,
                    y: false
                },
                F: -100//weight of stroke
            };
            equalArray = [];

            anotherPlayer = this.anotherPlayer;
            aiPlayer = this.aiPlayer;
            aiStartCoords = {};
            anotherStartCoords = {};
            isAiDraggingElemInGame = false;
            isAnotherDraggingElemInGame = false;
            randomCoof = getRandomInt(-1,1);//random coof, that using in measuring  weight of stroke
            firstTurnMod = 0;//help ai doing first turn with model
            currentF = maxObject.F;
            isEqual = false;
            aiFinishRow = this.aiFinishRow;
            anotherPlayerFinishRow = this.anotherPlayerFinishRow;

            setTimeout(function() {
                //timeout uses for anther player can over his turn
                if (game.stats.players[aiPlayer].coords.y || game.stats.players[aiPlayer].coords.y == 0) {
                    isAiDraggingElemInGame = true
                }

                if (game.stats.players[anotherPlayer].coords.y || game.stats.players[anotherPlayer].coords.y == 0) {
                    isAnotherDraggingElemInGame = true
                }

                if (!isAnotherDraggingElemInGame) {
                    anotherStartCoords.x = 0;
                    anotherStartCoords.y = aiFinishRow;
                    anotherManhattanCoof = 9;//searching rough way with Manhattan method
                }else {
                    anotherStartCoords.x = game.stats.players[anotherPlayer].coords.x;
                    anotherStartCoords.y = game.stats.players[anotherPlayer].coords.y;

                    if (aiPlayer == 'whitePlayer') {
                        anotherManhattanCoof = parseInt(8 - (anotherStartCoords.y / 2));//searching rough way with Manhattan method
                    } else {
                        anotherManhattanCoof = parseInt(anotherStartCoords.y / 2);//searching rough way with Manhattan method
                    }
                }
                //optimal way of player
                anotherCurrentWay = aStarSearch.findWay({
                    /*use A* searching way algoithm*/
                    startCoords: anotherStartCoords,
                    endRow: anotherPlayerFinishRow
                }).way;

                numberOfAiPlates = parseInt(Object.keys(game.stats.players[aiPlayer].platesArray).length);
                numberOfAnotherPlates = parseInt(Object.keys(game.stats.players[anotherPlayer].platesArray).length);

                if (!isAiDraggingElemInGame) {
                    aiStartCoords.x = 0;
                    aiStartCoords.y = anotherPlayerFinishRow;
                    aiManhattanCoof = 9;//searching rough way with Manhattan method
                } else {
                    aiStartCoords.x = game.stats.players[aiPlayer].coords.x;
                    aiStartCoords.y = game.stats.players[aiPlayer].coords.y;
                    if (aiPlayer == 'whitePlayer') {
                        aiManhattanCoof = parseInt(8 - (aiStartCoords.y / 2));//searching rough way with Manhattan method
                    } else {
                        aiManhattanCoof = parseInt(aiStartCoords.y / 2);//searching rough way with Manhattan method
                    }
                }

                //optimal way of ai
                curentWay = aStarSearch.findWay({
                    /*use A* searching way algoithm*/
                    startCoords: aiStartCoords,
                    endRow: aiFinishRow
                }).way;

                aiCurentWay = aStarSearch.findWay({
                    /*use A* searching way algoithm*/
                    startCoords: aiStartCoords,
                    endRow: aiFinishRow
                }).way;



                for (var i = 0; i <= 16; i++) {
                    for (var j = 0; j <= 16; j++) {
                        currentCell = fieldArray[i][j];
                        switch (currentCell.type) {
                            case('plate'):
                                currentName = 'Plate';
                                break
                            case('cube'):
                                currentName = 'Player';
                                break
                            case('plateCrossing'):
                                currentName = 'plateCrossing';
                                break
                        }

                        if (currentName == "plateCrossing") {
                            rotMod = 2;
                        } else {
                            rotMod = 1
                        }

                        for (var rotation = 0; rotation < rotMod; rotation++) {
                            isEqual = false;//trigger, if true - find identical by weight coords

                            //try to check coords for avaiable
                            if (currentName == "Plate" ||
                                ((numberOfAiPlates == 0 || anotherManhattanCoof == 9) && currentName == "plateCrossing")) {
                                canGo = false;
                            }else{
                                canGo = canPut({
                                    name: currentName,
                                    rotation: rotation,
                                    x: j,
                                    y: i
                                });
                            }


                            if (canGo) {  //coords is available
                                switch (currentName) {
                                    case('Player'):

                                        if (!isAiDraggingElemInGame) {
                                            firstTurnMod = 100;
                                            aiStartCoords.x = 0;
                                            aiStartCoords.y = anotherPlayerFinishRow;
                                            aiManhattanCoof = 9;
                                        } else {
                                            firstTurnMod = 0;
                                            aiStartCoords.x = j;
                                            aiStartCoords.y = i;
                                            if (aiPlayer == 'whitePlayer') {
                                                aiManhattanCoof = parseInt(8 - (aiStartCoords.y / 2));
                                            } else {
                                                aiManhattanCoof = parseInt(aiStartCoords.y / 2);
                                            }
                                        }

                                        aiCurentWay = aStarSearch.findWay({
                                            /*use A* searching way algoithm*/
                                            startCoords: aiStartCoords,
                                            endRow: aiFinishRow
                                        }).way;

                                        //find weight of coord by formula
                                        //currentF = firstTurnMod + (16 -aiCurentWay.length) + (9 -anotherManhattanCoof);
                                        currentF = firstTurnMod +  anotherCurrentWay.length - aiCurentWay.length + 9 + randomCoof;

                                        break
                                    case('plateCrossing'):
                                        var plateTargetCoords = {};
                                        plateTargetCoords.x = j;
                                        plateTargetCoords.y = i;

                                        //optimal way of ai and player with plates on the way
                                        aiFutureWay = aStarSearch.findWay({
                                            /*use A* searching way algoithm*/
                                            startCoords: aiStartCoords,
                                            endRow: aiFinishRow,
                                            plate: {
                                                coords: plateTargetCoords,
                                                rotate: rotation
                                            }
                                        }).way;

                                        anotherFutureWay = aStarSearch.findWay({
                                            /*use A* searching way algoithm*/
                                            startCoords: anotherStartCoords,
                                            endRow: anotherPlayerFinishRow,
                                            plate: {
                                                coords: plateTargetCoords,
                                                rotate: rotation
                                            }
                                        }).way;

                                        //find weight of coord by formula
                                        //currentF = (anotherFutureWay.length - aiFutureWay.length) + (9 - Math.abs( i- anotherStartCoords.y)) ;
                                        currentF = (anotherFutureWay.length - aiCurentWay.length) + (9 - Math.abs( i- anotherStartCoords.y)) + randomCoof ;

                                        break
                                }

                                if (equalArray.length && currentF > equalArray[0].F) {
                                    equalArray = [];//clear array of identical coords if find high coords
                                }

                                if (currentF == maxObject.F) {//find first identical by weight coords
                                    isEqual = true;
                                    if (equalArray.length == 0) {
                                        equalArray.push(maxObject)
                                    }
                                }

                                if (currentF >= maxObject.F) {//new coords have more weight than old coords
                                    maxObject = {
                                        name: currentName,
                                        coords: {
                                            x: j,
                                            y: i
                                        }
                                    };//set new max object
                                    if (currentName == "plateCrossing") maxObject.rotation = rotation;
                                    maxObject.F = currentF;
                                }

                                /*
                                if (currentName == "plateCrossing") {
                                    console.log(currentName, i, j);
                                    console.log(currentF,maxObject.F);
                                    console.log(anotherFutureWay.length, aiFutureWay.length, (9 - Math.abs( i- anotherStartCoords.y)));
                                    console.log(aiFutureWay,anotherFutureWay);
                                }else if(currentName == "Player"){
                                    console.log('!!!!!!!!',currentName, i, j);
                                    console.log(currentF,maxObject.F);
                                    console.log(aiCurentWay,anotherCurrentWay, anotherManhattanCoof);
                                }
                                */

                                if (isEqual) {//push identical by weight coords to array
                                    equalArray.push(maxObject)
                                }
                            }
                        }
                    }
                }


                function getObject() {
                    var result = {};
                    if (equalArray.length) {
                        result = equalArray[getRandomInt(0, equalArray.length - 1)];//get random coords of idetical by weight coords
                    } else {
                        result = maxObject;
                    }

                    //if its y row of new player coords identical by another player y row coords - find new coords
                    if (equalArray.length && ((game.stats.players[anotherPlayer].coords.y || game.stats.players[anotherPlayer].coords.y == 0) && !game.stats.players[aiPlayer].coords.y)) {
                        if (result.coords.x == game.stats.players[anotherPlayer].coords.x &&
                            (game.stats.players[anotherPlayer].coords.y == 16 || game.stats.players[anotherPlayer].coords.y == 0)) {
                            result = getObject();
                        }
                    }

                    return result
                }

                maxObject = getObject();

                if(maxObject.name == "Player" && isAiDraggingElemInGame){
                    maxObject.coords.x = curentWay[1].x;
                    maxObject.coords.y = curentWay[1].y;
                }

                //console.log(maxObject.coords.y, maxObject.coords.x, maxObject,equalArray);


                //do turn using result maxObject
                if (maxObject.name == 'plateCrossing') {
                    game.goTo(maxObject.coords.x, maxObject.coords.y, maxObject.rotation)
                } else {
                    game.goTo(maxObject.coords.x, maxObject.coords.y)
                }

                if (fn) fn.apply();//apply callback function
            },TIMEOUT);
        }
    };




}