<script>
  import { onMount } from 'svelte'

  export let text = ''
  export let delay = 0
  export let holder = ''
  export let writeSpeed = 100

  let visible = false
  let onScreen = false
  let writer

  onMount(async () => {
    setTimeout(() => {
      visible = true
    }, delay)
    const observer = new IntersectionObserver((records, observer) => {
      onScreen = records[0].isIntersecting
    }, {
      root: null,
      rootMargin: `${writer.clientHeight + (window.innerHeight / 2)}px ${window.innerHeight / 2}px 150px ${window.innerHeight / 2}px`, // TODO: quitar /2 si se quiere un rango mas grande de ejecutar la animacion al scrollear desde abajo para arriba
      threshold: 1.0,
    })
    observer.observe(writer)
  })

  const typewriter = (node, { speed = writeSpeed }) => {
    const valid = (
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE
    )

    if (!valid) throw new Error('This transition only works on elements with a single text node child')

    const text = node.textContent
    const duration = text.length * speed
    
    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t)
        node.textContent = text.slice(0, i)
      }
    }
  };
</script>

<div bind:this={writer} class="writer-container">
  {#if (visible && onScreen)}
    <p in:typewriter>{text}</p>
  {:else}
    <p>{holder}</p>
  {/if}
</div>
