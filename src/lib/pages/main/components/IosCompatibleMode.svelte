<script lang="ts">
  import InfoSvg from "$lib/assets/InfoSvg.svelte";

  const openModal = () =>
    (document.getElementById("aboutIosCompat") as any).showModal();
</script>

<button onclick={openModal}>
  <InfoSvg />
</button>
<dialog id="aboutIosCompat" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <h3 class="font-bold text-lg mb-4">Compatible Mode</h3>
    <div class="mb-4">
      This mode exist to support project that's still targeting iOS version
      below iOS 13. This documentation exist on <a
        class="text-accent"
        href="https://developer.apple.com/videos/play/wwdc2019/717/?time=245"
        >WWDC2019 video</a
      >.
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
