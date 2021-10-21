//
// 応用プログラミング 課題6.1 G084002020 拓殖太郎
// $Id$
//
"use strict"; // 厳格モード

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    fov: 50, // 視野角
    hight: 3,
    rotation: 2
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    controls.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  // ここに影の投影のためのコードを入れる
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // テクスチャの読み込み



  // 立方体の作成
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshNormalMaterial();
  // マテリアルにテクスチャを登録

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 2;
  scene.add(cube);

  // 球の作成

  // 平面の作成
  const circle = new THREE.Mesh(
    new THREE.CircleGeometry(20,24),
    new THREE.MeshBasicMaterial({color:0x006010}));
  circle.rotation.x = -Math.PI/2;
  scene.add(circle);

  // 光源の作成

  // 座標軸の設定
  const axes = new THREE.AxesHelper(3);
  scene.add(axes);

  // GUIコントローラ
  const gui = new dat.GUI();
  // カメラのコントローラ
  gui.add(controls, "fov", 10, 100);
  gui.add(controls, "hight", -10, 10);
  gui.add(controls, "rotation", -10, 10);

  // 描画更新関数の定義
  function update() {
    // カメラの設定
    camera.fov = controls.fov;
    camera.position.set(7, controls.hight, 5);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    // 物体の回転
    cube.rotation.y += 0.01*controls.rotation;
    // 次のフレーム描画時の呼び出しを要求
    requestAnimationFrame(update);
  }

  // 描画
  update();
}

document.onload = init();
