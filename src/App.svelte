<script>
  import Background from './components/Background.svelte'
  import Home from './content/Home.svelte'
  import Contact from './components/Contact.svelte'
</script>

<main>
  <Background />
  <div class="absolute">
    <Home />
  </div>
  <Contact />
</main>

<style>
  .absolute {
    position: absolute;
    width: 100%;
  }
</style>