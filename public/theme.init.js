const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
} else {
  const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dracula"
    : "winter";
  localStorage.setItem("theme", userPreferredTheme);
  window.dispatchEvent(
    new StorageEvent("storage", {
      storageArea: localStorage,
      key: "theme",
      oldValue: "",
      newValue: theme,
    })
  );
  document.documentElement.setAttribute("data-theme", userPreferredTheme);
}
