<script>
  import Writer from './Writer.svelte'

  export let project = {}
  export let side = 'left';
</script>

<div class="container">
  <div class={`separator ${side}-separator`}>
    <div class={`info ${side}-info`}>
      <div class="title">
        <Writer text={project.title} writeSpeed={70} />
      </div>
      <div class="year">
        <Writer text={project.year} writeSpeed={250} />
      </div>
      <div class="techs">
        {#each project.techs as { name, imgSrc }, i }
          <div class="tech" key={i}>
            <img src={imgSrc} alt={name} loading="lazy" />
            <p>{name}</p>
          </div>
        {/each}
      </div>
      <div class="content">
        <p class={`${side}-content-text`}>{project.desc}</p>
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
    {#if project.images.length !== 0}
      <div class="images">
        {#each project.images as projectImage }
          <img src={projectImage} alt="projectImage" loading="lazy" />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');

  .container {
    min-height: 630px;
    padding: 15px 10% 15px 10%;

    .left-separator {
      flex-direction: row;
    }
    .right-separator {
      flex-direction: row-reverse;
    }
    .separator {
      display: flex;
      align-items: center;

      .left-info {
        align-items: flex-start;
      }
      .right-info {
        align-items: flex-end;
      }
      .info {
        width: 40%;
        display: flex;
        flex-direction: column;

        .title {
          :global(.writer-container) {
            :global(p) {
              font-size: 2.5em;
              min-height: 50px;
            }
          }
        }
        .year {
          :global(.writer-container) {
            :global(p) {
              min-height: 18px;
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
              height: 60px;
              margin-bottom: 10px;
            }
            p {
              font-size: 0.8em;
            }
          }
        }

        .content {
          margin: 15px 0 15px 0;
          .left-content-text {
            text-align: left;
          }
          .right-content-text {
            text-align: right;
          }
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
              color: #7876ff;
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
    }

    .images {
      padding: 20px;
      width: 60%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      img {
        width: calc(50% - 40px);
        height: fit-content;
        margin: 10px;
        border-radius: 5px;
      }
    }
  }
</style>