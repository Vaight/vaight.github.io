// written by vaight on 2/16/2026
const scene = new THREE.Scene();

// scroll speeds
let sx = 0.01;
let sy = -0.02;

// init camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

// init renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// where to apply anim
document.getElementById('header-viewport').appendChild(renderer.domElement);

// checkers
const size = 1024; // 1024
const squares = 2;
const squareSize = size / squares;

// initialize canvas
const canvas = document.createElement('canvas');
canvas.width = size;
canvas.height = size;
const ctx = canvas.getContext('2d');

// fill squares
for (let y = 0; y < squares; y++) {
  for (let x = 0; x < squares; x++) {
    ctx.fillStyle = (x + y) % 2 === 0 ? '#549254' : '#266126';
    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
  }
}

// init texture
const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(40, 40);

// init material
const geometry = new THREE.PlaneGeometry(200, 200);
const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

// init plane
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2.5;
scene.add(plane);

// reposition camera
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// runs per frame
function animate() {

  requestAnimationFrame(animate);
  texture.offset.x -= sx;
  texture.offset.y -= sy;

  renderer.render(scene, camera);


}
animate();

// handle resize of window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});