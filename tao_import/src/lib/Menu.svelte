<script>
  import Download from "./Input/Download.svelte";
  import DropZone from "./Input/DropZone.svelte";
  import RadioInput from "./Input/RadioInput.svelte";
  import { currentSheet, sheetNames, selectedFormat } from "./store";
  let sheet;

  sheetNames.subscribe(
    (s) => (sheet = s.map((s, n) => ({ txt: s, selected: n === 0 })))
  );
</script>

<div class="menu hide-print">
  <div class="choiceSelection">
    <RadioInput
      title="Sheet"
      inputChoices={sheet}
      bind:choice={$currentSheet}
    />
    <RadioInput
      title="Format"
      inputChoices={[
        { txt: "CSV", selected: true },
        { txt: "PDF", disabled: true },
        { txt: "WORD", disabled: true },
        { txt: "PPTX", disabled: true },
        { txt: "QTI", disabled: true },
      ]}
      bind:choice={$selectedFormat}
    />
    <RadioInput
      title="Compare"
      inputChoices={[
        { txt: "OFF", selected: true },
        { txt: "ON", disabled: true },
      ]}
    />
  </div>
  <div class="bottom">
    <Download />
    <DropZone />
  </div>
</div>

<style>
  .menu {
    z-index: 1;
    background-color: white;
    position: fixed;
    border: 2px dotted #00566b;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: fit-content;
  }
  .choiceSelection {
    display: flex;
    max-width: 360px;
    flex-wrap: wrap;
  }
  .choiceSelection :global(fieldset:first-child) {
    width: 100%;
    height: 34px;
  }
  .menu .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
</style>
