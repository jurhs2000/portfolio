<script>
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { Clock } from 'three/src/core/Clock'
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  import spaceSkybox from '../resources/textures/space-skybox.jpg'
  import earthTexture from '../resources/textures/earth-low.jpg'
  import earthNormal from '../resources/textures/earth-normal.jpg'
  import starSprite from '../resources/textures/star.png'
  import gcc from '../resources/models/gcc.obj'
  import gccT from '../resources/models/textures/gcc.jpg'
  import notebook from '../resources/models/notebook.obj'
  import notebookT from '../resources/models/textures/notebook.jpg'
  import monitor from '../resources/models/monitor.obj'
  import monitorT from '../resources/models/textures/monitor.jpg'
  import rocket from '../resources/models/rocket.obj'
  import rocketT from '../resources/models/textures/rocket.png'
  import rocketT2 from '../resources/models/textures/rocketTrail.png'
  import consolaFont from '../resources/fonts/Consolas_Regular.typeface.json'

  let canvas
  let y

  onMount(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas
    })
    const textureLoader = new THREE.TextureLoader()

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.render(scene, camera)

    const pointLight = new THREE.PointLight(0xffffff, 1.2)
    pointLight.position.set(10, 5, 10)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(pointLight, ambientLight)

    const pointLightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(pointLightHelper, gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement)

    const skyboxTexture = textureLoader.load(spaceSkybox, () => {
      const rt = new THREE.WebGLCubeRenderTarget(skyboxTexture.image.height)
      rt.fromEquirectangularTexture(renderer, skyboxTexture)
      scene.background = rt.texture
    })

    const map = textureLoader.load(starSprite)
    const material = new THREE.SpriteMaterial({ map: map })
    const addStar = () => {
      const star = new THREE.Sprite(material)
      
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

      star.position.set(x,y,z)
      scene.add(star)
    }

    Array(300).fill().forEach(addStar)

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(earthTexture),
        normalMap: textureLoader.load(earthNormal)
      })
    )

    scene.add(earth)

    const objLoader = new OBJLoader()
    objLoader.load(`./assets/${gcc}`, async (gccObj) => {
      const gccTexture = textureLoader.load(gccT)
      gccObj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = gccTexture
        }
      })
      gccObj.scale.set(0.1, 0.1, 0.1)
      gccObj.position.y = 15
      const groupLight = new THREE.PointLight(0xffffff, 1.2)
      groupLight.position.y = 20
      const group = new THREE.Group()
      group.add(gccObj)
      group.add(groupLight)
      objLoader.load(`./assets/${notebook}`, async (notebookObj) => {
        const notebookTexture = textureLoader.load(notebookT)
        notebookObj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.map = notebookTexture
          }
        })
        notebookObj.scale.set(5, 5, 5)
        notebookObj.position.y = 15
        notebookObj.position.x = 3
        notebookObj.position.z = -3
        group.add(notebookObj)
        objLoader.load(`./assets/${monitor}`, async (monitorObj) => {
          const monitorTexture = textureLoader.load(monitorT)
          monitorObj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.map = monitorTexture
            }
          })
          monitorObj.scale.set(1.6, 1.6, 1.6)
          monitorObj.position.y = 18
          monitorObj.position.x = -1.5
          monitorObj.position.z = -4
          monitorObj.rotation.y = 0.75
          group.add(monitorObj)
          objLoader.load(`./assets/${rocket}`, async (rocketObj) => {
            const rocketTexture = {
              'Rocket_Cylinder': textureLoader.load(rocketT),
              'RocketTrail_Mesh': textureLoader.load(rocketT2)
            }
            rocketObj.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material.map = rocketTexture[child.name]
              }
            })
            rocketObj.scale.set(0.7, 0.7, 0.7)
            rocketObj.position.y = 24
            rocketObj.position.z = 5
            const groupRocket = new THREE.Group()
            groupRocket.add(rocketObj)
            
            const groupLight2 = new THREE.PointLight(0xffffff, 1.2, 20)
            groupLight2.position.y = 40
            group.add(groupLight2)

            const fontLoader = new THREE.FontLoader()
            fontLoader.load(`./assets/${consolaFont}`, (font) => {
              const textGeometry = new THREE.TextGeometry('Hello World!', {
                font: font,
                size: 0.8,
                height: 0.1,
                curveSegments: 12
              })
              const textMaterial = new THREE.MeshPhongMaterial( { color: 0x0BE6A4 } );
              const text = new THREE.Mesh(textGeometry, textMaterial)
              text.position.y = 26
              text.position.x = 5
              text.position.z = 5
              text.rotation.y = 2.5
              groupRocket.add(text)
              groupRocket.name = 'rocket'
              group.add(groupRocket)
            })
          })
        })
      })
      group.name = 'models'
      scene.add(group)
    })

    const moveCameraScroll = () => {
      camera.position.y = (y * 0.02) + 10
    }

    moveCameraScroll()
    document.body.onscroll = moveCameraScroll

    const clock = new Clock()
    clock.start()

    const animate = () => {
      requestAnimationFrame(animate)

      earth.rotation.y += 0.005
      
      camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 30;
      camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * 20;

      if (scene.getObjectByName('models')?.position) {
        scene.getObjectByName('models').position.x = Math.sin(clock.getElapsedTime() * 0.1) * 20
        scene.getObjectByName('models').position.z = Math.cos(clock.getElapsedTime() * 0.08) * 10
        scene.getObjectByName('models').getObjectByName('rocket').rotation.y += 0.005
      }

      controls.update()

      renderer.render(scene, camera)
    }

    animate()

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener( 'resize', onWindowResize, false );

  });

</script>

<svelte:window bind:scrollY={y}/>

<canvas
  bind:this={canvas}
/>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
  }
</style>