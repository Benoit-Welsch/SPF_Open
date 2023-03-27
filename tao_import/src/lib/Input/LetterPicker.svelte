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

<fieldset>
  <legend>{title}</legend>
  <div class="container">
    <div class="input-selector">
      <input
        type="text"
        name={`${title}-letter`}
        id={`${title}-letter`}
        bind:value
        pattern="[A-Z]{1}"
        on:focusout|preventDefault={() => validate()}
      />
      <div class="button-selector">
        <button on:click={() => onPress(+1)}
          ><img src="chevron.svg" alt="UP" /></button
        >
        <button on:click={() => onPress(-1)}
          ><img src="chevron.svg" alt="DOWN" /></button
        >
      </div>
    </div>
  </div>
</fieldset>

<style>
  .input-selector {
    display: flex;
    flex-direction: row;
  }
  img {
    width: 22px;
  }
  button:nth-child(1) {
    margin-top: -2px;
  }
  button:nth-child(2) {
    rotate: 180deg;
    margin-bottom: -2px;
  }
  .button-selector {
    display: flex;
    flex-direction: column;
  }
  .container {
    border: 1px solid black;
    border-radius: 5px;
    overflow: hidden;
  }
  fieldset {
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-items: center;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid #00566b;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    color: #00566b;
    border-radius: 12px;
    min-height: 34px;
  }
  legend {
    color: #457e8b;
    font-size: 13px;
  }
  input {
    width: 20px;
    border: none;
    border-right: 1px solid black;
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 15px;
  }
  button {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    height: 15px;
    width: 18px;
    display: flex;
  }
</style>
