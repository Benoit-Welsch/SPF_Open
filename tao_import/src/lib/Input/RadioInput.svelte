<script lang="ts">
  interface inputChoice {
    value?: any;
    txt: string;
    id?: string;
    selected?: boolean;
    disabled?: boolean;
  }

  export let title = "";
  export let inputChoices: inputChoice[] = [];
  export let choice: any = "";

  let findSelection = () => {
    if (inputChoices.length < 1) return;
    let select = inputChoices.find((input) => input.selected);
    if (!select) select = inputChoices[0];
    const { id, txt, value } = select;
    choice = value ? value : id ? id : txt;
  };

  $: !choice && findSelection();
</script>

<fieldset>
  <legend>{title}</legend>
  {#each inputChoices as { id, txt, value, disabled }}
    <div class="radio">
      <input
        type="radio"
        name=""
        id={id ? id : txt}
        value={value ? value : id ? id : txt}
        bind:group={choice}
        {disabled}
      />
      <label for={id ? id : txt} class={disabled ? "disabled" : ""}>{txt}</label
      >
    </div>
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
    min-height: 34px;
  }
  legend {
    color: #457e8b;
    font-size: 13px;
  }
  .radio {
    display: inline-flex;
    align-items: center;
  }
  input {
    margin-top: 0;
    margin-right: 0px;
    height: 12px;
    width: 12px;
    cursor: pointer;
    appearance: none;
    border-radius: 50%;
    border: 6px solid #d9d9d9;
    transition: 0.3s;
  }
  input:checked {
    border: 6px solid #43cc2d;
  }
  label.disabled {
    color: #d9d9d9;
    cursor: not-allowed;
  }
  label {
    font-size: 16px;
    cursor: pointer;
    padding-left: 4px;
  }
</style>
