<script lang="ts">
  import { writable } from "svelte/store";
  import Settings from "./lib/Settings.svelte";
  import Tables from "./lib/Tables.svelte";
  import ZipInput from "./lib/ZipInput.svelte";
  import type { QuestionType } from "./lib/helper";
  import Question from "./template/Question.svelte";

  let hideAnswer;
  let showInstruction = writable(true);
  let showLetter;

  let questions: QuestionType[] = [];

  showInstruction.subscribe((showInstruction) => {
    questions = questions.map((q) => ({
      ...q,
      show:
        q.type === "Instruction" ||
        q.type === "Instruction QCM" ||
        q.type === "Instruction QO"
          ? showInstruction
          : q.show,
    }));
  });
</script>

<header>
  <div class="copy">&copy;Benoit-Welsch - 02-2023</div>
  <div class="doc"><a href="/documentation.pdf">Documentation</a></div>
  <!-- svelte-ignore missing-declaration -->
  <div class="version">v{PKG.version}</div>
</header>

<main>
  <div class="left">
    <div class="settings">
      <Settings
        bind:hideAnswer
        bind:showInstruction={$showInstruction}
        bind:showLetter
      />
    </div>
    <div class="input">
      <ZipInput bind:questions />
    </div>
    <div class="nb-questions hide-print">
      <span class="QO"
        >QO : {questions.filter((q) => q.type === "QO").length}</span
      >
      <span class="QCM">
        QCM : {questions.filter((q) => q.type === "QCM").length}
      </span>
    </div>
    <Tables bind:questions />
  </div>
  <div class="questions">
    {#if questions.length > 0}
      {#each questions as question}
        <Question bind:question bind:hideAnswer bind:showLetter />
      {/each}
    {/if}
  </div>
</main>

<style>
  header {
    top: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    border: 1px solid var(--border-color);
  }

  main {
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: column;
    padding: 10px;
  }

  .input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;
  }

  .left {
    position: sticky;
    top: 0;
    max-width: 320px;
    max-height: calc(100vh - 350px);
  }

  .left > * {
    margin-bottom: 10px;
  }

  @media print {
    header {
      background-color: #ddd;
      display: none;
    }
    .left {
      display: none;
    }
  }
</style>
