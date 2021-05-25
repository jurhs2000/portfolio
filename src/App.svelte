<script>
  import Background from './components/Background.svelte'
  import Home from './content/Home.svelte'
  import Contact from './components/Contact.svelte'
  import { spring } from 'svelte/motion';

	let coords = spring({ x: window.innerWidth/2, y: window.innerHeight/2 }, {
		stiffness: 0.1,
		damping: 0.23
	});

	let size = spring(10);
</script>

<main>
  <Background />
  <div class="absolute">
    <Home />
  </div>
  <Contact />
</main>

<svg
  on:mousemove="{e => coords.set({ x: e.clientX, y: e.clientY })}"
  on:mousedown="{() => size.set(30)}"
  on:mouseup="{() => size.set(10)}"
>
  <circle cx={$coords.x} cy={$coords.y} r={$size}/>
</svg>

<style>
  .absolute {
    position: absolute;
    width: 100%;
  }

  svg {
    position: fixed;
		width: 100%;
		height: 100%;
    z-index: 100;
    cursor: none;
	}

  circle {
		fill: #ff3e00;
	}
</style>