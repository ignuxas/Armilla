import React, { useEffect, useContext } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import test from "./models/test.obj";

var frameWidth = 400;
var frameHeight = 400;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const loader = new OBJLoader();
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

//object
//const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const light = new THREE.DirectionalLight(0xffffff);
const light2 = new THREE.DirectionalLight(0xffffff);
//const helper = new THREE.DirectionalLightHelper(light, 10);
//const axesHelper = new THREE.AxesHelper(5);
light.translateZ(1500);
light.translateX(1200);
light2.translateZ(-1500);
light2.translateX(-1200);
//scene.add(axesHelper);
//scene.add(helper);
scene.add(light);
scene.add(light2);
renderer.setClearColor(0xffffff, 0);

loader.load(
  // resource URL
  test,
  // called when resource is loaded
  function (object) {
    scene.add(object);
    fitCameraToObject(camera, object, -3);
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log(error);
  }
);

function animate() {
  document.getElementById("stlFrame").appendChild(renderer.domElement);
  requestAnimationFrame(animate);
  frameWidth = document.getElementById("stlFrame").offsetWidth;
  frameHeight = document.getElementById("stlFrame").offsetHeight;
  controls.update();
  controls.autoRotate = true;
  renderer.render(scene, camera);
  //object.rotation.x += 0.001;
  //object.rotation.y += 0.01;
}

function fitCameraToObject(camera, object, offset) {
  offset = offset || 1.5;

  const boundingBox = new THREE.Box3();

  boundingBox.setFromObject(object);

  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());

  const startDistance = center.distanceTo(camera.position);
  // here we must check if the screen is horizontal or vertical, because camera.fov is
  // based on the vertical direction.
  const endDistance =
    camera.aspect > 0.2
      ? (size.y / 2 + offset) / Math.abs(Math.tan(camera.fov / 2))
      : (size.y / 2 + offset) /
        Math.abs(Math.tan(camera.fov / 2)) /
        camera.aspect;

  camera.position.set(
    (camera.position.x * endDistance) / startDistance,
    (camera.position.y * endDistance) / startDistance,
    (camera.position.z * endDistance) / startDistance
  );
  camera.lookAt(center);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  frameWidth = document.getElementById("stlFrame").offsetWidth;
  frameHeight = document.getElementById("stlFrame").offsetHeight;
  camera.aspect = frameWidth / frameHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(frameWidth, frameHeight);
}

function PreviewWindow() {
  useEffect(() => {
    frameWidth = document.getElementById("stlFrame").offsetWidth;
    frameHeight = document.getElementById("stlFrame").offsetHeight;
    //const object = new THREE.Mesh( geometry, material );
    //scene.add( object );

    // instantiate a loader

    // load a resource

    camera.position.z = 5;

    onWindowResize();
    animate();
    console.log(frameWidth / frameHeight);
  }, []);

  return (
    <div>
      <div id="BG" className="acrylic"></div>
      <div id="PreviewWindow">
        <div id="stlFrame"></div>
        <div id="contentFrame">
          <h1>Nasa Logo</h1>
          <span>60 x 17 x 5 mm</span>

          <div id="infoDiv">
            <div className={"Color White"}></div>
            <button className="price">2.99 €</button>
            <i className="fa fa-boxes"> 2</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewWindow;
