<script lang="ts">
  export let hideAnswer = true;
  export let showInstruction = false;
  export let showLetter = false;
</script>

<fieldset class="hide-print">
  <legend>Answer</legend>
  <input
    type="radio"
    id="show-answer"
    checked
    value={false}
    name="answer"
    bind:group={hideAnswer}
  />
  <label for="show-answer">Show</label>
  <input
    type="radio"
    id="hide-answer"
    value={true}
    name="answer"
    bind:group={hideAnswer}
  />
  <label for="hide-answer">Hide</label>
</fieldset>

<fieldset class="hide-print">
  <legend>Instruction</legend>
  <input
    type="radio"
    id="hide-instruction"
    checked
    value={true}
    name="Instruction"
    bind:group={showInstruction}
  />
  <label for="hide-instruction">Show</label>
  <input
    type="radio"
    id="show-instruction"
    value={false}
    name="Instruction"
    bind:group={showInstruction}
  />
  <label for="show-instruction">Hide</label>
</fieldset>

<fieldset class="hide-print">
  <legend>Letter</legend>
  <input
    type="radio"
    id="hide-letter"
    checked
    value={true}
    name="Letter"
    bind:group={showLetter}
  />
  <label for="hide-letter">Show</label>
  <input
    type="radio"
    id="show-letter"
    value={false}
    name="Letter"
    bind:group={showLetter}
  />
  <label for="show-letter">Hide</label>
</fieldset>
