<script lang="ts">
  export let value: string = "";
  export let disable = false;

  const alpha = Array.from(Array(26)).map((_, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const moveIndex = (direction: boolean) => {
    let index = alphabet.indexOf(value);
    if (direction) index = index + 1 > alphabet.length - 1 ? 0 : index + 1;
    else index = index == 0 ? alphabet.length - 1 : index - 1;
    value = alphabet[index];
  };

  $: value = value.charAt(0).toUpperCase();
</script>

<div>
  <div class="container">
    <div class="sub" class:disable />
    <input type="text" bind:value pattern="[A-Z]{1}" />
    <div class="arrows">
      <button on:click={() => moveIndex(true)}>▲</button>
      <button on:click={() => moveIndex(false)}>▼</button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    border: 1.5px solid black;
    width: 40px;
    position: relative;
    border-radius: 6px;
  }
  input {
    width: 13px;
    margin: 0 0 0 4px;
    border: none;
    background: transparent;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }

  .arrows {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    transition: 0.3s;
    cursor: pointer;
  }

  button:hover{
    filter: invert(0.5);
  }

  .sub {
    display: none;
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }

  .disable {
    display: block;
    cursor: not-allowed !important;
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
