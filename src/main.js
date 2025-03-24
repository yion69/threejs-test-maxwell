import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css'
import * as THREE from 'three';

const scene =  new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setX(0);
camera.position.setY(5);
camera.position.setZ(35);

renderer.render(scene, camera);

let model = null;
const loader = new GLTFLoader();
loader.load("/maxwell.glb", function(gltf) {

  model = gltf.scene;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, 0, 0);
  
  scene.add(model); 

}, undefined, function(error) {

  console.log(error);

})

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const control = new OrbitControls(camera, renderer.domElement);

const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath('/skybox/');

const textureCube = cubeLoader.load([
  'rainbow_ft.png', 'rainbow_bk.png',
  'rainbow_up.png', 'rainbow_dn.png',
  'rainbow_rt.png', 'rainbow_lf.png'
])

scene.background = textureCube;

function animate () {
  requestAnimationFrame(animate);

  if(model) {
    model.rotation.y += 0.01;
  }

  control.update();
  
  renderer.render(scene, camera);
}

animate();
