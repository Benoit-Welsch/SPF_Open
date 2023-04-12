<script lang="ts">
  export let title = "";
</script>

<fieldset>
  <legend>{title}</legend>
  <slot />
</fieldset>

<style>
  fieldset {
    border: 3px solid #00566b;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    color: #00566b;
    border-radius: 12px;
    min-height: 29px;
  }
  legend {
    color: #457e8b;
    font-size: 13px;
  }
</style>
