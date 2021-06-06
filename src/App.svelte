<script>
  import Background from "./components/Background.svelte";
  import Home from "./content/Home.svelte";
  import Contact from "./components/Contact.svelte";
  import { spring } from "svelte/motion";
  import { spline } from "@georgedoescode/spline";
  import SimplexNoise from "simplex-noise";

  /* Credits to George Francis
    Source code of the random SVG path:
    https://georgefrancis.dev/writing/build-a-smooth-animated-blob-with-svg-and-js/ */
  let coords = spring(
    { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    {
      stiffness: 0.3,
      damping: 0.4,
    }
  );

  const createPoints = () => {
    const points = [];
    // how many points do we need
    const numPoints = 8;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 60;

    for (let i = 1; i <= numPoints; i++) {
      // x & y coordinates of the current point
      const theta = i * angleStep;

      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;

      // store the point
      points.push({
        x: x,
        y: y,
        /* we need to keep a reference to the point's original {x, y} coordinates 
      for when we modulate the values later */
        originX: x,
        originY: y,
        // more on this in a moment!
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }

    return points;
  };

  const points = createPoints();

  const map = (n, start1, end1, start2, end2) => {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  };

  const simplex = new SimplexNoise();
  let noiseStep = 0.1;

  const noise = (x, y) => {
    return simplex.noise2D(x, y);
  };

  const animate = () => {
    const newPoints = points
    for (let i = 0; i < newPoints.length; i++) {
      const point = newPoints[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
      const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    }
    return newPoints
  }

  let size = spring(0);
</script>

<main>
  <Background />
  <div class="absolute">
    <Home />
  </div>
  <Contact />
</main>

<svg
  on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
  on:mouseleave={() => size.set(1)}
  on:mouseenter={() => size.set(0)}
>
  {#if $size > 0}
    <path
      style="transform-origin: 84px 84px;"
      fill="#00ffff"
      transform={`translate(${$coords.x + (($size > 0 ? -84 : 0))} ${$coords.y + (($size > 0 ? -84 : 0))}) scale(${(($coords.x <= 10 || $coords.x >= (window.innerWidth - 15)) ? $size * 0.5 : $size * 1.5)} ${($coords.y <= 10 || $coords.y >= (window.innerHeight - 10)) ? $size * 0.5 : $size * 1.5})`}
      d={spline(animate(), 1, true)}
      width="100%"
      height="100%"
    />
  {/if}
  <circle cx={$coords.x} cy={$coords.y} r="10" />
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
    z-index: 1;
    cursor: none;
  }

  circle {
    fill: #00ffff;
  }
</style>
