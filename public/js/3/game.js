var gameNumber = 1,
eventThrotllingThreshhold = 100;

function slider(elemId, sliderWidth, range1, range2, step) {
    var knobWidth = 12;				// ширина и высота бегунка
    var knobHeight = 12;			// изменяются в зависимости от используемых изображений
    var sliderHeight = 6;			// высота slider'а

    var offsX,tmp;					// вспомагательные переменные
    var d = document;
    var isIE = d.all || window.opera;	// определяем модель DOM
    var point = (sliderWidth-knobWidth-3)/(range2-range1);
    // point - количество пикселей на единицу значения

    var slider = d.createElement('DIV'); // создаем slider
    slider.id = elemId + '_slider';
    slider.className = 'slider';
    d.getElementById(elemId).appendChild(slider);

    var knob = d.createElement('DIV');	// создаем ползунок
    knob.id = elemId + '_knob';
    knob.className = 'knob';
    slider.appendChild(knob); // добавляем его в документ

    knob.style.left = 0;			// бегунок в нулевое значение
    knob.style.width = knobWidth+'px';
    knob.style.height = knobHeight+'px';
    slider.style.width = sliderWidth+'px';
    slider.style.height = sliderHeight+'px';

    var sliderOffset = slider.offsetLeft;			// sliderOffset - абсолютное смещение slider'а
    tmp = slider.offsetParent;		// от левого края в пикселях (в IE не работает)
    while(tmp.tagName != 'BODY') {
        sliderOffset += tmp.offsetLeft;		// тут его и находим
        tmp = tmp.offsetParent;
    }

    if(isIE)						// в зависимости от модели DOM
    {								// назначаем слушателей событий
        knob.onmousedown = startCoord;
        slider.onclick = sliderClick;
        knob.onmouseup = endCoord;
        slider.onmouseup = endCoord;
    }
    else {
        knob.addEventListener("mousedown", startCoord, true);
        slider.addEventListener("click", sliderClick, true);
        knob.addEventListener("mouseup", endCoord, true);
        slider.addEventListener("mouseup", endCoord, true);
    }


// далее подробно не описываю, кто захочет - разберется
//////////////////// функции установки/получения значения //////////////////////////

    function setValue(x)	// установка по пикселям
    {
        if(x < 0) knob.style.left = 0;
        else if(x > sliderWidth-knobWidth-3) knob.style.left = (sliderWidth-3-knobWidth)+'px';
        else {
            if(step == 0) knob.style.left = x+'px';
            else knob.style.left = Math.round(x/(step*point))*step*point+'px';
        }
    }
    function setValue2(x)	// установка по значению
    {
        if(x < range1 || x > range2) alert('Value is not included into a slider range!');
        else setValue((x-range1)*point);

    }

    function getValue()
    {return Math.round(parseInt(knob.style.left)/point)+range1;}

//////////////////////////////// слушатели событий ////////////////////////////////////

    function sliderClick(e) {
        var x;
        if(isIE) {
            if(event.srcElement != slider) return; //IE onclick bug
            x = event.offsetX - Math.round(knobWidth/2);
        }
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
    }

    function startCoord(e) {
        if(isIE) {
            offsX = event.clientX - parseInt(knob.style.left);
            slider.onmousemove = mov;
        }
        else {
            slider.addEventListener("mousemove", mov, true);
        }
    }

    function mov(e)	{
        var x;
        if(isIE) x = event.clientX-offsX;
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
    }

    function endCoord()	{
        if(isIE) slider.onmousemove = null;
        else slider.removeEventListener("mousemove", mov, true);
    }

    // объявляем функции setValue2 и getValue как методы класса
    this.setValue = setValue2;
    this.getValue = getValue;
} // конец класса



function showModal(obj){
    game.pause = 1;
    game.removeEventListeners();
    var retry = '',location = '', close ='', submit = '';
        if(obj.retry){
        retry = '<input type="button" class="retry-btn btn" id="retry-btn" value="Retry game?">'
    };
    if(obj.close){
        close = '<span class="close-btn" id="close-btn" style="margin: 8px 0 16px 0;"></span>'
    }

    if(obj.submit){
        submit = '<input type="button" class="location-btn btn" id="location-btn" value="'+ obj.submit.text +'">'
    };
    if(obj.location){
        location = '<input type="button" class="location-btn btn" id="location-btn" value="'+ obj.location.text +'">'

    };

    if(obj.header == 'MENU'){
        var button= '', background ='';
        for(var i = 0; i < obj.buttons.length; i++){

            if(obj.buttons[i].background) {
                background = obj.buttons[i].background
            }else{
                background ='url(/images/lightwood.jpg)'
            }
            button = '<input type="button" class="retry-btn btn" id="retry-btn" style="border: 5px outset rgb(48, 48, 48);z-index: 10; padding: 16px 32px; font-size: 18px;  margin-bottom: 20px; float: left; clear: both; width: 100%;  cursor: pointer; background:' + background + ';" value="' + obj.buttons[i].text +'">';
            obj.text += button;
        }
    }

    var modalWrapperTmp = '<div class="modalWrapper" id="modalWrapper" style=""><div class="modalLayout" id="modalLayout"></div><div  class="modalContainer" id="modalContainer">' + close + '<div class="modalContent"><h1>' + obj.header + '</h1>' + obj.text + '</div>' + location  + retry + submit '</div></div>';

    $('body').append(modalWrapperTmp);
    var modalWrapper = $('#modalWrapper');
    var modalLayout = $('#modalLayout');
    var modalContainer = $('#modalContainer');
    var modalContent = modalContainer.find('.modalContent');

    if(obj.header == 'MENU'){
        var buttonEl= {};
        for(var i = 0; i < obj.buttons.length; i++){
            buttonEl = $(modalContent.find('input')[i]);
            buttonEl.on('click', obj.buttons[i].callback)

        }
        if(obj.close) {
            modalLayout.on('click', function (e) {

                hideModal();
            });
        }
    }

    if(obj.close){
        var closeEl = $('#close-btn');
        closeEl.on('click', function(){
            hideModal();
        });
    };

    if(obj.submit){
        var submitEl = $('#submit-btn');
        submitEl.on('click', obj.submit.callback);
    };


    if(obj.retry){
        var retryEl = $('#retry-btn');
        retryEl.on('click', function(){
            game.stats.gameOver = 1;
            newGame();
            hideModal();
        });
    };
    if(obj.location){
        var locationEl = $('#location-btn');
        locationEl.on('click', function(){
            document.location.href = obj.location.url;
        });


    };


    var opacity = 0;

    modalWrapper.animate({opacity: 1}, 500);

}

