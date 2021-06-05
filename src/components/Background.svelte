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
  import rocket from '../resources/models/rocket2.obj'
  import rocketT from '../resources/models/textures/rocket.png'
  import rocketT2 from '../resources/models/textures/rocketTrail.jpg'
  import consolaFont from '../resources/fonts/Consolas_Regular.typeface.json'
  import rocket2blast from '../resources/models/textures/Blast_DF.png'
  import rocket2blast2 from '../resources/models/textures/Blast_ALPHA.png'
  import rocket2hull from '../resources/models/textures/Hull_DF.png'
  import rocket2moon from '../resources/models/textures/Moon_DF.png'
  import rocket2strut from '../resources/models/textures/Strut_DF.png'
  import moonT from '../resources/textures/moon.jpg'

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

      const groupLight = new THREE.PointLight(0xffffff, 1.2, 10)
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
            const rocketTexture2 = {
              'Moon_Untitled.003': textureLoader.load(rocket2moon),
              'Hull_Untitled.006': textureLoader.load(rocket2hull),
              'Blast1_Untitled.013': textureLoader.load(rocket2blast),
              'Blast2_Untitled.009': textureLoader.load(rocket2blast2),
              'Strut1_Untitled.005': textureLoader.load(rocket2strut),
              'Strut2_Untitled.002': textureLoader.load(rocket2strut),
              'Strut3_Untitled.010': textureLoader.load(rocket2strut),
              'Strut4_Untitled.011': textureLoader.load(rocket2strut),
              'Asteroids_Untitled': textureLoader.load(rocket2moon),
              'StrutBlast1_Untitled.004': textureLoader.load(rocket2blast)
            }
            rocketObj.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material.map = rocketTexture2[child.name]
              }
            })
            rocketObj.scale.set(0.7, 0.7, 0.7)
            rocketObj.position.set(0,34,0)
            const groupRocket = new THREE.Group()
            groupRocket.add(rocketObj)

            const moonGeo = new THREE.SphereGeometry(3.1, 32, 32)
            const moonTexture = textureLoader.load(moonT)
            const moonMat = new THREE.MeshBasicMaterial({ map: moonTexture })
            const moon = new THREE.Mesh(moonGeo, moonMat)
            moon.position.y = 32.7
            groupRocket.add(moon)
            
            const groupLight2 = new THREE.PointLight(0xffffff, 5, 20)
            groupLight2.position.set(2, 39, 0)
            const groupLight3 = new THREE.PointLight(0xffffff, 5, 20)
            groupLight3.position.set(-2, 39, 0)
            const groupLight4 = new THREE.PointLight(0xffffff, 5, 20)
            groupLight4.position.set(0, 39, 2)
            const groupLight5 = new THREE.PointLight(0xffffff, 5, 20)
            groupLight5.position.set(0, 39, -2)
            groupRocket.add(groupLight2, groupLight3, groupLight4, groupLight5)

            groupRocket.name = 'rocket'
            group.add(groupRocket)
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

      if (scene.getObjectByName('models')) {
        scene.getObjectByName('models').position.x = Math.sin(clock.getElapsedTime() * 0.1) * 20
        scene.getObjectByName('models').position.z = Math.cos(clock.getElapsedTime() * 0.08) * 10
        if (scene.getObjectByName('models').getObjectByName('rocket')) {
          scene.getObjectByName('models').getObjectByName('rocket').rotation.y += 0.005
        }
      }
      
      if (camera.position.y > 70) {
        controls.target.set(0,0,0)
      } else if (camera.position.y > 24) {
        controls.target.set(0,((y*0.02)-14)*(2),0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * (30 + ((y*0.02)-14) * 1.5);
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * (20 + ((y*0.02)-14) * 1.5);
      } else {
        controls.target.set(0,0,0)
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