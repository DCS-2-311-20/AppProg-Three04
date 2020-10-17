//
// 応用プログラミング 課題5.1
// $Id$
//
"use strict"; // 厳格モード

// ３Ｄページ作成関数の定義
function init() {
  const cameraParam = { // カメラの設定値
    fov: 50, // 視野角
    x: 2,
    y: 3,
    z: 5
  };
  const rotateSpeed = { // 回転速度の設定値
    x: 1,
    y: 2,
    z: 3
  };
  const renderSide = { // 描画面の設定値
    doubleSide: true
  };

  // シーン作成
  const scene = new THREE.Scene();

  // 立方体 作成
  const cubeGeometry = new THREE.Geometry();
  // 立方体の頂点の座標
  cubeGeometry.vertices = [
    new THREE.Vector3(-1,-1,-1),
    new THREE.Vector3( 1,-1,-1),
    new THREE.Vector3(-1, 1,-1),
    new THREE.Vector3( 1, 1,-1),
    new THREE.Vector3(-1,-1, 1),
    new THREE.Vector3( 1,-1, 1),
    new THREE.Vector3(-1, 1, 1),
    new THREE.Vector3( 1, 1, 1)
  ];
  // 立方体の面
  cubeGeometry.faces = [
    new THREE.Face3(0, 2, 1, new THREE.Vector3( 0, 0,-1)),
    new THREE.Face3(0, 4, 2, new THREE.Vector3(-1, 0, 0)),
    new THREE.Face3(0, 1, 4, new THREE.Vector3( 0,-1, 0)),
    new THREE.Face3(7, 6, 5, new THREE.Vector3( 0, 0, 1)),
    new THREE.Face3(7, 5, 3, new THREE.Vector3( 1, 0, 0)),
    new THREE.Face3(7, 3, 6, new THREE.Vector3( 0, 1, 0)),
  ];
  // 立方体のマテリアル
  const cubeMaterial = new THREE.MeshNormalMaterial();
  cubeMaterial.side = THREE.DoubleSide;
  // ジオメトリとマテリアルをメッシュにまとめる
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // ワイヤーフレーム用 立方体(cube2)の生成
  // 立方体のジオメトリ
  // ワイヤフレームのマテリアル
  // メッシュ作成
  // 2つの立方体のグループ化
  const cubes = cube;

  // 立方体をシーンに追加
  scene.add(cubes);

  // 座標軸の設定
  const axes = new THREE.AxesHelper(3);
  scene.add(axes);
  // axes.visible = false;

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    cameraParam.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // GUIコントローラ
  const gui = new dat.GUI();
  // カメラのコントローラ
  const guiCamera = gui.addFolder("camera");
  guiCamera.open();
  guiCamera.add(cameraParam, "fov", 10, 100);
  guiCamera.add(cameraParam, "x", -10, 10);
  guiCamera.add(cameraParam, "y", -10, 10);
  guiCamera.add(cameraParam, "z", -10, 10);
  // 回転のコントローラ
  const guiRotation = gui.addFolder("rotation");
  guiRotation.open();
  guiRotation.add(rotateSpeed, "x", 0, 5);
  guiRotation.add(rotateSpeed, "y", 0, 5);
  guiRotation.add(rotateSpeed, "z", 0, 5);
  // 描画面のコントローラ
  gui.add(renderSide, "doubleSide").onChange(
    () => {
      if (renderSide.doubleSide) {
        cubeMaterial.side = THREE.DoubleSide;
      }
      else {
        cubeMaterial.side = THREE.FrontSide;
      }
    }
  );

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 描画更新関数の定義
  function update() {
    // カメラの設定
    camera.fov = cameraParam.fov;
    camera.position.x = cameraParam.x;
    camera.position.y = cameraParam.y;
    camera.position.z = cameraParam.z;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    // 物体の回転
    cube.rotation.x += 0.01*rotateSpeed.x;
    cube.rotation.y += 0.01*rotateSpeed.y;
    cube.rotation.z += 0.01*rotateSpeed.z;
    // 次のフレーム描画時の呼び出しを要求
    requestAnimationFrame(update);
  }

  // 描画
  update();
}

document.onload = init();