function hideModal() {
    if($('#menuIcon'))$('#menuIcon').css({background: 'url(/images/sprite.png) 64px -262px / 555%'})
    game.addEventListeners();
    game.pause = 0;
    $('#modalLayout').remove();
    $('#modalWrapper').fadeOut(function(){$('#modalWrapper').remove();});

}
function Game() {
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
    }


    this.targetList = [];
}

window.getRandomInt = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.getMaxMultiple = function (a, b){
    return Math.floor(b / a) *a;
};

function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

Game.prototype.addObject = function (obj, attr, addObj){
    obj[attr] = addObj;
    game.scene.add(obj);
    game.targetList.push(obj);
};

Game.prototype.changeCursor =function(type){
    if(!type) type = 'pointer';
    document.getElementsByTagName('body')[0].style.cursor = type;
};

Game.prototype.addModelToScene = function( geometry, materials )
{
    var material = new THREE.MeshFaceMaterial( materials );
    var player = new THREE.Mesh( geometry, material );

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


Game.prototype.addTableToScene = function( geometry, materials )
{
    var material = new THREE.MeshFaceMaterial( materials );
    var table = new THREE.Mesh( geometry, material );


    table.position.z = 0;
    table.position.x = -50;
    table.name = 'table';

    table.scale.set(250,250,250);
    table.position.y = -110;


    table.receiveShadow = true;
    game.scene.add(table);
};

Game.prototype.addPlateBorderToScene = function( geometry, materials )
{
    var arr = [{z:0, x:-85, rotation: 0},{z:0, x:85, rotation: Math.PI},{z:-85, x:0, rotation: -0.5 *  Math.PI},{z:85, x:0, rotation: 0.5 *  Math.PI}];

    for(var i = 0; i < arr.length; i++) {
        var material = new THREE.MeshFaceMaterial(materials);
        var border = new THREE.Mesh(geometry, material);


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





Game.prototype.getObjectByCursorPosition = function (event){
    var projector = new THREE.Projector();

    if(event.type != "wheel") {
        game.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        game.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    }
    var vector = new THREE.Vector3( game.mouse.x, game.mouse.y, 1 );

    vector.unproject(game.camera);

    //projector.unprojectVector( vector, this.camera );
    var ray = new THREE.Raycaster( game.camera.position, vector.sub( game.camera.position ).normalize() );
    var intersects = ray.intersectObjects( game.targetList );

    return intersects
};

Game.prototype.getObjectByPosition = function (x,y,z){

    var intersects =[];
    for(var i = 0; i < game.targetList.length; i++){

        var curEl =game.targetList[i];

        if(x < curEl.position.x + curEl.params.x&&
            x > curEl.position.x - curEl.params.x&&
            z < curEl.position.z + curEl.params.z&&
            z > curEl.position.z - curEl.params.z&&
            y < curEl.position.y + curEl.params.y&&
            y > curEl.position.y - curEl.params.y){
            intersects.push(game.scene.getObjectByName(curEl.name))
        }
    }
    return intersects
};





function animate(opts) {

    var start = new Date;
    var delta = opts.delta || linear;

    var timer = setInterval(function() {
        var progress = (new Date - start) / opts.duration;

        if (progress > 1) progress = 1;

        opts.step( delta(progress) );

        if (progress == 1) {
            clearInterval(timer);
            opts.complete && opts.complete();
        }
    }, opts.delay || 13);

    return timer;
}



//Game.prototype.simpleAnimation = function(arr,offElem){
//    var animCounter =0;
//    for(var i =0; i < arr.length; i++) {
//        var targetCount = getMaxMultiple(arr[i].speed, arr[i].targetCount);
//        var string = arr[i].attr.split(/\./);
//
//        if(Math.ceil(arr[0].elem[string[0]][string[1]]) != getMaxMultiple(arr[0].speed, arr[0].targetCount) && (arr[1] == undefined || Math.ceil(arr[1].elem[string[0]][string[1]]) != getMaxMultiple(arr[1].speed, arr[1].targetCount)) && (arr[2] == undefined || Math.ceil(arr[2].elem[string[0]][string[1]]) != getMaxMultiple(arr[2].speed, arr[2].targetCount))) {
//            if (Math.ceil(arr[i].elem[string[0]][string[1]]) != targetCount) {
//                if (Math.ceil(arr[i].elem[string[0]][string[1]]) < targetCount - arr[i].speed) {
//                    arr[i].elem[string[0]][string[1]] += arr[i].speed
//                } else if (Math.ceil(arr[i].elem[string[0]][string[1]]) > targetCount + arr[i].speed) {
//                    arr[i].elem[string[0]][string[1]] -= arr[i].speed
//                } else {
//                    arr[i].elem[string[0]][string[1]] += targetCount -Math.ceil(arr[i].elem[string[0]][string[1]])
//                }
//            }
//        }else {
//            animCounter +=1;
//            if (offElem && animCounter == arr.length) {
//                offElem.elem[offElem.attrib] = 0;
//            }
//
//        }
//
//    }
//};

Game.prototype.swichTurn = function (){
    game.stats.players[ game.stats.currentPlayer + 'Player'].camera.x = game.camera.position.x;
    game.stats.players[ game.stats.currentPlayer + 'Player'].camera.y = game.camera.position.y;
    game.stats.players[ game.stats.currentPlayer + 'Player'].camera.z = game.camera.position.z;
    if(game.stats.currentPlayer == 'white'){
        game.stats.currentPlayer = 'black';
        game.stats.currentPlates = 'secondPayerPlate';
        game.stats.currentModel = 'secondPlayerModel';
        game.stats.players.whitePlayer.turn +=1;
    }else{
        game.stats.currentPlayer = 'white';
        game.stats.currentPlates = 'firstPayerPlate';
        game.stats.currentModel = 'firstPlayerModel';
        game.stats.players.blackPlayer.turn +=1;

    }



    gui.update();

};



Game.prototype.init = function(){

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



    // create the ground plane
    this.planeGeometry = new THREE.BoxGeometry(167, 167, 5);
    var woodenTextureLight = THREE.ImageUtils.loadTexture( '/images/wooden_2.jpg' );
    //woodenTextureLight.wrapS = woodenTextureLight.wrapT = THREE.RepeatWrapping;
    //woodenTextureLight.repeat.set( 4, 4 );
    var planeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureLight, shininess: 50 } );

    var woodenTextureUltraLight = THREE.ImageUtils.loadTexture( '/images/lightwood.jpg' );
    var woodenUltraLightMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureUltraLight, shininess: 50 } );

    var woodenTextureUltraDark = THREE.ImageUtils.loadTexture( '/images/darkwood.jpg' );
    var woodenUltraDarkMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureUltraDark, shininess: 50 } );



    var plane = new THREE.Mesh(this.planeGeometry, planeMaterial);


    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    // add the plane to the scene
    plane.name = 'plane';
    this.addObject(plane, 'params', this.geometries.plane);

    this.cubeGeometry = new THREE.BoxGeometry(this.geometries.cube.x, this.geometries.cube.y ,this.geometries.cube.z);
    var woodenTextureDark = THREE.ImageUtils.loadTexture( '/images/wooden_1.jpg' );
    woodenTextureDark.wrapS = woodenTextureDark.wrapT = THREE.RepeatWrapping;
    var startRepeat = 0.15;

    for (var j = 0; j < (this.planeGeometry.parameters.height) / 19; j++) {
        for (var i = 0; i < (this.planeGeometry.parameters.width) / 19; i++) {
            startRepeat = Math.round((startRepeat+0.01)*100)/100;
            woodenTextureDark.repeat.set( startRepeat, startRepeat);

            var cubeMaterial = new THREE.MeshPhongMaterial( { map: woodenTextureDark, shininess: 90 } );
            var cube = new THREE.Mesh(this.cubeGeometry, cubeMaterial);
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

    for (var k = 0; k < 17; k++) {
        this.stats.players.whitePlayer.fieldArray.push([]);
        this.stats.players.blackPlayer.fieldArray.push([]);


        for (var l = 0; l < 17; l++) {
            if(k % 2 == 1 && k != 17  ) {
                if (l % 2 == 1 && l != 17) {
                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plateCrossing', coords: {x: l, y: k}, filling: ''}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plateCrossing', coords: {x: l, y: k}, filling: ''}
                    );
                } else if (j != 17) {
                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: ''}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: ''}
                    );
                }
            }else if (k != 17){
                if (l % 2 == 1 && l != 17) {

                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: ''}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'plate', coords: {x: l, y: k}, filling: ''}
                    );
                } else if (l != 17) {
                    this.stats.players.whitePlayer.fieldArray[k].push(
                        {type: 'cube', coords: {x: l, y: k}, filling: ''}
                    );
                    this.stats.players.blackPlayer.fieldArray[k].push(
                        {type: 'cube', coords: {x: l, y: k}, filling: ''}
                    );
                }
            }
        }
    }

    this.PayerPlateGeometry = new THREE.BoxGeometry(this.geometries.plates.x, this.geometries.plates.y, this.geometries.plates.z);

    for(var i = 0 ; i < 10; i++){

        //First Player

        var firstPayerPlate = new THREE.Mesh(this.PayerPlateGeometry, woodenUltraLightMaterial);
        firstPayerPlate.position.z = ((this.planeGeometry.parameters.height+45) / 2) ;
        firstPayerPlate.position.x = -((this.planeGeometry.parameters.width+8) / 2) + 2 + (i * 19);
        firstPayerPlate.position.y = 15;
        firstPayerPlate.rotation.x = -0.5 * Math.PI;
        firstPayerPlate.castShadow = true;
        firstPayerPlate.receiveShadow = true;
        firstPayerPlate.name = 'firstPayerPlate[' + i + ']';
        firstPayerPlate.coords = [{},{},{}];
        firstPayerPlate.count = i;
        firstPayerPlate.tmpRotation = game.dragObj.plateRotate;
        // add the plate to the scene
        this.addObject(firstPayerPlate, 'params', this.geometries.plates);



        //Second Player

        var secondPayerPlate = new THREE.Mesh(this.PayerPlateGeometry, woodenUltraDarkMaterial);
        //cube.position.z = -((this.planeGeometry.parameters.height-11) / 2) + 2 + (i * 19);
        secondPayerPlate.position.z = -((this.planeGeometry.parameters.height+45) / 2) ;
        secondPayerPlate.position.x = -((this.planeGeometry.parameters.width+8) / 2) + 2 + (i * 19);
        secondPayerPlate.position.y = 15;
        secondPayerPlate.rotation.x = -0.5 * Math.PI;
        secondPayerPlate.castShadow = true;
        secondPayerPlate.receiveShadow = true;
        secondPayerPlate.name = 'secondPayerPlate[' + i + ']';
        secondPayerPlate.coords = [{},{},{}];
        secondPayerPlate.count = i;
        secondPayerPlate.tmpRotation = game.dragObj.plateRotate;
        // add the plate to the scene
        this.addObject(secondPayerPlate, 'params', this.geometries.plates);


    }
    //var imagePrefix = "http://maps.googleapis.com/maps/api/streetview?size=1000x1000&sensor=false&fov=90&key=AIzaSyDw80SRHmNXmDNeW25lIBx-Jq0W_S-eQxg";
    //var locations = ['46.192953,9.022615'];
    //var directions  = ["&heading=360&pitch=-1", "&heading=180&pitch=2.9", "&heading=0&pitch=90", "&heading=270&pitch=-90", "&heading=270&pitch=0", "&heading=90&pitch=2"];
    //
    //var skyGeometry = new THREE.BoxGeometry( 800, 800, 800 );
    //
    //var materialArray = [];
    //THREE.ImageUtils.crossOrigin = '';
    //for (var i = 0; i < 6; i++) {
    //
    //    materialArray.push(new THREE.MeshBasicMaterial({
    //
    //        map: THREE.ImageUtils.loadTexture(imagePrefix + '&location=' + locations[0] + directions[i]),
    //        side: THREE.BackSide
    //    }));
    //}
    //var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    //var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    //this.scene.add( skyBox );
    //




    var skyGeometry = new THREE.SphereGeometry( 300, 180, 60 );
    var skyMaterial = new THREE.MeshBasicMaterial({
        //map: THREE.ImageUtils.loadTexture( '/images/bg/bg_' + getRandomInt(1,11) + '.jpg' ),
        map: THREE.ImageUtils.loadTexture( '/images/bg/bg_10.jpg' ),
        side: THREE.BackSide
    });
    var skySphere = new THREE.Mesh( skyGeometry, skyMaterial );
    skySphere.position.y = 50;
    this.scene.add( skySphere );


    var ambientLight = new THREE.AmbientLight(0xffffff);

    this.scene.add(ambientLight);

    var PointLight = new THREE.PointLight( 0xffffff );
    PointLight.position.set( 0, 60, 400 );
    //PointLight.castShadow = true;
    this.scene.add( PointLight );


    var spotLight = new THREE.SpotLight( 0xffffff );
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



    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load( "/js/to_other_side/models/firstPlayerModel.js", this.addModelToScene );
    // addModelToScene function is called back after model has loaded
    jsonLoader.load( "/js/to_other_side/models/secondPlayerModel.js", this.addModelToScene );

    jsonLoader.load( "/js/to_other_side/models/tableModel.js", this.addTableToScene);
    jsonLoader.load( "/js/to_other_side/models/plateBorderModel.js", this.addPlateBorderToScene);






};







