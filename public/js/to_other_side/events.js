function Events(){}
Events.prototype.init = function() {
    /*================ Remove all event listeners ================*/
    game.removeEventListeners = function () {
        $("#WebGL-output").unbind('mousedown');
        $("#WebGL-output").unbind('mouseup');
        $("#WebGL-output").unbind('mousemove');
        $("#WebGL-output").unbind('mousewheel');
    };

    /*================ Add all event listeners ================*/
    game.addEventListeners = function () {
        webGlOutput.bind('mousedown', throttle(function (event) {
            game.onDocumentMouseDown(event)
        }, EVENT_THROTLLING_THRESHHOLD));
        webGlOutput.bind('mouseup', throttle(function (event) {
            game.onDocumentMouseUp(event)
        }, EVENT_THROTLLING_THRESHHOLD));
        webGlOutput.bind('mousemove', throttle(function (event) {
            game.onDocumentMouseMove(event)
        }, EVENT_THROTLLING_THRESHHOLD));
        webGlOutput.bind('mousewheel', throttle(function (event) {
            game.onDocumentMouseScroll(event)
        }, EVENT_THROTLLING_THRESHHOLD));
    };

    /*================ Function uses to rotate plate ================*/
    game.onDocumentMouseScroll = function (event) {//mouse event object
        var name;
        /*=======THis event only for plate rotation=======*/
        if (game.dragObj.name.indexOf('Plate') != -1 && game.dragObj.dragStart == 1 && (game.scene.getObjectByName('greenOutlinePlaneMesh') || game.scene.getObjectByName('redOutlinePlaneMesh'))) {
                name = 'greenOutlinePlaneMesh';
            if (!game.scene.getObjectByName(name)) {
                name = 'redOutlinePlaneMesh';
            }
            game.scene.getObjectByName(name).rotation.y += -0.5 * Math.PI;
            /*=======Rotate plate by current rotation=======*/
            if (game.dragObj.plateRotate == 1) {
                game.dragObj.plateRotate = 0;
                game.scene.getObjectByName(game.dragObj.name).tmpRotation = 0;
            } else {
                game.dragObj.plateRotate = 1;
                game.scene.getObjectByName(game.dragObj.name).tmpRotation = 1
            }

            game.dragObj.lastTargetObject = '';
            game.onDocumentMouseMove(event);
        }
    };

    game.onDocumentMouseUp = function (event) {//mouse event object

    };


    /*================ Function uses to choose target cell for player or plate and licghting there ================*/
    game.onDocumentMouseMove = function (event) {//mouse event object
        var intersects,
            targetPosition,
            cursorPosition,
            name,
            color,
            outlineMaterial2,
            outlineMaterial3,
            outlineCubeMesh,
            PayerPlateGeometry,
            outlinePlaneMesh;

        intersects = game.getObjectByCursorPosition(event);

        if (intersects.length > 0 &&(intersects[0].object.name == 'plane' || intersects[0].object.name != game.dragObj.lastTargetObject)) {
            game.dragObj.lastTargetObject = intersects[0].object.name;
            targetPosition = intersects[0].object.position;
            cursorPosition = intersects[0].point;
            /*=======Remove all Outline objects=======*/
            if (game.scene.getObjectByName('greenOutlinePlaneMesh')) game.scene.remove(game.scene.getObjectByName('greenOutlinePlaneMesh'));
            if (game.scene.getObjectByName('redOutlinePlaneMesh')) game.scene.remove(game.scene.getObjectByName('redOutlinePlaneMesh'));
            if (game.scene.getObjectByName('redOutlineCubeMesh')) game.scene.remove(game.scene.getObjectByName('redOutlineCubeMesh'));
            if (game.scene.getObjectByName('greenOutlineCubeMesh')) game.scene.remove(game.scene.getObjectByName('greenOutlineCubeMesh'));

            if (intersects[0].object.name.indexOf('cube') != -1 && game.dragObj.dragStart == 1 && game.dragObj.name.indexOf('Player') != -1) {
                color = 0xff0000;
                name = 'redOutlineCubeMesh';
                /*=======Check this table cell for available, if true fill outline mesh by green color=======*/
                if (window.canPut(game.scene.getObjectByName(game.dragObj.name), intersects[0])) {
                    color = 0x00ff00;
                    name = 'greenOutlineCubeMesh';
                }

                outlineMaterial2 = new THREE.MeshBasicMaterial({color: color, side: THREE.BackSide});
                outlineCubeMesh = new THREE.Mesh(game.cubeGeometry, outlineMaterial2);
                outlineCubeMesh.position.x = targetPosition.x;
                outlineCubeMesh.position.y = targetPosition.y;
                outlineCubeMesh.position.z = targetPosition.z;
                outlineCubeMesh.scale.multiplyScalar(1.05);
                outlineCubeMesh.name = name;

                game.scene.add(outlineCubeMesh);
                changeCursor();
            } else if (intersects[0].object.name == 'plane' && game.dragObj.dragStart == 1 && game.dragObj.name.indexOf('Plate') != -1) {
                /*=======Check this place for available, if true fill outline mesh by green color=======*/
                color = 0xff0000;
                name = 'redOutlinePlaneMesh';

                game.scene.getObjectByName(game.dragObj.name).tmpRotation = game.dragObj.plateRotate;
                if (window.canPut(game.scene.getObjectByName(game.dragObj.name), intersects[0])) {
                    color = 0x00ff00;
                    name = 'greenOutlinePlaneMesh';
                }
                outlineMaterial3 = new THREE.MeshBasicMaterial({color: color});
                PayerPlateGeometry = new THREE.BoxGeometry(game.geometries.plates.x, game.geometries.plates.y, game.geometries.plates.z - 2);
                outlinePlaneMesh = new THREE.Mesh(PayerPlateGeometry, outlineMaterial3);
                outlinePlaneMesh.position.z = (Math.floor(cursorPosition.z / 19) * 19) + 9.5;
                outlinePlaneMesh.position.x = (Math.floor(cursorPosition.x / 19) * 19) + 9.5;

                if (game.dragObj.plateRotate == 1) outlinePlaneMesh.rotation.y = -0.5 * Math.PI;

                if (outlinePlaneMesh.position.x < -(game.planeGeometry.parameters.width / 2)) {
                    outlinePlaneMesh.position.x += 19;
                } else if (outlinePlaneMesh.position.x > (game.planeGeometry.parameters.width / 2)) {
                    outlinePlaneMesh.position.x -= 19;
                }

                if (outlinePlaneMesh.position.z < -(game.planeGeometry.parameters.height / 2)) {
                    outlinePlaneMesh.position.z += 19;
                } else if (outlinePlaneMesh.position.z > (game.planeGeometry.parameters.height / 2)) {
                    outlinePlaneMesh.position.z -= 19;
                }

                outlinePlaneMesh.position.y = targetPosition.y + 9;
                outlinePlaneMesh.scale.multiplyScalar(1.05);
                outlinePlaneMesh.name = name;

                game.scene.add(outlinePlaneMesh);
                changeCursor();
            }
            else if (intersects[0].object.name == game.stats.currentModel || intersects[0].object.name.indexOf(game.stats.currentPlates) != -1) {
                /*=======Change cursor to pointer if it target to current type(plate? for example)=======*/
                changeCursor();
            }
        } else if (intersects.length == 0) {
            if (document.getElementsByTagName('body')[0].style.cursor == 'pointer') {
                changeCursor('default');
            }

        }
    };

    /*================ Function uses to choose or put player or plate ================*/
    game.onDocumentMouseDown = function (event) {//mouse event object
        var intersects,
            gameOver,
            spriteGeometry,
            spriteOutlineMaterial,
            targetName,
            player,
            platesCoordsArr,
            _y,
            _x;

        intersects = game.getObjectByCursorPosition(event);
        gameOver = game.stats.gameOver;

        if (intersects.length > 0) {
            /*=======remove outline mesh if click=======*/
            if (game.scene.getObjectByName(game.dragObj.name) && game.dragObj.name != intersects[0].object.name)game.scene.getObjectByName(game.dragObj.name).remove(game.sprite);
            /*=======Is target of click not on the table? If true =- start moving=======*/
            if (
                (intersects[0].object.name == game.stats.currentModel ||
                (intersects[0].object.name.indexOf(game.stats.currentPlates) != -1 &&
                ((intersects[0].object.position.x > game.geometries.plane.x / 2 ||
                intersects[0].object.position.x < -(game.geometries.plane.x / 2)) ||
                (intersects[0].object.position.z > game.geometries.plane.y / 2 ||
                intersects[0].object.position.z < -(game.geometries.plane.y / 2)))))) {
                if (game.dragObj.name != '' && game.dragObj.name != intersects[0].object.name)game.scene.getObjectByName(game.dragObj.name).remove(game.sprite);

                if (game.dragObj.name != intersects[0].object.name) {
                    /*=======target element != dragging element=======*/
                    spriteGeometry = {};

                    if (intersects[0].object.name == game.stats.currentModel) {
                        spriteGeometry = new THREE.SphereGeometry(2, 32, 32);
                    } else if (intersects[0].object.name.indexOf(game.stats.currentPlates) != -1) {
                        spriteGeometry = new THREE.BoxGeometry(game.geometries.plates.x + 2, game.geometries.plates.y + 2, game.geometries.plates.z + 2);
                    }

                    spriteOutlineMaterial = new THREE.ShaderMaterial({
                            uniforms: {
                                "c": {type: "f", value: 1.0},
                                "p": {type: "f", value: 1.4},
                                glowColor: {type: "c", value: new THREE.Color(0xffff00)},
                                viewVector: {type: "v3", value: game.camera.position}
                            },
                            vertexShader: 'uniform vec3 viewVector;uniform float c;uniform float p;varying float intensity;void main(){ vec3 vNormal = normalize( normalMatrix * normal ); vec3 vNormel = normalize( normalMatrix * viewVector ); intensity = pow( c - dot(vNormal, vNormel), p ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
                            fragmentShader: 'uniform vec3 glowColor; varying float intensity; void main(){ vec3 glow = glowColor * intensity; gl_FragColor = vec4( glow, 1.0 ); }',
                            side: THREE.FrontSide,
                            blending: THREE.AdditiveBlending,
                            transparent: true
                        });

                    game.sprite = new THREE.Mesh(spriteGeometry, spriteOutlineMaterial);
                    intersects[0].object.add(game.sprite);/*=======Add outline mesh to selected element=======*/
                }

                game.dragObj.name = intersects[0].object.name;
                game.dragObj.dragStart = 1;
            } else {
                if (game.dragObj.dragStart == 1) {

                    if (intersects[0].object.name.indexOf('cube') != -1 && game.dragObj.name.indexOf('Player') != -1 && game.scene.getObjectByName('greenOutlineCubeMesh')) {
                        targetName = 'greenOutlineCubeMesh';
                        /*=======Start dragging, set postions of dragging elements=======*/
                        game.triggers.player.obj = game.scene.getObjectByName(game.dragObj.name);
                        game.triggers.player.startPosition.z = game.scene.getObjectByName(game.dragObj.name).position.z;
                        game.triggers.player.targetPosition.z = intersects[0].object.position.z;
                        game.triggers.player.startPosition.x = game.scene.getObjectByName(game.dragObj.name).position.x;
                        game.triggers.player.targetPosition.x = intersects[0].object.position.x;
                        game.triggers.player.startPosition.y = game.scene.getObjectByName(game.dragObj.name).position.y;
                        game.triggers.player.targetPosition.y = intersects[0].object.position.y + 9;
                        game.triggers.player.switch = 1;

                        if (game.stats.players[game.stats.currentPlayer + 'Player'].coords.y || game.stats.players[game.stats.currentPlayer + 'Player'].coords.y == 0) {
                            game.stats.players.whitePlayer.fieldArray[game.stats.players[game.stats.currentPlayer + 'Player'].coords.y][game.stats.players[game.stats.currentPlayer + 'Player'].coords.x].filling = '';
                            game.stats.players.blackPlayer.fieldArray[game.stats.players[game.stats.currentPlayer + 'Player'].coords.y][game.stats.players[game.stats.currentPlayer + 'Player'].coords.x].filling = '';
                        }
                        window.checkForAvailable(game.scene.getObjectByName(game.dragObj.name), intersects[0],'player');
                        game.stats.players[game.stats.currentPlayer + 'Player'].coords = {
                            y: intersects[0].object.coords.y,
                            x: intersects[0].object.coords.x
                        };

                        game.stats.players.whitePlayer.fieldArray[intersects[0].object.coords.y][intersects[0].object.coords.x].filling = game.dragObj.name;
                        game.stats.players.blackPlayer.fieldArray[intersects[0].object.coords.y][intersects[0].object.coords.x].filling = game.dragObj.name;




                        /*=======If target table cell is in last row of current player, this player WIN GAME=======*/
                        if ((intersects[0].object.name.indexOf('cube[0]') != -1 && game.stats.currentPlayer == 'white') ||
                            (intersects[0].object.name.indexOf('cube[16]') != -1 && game.stats.currentPlayer == 'black')) {
                            setTimeout(function () {
                                game.stats.gameOver = 1;
                                game.removeEventListeners();

                                player = game.stats.currentPlayer.substr(0, 1).toUpperCase() + game.stats.currentPlayer.substr(1);
                                $('#menuIcon').css({zIndex:'0'});

                                showModal({
                                    header: player + '  player WIN',
                                    text: "This game was created by Babkov Ivan. I'm russian javascript deweloper. If you like this game and have job offers, fork me on GitHub or mail me to <a href='mailto:sindes255@gamil.com'>sindes255@gamil.com</a>.<br><br>",
                                    retry: 1,
                                    location: {
                                        text: 'Show in GitHub',
                                        url: '/'
                                    },
                                    buttons:[{
                                        text: 'Main menu',
                                        callback: function (event) {
                                            var ev = event;

                                            updateModal(menuObj);
                                        }
                                    }]
                                });
                            }, 1000);
                        } else {/*=======Else start second turn=======*/
                            game.scene.getObjectByName(game.dragObj.name).remove(game.sprite);
                            game.swichTurn();
                            game.dragObj.lastTargetObject = '';
                        }


                    } else if (game.dragObj.name.indexOf('Plate') != -1 && intersects[0].object.name.indexOf('Plate') == -1 && intersects[0].object.name.indexOf('cube') == -1 && game.scene.getObjectByName('greenOutlinePlaneMesh')) {
                        targetName = 'greenOutlinePlaneMesh';
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

                        var rot = game.scene.getObjectByName(game.dragObj.name).tmpRotation;
                        _y = platesCoordsArr[game.scene.getObjectByName(targetName).position.z];
                        _x = platesCoordsArr[game.scene.getObjectByName(targetName).position.x];

                        for (var f = 0; f < 3; f++) {
                            if (game.scene.getObjectByName(game.dragObj.name).coords[0].y) {
                                game.stats.players.whitePlayer.fieldArray[game.scene.getObjectByName(game.dragObj.name).coords[f].y][game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = '';
                                game.stats.players.blackPlayer.fieldArray[game.scene.getObjectByName(game.dragObj.name).coords[f].y][game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = '';
                            }
                        }
                        /*=======Set coords of plate from rotation of this plate=======*/

                        if (rot) {
                            game.scene.getObjectByName(game.dragObj.name).coords[0] = {y: _y, x: _x - 1};
                            game.scene.getObjectByName(game.dragObj.name).coords[1] = {y: _y, x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[2] = {y: _y, x: _x + 1};
                        } else {
                            game.scene.getObjectByName(game.dragObj.name).coords[0] = {y: _y - 1, x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[1] = {y: _y, x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[2] = {y: _y + 1, x: _x};

                        }
                        for (var f = 0; f < 3; f++) {
                            game.stats.players.whitePlayer.fieldArray[game.scene.getObjectByName(game.dragObj.name).coords[f].y][game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = game.dragObj.name;
                            game.stats.players.blackPlayer.fieldArray[game.scene.getObjectByName(game.dragObj.name).coords[f].y][game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = game.dragObj.name;

                        }

                        /*=======Set poisitions of current plate=======*/
                        game.triggers.plate.obj = game.scene.getObjectByName(game.dragObj.name);
                        game.triggers.plate.startPosition.z = game.scene.getObjectByName(game.dragObj.name).position.z;
                        game.triggers.plate.targetPosition.z = game.scene.getObjectByName(targetName).position.z;
                        game.triggers.plate.startPosition.x = game.scene.getObjectByName(game.dragObj.name).position.x;
                        game.triggers.plate.targetPosition.x = game.scene.getObjectByName(targetName).position.x;
                        game.triggers.plate.startPosition.y = game.scene.getObjectByName(game.dragObj.name).position.y;
                        game.triggers.plate.targetPosition.y = game.scene.getObjectByName(targetName).position.y;
                        game.triggers.plate.switch = 1;

                        window.checkForAvailable(game.scene.getObjectByName(game.dragObj.name), intersects[0],'plate',rot);

                        game.scene.getObjectByName(game.dragObj.name).remove(game.sprite);
                        game.swichTurn();
                        game.dragObj.lastTargetObject = '';
                    }

                    if (game.dragObj.name != intersects[0].object.name) {
                        game.dragObj.name = '';
                        game.dragObj.dragStart = 0;/*=======End  dragging if target not availible for dragging=======*/
                    }



                    if (gameOver != 0) {
                        setTimeout(function () {
                            game.stats.gameOver = 1// stop game? because game is over
                        }, 100);
                    }
                }
            }
        }
    };
};