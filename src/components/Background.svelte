<script>
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { Clock } from 'three/src/core/Clock'
  import spaceSkybox from '../resources/textures/space-skybox-4.jpg'
  import earthTexture from '../resources/textures/earth.jpg'
  import earthNormal from '../resources/textures/earth-normal.jpg'
  import starSprite from '../resources/textures/star-small.png'

  let canvas
  let y

  onMount(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas
    })

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

    const skyboxTexture = new THREE.TextureLoader().load(spaceSkybox, () => {
      const rt = new THREE.WebGLCubeRenderTarget(skyboxTexture.image.height)
      rt.fromEquirectangularTexture(renderer, skyboxTexture)
      scene.background = rt.texture
    })

    const map = new THREE.TextureLoader().load(starSprite)
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
        map: new THREE.TextureLoader().load(earthTexture),
        normalMap: new THREE.TextureLoader().load(earthNormal)
      })
    )

    scene.add(earth)

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