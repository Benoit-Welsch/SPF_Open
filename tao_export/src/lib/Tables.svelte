<script lang="ts">
  import type { QuestionType } from "./helper";

  export let questions: QuestionType[] = [];
  let checked = false;

  const changeSelection = () => {
    console.log("changeSelection", checked);
    questions = questions.map((q) => ({ ...q, show: checked }));
  };
</script>

{#if !questions || questions.length}
  <div class="hide-print">
    <h3>Show/Hide Question</h3>
    <ul>
      <li>
        <input type="checkbox" bind:checked on:change={changeSelection} />
        <span>All</span>
      </li>
      {#each questions as question (question.title)}
        <li>
          <input type="checkbox" bind:checked={question.show} />
          <span>{question.title}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  div{
    overflow-y: scroll;
    flex: 1;
    max-height: 100%;
  }
  h3{
    margin: 0;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
</style>
