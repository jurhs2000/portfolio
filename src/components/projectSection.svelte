<script>
  import Writer from './Writer.svelte'

  export let project = {}
  export let side = 'left';
</script>

<div class={`container ${side}`}>
  <div class="title">
    <Writer text={project.title} writeSpeed={70} />
  </div>
  <Writer text={project.year} writeSpeed={250} />
  <div class="techs">
    {#each project.techs as { name, imgSrc }, i }
      <div class="tech" key={i}>
        <img src={imgSrc} alt={name} />
        <p>{name}</p>
      </div>
    {/each}
  </div>
  <div class="content">
    <p>{project.desc}</p>
  </div>
</div>

<style lang="postcss">
  .container {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10% 0 10%;

    .title {
      :global(.writer-container) {
        :global(p) {
          font-size: 2.7em;
        }
      }
    }

    .techs {
      display: flex;
      align-items: flex-end;
      margin: 15px 10px 15px 10px;

      .tech {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;

        img {
          height: 75px;
          margin-bottom: 10px;
        }
      }
    }

    .content {
      width: 40%;
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