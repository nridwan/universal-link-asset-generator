<script lang="ts">
  import { getContext } from "svelte";
  import type { MainPageState } from "../state/main_page_state.svelte";
  import CopySvg from "$lib/assets/CopySvg.svelte";
  import DownloadSvg from "$lib/assets/DownloadSvg.svelte";
  import { generateAsetlinks } from "$lib/asset_generator/generate_android_assetlinks";
  import { generateAppleAppSiteAssociation } from "$lib/asset_generator/generate_apple_app_site_association";

  let pageState = getContext("pageState") as MainPageState;

  let android = $derived(
    JSON.stringify(
      generateAsetlinks(pageState.androidApps, pageState.compat.android),
      null,
      2
    )
  );

  let ios = $derived(
    JSON.stringify(
      generateAppleAppSiteAssociation(pageState.iosApps, pageState.compat.ios),
      null,
      2
    )
  );

  let androidCopied = $state(false);
  let iosCopied = $state(false);

  const copy = (
    value: string,
    valid: boolean,
    setter: (value: boolean) => void
  ) => {
    if (valid) return;
    navigator.clipboard.writeText(value);

    setter(true);

    setTimeout(() => {
      setter(false);
    }, 700);
  };

  const copyAndroid = () => {
    copy(android, androidCopied, (value) => (androidCopied = value));
  };

  const copyIos = () => {
    copy(ios, iosCopied, (value) => (iosCopied = value));
  };

  const download = (text: string, filename: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    link.download = filename;
    link.style.display = "none"; // Hide the anchor element

    document.body.appendChild(link);
    link.click();

    // Revoke the object URL to avoid memory leaks (important!)
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 0);
  };

  const downloadAndroid = () => {
    download(android, "assetlinks.json");
  };

  const downloadIos = () => {
    download(ios, "apple-app-site-association");
  };
</script>

<div class="mb-4 flex flex-wrap gap-8">
  <div class="md:flex-1 max-md:w-full flex flex-col">
    <div class="font-semibold">Android</div>
    <textarea
      class="textarea textarea-bordered w-full min-h-80 resize-none mb-4"
      readonly={true}>{android}</textarea
    >
    <div class="flex gap-2">
      <button onclick={copyAndroid} class="btn btn-sm btn-success flex-1"
        ><CopySvg class="w-6 h-6 fill-current" />
        {androidCopied ? "Copied" : "Copy"}</button
      >
      <button onclick={downloadAndroid} class="btn btn-sm btn-success flex-1"
        ><DownloadSvg class="w-6 h-6 fill-current" /> Download</button
      >
    </div>
  </div>
  <div class="md:flex-1 max-md:w-full flex flex-col">
    <div class="font-semibold">iOS</div>
    <textarea
      class="textarea textarea-bordered w-full min-h-80 resize-none mb-4"
      readonly={true}>{ios}</textarea
    >
    <div class="flex gap-2">
      <button onclick={copyIos} class="btn btn-sm btn-success flex-1"
        ><CopySvg class="w-6 h-6 fill-current" />
        {iosCopied ? "Copied" : "Copy"}</button
      >
      <button onclick={downloadIos} class="btn btn-sm btn-success flex-1"
        ><DownloadSvg class="w-6 h-6 fill-current" /> Download</button
      >
    </div>
  </div>
</div>
