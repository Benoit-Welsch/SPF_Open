<script lang="ts">
  import type { QCM } from "./questions";

  export let QCMs: QCM[] = [];
</script>

<table>
  <tr>
    <th> Title </th>
    <th>Alt 1</th>
    <th>Alt 2</th>
    <th>Alt 3</th>
    <th>Alt 4</th>
  </tr>
  {#each QCMs as QCM}
    <tr>
      <td>
        {QCM.prompt}
      </td>
      {#each QCM.answers as answer}
        <td class={`${answer.correct ? "lg-green-bg" : ""}`}>{answer.prompt}</td
        >
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    border: 1px solid rgb(78, 78, 78);
    padding: 5px;
  }
  .lg-green-bg {
    text-align: left;
    background-color: rgb(135, 228, 135);
  }
  td {
  }
</style>
