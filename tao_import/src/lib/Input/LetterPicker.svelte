<script lang="ts">
  export let title: string;
  export let value: string = "A";
  let index = 0;

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const validate = () => {
    value = value[0].toUpperCase();
  };

  const onPress = (direction: 1 | -1) => {
    if (value != alphabet[index])
      index = alphabet.findIndex(
        (letter) => letter.toLowerCase() === value.toLocaleLowerCase()
      );
    index += direction;
    if (index > alphabet.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = alphabet.length - 1;
    }
    value = alphabet[index];
  };
</script>

<div class="container">
  <input
    type="text"
    name={`${title}-letter`}
    id={`${title}-letter`}
    bind:value
    pattern="[A-Z]{1}"
    on:focusout|preventDefault={() => validate()}
  />
  <div class="button-selector">
    <button on:click={() => onPress(+1)} class="reversed"
      ><img src="chevron.svg" alt="UP" /></button
    >
    <button on:click={() => onPress(-1)}
      ><img src="chevron.svg" alt="DOWN" /></button
    >
  </div>
</div>

<style>
  input {
    width: 20px;
    border: none;
    border-right: 1px solid black;
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 13px;
  }
  .container {
    border-radius: 5px;
    overflow: hidden;
    border: 1.5px solid black;
    display: flex;
    flex-direction: row;
    background-color: #00566b;
  }
  button {
    border-radius: 0;
    border: none;
    padding: 3px 0 0 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: #00566b;
    color: white;
    transition: 0.3s;
  }
  button:hover {
    background-color: #457e8b;
  }
  button:active {
    background-color: #00566b;
  }

  img {
    width: 20px;
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(147deg)
      brightness(100%) contrast(101%);
    padding: 1px;
    transition: 0.3s;
  }
  .reversed {
    transform: rotate(180deg);
  }
</style>
