/*================ Game staic fields ================*/
function Game(){
    this.stats = {
        currentPlayer: 'white',
        currentPlates:'firstPayerPlate',
        currentModel:'firstPlayerModel',
        players: {
            whitePlayer: {
                turn: 1,
                AI: 0,
                fieldArray: [],
                platesArray:[],
                coords:{},
                camera: {x:120, y:100,z:180}
            },
            blackPlayer: {
                turn: 1,
                AI: 0,
                fieldArray: [],
                platesArray:[],
                coords:{},
                camera: {x:120, y:100,z:-180}
            }
        },
        gameOver: 0
    };

    this.mouse ={
        x:0,
        y:0
    };

    this.pause = 0;

    this.geometries={
        cube: {
            x: 15,
            y: 4,
            z: 15
        },
        plane: {
            x: 167,
            y: 167,
            z: 5
        },
        plates:{
            x: 3.6,
            y: 15,
            z: 34
        },
        player:{
            x: 15,
            y: 15,
            z: 15
        }
    };

    this.triggers = {
        camera: {
            switch: 0,
            obj:{},
            startPosition:{
                x:0,y:0,z:0
            },
            targetPosition:{
                x:0,y:0,z:0
            },
            animationArray:[]
        },
        plate: {
            switch: 0,
            obj:{},
            startPosition:{
                x:0,y:0,z:0
            },
            targetPosition:{
                x:0,y:0,z:0
            },
            animationArray:[]
        },
        player: {
            switch: 0,
            obj:{},
            startPosition:{
                x:0,y:0,z:0
            },
            targetPosition:{
                x:0,y:0,z:0
            },
            animationArray:[]
        },
        isTurnBlocked: -1

    };

    this.dragObj = {
        name: '',
        dragStart: 0,
        plateRotate: 1,
        lastTargetObject: ''
    };

    this.player = {
        play: 1
    };

    this.targetList = [];

    this.platesCoordsArr = {
        '-85.5': 1,
        '-66.5': 1,
        '-47.5': 3,
        '-28.5': 5,
        '-9.5': 7,
        '9.5': 9,
        '28.5': 11,
        '47.5': 13,
        '66.5': 15,
        '85.5': 15
    };
}

/*================ Add object to scene ================*/
Game.prototype.addObject = function (obj, attr, addObj){//obj - adding object; attr -name of object, that adding to obj; addObj - object, that adding to obj
    obj[attr] = addObj;
    game.scene.add(obj);
    game.targetList.push(obj);
};

/*================ Add object to game ================*/
Game.prototype.addModelToScene = function( geometry, materials ){//geometry - THREE geometry; materials - THREE materials
    var material = new THREE.MeshFaceMaterial( materials );
    var player = new THREE.Mesh( geometry, material );
    /*=======add models of player from threse color=======*/
    if(materials[0].map.sourceFile.indexOf('light') != -1){
        player.position.z = (game.planeGeometry.parameters.height+107) / 2;
        player.position.x = 0;
        player.name = 'firstPlayerModel';
    }else{
        player.position.z = -(game.planeGeometry.parameters.height+107) / 2;
        player.position.x = 0;
        player.name = 'secondPlayerModel';
    }

    player.castShadow = true;
    player.scale.set(7,7,7);
    player.position.y = 4;

    game.addObject(player, 'params', {x: 15, y: 15, z: 15} );
};

/*================ Add table to game ================*/
Game.prototype.addTableToScene = function( geometry, materials ){//geometry - THREE geometry; materials - THREE materials
    var material = new THREE.MeshFaceMaterial( materials );
    var table = new THREE.Mesh( geometry, material );

    table.position.z = 0;
    table.position.x = -40;
    table.name = 'table';
    table.scale.set(210,250,250);
    table.position.y = -110;
    table.receiveShadow = true;

    game.scene.add(table);
};

