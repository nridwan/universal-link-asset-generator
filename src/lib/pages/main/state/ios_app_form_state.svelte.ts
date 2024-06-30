import type { IosAppDefinition } from "$lib/asset_generator/ios_app_definition";
import { type FormField } from "$lib/types/form_field";

export interface IosAppFormState {
  bundleId: FormField<string>;
  appDefinition: IosAppDefinition;
  setBundleId: (value: string) => void;
  setForm: (app: IosAppDefinition) => void;
  validate: () => boolean;
  duplicateBundleId: () => void;
}

export function createIosAppFormState(): IosAppFormState {
  let bundleId: FormField<string> = $state({
    value: "",
  });
  return {
    get bundleId() {
      return bundleId;
    },
    get appDefinition() {
      return {
        id: bundleId.value,
      };
    },
    setBundleId(value) {
      bundleId.value = value;
      bundleId.edited = true;
      bundleId.error = undefined;
    },
    setForm(app) {
      bundleId = {
        value: app.id,
        edited: !!app.id,
      };
    },
    validate() {
      let valid = true;
      if (!bundleId.value) {
        bundleId.error = "Bundle ID must not be empty";
        valid = false;
      } else if (!/^[a-zA-Z0-9\-.]+$/.test(bundleId.value)) {
        console.log("asdasd");
        bundleId.error = "Bundle ID invalid";
        valid = false;
      } else {
        bundleId.error = undefined;
      }
      return valid;
    },
    duplicateBundleId() {
      bundleId.error = "Bundle ID is exist";
    },
  };
}
