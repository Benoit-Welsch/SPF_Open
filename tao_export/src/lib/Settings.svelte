<script lang="ts">
  export let hideAnswer = false;
  export let showInstruction = false;
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

<fieldset>
  <legend>Instuction</legend>
  <input
    type="radio"
    id="hide-instuction"
    checked
    value={true}
    name="Instruction"
    bind:group={showInstruction}
  />
  <label for="hide-instuction">Show</label>
  <input
    type="radio"
    id="show-instuction"
    value={false}
    name="Instruction"
    bind:group={showInstruction}
  />
  <label for="show-instuction">Hide</label>
</fieldset>
