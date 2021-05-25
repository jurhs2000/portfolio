<script>
  import Email from '../resources/icons/email.svelte'
  import Github from '../resources/icons/github.svelte'
  import Linkedin from '../resources/icons/linkedin.svelte'

  const color = 'blue';
</script>

<div class="container">
  <div>
    <div class="icon">
      <Email fill={color} />
    </div>
    <div class="icon">
      <Github fill={color} />
    </div>
    <div class="icon">
      <Linkedin fill={color} />
    </div>
  </div>
</div>

<style lang="postcss">
  .container {
    position: fixed;
    height: 100vh;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      border-radius: 10px 0 0 10px;
      background-color: black;

      .icon {
        width: 35px;
        padding: 10px;
      }
    }
  }
</style>