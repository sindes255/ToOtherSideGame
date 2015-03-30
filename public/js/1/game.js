$(document).ready(function() {
    //dat.GUI user interfere
    var controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.cubeWidth = 2;
        this.sphereWidth = 2;
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed',0,0.5);
    gui.add(controls, 'bouncingSpeed',0,0.5);
    gui.add(controls, 'cubeWidth',1,10);
    gui.add(controls, 'sphereWidth',1,10);
    //=====================
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45
        , window.innerWidth / window.innerHeight , 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    var axes = new THREE.AxisHelper( 20 );

    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshLambertMaterial(
        {color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    var cubeGeometry = new THREE.BoxGeometry(controls.cubeWidth,controls.cubeWidth,controls.cubeWidth);
    var cubeMaterial = new THREE.MeshLambertMaterial(
        {color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 2;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);
    var sphereGeometry = new THREE.SphereGeometry(controls.sphereWidth,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial(
        {color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    $("#WebGL-output").append(renderer.domElement);
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );
    var step = 0;
    function renderAll(){
        cube.rotation.y += controls.rotationSpeed;
        cube.scale.x = controls.cubeWidth;
        cube.scale.y = controls.cubeWidth;
        cube.scale.z = controls.cubeWidth;
        cube.position.y = controls.cubeWidth;
        step+=controls.bouncingSpeed;
        sphere.position.x = 20+( 10*(Math.cos(step)));
        sphere.scale.x = controls.sphereWidth;
        sphere.scale.y = controls.sphereWidth;
        sphere.scale.z = controls.sphereWidth
        sphere.position.y = controls.sphereWidth*2;
        //sphere.position.y = 2 +( 10*Math.abs(Math.sin(step)));
        requestAnimationFrame(renderAll);
        renderer.render(scene, camera);
    }
    var imagePrefix = "images/dawnmountain-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );
    renderAll();
});




