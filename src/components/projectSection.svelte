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
  <div class="roles">
    {#each project.roles as rol, i }
      <div class="rol" key={i}>
        <p>{rol}</p>
      </div>
    {/each}
  </div>
  <div class="link">
    {#if project.git.link}
      <a href={project.git.link} target="_blank" rel="noopener noreferrer">{project.git.text}</a>
      <p class="transparent">{project.git.text}</p>
    {:else}
      <p>{project.git.text}</p>
    {/if}
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');

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

    .roles {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .rol {
        background-color: white;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        
        p {
          color: black;
          font-size: 0.7em;
        }
      }
    }

    .link {
      margin: 5px;
      a {
        position: absolute;
        z-index: 2;
        color: #00ffff;
        font-family: 'Source Code Pro', monospace;
        transition: 0.2s;

        &:hover {
          color: #bfbefa;
        }
      }
      p {
        color: white;
        font-family: 'Source Code Pro', monospace;
      }
      .transparent {
        color: transparent;
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