function Animate(){
    this.turnOn = 0;

    this.elastic = function(progress) {
        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress)
    };

    this.linear = function(progress) {
        return progress
    };

    this.quad = function(progress) {
        return Math.pow(progress, 2)
    };

    this.quint = function(progress) {
        return Math.pow(progress, 5)
    };

    this.circ = function(progress) {
        return 1 - Math.sin(Math.acos(progress))
    };

    this.back = function(progress) {
        return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5)
    };


    this.bounce = function(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    };

    this.parabola = function(progress){
        var mod = progress;
        if(progress > .5){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    }

    this.doubleParabola = function(progress){
        var mod = progress;
        if(progress > .25 && progress < .5){
            mod = 0.5 - progress
        }else if(progress > .5 && progress < .75){
            mod = progress - 0.5
        }else if(progress > .75){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    }

    this.makeEaseInOut = function(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    };


    this.makeEaseOut = function(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    };
}


function Gui(){};

Gui.prototype.init = function(){
    this.turnContainer = $('#turnContainer');
    this.turnSpan = this.turnContainer.find('span');
    this.newTurnContainer = $('#newTurnContainer');
    this.newTurnSpan = this.newTurnContainer.find('span');
    this.menuIcon = $('#menuIcon');

    this.playerIconContainer = $('#playerIconContainer');
    this.playerIcon = this.playerIconContainer.find('#playerIcon');
    this.playerIconSlider = new slider('sl', 100, 0, 100, 1);
    this.playerIconSlider.setValue(50);

    var player = $('#player')[0];

    this.playerIcon.on('click', function(){
        if(game.player.play){
            game.player.play = 0;
            game.player.volume = gui.playerIconSlider.getValue()* 0.001;
            gui.playerIconSlider.setValue(0);
            player.volume = 0;
            $('#playerIcon').removeClass('playerIcon__trigger_on').removeClass('playerIcon__on').addClass('playerIcon__off');

        }else{
            game.player.play = 1;
            gui.playerIconSlider.setValue(game.player.volume / 0.001);
            player.volume = game.player.volume;

            $('#playerIcon').removeClass('playerIcon__trigger_off').removeClass('playerIcon__off').addClass('playerIcon__on');
        }
    });
    this.playerIcon.mouseenter(function() {
        if(game.player.play){
            $('#playerIcon').removeClass('playerIcon__on').addClass('playerIcon__trigger_on');

        }else{
            $('#playerIcon').removeClass('playerIcon__off').addClass('playerIcon__trigger_off');

        }
    }).mouseleave(function() {
        if(game.player.play){
            $('#playerIcon').removeClass('playerIcon__trigger_on').addClass('playerIcon__on');
        }else{
            $('#playerIcon').removeClass('playerIcon__trigger_off').addClass('playerIcon__off');
        }
    });

    this.menuIcon.mouseenter(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 64px -399px / 555%'})
        }
    }).mouseleave(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 64px -262px / 555%'})
        }
    });
    this.menuIcon.on('click', function(){
        if($('#modalWrapper').length == 0) {

            showModal({
                header: 'MENU',
                text: '',
                close: 1,
                buttons: [
                    {
                        text: 'Retry',
                        background: 'url(/images/darkwood.jpg); color: #999',
                        callback: function () {
                            game.stats.gameOver = 1;
                            newGame();
                            hideModal();
                        }

                    }, {
                        text: 'New Game',
                        background: 'url(/images/darkwood.jpg); color: #999',
                        callback: function () {
                            game.stats.gameOver = 1;
                            newGame();
                            hideModal();
                        }

                    }, {
                        text: 'Help',
                        callback: function () {

                        }

                    }, {
                        text: 'Show in GitHub',
                        callback: function () {
                            document.location.href = '/';
                        }

                    }

                ]
            });
        }else{
            hideModal();

        }
    })

};

