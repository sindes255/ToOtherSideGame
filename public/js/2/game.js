$(document).ready(function() {




    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
    var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow  = true;

    // rotate and position the plane
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x=0
    plane.position.y=0
    plane.position.z=0

    // add the plane to the scene
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(5,0,0));

    // add subtle ambient lighting
//        var ambientLight = new THREE.AmbientLight(0x494949);
//        scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, 10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);


    var controlses = new THREE.OrbitControls( camera, renderer.domElement );
    // call the render function
    var addModelToScene = function( geometry, materials )
    {
        var material = new THREE.MeshFaceMaterial( materials );
        var player = new THREE.Mesh( geometry, material );


        player.scale.set(50,50,50);




        scene.add(player);
    };


    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load( "/js/tableModel.js", addModelToScene );

    
    render();

    function addCube() {

    }

    function render() {




        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        controlses.update();

    }


});




