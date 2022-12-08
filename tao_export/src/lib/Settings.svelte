<script lang="ts">
  export let hideAnswer = false;
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
