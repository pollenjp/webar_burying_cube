var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,                                         
});
renderer.setClearColor(new THREE.Color("black"), 0);   
renderer.setSize(640, 480);                            
renderer.domElement.style.position = "absolute";       
renderer.domElement.style.top = "0px";                 
renderer.domElement.style.left = "0px";                
document.body.appendChild(renderer.domElement);        
var camera = new THREE.Camera();                       
scene.add(camera);                                     
var light = new THREE.DirectionalLight(0xffffff);      
light.position.set(0, 0, 2);                           
scene.add(light);                                      




var source = new THREEx.ArToolkitSource({              
    sourceType: "webcam",                                
});
source.init(function onReady() {                       
    onResize();                                          
});



var context = new THREEx.ArToolkitContext({            
    debug: false,                                        
    cameraParametersUrl: "./data/camera_para.dat",              
    detectionMode: "mono",                               
    imageSmoothingEnabled: true,                         
    maxDetectionRate: 60,                                
    canvasWidth: source.parameters.sourceWidth,          
    canvasHeight: source.parameters.sourceHeight,        
});
context.init(function onCompleted(){                   
    camera.projectionMatrix.copy(context.getProjectionMatrix());    
});

 
 
 
window.addEventListener("resize", function() {         
    onResize();                                          
});
 
function onResize(){
    source.onResizeElement();
    source.copyElementSizeTo(renderer.domElement);       
    if(context.arController !== null){                   
        source.copyElementSizeTo(context.arController.canvas);   
    } 
}

//////////////////////////////////////////////////////////////////////////////
////////////utv_tamagohibiware
var utv_tamago_ware = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, utv_tamago_ware, {
    type: "pattern",                                     
    patternUrl: "./patt/utvirtual_tamagohibiware_pattern_marker.patt",                             
});
scene.add(utv_tamago_ware);

var loader = new THREE.GLTFLoader();
loader.load("./gltf/burying_cube/burying_cube.gltf", function( gltf ){
    utv_tamago_ware.add( gltf.scene );
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
});
//////////////////////////////////////////////////////////////////////////////

function renderScene() {                               
    requestAnimationFrame(renderScene);                  
    if(source.ready === false)    { return; }              
    context.update(source.domElement);                   
    renderer.render(scene, camera);                      
}
renderScene();                                         

