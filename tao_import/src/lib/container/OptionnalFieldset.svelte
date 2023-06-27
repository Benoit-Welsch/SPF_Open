<script lang="ts">
  import LetterPicker from "../Input/LetterPicker.svelte";
  import Fieldset from "./Fieldset.svelte";

  export let title = "";
  export let enable = false;
</script>

<Fieldset {title}>
  <input type="checkbox" bind:checked={enable} />
  <div class:enable class="content">
    {#if !enable}
      <div class="hidder" />
    {/if}
    <slot />
  </div>
</Fieldset>

<style>
</style>
