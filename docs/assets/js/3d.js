console.log('three.js')
const app = document.querySelector('.app')

// ページの読み込みを待つ
function init() {
  // サイズを指定
  const width = app.clientWidth
  const height = app.clientHeight

  // レンダラーを作成
  const canvasElement = document.querySelector('#js-canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
  camera.position.set(0, 0, 1000)

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement)

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true
  controls.dampingFactor = 0.2

  tick()
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  const directionalLightPlus1 = new THREE.DirectionalLight(0xffffff)
  directionalLightPlus1.position.set(1, 1, 1)
  scene.add(directionalLightPlus1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff)
  directionalLight2.position.set(-1, -1, -1)
  scene.add(directionalLight2)

  // GLTF形式のモデルデータを読み込む
  const loader = new THREE.GLTFLoader()
  // GLTFファイルのパスを指定
  loader.load('./apple.glb', (glb) => {
    // 読み込み後に3D空間に追加
    const model = glb.scene
    model.scale.set(2000, 2000, 2000)
    model.position.set(0, -100, 0)
    scene.add(model)
  })

  // // マテリアルを作成
  // const material = new THREE.MeshStandardMaterial({
  //   map: new THREE.TextureLoader().load('assets/img/pwan.png'),
  //   side: THREE.DoubleSide,
  // })

  // // 球体の形状を作成します
  // const geometry = new THREE.SphereGeometry(300, 30, 30)
  // // 形状とマテリアルからメッシュを作成します
  // const mesh = new THREE.Mesh(geometry, material)
  // // シーンにメッシュを追加します
  // scene.add(mesh)

  tick()

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }

  // 初期化のために実行
  resize()
  // リサイズイベント発生時に実行
  window.addEventListener('resize', resize)
  function resize() {
    // サイズを取得
    const width = app.clientWidth
    const height = app.clientHeight

    // レンダラーを再設定
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    // カメラを再設定
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
}

init()
