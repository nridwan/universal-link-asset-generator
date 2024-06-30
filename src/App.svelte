<script lang="ts">
  import AppInfo from "$lib/components/AppInfo.svelte";
  import ThemeIcon from "$lib/components/ThemeIcon.svelte";
  import MainPage from "$lib/pages/main/MainPage.svelte";
</script>

<div
  class="bg-base-100 text-base-content sticky top-0 flex h-16 w-full justify-center md:gap-1"
>
  <nav class="navbar w-full">
    <div class="flex flex-1 gap-2">
      <div class="font-bold text-l">Universal Link Asset Generator</div>
      <AppInfo />
    </div>
    <div class="flex gap-2">
      <ThemeIcon />
    </div>
  </nav>
</div>
<div class="p-4">
  <MainPage />
</div>
