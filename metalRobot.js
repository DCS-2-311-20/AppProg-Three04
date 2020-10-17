//
// 応用プログラミング 金属ロボット
// $Id$
//
"use strict"; // 厳格モード

function makeMetalRobot() {
  // メタルロボットの設定
  const metalRobot = new THREE.Group
  const metalMaterial = new THREE.MeshPhongMaterial(
    {color: 0x707777, shininess: 60, specular: 0x303333}
  );
  const gap = 0.01; // 胸のマークなどを浮かせる高さ
  const seg = 12; // 円や円柱の分割数
  const redMaterial = new THREE.MeshBasicMaterial({color: 0xc00000});
  const legRad = 0.5; // 脚の円柱の半径
  const legLen = 3; // 脚の円柱の長さ
  const legSep = 1.2; // 脚の間隔
  const bodyW = 3; // 胴体の幅
  const bodyH = 3; // 胴体の高さ
  const bodyD = 2; // 胴体の奥行
  const armRad = 0.4; // 腕の円柱の半径
  const armLen = 3.8; // 腕の円柱の長さ
  const headRad = 1.2; // 頭の半径
  const eyeRad = 0.2; // 目の半径
  const eyeSep = 0.8; // 目の間隔
  //  脚の作成
  const legGeometry
  = new THREE.CylinderGeometry(legRad, legRad, legLen, seg, 1);
  const legR = new THREE.Mesh(legGeometry, metalMaterial);
  legR.position.set(-legSep/2, legLen/2, 0);
  metalRobot.add(legR);
  const legL = new THREE.Mesh(legGeometry, metalMaterial);
  legL.position.set(legSep/2, legLen/2, 0);
  metalRobot.add(legL);
  //  胴体の作成
  const bodyGeometry = new THREE.BoxGeometry(bodyW - bodyD, bodyH, bodyD);
  const body = new THREE.Group;
  body.add(new THREE.Mesh(bodyGeometry, metalMaterial));
  const bodyL = new THREE.Mesh(
    new THREE.CylinderGeometry(
      bodyD/2, bodyD/2, bodyH, seg, 1, false, 0, Math.PI
    ),
    metalMaterial
  );
  bodyL.position.x = (bodyW - bodyD)/2;
  body.add(bodyL);
  const bodyR = new THREE.Mesh(
    new THREE.CylinderGeometry(
      bodyD/2, bodyD/2, bodyH, seg, 1, false, Math.PI, Math.PI
    ),
    metalMaterial
  );
  bodyR.position.x = -(bodyW - bodyD)/2;
  body.add(bodyR);
  const triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices = [
    new THREE.Vector3( 0, 0, bodyD/2+gap),
    new THREE.Vector3( (bodyW - bodyD)/2, bodyH/2, bodyD/2+gap),
    new THREE.Vector3(-(bodyW - bodyD)/2, bodyH/2, bodyD/2+gap)
  ];
  triangleGeometry.faces = [new THREE.Face3(1,2,0)];
  body.add(new THREE.Mesh(triangleGeometry, redMaterial));
  body.position.y = legLen + bodyH/2;
  body.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  metalRobot.add(body);
  //  腕の作成
  const armGeometry
  = new THREE.CylinderGeometry(armRad, armRad, armLen, seg, 1);
  const armL = new THREE.Mesh(armGeometry, metalMaterial);
  armL.position.set(bodyW/2 + armRad, legLen + bodyH - armLen/2, 0);
  metalRobot.add(armL);
  const armR = new THREE.Mesh(armGeometry, metalMaterial);
  armR.position.set(-(bodyW/2 + armRad), legLen + bodyH - armLen/2, 0);
  metalRobot.add(armR);
  //  頭の作成
  const head = new THREE.Group;
  const headGeometry = new THREE.SphereGeometry(headRad, seg, seg);
  head.add(new THREE.Mesh(headGeometry, metalMaterial));
  const circleGeometry = new THREE.CircleGeometry(eyeRad, seg);
  const eyeL = new THREE.Mesh(circleGeometry, redMaterial);
  eyeL.position.set(eyeSep/2, headRad/3, headRad-0.04);
  head.add(eyeL);
  const eyeR = new THREE.Mesh(circleGeometry, redMaterial);
  eyeR.position.set(-eyeSep/2, headRad/3, headRad-0.04);
  head.add(eyeR);
  head.position.y = legLen + bodyH + headRad;
  head.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  metalRobot.add(head);
  // 影についての設定
  metalRobot.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  // 作成結果を戻す
  return metalRobot;
}
