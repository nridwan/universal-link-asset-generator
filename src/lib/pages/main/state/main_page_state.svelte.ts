import type { AndroidAppDefinition } from "$lib/asset_generator/android_app_definition";
import type { AppDefinition } from "$lib/asset_generator/app_definition";
import type { IosAppDefinition } from "$lib/asset_generator/ios_app_definition";

export type AppDefinitionType = "android" | "ios";

type ViewType = AppDefinitionType | "none";

export interface MainPageState {
  androidApps: AndroidAppDefinition[];
  iosApps: IosAppDefinition[];
  viewType: ViewType;
  currentForm: AppDefinition | null;
  compat: {
    android: boolean;
    ios: boolean;
  };
  addForm: (type: AppDefinitionType) => void;
  editForm: (type: AppDefinitionType, app: AppDefinition) => void;
  deleteForm: (type: AppDefinitionType, app: AppDefinition) => void;
  saveForm: (type: AppDefinitionType, app: AppDefinition) => boolean;
  showResult: () => void;
  closeView: () => void;
}

export function createMainPageState(): MainPageState {
  let androidApps: AndroidAppDefinition[] = $state([]);
  let iosApps: IosAppDefinition[] = $state([]);
  let viewType: ViewType = $state("none");
  let currentForm: AppDefinition | null = $state(null);
  let compat = $state({
    android: true,
    ios: true,
  });

  const addForm = (type: AppDefinitionType) => {
    viewType = type;
    switch (type) {
      case "android":
        currentForm = {
          id: "",
          sha256_list: [""],
        } as AndroidAppDefinition;
        break;
      case "ios":
        currentForm = {
          id: "",
        };
    }
  };

  const editForm = (type: AppDefinitionType, app: AppDefinition) => {
    viewType = type;
    currentForm = app;
  };

  const deleteForm = (type: AppDefinitionType, app: AppDefinition) => {
    let index: number;
    let deleted: AppDefinition | undefined;
    switch (type) {
      case "android":
        index = androidApps.indexOf(app as AndroidAppDefinition);
        if (index > -1) {
          deleted = androidApps.splice(index, 1)[0];
        }
        break;
      case "ios":
        index = iosApps.indexOf(app as IosAppDefinition);
        if (index > -1) {
          deleted = iosApps.splice(index, 1)[0];
        }
    }
    if (deleted?.id == app.id) {
      closeView();
    }
  };

  const saveForm = (type: AppDefinitionType, app: AppDefinition): boolean => {
    let index: number;
    let duplicate: number;
    let valid = false;
    switch (type) {
      case "android":
        index = androidApps.findIndex((value) => value.id == currentForm?.id);
        duplicate = androidApps.findIndex((value) => value.id == app.id);
        if (duplicate > -1 && duplicate != index) {
          valid = false;
        } else if (index > -1) {
          androidApps[index] = app as AndroidAppDefinition;
          valid = true;
        } else {
          androidApps.push(app as AndroidAppDefinition);
          valid = true;
        }
        break;
      case "ios":
        index = iosApps.findIndex((value) => value.id == currentForm?.id);
        duplicate = iosApps.findIndex((value) => value.id == app.id);
        if (duplicate > -1 && duplicate != index) {
          valid = false;
        } else if (index > -1) {
          iosApps[index] = app as IosAppDefinition;
          valid = true;
        } else {
          iosApps.push(app as IosAppDefinition);
          valid = true;
        }
    }
    if (valid) {
      viewType = "none";
      currentForm = null;
    }
    return valid;
  };

  const showResult = () => {
    viewType = "none";
    currentForm = null;
  };

  const closeView = () => {
    viewType = "none";
    currentForm = null;
  };

  return {
    get androidApps() {
      return androidApps;
    },
    get iosApps() {
      return iosApps;
    },
    get viewType() {
      return viewType;
    },
    get currentForm() {
      return currentForm;
    },
    get compat() {
      return compat;
    },
    addForm,
    editForm,
    deleteForm,
    saveForm,
    showResult,
    closeView,
  };
}
