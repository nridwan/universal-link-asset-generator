<script lang="ts">
  import InfoSvg from "$lib/assets/InfoSvg.svelte";

  const openModal = () =>
    (document.getElementById("aboutApp") as any).showModal();
</script>

<button onclick={openModal}>
  <InfoSvg />
</button>
<dialog id="aboutApp" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <h3 class="font-bold text-lg mb-4">What is this?</h3>
    <div class="mb-4">
      This tool is to generate generic <code>assetlinks.json</code> and
      <code>apple-app-site-association</code>
      to add capabilities for Android and iOS app Universal Links.
    </div>
    <div class="mb-4">
      For android, you must add <code>assetlinks.json</code> to your web server,
      and must be accessible in: <br />
      <code>/.well-known/assetlinks.json</code> path. <br />
      For example: <br />
      <code>https://m8zn.work/.well-known/assetlinks.json</code>
    </div>
    <div class="mb-4">
      For iOS, you must add <code>apple-app-site-association</code> to your web
      server, and must be accessible in: <br />
      <code>/apple-app-site-association</code> path. <br />
      For example: <br />
      <code>https://m8zn.work/.well-known/assetlinks.json</code>
    </div>
    <h3 class="font-bold text-lg mb-4">Motivation</h3>
    <div class="mb-4">
      <div
        class="tenor-gif-embed"
        data-postid="25645137"
        data-share-method="host"
        data-aspect-ratio="1.77778"
        data-width="100%"
      >
        <a href="https://tenor.com/view/vergil-dmc5-gif-25645137"
          >Vergil Dmc5 GIF</a
        >from
        <a href="https://tenor.com/search/vergil+dmc5-gifs">Vergil Dmc5 GIFs</a>
      </div>
      <script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></script>
    </div>
    <div class="mb-4">
      As we all know that <a
        class="text-accent"
        target="_blank" href="https://firebase.google.com/support/dynamic-links-faq"
        >Firebase Dynamic Links is discontinued and will shut down on Aug 25th,
        2025</a
      >. At first, I'd like to create its clone, but after seeing the condition,
      I think many people doesn't really need a cross product of shortlinking
      and universal link handler, some of them need to connect a real website to
      app when clicked. So, I decide to create this config generator instead,
      and let them do anything to their website if accessible from device that
      doesn't support or doesn't have the app installed.
    </div>
    <h3 class="font-bold text-lg mb-4">Flutter references:</h3>
    <div class="mb-4">
      <ul class="font-medium list-disc list-inside">
        <li>
          <a
            class="text-accent"
            target="_blank"
            href="https://pub.dev/packages/app_links"
            >app_links package on pub.dev</a
          >
        </li>
        <li>
          <a
            class="text-accent"
            target="_blank"
            href="https://developer.android.com/training/app-links/verify-android-applinks"
            >assetlinks.json setup guide</a
          >
        </li>
      </ul>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
