<script lang="ts">
  import LetterPicker from "../Input/LetterPicker.svelte";

  export let title = "";
  export let checked = false;
  export let value;

  let oldValue = value;
  let disable = !checked;

  const onChange = () => {
    if (!oldValue) oldValue = value;
    disable = !checked;
    if (checked) value = oldValue;
    else {
      oldValue = value;
      value = undefined;
    }
  };
</script>

<div>
  <label for="">{title}</label>
  <div class="input">
    <input type="checkbox" bind:checked on:change={() => onChange()} />
    <LetterPicker bind:value bind:disable />
  </div>
</div>

<style>
  .input {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  input {
    margin: 0;
  }
</style>
