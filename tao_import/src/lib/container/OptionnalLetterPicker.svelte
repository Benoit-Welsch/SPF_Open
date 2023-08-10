<script lang="ts">
  import { onMount } from "svelte";
  import LetterPicker from "../Input/LetterPicker.svelte";

  export let disable = false;
  export let value = "";

  onMount(() => {
    onChange();
  });

  const onChange = () => {
    disable = !disable;
    value = ""
  };
</script>

<div>
  <div class="input">
    <input type="checkbox" on:change={() => onChange()} />
    <LetterPicker bind:value bind:disable />
  </div>
</div>

<style>
  .input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
  }
  input {
    margin: 0;
  }
</style>
