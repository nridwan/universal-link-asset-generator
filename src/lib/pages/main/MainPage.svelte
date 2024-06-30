<script>
  import { setContext } from "svelte";
  import MainPageContent from "./components/MainPageContent.svelte";
  import { createMainPageState } from "./state/main_page_state.svelte";

  let state = createMainPageState();

  setContext("pageState", state);
</script>

<MainPageContent />