/*================ Add plate to game ================*/
Game.prototype.addPlateBorderToScene = function( geometry, materials ){//geometry - THREE geometry; materials - THREE materials
    var arr,
        material,
        border;

    arr = [{z:0, x:-85, rotation: 0},{z:0, x:85, rotation: Math.PI},{z:-85, x:0, rotation: -0.5 *  Math.PI},{z:85, x:0, rotation: 0.5 *  Math.PI}];

    for(var i = 0; i < arr.length; i++) {
        material = new THREE.MeshFaceMaterial(materials);
        border = new THREE.Mesh(geometry, material);

        border.position.z = arr[i].z;
        border.position.x = arr[i].x;
        border.name = 'border[' + i + ']';
        border.rotation.y = arr[i].rotation;
        border.scale.set(44, 60, 94);
        border.position.y = 1.5;
        border.castShadow = true;

        game.scene.add(border);
    }
};

/*================ Get object by cursor position (x,y) ================*/
Game.prototype.getObjectByCursorPosition = function (event){//mouse event object
    var projector,
        vector,
        ray,
        intersects;

    projector = new THREE.Projector();

    if(event.type != "wheel") {
        game.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        game.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    }
    vector = new THREE.Vector3( game.mouse.x, game.mouse.y, 1 );

    vector.unproject(game.camera);

    ray = new THREE.Raycaster( game.camera.position, vector.sub( game.camera.position ).normalize() );
    intersects = ray.intersectObjects( game.targetList );
    //return array of THREE object, that have current coords(cross the vertual vector from camera)
    return intersects
};

/*================ Get object by input position (x,y,z) ================*/
Game.prototype.getObjectByPosition = function (x,y,z){//x,y,z - coords of position on THREE scene
    var intersects =[],
        curEl;

    for(var i = 0; i < game.targetList.length; i++){

        curEl =game.targetList[i];
        /*=======If position + width in x/y/z coords - return true=======*/
        if(x < curEl.position.x + curEl.params.x&&
            x > curEl.position.x - curEl.params.x&&
            z < curEl.position.z + curEl.params.z&&
            z > curEl.position.z - curEl.params.z&&
            y < curEl.position.y + curEl.params.y&&
            y > curEl.position.y - curEl.params.y){
            intersects.push(game.scene.getObjectByName(curEl.name))
        }
    }
    //return array of THREE object, that have current coords(cross the vertual vector from camera)
    return intersects
};

/*================ Update some field after and turn ================*/
Game.prototype.swichTurn = function (){
    game.stats.players[ game.stats.currentPlayer + 'Player'].camera.x = game.camera.position.x;
    game.stats.players[ game.stats.currentPlayer + 'Player'].camera.y = game.camera.position.y;
        game.stats.players[ game.stats.currentPlayer + 'Player'].camera.z = game.camera.position.z;



    /*=======Change statistic info in game object=======*/
    if(game.stats.currentPlayer == 'white'){
        game.stats.currentPlayer = 'black';
        game.stats.currentPlates = 'secondPayerPlate';
        game.stats.currentModel = 'secondPlayerModel';
        game.stats.players.whitePlayer.turn +=1;
        if(game.stats.players.whitePlayer.AI == 0 && game.stats.players.blackPlayer.AI == 1) {
            game.removeEventListeners();
        }else if(game.stats.players.whitePlayer.AI == 1 && game.stats.players.blackPlayer.AI == 0){
            game.addEventListeners()
        }
    }else{
        game.stats.currentPlayer = 'white';
        game.stats.currentPlates = 'firstPayerPlate';
        game.stats.currentModel = 'firstPlayerModel';
        game.stats.players.blackPlayer.turn +=1;
        if(game.stats.players.whitePlayer.AI == 0 && game.stats.players.blackPlayer.AI == 1) {
            game.addEventListeners()
        }else if(game.stats.players.whitePlayer.AI == 1 && game.stats.players.blackPlayer.AI == 0){
            game.removeEventListeners();
        }
    }
    if(game.stats.players[ game.stats.currentPlayer + 'Player'].AI == 1) {
        ai.doTurn(function(){
            setTimeout(function(){
                game.swichTurn();
            }, 3000)
        });
    }

    gui.update();
};

