<script lang="ts">
  import type { QuestionType } from "./helper";

  export let questions: QuestionType[] = [];
</script>

{#if !questions || questions.length}
  <div class="hide-print">
    <h3>Show/Hide Question</h3>
    <ul>
      {#each questions as question (question.title)}
        <li>
          <input type="checkbox" bind:checked={question.show} />{question.title}
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  ul {
    position: static;
    height: 250px;
    overflow: scroll;
  }
</style>
