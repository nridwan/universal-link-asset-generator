<script lang="ts">
  import type { AppDefinition } from "$lib/asset_generator/app_definition";
  import { getContext } from "svelte";
  import type {
    AppDefinitionType,
    MainPageState,
  } from "../state/main_page_state.svelte";

  interface Props {
    app: AppDefinition;
    type: AppDefinitionType;
  }

  let { app, type }: Props = $props();

  let state = getContext("pageState") as MainPageState;

  const editForm = () => state.editForm(type, app);
</script>

<div
  role="button"
  onclick={editForm}
  onkeyup={editForm}
  tabindex="0"
  class="badge badge-accent {state.currentForm == app
    ? ''
    : 'badge-outline'} gap-2"
>
  <span>{app.id}</span>
  <button onclick={() => state.deleteForm(type, app)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-4 w-4 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
</div>