Game.prototype.init = function(){
    var woodenTextureLight,
        planeMaterial,
        woodenTextureUltraLight,
        woodenUltraLightMaterial,
        woodenTextureUltraDark,
        woodenUltraDarkMaterial,
        plane,
        woodenTextureDark,
        startRepeat,
        cubeMaterial,
        cube,
        firstPayerPlate,
        secondPayerPlate,
        textureLoader,
        progressContainer,
        ambientLight,
        PointLight,
        spotLight,
        jsonLoader;

    /*================ Init scene, renderer and camera ================*/
    this.scene = new THREE.Scene();

    // create a window.camera, which defines where we're looking at.
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.x = 120;
    this.camera.position.y = 100;
    this.camera.position.z = 180;

    // create a render and set the size
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setClearColor(0xEEEEEE, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;
    jsonLoader = new THREE.JSONLoader();//add module for loading models

    THREEx.WindowResize(this.renderer, this.camera);

    /*================ Init table ================*/
    this.planeGeometry = new THREE.BoxGeometry(167, 167, 5);
    /*=======Add table objects=======*/
    woodenTextureLight = THREE.ImageUtils.loadTexture( '/images/wooden_2.jpg' );

    planeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureLight, shininess: 50 } );

    woodenTextureUltraLight = THREE.ImageUtils.loadTexture( '/images/lightwood.jpg' );
    woodenUltraLightMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureUltraLight, shininess: 10 } );

    woodenTextureUltraDark = THREE.ImageUtils.loadTexture( '/images/darkwood.jpg' );
    woodenUltraDarkMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureUltraDark, shininess: 10 } );

    plane = new THREE.Mesh(this.planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;

    plane.name = 'plane';

    // add the plane to the scene
    this.addObject(plane, 'params', this.geometries.plane);
    /*=======Add another tabel objects from modaels=======*/
    jsonLoader.load( "/js/to_other_side/models/tableModel.js", this.addTableToScene);
    jsonLoader.load( "/js/to_other_side/models/plateBorderModel.js", this.addPlateBorderToScene);

    this.cubeGeometry = new THREE.BoxGeometry(this.geometries.cube.x, this.geometries.cube.y ,this.geometries.cube.z);
    woodenTextureDark = THREE.ImageUtils.loadTexture( '/images/wooden_1.jpg' );
    woodenTextureDark.wrapS = woodenTextureDark.wrapT = THREE.RepeatWrapping;
    startRepeat = 0.15;
    /*=======Add game small cubs to table=======*/
    for (var j = 0; j < (this.planeGeometry.parameters.height) / 19; j++) {
        for (var i = 0; i < (this.planeGeometry.parameters.width) / 19; i++) {
            startRepeat = Math.round((startRepeat+0.01)*100)/100;
            woodenTextureDark.repeat.set( startRepeat, startRepeat);

            if(j == 0){
                cubeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureDark, shininess: 90, emissive: 0xffffff });
            }else if(j == 8){
                cubeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureDark, shininess: 90, emissive: 0x000000 });

            }else{
                cubeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureDark, shininess: 90, emissive: 0x7e7e7e });
            }

            cube = new THREE.Mesh(this.cubeGeometry, cubeMaterial);
            cube.rotation.y = (0.5* getRandomInt(1,4)) * Math.PI;
            cube.position.z = -((this.planeGeometry.parameters.height-11) / 2) + 2 + (j * 19);
            cube.position.x = -((this.planeGeometry.parameters.width-11) / 2) + 2 + (i * 19);

            cube.position.y = 4.5;
            cube.castShadow = true;
            cube.name = 'cube[' + (j*2) + '][' + (i*2) + ']';
            cube.coords = {x: i*2, y: j*2};

            this.addObject(cube, 'params', this.geometries.cube);
        }
    }
    /*=======Set matrix of table=======*/
    for (var k = 0; k < 17; k++) {
        this.stats.players.whitePlayer.fieldArray.push([]);
        this.stats.players.blackPlayer.fieldArray.push([]);

        for (var l = 0; l < 17; l++) {
            if(k % 2 == 1 && k != 17  ) {
                if (l % 2 == 1 && l != 17) {
                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plateCrossing', coords: {x: l, y: k}, filling: '', available: true}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plateCrossing', coords: {x: l, y: k}, filling: '', available: true}
                    );
                } else if (j != 17) {
                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: '', available: true}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: '', available: true}
                    );
                }
            }else if (k != 17){
                if (l % 2 == 1 && l != 17) {

                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: '', available: true}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: '', available: true}
                    );
                } else if (l != 17) {
                    if(k == 0){
                        this.stats.players.blackPlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: true}
                        );
                        this.stats.players.whitePlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: false}
                        );
                    }else if(k == 16) {
                        this.stats.players.blackPlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: false}
                        );
                        this.stats.players.whitePlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: true}
                        );
                    }else{
                        this.stats.players.whitePlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: false}
                        );
                        this.stats.players.blackPlayer.fieldArray[k].push(
                            {type: 'cube', coords: {x: l, y: k}, filling: '', available: false}
                        );
                    }
                }
            }
        }
    }

    /*================ Init plates ================*/
    this.PayerPlateGeometry = new THREE.BoxGeometry(this.geometries.plates.x, this.geometries.plates.y, this.geometries.plates.z);

    for(var i = 0 ; i < 10; i++){

        //First Player
        firstPayerPlate = new THREE.Mesh(this.PayerPlateGeometry, woodenUltraLightMaterial);
        firstPayerPlate.position.z = ((this.planeGeometry.parameters.height+45) / 2) ;
        firstPayerPlate.position.x = -((this.planeGeometry.parameters.width+8) / 2) + 2 + (i * 19);
        firstPayerPlate.position.y = 15;
        firstPayerPlate.rotation.x = -0.5 * Math.PI;
        firstPayerPlate.rotation.z = -0.5 * Math.PI;
        firstPayerPlate.castShadow = true;
        firstPayerPlate.receiveShadow = true;
        firstPayerPlate.name = 'firstPayerPlate[' + i + ']';
        firstPayerPlate.coords = [{},{},{}];
        firstPayerPlate.count = i;
        firstPayerPlate.tmpRotation = game.dragObj.plateRotate;
        // add the plate to the scene
        this.addObject(firstPayerPlate, 'params', this.geometries.plates);

        //Second Player
        secondPayerPlate = new THREE.Mesh(this.PayerPlateGeometry, woodenUltraDarkMaterial);
        secondPayerPlate.position.z = -((this.planeGeometry.parameters.height+45) / 2) ;
        secondPayerPlate.position.x = -((this.planeGeometry.parameters.width+8) / 2) + 2 + (i * 19);
        secondPayerPlate.position.y = 15;
        secondPayerPlate.rotation.x = -0.5 * Math.PI;
        secondPayerPlate.rotation.z = -0.5 * Math.PI;
        secondPayerPlate.castShadow = true;
        secondPayerPlate.receiveShadow = true;
        secondPayerPlate.name = 'secondPayerPlate[' + i + ']';
        secondPayerPlate.coords = [{},{},{}];
        secondPayerPlate.count = i;
        secondPayerPlate.tmpRotation = game.dragObj.plateRotate;
        // add the plate to the scene
        this.addObject(secondPayerPlate, 'params', this.geometries.plates);
    }

    /*================ Alternative sphere backround from Google street view ================*/

    /*
    var imagePrefix,
     locations,
     directions,
     skyGeometry,
     skyMaterialArray,
     skyMaterial,
     skyBox;

    imagePrefix = "http://maps.googleapis.com/maps/api/streetview?size=1000x1000&sensor=false&fov=90&key=AIzaSyDw80SRHmNXmDNeW25lIBx-Jq0W_S-eQxg";
    locations = ['46.192953,9.022615'];
    directions  = ["&heading=360&pitch=-1", "&heading=180&pitch=2.9", "&heading=0&pitch=90", "&heading=270&pitch=-90", "&heading=270&pitch=0", "&heading=90&pitch=2"];

    skyGeometry = new THREE.BoxGeometry( 800, 800, 800 );

    kyMaterialArray = [];
    THREE.ImageUtils.crossOrigin = '';
    for (var i = 0; i < 6; i++) {

     skyMaterialArray.push(new THREE.MeshBasicMaterial({

            map: THREE.ImageUtils.loadTexture(imagePrefix + '&location=' + locations[0] + directions[i]),
            side: THREE.BackSide
        }));
    }
    skyMaterial = new THREE.MeshFaceMaterial( skyMaterialArray );
    skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    this.scene.add( skyBox );
    */

    /*================ Init Main sphere backround ================*/

    textureLoader = new THREE.TextureLoader();//add module of texture loading
    progressContainer = $('#preloaderContainer').find('span');
    /*=======Function that apply if background sphere is loading=======*/
    function sceneProgress(progress, result ){
        var target,
            percent,
            interval;

        if(result> 15) result  = 15;
        percent = parseInt(progressContainer.html().match(/\d+/));
        target = Math.floor(((result/15) *100));

        interval = setInterval(function(){
            if(percent<100)percent = percent+1;
            progressContainer.html(percent + ' %');
            if(percent == target || percent >=100) clearInterval(interval)
        },100);
    }


    textureLoader.manager.onProgress = throttle(function (progressBar, result) {sceneProgress(progressBar, result)}, 1000);//add and then remove progress function for background texture
    textureLoader.load('/images/bg/bg_' + getRandomInt(1,10) + '.jpg',function(t){
        var skyMaterial,
            percent,
            interval,
            skyGeometry,
            skySphere,
            interval2;

        percent = parseInt(progressContainer.html().match(/\d+/));

        interval = setInterval(function(){
            percent = percent+1;
            progressContainer.html(percent + ' %');
            if(percent >= 100) clearInterval(interval)
        },100);

        skyMaterial = new THREE.MeshBasicMaterial({
            map: t,
            side: THREE.BackSide
        });

        skyGeometry = new THREE.SphereGeometry( 300, 180, 60 );

        skySphere = new THREE.Mesh( skyGeometry, skyMaterial );
        skySphere.position.y = 50;
        game.scene.add( skySphere );

        interval2 = setInterval(function(){
            if(percent >= 100){
                setTimeout(function() {
                    hideModal(function () {
                        gui.newTurnContainer.fadeIn();

                        setTimeout(function () {
                            gui.newTurnContainer.fadeOut();
                        }, 1000);
                    });
                },5000);
                clearInterval(interval2);
            }
        },1000)
    });

    /*================ Init Lights ================*/
    ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    PointLight = new THREE.PointLight( 0xffffff );
    PointLight.position.set( 0, 600, 400 );
    this.scene.add( PointLight );
    /*=======Add lighting to scene=======*/
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 300, 800, 300 );
    spotLight.intensity = 0.4;
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;
    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 2000;
    spotLight.shadowCameraFov = 30;
    this.scene.add( spotLight );

    // make sure that for the first time, the
    // this.camera is looking at the this.scene
    this.camera.lookAt(this.scene.position);

    /*================ Init player models ================*/
    // addModelToScene function is called back after model has loaded

    jsonLoader.load( "/js/to_other_side/models/firstPlayerModel.js", this.addModelToScene );
    jsonLoader.load( "/js/to_other_side/models/secondPlayerModel.js", this.addModelToScene );

};



