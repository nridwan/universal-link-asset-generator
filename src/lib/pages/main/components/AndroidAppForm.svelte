<script lang="ts">
  import type { AndroidAppDefinition } from "$lib/asset_generator/android_app_definition";
  import { getContext } from "svelte";
  import {
    createAndroidAppFormState,
    type AndroidAppFormState,
  } from "../state/android_app_form_state.svelte";
  import type { MainPageState } from "../state/main_page_state.svelte";

  interface Props {
    app: AndroidAppDefinition;
  }

  let { app }: Props = $props();

  let formState = createAndroidAppFormState() as AndroidAppFormState;

  let pageState = getContext("pageState") as MainPageState;

  $effect(() => {
    formState.setForm(app);
  });

  let submit = () => {
    if (formState.validate()) {
      if (!pageState.saveForm("android", formState.appDefinition)) {
        formState.duplicatePackageName();
      }
    }
  };
</script>

<div class="rounded-2xl border border-current p-4 mb-4">
  <div class="text-lg font-semibold">
    {!!pageState.currentForm?.id ? "Edit" : "Add"} Android App
  </div>
  <label class="form-control w-full mb-4">
    <div class="label">
      <span class="label-text">Package Name</span>
    </div>
    <input
      type="text"
      placeholder="com.company.appname"
      value={formState.packageName.value}
      oninput={(e) => formState.setPackageName(e.currentTarget.value)}
      class="input {formState.packageName.error
        ? 'input-error'
        : ''} input-bordered w-full"
    />
    {#if formState.packageName.error}
      <div class="label">
        <span class="label-text-alt text-error"
          >{formState.packageName.error}</span
        >
      </div>
    {/if}
  </label>
  <div class="mb-4 flex items-center gap-2">
    <div>SHA256</div>
    <button onclick={() => formState.addSha256()} class="btn btn-sm btn-info"
      >+ Add</button
    >
  </div>
  {#each formState.sha256 as sha256, index}
    <label class="form-control w-full mb-4">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF:FF"
          value={sha256.value}
          oninput={(e) => formState.setSha256(index, e.currentTarget.value)}
          class="input {sha256.error
            ? 'input-error'
            : ''} input-bordered w-full"
        />
        {#if index}
          <button onclick={() => formState.removeSha256(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 fill-error"
              viewBox="0 0 30 30"
            >
              <path
                d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
              ></path>
            </svg>
          </button>
        {:else}
          <div class="w-6"></div>
        {/if}
      </div>
      {#if sha256.error}
        <div class="label">
          <span class="label-text-alt text-error">{sha256.error}</span>
        </div>
      {/if}
    </label>
  {/each}
  <button onclick={submit} class="btn btn-sm btn-success min-w-40">Save</button>
  <button onclick={pageState.closeView} class="btn btn-sm btn-info min-w-40"
    >Cancel</button
  >
</div>
