<script lang="ts">
  import ZipInput from "./lib/ZipInput.svelte";
</script>

<header>
  <div class="copy">&copy;Benoit-Welsch - 02-2023</div>
  <div class="doc"><a href="/documentation.pdf">Documentation</a></div>
</header>
<main><ZipInput /></main>

<style>
  header {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>
