import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "lil-gui"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl1")

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color("yellow")

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("/textures/matcaps/3.png")

//Fonts

const fontLoader = new FontLoader()
fontLoader.load("/fonts/Babylonica_Regular.json", (font) => {
  console.log("loaded")
  const textGeometry = new TextGeometry("Deep Sea Fishing", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  })
  //   textGeometry.computeBoundingBox()
  //   textGeometry.translate(
  //     -textGeometry.boundingBox.max.x * 0.5,
  //     -textGeometry.boundingBox.max.y * 0.5,
  //     -textGeometry.boundingBox.max.z * 0.5
  //   )
  textGeometry.center()

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
  textMaterial.metalness = 1
  //   textMaterial.wireframe = true
  const text = new THREE.Mesh(textGeometry, textMaterial)
  //   text.position.y = 0.5
  scene.add(text)

  console.time("donut")
  // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
  // const donutMaterial = new THREE.MeshMatcapMaterial({
  //   matcap: matcapTexture,
  // })

  // for (let i = 0; i < 100; i++) {
  //   const donut = new THREE.Mesh(donutGeometry, donutMaterial)

  //   donut.position.x = (Math.random() - 0.5) * 10
  //   donut.position.y = (Math.random() - 0.5) * 10
  //   donut.position.z = (Math.random() - 0.5) * 10

  //   donut.rotation.x = Math.random() * Math.PI
  //   donut.rotation.y = Math.random() * Math.PI

  //   const scale = Math.random()
  //   donut.scale.set(scale, scale, scale)
  //   scene.add(donut)
  // }
  console.timeEnd("donut")
})

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: 400,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
