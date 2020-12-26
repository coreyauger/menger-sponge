import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import { useEffect } from "react";
import { ObjectLoader } from "three";
import { OBJLoader } from "./OBJLoader";

// create the scene
const scene = new THREE.Scene();

// create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

// set size
renderer.setSize(window.innerWidth, window.innerHeight);

// add canvas to dom
document.body.appendChild(renderer.domElement);

// add axis to the scene
const axis = new THREE.AxesHelper(10);

scene.add(axis);

// add lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);

scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1.0);

light2.position.set(-100, 100, -100);

scene.add(light2);

const material = new THREE.MeshBasicMaterial({
  color: 0xaaaaaa,
  wireframe: true,
});

// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
  // resource URL
  "obj/cube.obj",
  // called when resource is loaded
  function (object) {
    console.log("** Adding obj");
    scene.add(object);
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened", error);
  }
);

// create a box and add it to the scene
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

scene.add(box);

box.position.x = 0.5;
box.rotation.y = 0.5;

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

camera.lookAt(scene.position);

function animate(): void {
  requestAnimationFrame(animate);
  render();
}

function render(): void {
  const timer = 0.002 * Date.now();
  box.position.y = 0.5 + 0.5 * Math.sin(timer);
  box.rotation.x += 0.1;
  renderer.render(scene, camera);
}

function App() {
  useEffect(() => {
    animate();
  }, []);

  return (
    <div className="App">
      <img src={"./logo192.png"} />
    </div>
  );
}

export default App;
