$(document).ready(function(){

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;

var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);
    // RENDERER
        renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    console.log($("#WebGL-output"), renderer.domElement);
    $("#WebGL-output").append(renderer.domElement);
    // EVENTS
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);


    ////////////
    // CUSTOM //
    ////////////

    // axes
    var axes = new THREE.AxisHelper(100);
    scene.add( axes );

    var imagePrefix = "images/dawnmountain-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );

}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{

    controls.update();

}

function render()
{
    renderer.render( scene, camera );
}

});