Gui.prototype.update= function(){

    var player =game.stats.currentPlayer.substr(0,1).toUpperCase() + game.stats.currentPlayer.substr(1);
    this.turnSpan.html(player + ': ' + game.stats.players[ game.stats.currentPlayer + 'Player'].turn + ' Turn');
    gui.newTurnSpan.html(player + ' Player Turn');
    gui.newTurnContainer.fadeIn();

    setTimeout(function(){gui.newTurnContainer.fadeOut()},1500);
};

window.gui = new Gui();
window.game = new Game();

$(document).ready(newGame);
function newGame() {


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
        gameNumber += 1;
    }

    gui.init();
    game.init();
    var webGlOutput = $("#WebGL-output");

    webGlOutput.append(game.renderer.domElement);
    var controlses = new THREE.OrbitControls(game.camera, game.renderer.domElement);




    game.animationHandler = function(trigger, options){

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

    render();

    function render() {
        $('#player')[0].volume = gui.playerIconSlider.getValue()* 0.001;
        if( game.stats.gameOver == 0 ) {
            if(!game.pause) {
                //for(var i = 0 ; i < 10; i++) {
                //    this.scene.getObjectByName('firstPayerPlate[' + (i+1) + ']').rotation.z += 0.001 * Math.PI;
                //    this.scene.getObjectByName('secondPayerPlate[' + (i+1) + ']').rotation.z += 0.001 * Math.PI;
                //}

                var animationFunc = new Animate();


                game.animationHandler('camera', [{
                    elem: game.camera,
                    attr: 'position.z',
                    duration: 2000,
                    //delta: animationFunc.makeEaseOut(animationFunc.circ),
                    startPosition: game.camera.position.z,
                    targetPosition: game.stats.players[game.stats.currentPlayer + 'Player'].camera.z,
                    step: function (delta, startPosition, targetPosition, progress) {
                        //console.log('z', Math.ceil(targetPosition/startPosition) ,targetPosition,startPosition);
                        //game.camera.position.z = (((targetPosition * (-1 + (progress*2))) - startPosition) * delta) + startPosition
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
                            //console.log('x', Math.ceil(targetPosition/startPosition) ,targetPosition,startPosition);
                            //game.camera.position.x = (((targetPosition * (-1 + (progress*2))) - startPosition) * delta) + startPosition
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


                game.animationHandler('player', [{
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

                game.animationHandler('plate', [{
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
    game.removeEventListeners = function(){
        webGlOutput.unbind( 'mousedown', throttle);
        webGlOutput.unbind( 'mouseup', throttle);
        webGlOutput.unbind( 'mousemove', throttle);
        webGlOutput.unbind( 'mousewheel', throttle);
    };
    game.addEventListeners = function(){
        webGlOutput.bind( 'mousedown', throttle(function(event){game.onDocumentMouseDown(event)}, eventThrotllingThreshhold));
        webGlOutput.bind( 'mouseup', throttle(function(event){game.onDocumentMouseUp(event)}, eventThrotllingThreshhold));
        webGlOutput.bind( 'mousemove', throttle(function(event){game.onDocumentMouseMove(event)}, eventThrotllingThreshhold));
        webGlOutput.bind( 'mousewheel', throttle(function(event){game.onDocumentMouseScroll(event)},eventThrotllingThreshhold));
    };





    game.onDocumentMouseScroll = function (event){
        var intersects = game.getObjectByCursorPosition(event);

        if(game.dragObj.name.indexOf('Plate') != -1 && game.dragObj.dragStart == 1 && (game.scene.getObjectByName('greenOutlinePlaneMesh') || game.scene.getObjectByName('redOutlinePlaneMesh'))) {
            var name = 'greenOutlinePlaneMesh';
            if(!game.scene.getObjectByName(name)){
                name = 'redOutlinePlaneMesh';
            }
            game.scene.getObjectByName(name).rotation.y += -0.5 * Math.PI;
            if (game.dragObj.plateRotate == 1){
                game.dragObj.plateRotate = 0;
                game.scene.getObjectByName(game.dragObj.name).tmpRotation = 0;
            }else {
                game.dragObj.plateRotate = 1
                game.scene.getObjectByName(game.dragObj.name).tmpRotation = 1
            }
            game.dragObj.lastTargetObject = '';
            game.onDocumentMouseMove(event);


        }

    };

    game.onDocumentMouseUp = function( event ) {

    };

    game.onDocumentMouseMove = function( event ){

        var intersects = game.getObjectByCursorPosition(event), color, name;
        if ( intersects.length > 0 && intersects[0].object.name != game.dragObj.lastTargetObject )
        {
            game.dragObj.lastTargetObject = intersects[0].object.name;
            var targetPosition = intersects[0].object.position;
            var cursorPosition = intersects[0].point;
            if (game.scene.getObjectByName('greenOutlinePlaneMesh')) game.scene.remove(game.scene.getObjectByName('greenOutlinePlaneMesh'));
            if (game.scene.getObjectByName('redOutlinePlaneMesh')) game.scene.remove(game.scene.getObjectByName('redOutlinePlaneMesh'));
            if(game.scene.getObjectByName('redOutlineCubeMesh')) game.scene.remove(game.scene.getObjectByName('redOutlineCubeMesh'));
            if(game.scene.getObjectByName('greenOutlineCubeMesh')) game.scene.remove(game.scene.getObjectByName('greenOutlineCubeMesh'));

            if(intersects[0].object.name.indexOf('cube') != -1 && game.dragObj.dragStart == 1 && game.dragObj.name.indexOf('Player')!=-1 ){
                color = 0xff0000;
                name = 'redOutlineCubeMesh';
                if(canPut(game.scene.getObjectByName(game.dragObj.name), intersects[0])){
                    color = 0x00ff00;
                    name = 'greenOutlineCubeMesh';
                }
                var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: color, side: THREE.BackSide } );
                var outlineCubeMesh = new THREE.Mesh( game.cubeGeometry, outlineMaterial2 );
                outlineCubeMesh.position.x = targetPosition.x;
                outlineCubeMesh.position.y = targetPosition.y;
                outlineCubeMesh.position.z = targetPosition.z;
                outlineCubeMesh.scale.multiplyScalar(1.05);
                outlineCubeMesh.name = name;
                game.scene.add( outlineCubeMesh );
                game.changeCursor();
            }else if(intersects[0].object.name == 'plane' && game.dragObj.dragStart == 1 && game.dragObj.name.indexOf('Plate')!=-1) {
                color = 0xff0000;
                name = 'redOutlinePlaneMesh';
                game.scene.getObjectByName(game.dragObj.name).tmpRotation = game.dragObj.plateRotate;
                if(canPut(game.scene.getObjectByName(game.dragObj.name), intersects[0])){
                    color = 0x00ff00;
                    name = 'greenOutlinePlaneMesh';
                }
                var outlineMaterial3 = new THREE.MeshBasicMaterial({color: color});
                var PayerPlateGeometry = new THREE.BoxGeometry(game.geometries.plates.x, game.geometries.plates.y, game.geometries.plates.z-2);

                var outlinePlaneMesh = new THREE.Mesh(PayerPlateGeometry, outlineMaterial3);
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
                game.changeCursor();
            }
            else if(intersects[0].object.name == game.stats.currentModel||intersects[0].object.name.indexOf(game.stats.currentPlates)!=-1){
                game.changeCursor();
            }else{
                //if(document.getElementsByTagName('body')[0].style.cursor == 'pointer'){
                //    game.changeCursor('default');
                //}
            }
        }else if (intersects.length == 0){
            if(document.getElementsByTagName('body')[0].style.cursor == 'pointer'){
                game.changeCursor('default');
            }

        }
    };

    var canPut = function(el, el2){
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


    game.onDocumentMouseDown = function( event ){
        var intersects = game.getObjectByCursorPosition( event);
        var gameOver = game.stats.gameOver;

        if ( intersects.length > 0 )
        {
            if(game.scene.getObjectByName(game.dragObj.name) && game.dragObj.name != intersects[0].object.name)game.scene.getObjectByName(game.dragObj.name).remove( game.sprite);

            if(
                (intersects[0].object.name == game.stats.currentModel||
                (intersects[0].object.name.indexOf(game.stats.currentPlates)!=-1 &&
                ((intersects[0].object.position.x > game.geometries.plane.x / 2 ||
                intersects[0].object.position.x < -(game.geometries.plane.x / 2))||
                (intersects[0].object.position.z > game.geometries.plane.y / 2 ||
                intersects[0].object.position.z < -(game.geometries.plane.y / 2)))))){

                if(game.dragObj.name != '' && game.dragObj.name != intersects[0].object.name)game.scene.getObjectByName(game.dragObj.name).remove( game.sprite);

                if(game.dragObj.name != intersects[0].object.name) {
                    var spriteGeometry = {};
                    if (intersects[0].object.name == game.stats.currentModel) {
                        spriteGeometry = new THREE.SphereGeometry(2, 32, 32);
                    } else if (intersects[0].object.name.indexOf(game.stats.currentPlates) != -1) {
                        spriteGeometry = new THREE.BoxGeometry(game.geometries.plates.x+2, game.geometries.plates.y+2, game.geometries.plates.z+2);

                    }
                    var spriteOutlineMaterial = new THREE.ShaderMaterial(
                        {
                            uniforms:
                            {
                                "c":   { type: "f", value: 1.0 },
                                "p":   { type: "f", value: 1.4 },
                                glowColor: { type: "c", value: new THREE.Color(0xffff00) },
                                viewVector: { type: "v3", value: game.camera.position }
                            },
                            vertexShader:   'uniform vec3 viewVector;uniform float c;uniform float p;varying float intensity;void main(){ vec3 vNormal = normalize( normalMatrix * normal ); vec3 vNormel = normalize( normalMatrix * viewVector ); intensity = pow( c - dot(vNormal, vNormel), p ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
                            fragmentShader: 'uniform vec3 glowColor; varying float intensity; void main(){ vec3 glow = glowColor * intensity; gl_FragColor = vec4( glow, 1.0 ); }',
                            side: THREE.FrontSide,
                            blending: THREE.AdditiveBlending,
                            transparent: true
                        }   );


                    game.sprite = new THREE.Mesh(spriteGeometry, spriteOutlineMaterial);
                    //ogame.sprite.position.z = (Math.floor(cursorPosition.z / 19) * 19) + 9.5;
                    //outlinePlaneMesh.position.x = (Math.floor(cursorPosition.x / 19) * 19) + 9.5;

                    intersects[0].object.add(game.sprite);
                }

                game.dragObj.name = intersects[0].object.name;
                game.dragObj.dragStart = 1;



            }else {
                if (game.dragObj.dragStart == 1){

                    if (intersects[0].object.name.indexOf('cube') != -1 && game.dragObj.name.indexOf('Player')!=-1&&game.scene.getObjectByName('greenOutlineCubeMesh')) {
                        var targetName = 'greenOutlineCubeMesh';

                        game.triggers.player.obj = game.scene.getObjectByName(game.dragObj.name);
                        game.triggers.player.startPosition.z = game.scene.getObjectByName(game.dragObj.name).position.z;
                        game.triggers.player.targetPosition.z = intersects[0].object.position.z;
                        game.triggers.player.startPosition.x = game.scene.getObjectByName(game.dragObj.name).position.x;
                        game.triggers.player.targetPosition.x = intersects[0].object.position.x;
                        game.triggers.player.startPosition.y = game.scene.getObjectByName(game.dragObj.name).position.y;
                        game.triggers.player.targetPosition.y = intersects[0].object.position.y+9;
                        game.triggers.player.switch = 1;

                        if(game.stats.players[ game.stats.currentPlayer + 'Player'].coords.y || game.stats.players[ game.stats.currentPlayer + 'Player'].coords.y == 0) {
                            game.stats.players.whitePlayer.fieldArray[ game.stats.players[ game.stats.currentPlayer + 'Player'].coords.y][ game.stats.players[ game.stats.currentPlayer + 'Player'].coords.x].filling = '';

                            game.stats.players.blackPlayer.fieldArray[ game.stats.players[ game.stats.currentPlayer + 'Player'].coords.y][ game.stats.players[ game.stats.currentPlayer + 'Player'].coords.x].filling = '';
                        }
                        game.stats.players[ game.stats.currentPlayer + 'Player'].coords = {y: intersects[0].object.coords.y, x: intersects[0].object.coords.x};

                        game.stats.players.whitePlayer.fieldArray[intersects[0].object.coords.y][intersects[0].object.coords.x].filling = game.dragObj.name;
                        game.stats.players.blackPlayer.fieldArray[intersects[0].object.coords.y][intersects[0].object.coords.x].filling = game.dragObj.name;
                        if((intersects[0].object.name.indexOf('cube[0]') != -1 && game.stats.currentPlayer == 'white') ||
                            (intersects[0].object.name.indexOf('cube[16]') != -1 && game.stats.currentPlayer == 'black')
                        ){
                            setTimeout(function(){
                                game.stats.gameOver = 1;

                                game.removeEventListeners();
                                var player =game.stats.currentPlayer.substr(0,1).toUpperCase() + game.stats.currentPlayer.substr(1);
                                showModal({
                                    header: player + '  player WIN!',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                                    retry: 1,
                                    location:{
                                        text: 'Show in GitHub',
                                        url:'/'
                                    }
                                });
                            }, 1000);
                        }else{
                            game.scene.getObjectByName(game.dragObj.name).remove( game.sprite);
                            game.swichTurn();
                            game.dragObj.lastTargetObject = '';
                        }



                    } else if (game.dragObj.name.indexOf('Plate') != -1 && intersects[0].object.name.indexOf('Plate') == -1 && intersects[0].object.name.indexOf('cube') == -1 &&game.scene.getObjectByName('greenOutlinePlaneMesh')) {
                        var targetName = 'greenOutlinePlaneMesh';




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

                        var _y = platesCoordsArr[game.scene.getObjectByName(targetName).position.z];
                        var _x = platesCoordsArr[game.scene.getObjectByName(targetName).position.x];

                        for(var f =0 ; f<3; f++){
                            if(game.scene.getObjectByName(game.dragObj.name).coords[0].y) {
                                game.stats.players.whitePlayer.fieldArray[ game.scene.getObjectByName(game.dragObj.name).coords[f].y][ game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = '';
                                game.stats.players.blackPlayer.fieldArray[ game.scene.getObjectByName(game.dragObj.name).coords[f].y][ game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = '';

                            }

                        }

                        if(game.scene.getObjectByName(game.dragObj.name).tmpRotation == 0){
                            game.scene.getObjectByName(game.dragObj.name).coords[0] = {y: _y - 1 , x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[1] = {y: _y  , x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[2] = {y: _y + 1 , x: _x};
                        }else{
                            game.scene.getObjectByName(game.dragObj.name).coords[0] = {y: _y , x: _x - 1};
                            game.scene.getObjectByName(game.dragObj.name).coords[1] = {y: _y , x: _x};
                            game.scene.getObjectByName(game.dragObj.name).coords[2] = {y: _y , x: _x + 1};
                        }
                        for(var f =0 ; f<3; f++){
                            game.stats.players.whitePlayer.fieldArray[ game.scene.getObjectByName(game.dragObj.name).coords[f].y][ game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = game.dragObj.name;
                            game.stats.players.blackPlayer.fieldArray[ game.scene.getObjectByName(game.dragObj.name).coords[f].y][ game.scene.getObjectByName(game.dragObj.name).coords[f].x].filling = game.dragObj.name;

                        }

                        game.triggers.plate.obj = game.scene.getObjectByName(game.dragObj.name);
                        game.triggers.plate.startPosition.z = game.scene.getObjectByName(game.dragObj.name).position.z;
                        game.triggers.plate.targetPosition.z = game.scene.getObjectByName(targetName).position.z;
                        game.triggers.plate.startPosition.x = game.scene.getObjectByName(game.dragObj.name).position.x;
                        game.triggers.plate.targetPosition.x = game.scene.getObjectByName(targetName).position.x;
                        game.triggers.plate.startPosition.y = game.scene.getObjectByName(game.dragObj.name).position.y;
                        game.triggers.plate.targetPosition.y = game.scene.getObjectByName(targetName).position.y;
                        game.triggers.plate.switch = 1;

                        //game.scene.getObjectByName(game.dragObj.name).position.y = game.scene.getObjectByName(targetName).position.y;
                        //game.scene.getObjectByName(game.dragObj.name).position.x = game.scene.getObjectByName(targetName).position.x;
                        //game.scene.getObjectByName(game.dragObj.name).position.z = game.scene.getObjectByName(targetName).position.z;


                        game.scene.getObjectByName(game.dragObj.name).remove( game.sprite);
                        game.swichTurn();

                        game.dragObj.lastTargetObject = '';

                    }

                    if(game.dragObj.name != intersects[0].object.name){
                        game.dragObj.name = '';
                        game.dragObj.dragStart = 0;
                    }


                    if(gameOver != 0 ) {
                        setTimeout(function(){game.stats.gameOver = 1},100);
                    }

                }
            }



        }

    };

    game.addEventListeners();


    gui.newTurnContainer.fadeIn();

    setTimeout(function(){gui.newTurnContainer.fadeOut()},3000);


};

