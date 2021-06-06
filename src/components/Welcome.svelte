<script>
  import Writer from './Writer.svelte'
</script>

<div class="container">
  <div>
    <Writer text="I'm Jurhs, and I'm a" holder="Hi!" delay={1250} />
  </div>
  <div class="developer">
    <Writer text="developer." delay={3900} />
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');

  .container {
    height: 95vh;
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    :global(.writer-container) {
      height: 7em;
    }

    :global(p) {
      font-size: 7em;
    }

    .developer {
      :global(p) {
        color: rgb(0, 162, 255);
        font-family: 'Source Code Pro', monospace;
      }
    }
  }
</style>