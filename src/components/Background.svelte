<script>
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { Clock } from 'three/src/core/Clock'
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
  import rocketBlast from '../resources/models/textures/Blast_DF.png'
  import rocketHull from '../resources/models/textures/Hull_DF.png'
  import rocketMoon from '../resources/models/textures/Moon_DF.png'
  import rocketStrut from '../resources/models/textures/Strut_DF.png'
  import moonT from '../resources/textures/moon.jpg'
  import UVG from '../resources/models/UVG.glb'

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
    renderer.setSize(window.innerWidth, window.innerHeight + 1)

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
      
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200))

      star.position.set(x,y,z)
      scene.add(star)
    }

    Array(400).fill().forEach(addStar)

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
              'Moon_Untitled.003': textureLoader.load(rocketMoon),
              'Hull_Untitled.006': textureLoader.load(rocketHull),
              'Blast1_Untitled.013': textureLoader.load(rocketBlast),
              'Blast2_Untitled.009': textureLoader.load(rocketBlast),
              'Strut1_Untitled.005': textureLoader.load(rocketStrut),
              'Strut2_Untitled.002': textureLoader.load(rocketStrut),
              'Strut3_Untitled.010': textureLoader.load(rocketStrut),
              'Strut4_Untitled.011': textureLoader.load(rocketStrut),
              'Asteroids_Untitled': textureLoader.load(rocketMoon),
              'StrutBlast1_Untitled.004': textureLoader.load(rocketBlast)
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
            const groupLight4 = new THREE.PointLight(0xffffff, 5, 10)
            groupLight4.position.set(0, 39, 2)
            const groupLight5 = new THREE.PointLight(0xffffff, 5, 10)
            groupLight5.position.set(0, 39, -2)
            groupRocket.add(groupLight2, groupLight3, groupLight4, groupLight5)

            groupRocket.name = 'rocket'
            group.add(groupRocket)

            const gltfLoader = new GLTFLoader()
            gltfLoader.load(`./assets/${UVG}`, (uvgObject) => {
              uvgObject.scene.position.set(0,75,0)
              const groupUVG = new THREE.Group()
              groupUVG.add(uvgObject.scene)

              const groupLight6 = new THREE.PointLight(0xffffff, 1.4, 20)
              groupLight6.position.set(-15, 80, 10)
              const groupLight7 = new THREE.PointLight(0xffffff, 1.4, 20)
              groupLight7.position.set(0, 80, -12)
              const groupLight8 = new THREE.PointLight(0xffffff, 1.6, 20)
              groupLight8.position.set(15, 80, 5)
              groupUVG.add(groupLight6, groupLight7, groupLight8)

              const plh1 = new THREE.PointLightHelper(groupLight6)
              const plh2 = new THREE.PointLightHelper(groupLight7)
              const plh3 = new THREE.PointLightHelper(groupLight8)
              groupUVG.add(plh1, plh2, plh3)

              groupUVG.name = 'uvg'
              group.add(groupUVG)
            })
          })
        })
      })
      group.name = 'models'
      scene.add(group)
    })

    let posCam = 0
    const moveCameraScroll = () => {
      posCam = (y * 0.02) + 10
      if (posCam > 90) {
        // camera.position.y = 68
      } else if (posCam > 75) {
        camera.position.y = posCam - 32 + (((y*0.02)-65)*1.5) // 75 - 43
      } else if (posCam > 43) {
        // camera.position.y = 43
      } else {
        camera.position.y = posCam
      }
    }

    moveCameraScroll()
    document.body.onscroll = moveCameraScroll

    const clock = new Clock()
    clock.start()

    let rocketPosY = 0
    let uvgPos = 0
    const animate = () => {
      requestAnimationFrame(animate)

      earth.rotation.y += 0.005

      if (scene.getObjectByName('models')) {
        scene.getObjectByName('models').position.x = Math.sin(clock.getElapsedTime() * 0.1) * 20
        scene.getObjectByName('models').position.z = Math.cos(clock.getElapsedTime() * 0.08) * 10
        if (scene.getObjectByName('models').getObjectByName('rocket')) {
          scene.getObjectByName('models').getObjectByName('rocket').rotation.y += 0.01
        }
        if (scene.getObjectByName('models').getObjectByName('uvg')) {
          scene.getObjectByName('models').getObjectByName('uvg').rotation.y += 0.005
        }
      }
      
      if (posCam > 90) {
        controls.target.set(0,uvgPos,0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * ((30 + (((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9) + (((y*0.02)-65)*1.9) - (((y*0.02)-80)*1.35));
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * (((20 + ((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9) + (((y*0.02)-65)*1.9) - (((y*0.02)-80)*1.35));
      } else if (posCam > 75) {
        uvgPos = rocketPosY + ((y*0.02)-65)*(2.3)
        controls.target.set(0,uvgPos,0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * ((30 + (((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9) + (((y*0.02)-65)*1.9));
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * (((20 + ((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9) + (((y*0.02)-65)*1.9));
      } else if (posCam > 43) {
        controls.target.set(0,rocketPosY,0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * ((30 + (((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9));
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * (((20 + ((y*0.02)-14) * 1.5)) - (((y*0.02)-33)*1.9));
      } else if (posCam > 24) {
        rocketPosY = ((y*0.02)-14)*(2)
        controls.target.set(0,rocketPosY,0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * (30 + (((y*0.02)-14) * 1.5));
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * (20 + (((y*0.02)-14) * 1.5));
      } else {
        controls.target.set(0,0,0)
        camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 30;
        camera.position.z = Math.cos(clock.getElapsedTime() * 0.08) * 20;
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
    z-index: -1;
  }
</style>