//
// 応用プログラミング 課題6.2 G084002020 拓殖太郎
// $Id$
//
"use strict"; // 厳格モード

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    fov: 60, // 視野角
    x: 3,
    y: 2,
    z: 1,
    rotation: 1
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    controls.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x204060);
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // テクスチャの読み込み. まずは，moonTester.jpgをビットマップとして使うこと
  /* 自分で考えよう */

  // 正20面体の作成
  const geometry = new THREE.IcosahedronGeometry();
  const material = new THREE.MeshNormalMaterial();
  // マテリアルにテクスチャを登録
  /* 自分で考えよう */

  // UVマッピング
  //  基準座標と間隔
  const x0 = 0.0125;
  const y0 = 1.0;
  const dx = 0.089;
  const dy = 0.219;
  //   UVマッピングのための関数
  const uvs = geometry.getAttribute("uv");
  function setUvs(f, x, y) {
    f = f * 6;
    switch (y) {
    case 0: /* 自分で考えよう */
      uvs.array[f]   = x0;
      uvs.array[f+1] = y0;
      uvs.array[f+2] = x0;
      uvs.array[f+3] = y0;
      uvs.array[f+4] = x0;
      uvs.array[f+5] = y0;
      break;
    case 1: /* 自分で考えよう */
      uvs.array[f]   = x0;
      uvs.array[f+1] = y0;
      uvs.array[f+2] = x0;
      uvs.array[f+3] = y0;
      uvs.array[f+4] = x0;
      uvs.array[f+5] = y0;
      break;
    case 2:
      uvs.array[f]   = x0 + dx * (x + 2);
      uvs.array[f+1] = y0 - dy * 2;
      uvs.array[f+2] = x0 + dx * (x + 1);
      uvs.array[f+3] = y0 - dy;
      uvs.array[f+4] = x0 + dx * x;
      uvs.array[f+5] = y0 - dy * 2;
      break;
    case 3:
      uvs.array[f]   = x0 + dx * (x + 2);
      uvs.array[f+1] = y0 - dy * 2;
      uvs.array[f+2] = x0 + dx * x;
      uvs.array[f+3] = y0 - dy * 2;
      uvs.array[f+4] = x0 + dx * (x + 1);
      uvs.array[f+5] = y0 - dy * 3;
      break;
    }
  }
  setUvs( 0, 1, 0); setUvs( 1, 3, 0); setUvs( 2, 5, 0); setUvs( 3, 7, 0); setUvs( 4, 9, 0);
  setUvs( 6, 1, 1); setUvs( 5, 3, 1); setUvs( 9, 5, 1); setUvs( 8, 7, 1); setUvs( 7, 9, 1);
  setUvs(16, 0, 2); setUvs(15, 2, 2); setUvs(19, 4, 2); setUvs(18, 6, 2); setUvs(17, 8, 2);
  setUvs(11, 0, 3); setUvs(10, 2, 3); setUvs(14, 4, 3); setUvs(13, 6, 3); setUvs(12, 8, 3);
  geometry.setAttribute("uv", uvs, 2);
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  // 光源の作成
  const ambientLitght = new THREE.AmbientLight();
  ambientLitght.intensity = 0.3;
  scene.add(ambientLitght);
  /* ここに DirectionalLight を追加する */

  // 座標軸の設定
  const axes = new THREE.AxesHelper(3);
  scene.add(axes);
  //axes.visible = false;

  // カメラの設定
  function cameraUpdate() {
    camera.fov = controls.fov;
    camera.position.set(controls.x, controls.y, controls.z);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  // GUIコントローラ
  const gui = new dat.GUI();
  // カメラのコントローラ
  gui.add(controls, "fov", 10, 100).onChange(cameraUpdate);
  gui.add(controls, "x", -10, 10).onChange(cameraUpdate);
  gui.add(controls, "y", -10, 10).onChange(cameraUpdate);
  gui.add(controls, "z", -10, 10).onChange(cameraUpdate);
  gui.add(controls, "rotation", -10, 10);

  // 描画更新関数の定義
  function update() {
    renderer.render(scene, camera);
    icosahedron.rotation.y += 0.005 * controls.rotation;
    requestAnimationFrame(update);
  }

  // 描画
  cameraUpdate();
  update();
}

document.onload = init();
