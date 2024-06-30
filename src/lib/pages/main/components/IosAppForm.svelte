<script lang="ts">
  import type { IosAppDefinition } from "$lib/asset_generator/ios_app_definition";
  import { getContext } from "svelte";
  import {
    createIosAppFormState,
    type IosAppFormState,
  } from "../state/ios_app_form_state.svelte";
  import type { MainPageState } from "../state/main_page_state.svelte";

  interface Props {
    app: IosAppDefinition;
  }

  let { app }: Props = $props();

  let formState = createIosAppFormState() as IosAppFormState;

  let pageState = getContext("pageState") as MainPageState;

  $effect(() => {
    formState.setForm(app);
  });

  let submit = () => {
    if (formState.validate()) {
      if (!pageState.saveForm("ios", formState.appDefinition)) {
        formState.duplicateBundleId();
      }
    }
  };
</script>

<div class="rounded-2xl border border-current p-4 mb-4">
  <div class="text-lg font-semibold">
    {!!pageState.currentForm?.id ? "Edit" : "Add"} iOS App
  </div>
  <label class="form-control w-full mb-4">
    <div class="label">
      <span class="label-text">Bundle ID</span>
    </div>
    <input
      type="text"
      placeholder="com.company.appname"
      bind:value={formState.bundleId.value}
      oninput={(e) => formState.setBundleId(e.currentTarget.value)}
      class="input {formState.bundleId.error
        ? 'input-error'
        : ''} input-bordered w-full"
    />
    {#if formState.bundleId.error}
      <div class="label">
        <span class="label-text-alt text-error">{formState.bundleId.error}</span
        >
      </div>
    {/if}
  </label>
  <button onclick={submit} class="btn btn-sm btn-success min-w-40">Save</button>
</div>
