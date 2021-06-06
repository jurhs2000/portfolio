<script>
  import Email from '../resources/icons/email.svelte'
  import Github from '../resources/icons/github.svelte'
  import Linkedin from '../resources/icons/linkedin.svelte'

  const color = '#00ffff';
</script>

<div class="container">
  <div>
    <div class="icon">
      <a href="mailto: jurhs2000@gmail.com" target="_blank" rel="noopener noreferrer">
      </a>
      <Email fill={color} />
    </div>
    <div class="icon">
      <a href="https://github.com/jurhs2000" target="_blank" rel="noopener noreferrer">
      </a>
      <Github fill={color} />
    </div>
    <div class="icon">
      <a href="https://www.linkedin.com/in/jurhs-julio-herrera/" target="_blank" rel="noopener noreferrer">
      </a>
      <Linkedin fill={color} />
    </div>
  </div>
</div>

<style lang="postcss">
  .container {
    position: fixed;
    top: calc(50% - 88px);
    right: 0;
    z-index: 2;

    & > div {
      border-radius: 10px 0 0 10px;
      background-color: black;

      .icon {
        position: relative;
        width: 35px;
        padding: 10px;

        a {
          position: absolute;
          width: 49px;
          height: 49px;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: 0.2s;

          &:hover {
            background-color: #ffffff6e;
          }
        }
      }
    }
  }
</style>