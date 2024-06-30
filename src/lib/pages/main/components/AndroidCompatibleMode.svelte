<script lang="ts">
  import InfoSvg from "$lib/assets/InfoSvg.svelte";

  const openModal = () =>
    (document.getElementById("aboutAndroidCompat") as any).showModal();
</script>

<button onclick={openModal}>
  <InfoSvg />
</button>
<dialog id="aboutAndroidCompat" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <h3 class="font-bold text-lg mb-4">Compatible Mode</h3>
    <div class="mb-4">
      This mode exist to use format that's used by Firebase Dynamic Links. There
      are still uncertainty whether this mode still needed or not, there are no
      information from <a
        href="https://developer.android.com/training/app-links/verify-android-applinks"
        class="text-accent">Android developer portal</a
      >. Meanwhile
      <a href="https://youtu.be/3bAQPnxLd4c?t=148" class="text-accent"
        >Official Chrome youtube video</a
      > shows duplicated package_name in order to support multiple sha256.
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
