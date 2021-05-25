<script>
  import Writer from './Writer.svelte'

  export let text = ''
  export let side = 'left'
  export let content = ''
</script>

<div class={`container ${side}`}>
  <div class="title">
    <Writer text={text} writeSpeed={50} />
  </div>
  <div class="content">
    <p>{content}</p>
  </div>
</div>

<style lang="postcss">
  .container {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10% 0 10%;

    .title {
      :global(.writer-container) {
        :global(p) {
          font-size: 2.2em;
        }
      }
    }

    .content {
      p {
        font-size: 1.7em;
      }
    }
  }

  .left {
    align-items: flex-start;
  }

  .right {
    align-items: flex-end;
  }
</style>