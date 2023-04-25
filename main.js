import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// first argument is the field of view , the second is the aspect ratio and the rest form the frustrum
//Frustrum tells you the images you see in relation to the position of the camera.
// before that, there are three things you have know about three js envs and they are the scene, the camera to use in the scene a
//and the renderer to the render the final work and view them in the browser as well.

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

// renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347,
});

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10,10,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('opo0842a.jpg')
scene.background = spaceTexture

const jeffTexture = new THREE.TextureLoader().load('sun x moon.jpeg')
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4),
  new THREE.MeshBasicMaterial({ map: jeffTexture})
)
scene.add(jeff)

const sphereTexture = new THREE.TextureLoader().load('this-image.jpg')
const sphereT = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({
    map: sphereTexture
  })
)
scene.add(sphereT)
function animate(){
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.x += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animate()
