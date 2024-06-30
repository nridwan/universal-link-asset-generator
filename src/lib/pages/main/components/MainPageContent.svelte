<script lang="ts">
  import BaseCard from "$lib/components/BaseCard.svelte";
  import { getContext } from "svelte";
  import type { MainPageState } from "../state/main_page_state.svelte";
  import AppItem from "./AppItem.svelte";
  import AndroidAppForm from "./AndroidAppForm.svelte";
  import AssetResult from "./AssetResult.svelte";
  import { type AndroidAppDefinition } from "$lib/asset_generator/android_app_definition";
  import IosAppForm from "./IosAppForm.svelte";
  import { fade } from "svelte/transition";
  import AndroidCompatibleMode from "./AndroidCompatibleMode.svelte";
  import IosCompatibleMode from "./IosCompatibleMode.svelte";

  let pageState = getContext("pageState") as MainPageState;

</script>

<BaseCard className="p-4 flex flex-col items-center">
  <div class="w-full max-w-4xl">
    <div class="flex gap-4 items-center mb-4">
      <span class="text-lg font-semibold">Android</span>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="toggle toggle-success" bind:checked={pageState.compat.android} />
        Compatible Mode
        <AndroidCompatibleMode />
      </label>
    </div>
    <div class="flex gap-2 items-center mb-4">
      {#each pageState.androidApps as app}
        <AppItem type="android" {app} />
      {/each}
      <button
        onclick={() => pageState.addForm("android")}
        class="btn btn-sm btn-info">+ Add</button
      >
    </div>
    <div class="flex gap-2 items-center mb-4">
      <span class="text-lg font-semibold">iOS</span>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="toggle toggle-success" bind:checked={pageState.compat.ios} />
        Compatible Mode
        <IosCompatibleMode />
      </label>
    </div>
    <div class="flex gap-2 items-center mb-4">
      {#each pageState.iosApps as app}
        <AppItem type="ios" {app} />
      {/each}
      <button onclick={() => pageState.addForm("ios")} class="btn btn-sm btn-info"
        >+ Add</button
      >
    </div>
    {#if pageState.viewType == "android" && !!pageState.currentForm}
      <div in:fade><AndroidAppForm app={pageState.currentForm as AndroidAppDefinition} /></div>
    {/if}
    {#if pageState.viewType == "ios" && !!pageState.currentForm}
      <div in:fade><IosAppForm app={pageState.currentForm} /></div>
    {/if}
    {#if pageState.viewType == "none"}
      <div in:fade><AssetResult /></div>
    {/if}
  </div>
</BaseCard>
