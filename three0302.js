//
// 応用プログラミング 課題5.2
// $Id$
//
"use strict"; // 厳格モード

// ３Ｄページ作成関数の定義
function init() {
  const radius = 30;
  const dTheta = 0.002;
  const controller = {
    cameraFov: 60, // 視野角
    cameraHight: 20,
    lightHight: 20,
    speed: 3,
    movingCamera: false,
  };
  // コントローラ
  const gui = new dat.GUI();
  gui.add(controller, "cameraFov", 10, 100);
  gui.add(controller, "cameraHight", -100, 100);
  gui.add(controller, "speed", -5, 5, 1);
  gui.add(controller, "movingCamera");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  axes.visible = false;

  // 平面の設定
  const planeGeometry = new THREE.PlaneGeometry(85, 85);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x007030});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI; // 平面を水平にする
  plane.receiveShadow = true;
  scene.add(plane);

  // 金属製ロボットの追加
  let metalRobot = makeMetalRobot();
  metalRobot.position.set(0, 0, 0);
  scene.add(metalRobot);

  // 光源の設定
  let lightTheta = Math.PI/4;
  const ambientLight = new THREE.AmbientLight(0x202020);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight();
  lightUpdate();
  pointLight.castShadow = true;
  scene.add(pointLight);

  // カメラの設定
  let cameraTheta = Math.PI/2;
  const camera = new THREE.PerspectiveCamera(
    controller.cameraFov, window.innerWidth/window.innerHeight, 0.1, 1000);
  cameraUpdate();

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // カメラの設定の更新
  function cameraUpdate() {
    camera.fov = controller.cameraFov;
    camera.lookAt(0, 0, 0);
    if ( controller.movingCamera ) {
      cameraTheta += dTheta*controller.speed;
      if ( cameraTheta > 2 * Math.PI ) {
        cameraTheta -= 2 * Math.PI;
      }
    }
    camera.position.set(
      radius*Math.cos(cameraTheta),
      controller.cameraHight,
      radius*Math.sin(cameraTheta)
    );
    camera.updateProjectionMatrix();
  }

  // ライトの設定の更新
  function lightUpdate() {
    pointLight.position.set(
      radius*Math.cos(lightTheta),
      controller.lightHight,
      radius*Math.sin(lightTheta)
    );
  }

  // 描画関数の定義
  function update() {
    cameraUpdate();
    lightUpdate();
    renderer.render(scene, camera);
  }
  // 描画
  update();
}

document.onload = init();
