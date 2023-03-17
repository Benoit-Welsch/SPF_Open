<script lang="ts">
  interface inputChoice {
    value?: string;
    txt: string;
    id?: string;
    selected?: boolean;
  }

  export let title = "";
  export let inputChoices: inputChoice[] = [];
  export let choice: string = "";

  let findSelection = () => {
    const { id, txt, value } = inputChoices.find((input) => input.selected);
    choice = value ? value : id ? id : txt;
  };

  $: !choice && findSelection();
</script>

<fieldset>
  <legend>{title}</legend>
  {#each inputChoices as { id, txt, value }}
    <input
      type="radio"
      name=""
      id={id ? id : txt}
      value={value ? value : id ? id : txt}
      bind:group={choice}
    />
    <label for={id ? id : txt}>{txt}</label>
  {/each}
</fieldset>

<style>
  fieldset {
    border: 3px solid #00566b;
    display: flex;
    gap: 12px;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    color: #00566b;
    border-radius: 12px;
  }
  legend {
    color: #4d8997;
    font-size: 12px;
  }
  input {
    margin-top: 0;
    margin-right: 0px;
    font-size: 16px;
    cursor: pointer;
    appearance: none;
    border-radius: 50%;
    border: 6px solid #d9d9d9;
    transition: 0.4s ease-in-out;
  }
  input:checked {
    border: 6px solid #43cc2d;
  }
  label {
    margin-left: -8px;
    cursor: pointer;
  }
</style>
