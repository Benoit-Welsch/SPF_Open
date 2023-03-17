<script>
  import DropZone from "./Input/DropZone.svelte";
  import RadioInput from "./Input/RadioInput.svelte";
</script>

<div class="menu">
  <div class="choiceSelection">
    <RadioInput
      title="Format"
      inputChoices={[
        { txt: "CSV", selected: true },
        { txt: "PDF" },
        { txt: "PPTX" },
        { txt: "QTI" },
      ]}
    />
    <RadioInput
      title="Sheet"
      inputChoices={[
        { txt: "NL", selected: true },
        { txt: "FR" },
        { txt: "DE" },
      ]}
    />
    <RadioInput
      title="Preview"
      inputChoices={[{ txt: "ON", selected: true }, { txt: "OFF" }]}
    />
  </div>
  <DropZone />
</div>

<style>
  .menu {
    border: 2px dotted #00566b;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: fit-content;
  }
  .choiceSelection {
    display: grid;
    max-width: fit-content;
    grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.5fr);
  }
  .choiceSelection :global(fieldset:first-child) {
    grid-column: 1 2;
    grid-row: 1;
    width: 320px;
  }
  .choiceSelection :global(fieldset:nth-child(2)) {
    grid-column: 1;
    grid-row: 2;
  }
  .choiceSelection :global(fieldset:nth-child(3)) {
    grid-column: 2;
    grid-row: 2;
  }
  .menu :global(div:last-child) {
    margin-top: auto;
    width: 100%;
  }
</style>
