<script lang="ts">
  import Fieldset from "../container/Fieldset.svelte";

  export let title = "";
  export let value = 0;
</script>

<Fieldset {title}>
  <input type="number" name="" id="" bind:value />
</Fieldset>

<style>
  input {
    max-width: 38px;
    font-size: 13px;
    font-weight: bold;
    text-align: right;
  }
</style>
