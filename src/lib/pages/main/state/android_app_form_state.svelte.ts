import type { AndroidAppDefinition } from "$lib/asset_generator/android_app_definition";
import { type FormField } from "$lib/types/form_field";

export interface AndroidAppFormState {
  packageName: FormField<string>;
  sha256: FormField<string>[];
  appDefinition: AndroidAppDefinition;
  setPackageName: (value: string) => void;
  setSha256: (index: number, value: string) => void;
  addSha256: () => void;
  removeSha256: (index: number) => void;
  setForm: (app: AndroidAppDefinition) => void;
  validate: () => boolean;
  duplicatePackageName: () => void;
}

export function createAndroidAppFormState(): AndroidAppFormState {
  let packageName: FormField<string> = $state({
    value: "",
  });

  let sha256: FormField<string>[] = $state([
    {
      value: "",
    },
  ]);

  return {
    get packageName() {
      return packageName;
    },
    get sha256() {
      return sha256;
    },
    get appDefinition() {
      return {
        id: packageName.value,
        sha256_list: sha256.map((field) => field.value),
      };
    },
    setPackageName(value) {
      packageName.value = value;
      packageName.edited = true;
      packageName.error = undefined;
    },
    setSha256(index, value) {
      if (sha256.length <= index) return;
      sha256[index].value = value;
      sha256[index].edited = true;
      sha256[index].error = undefined;
    },
    addSha256() {
      sha256.push({
        value: "",
      });
    },
    removeSha256(index) {
      if (sha256.length <= index) return;
      sha256.splice(index, 1);
    },
    setForm(app) {
      packageName = {
        value: app.id,
        edited: !!app.id,
      };
      sha256 = app.sha256_list.map((value) => ({
        value,
        edited: !!value,
      }));
    },
    validate() {
      let valid = true;
      if (!packageName.value) {
        packageName.error = "Package Name must not be empty";
        valid = false;
      } else if (
        !/^([a-z]{1}[a-z0-9_]*\.)+[a-z][a-z0-9_]*$/.test(packageName.value)
      ) {
        console.log("asdasd");
        packageName.error = "Package Name invalid";
        valid = false;
      } else {
        packageName.error = undefined;
      }
      sha256.forEach(({ value }, index) => {
        if (!value) {
          sha256[index].error = "SHA256 must not be empty";
          valid = false;
        } else if (!/^[0-fA-F0-9]{2}(?:[:][0-fA-F0-9]{2}){31}$/.test(value)) {
          sha256[index].error = "SHA256 invalid";
          valid = false;
        } else {
          sha256[index].error = undefined;
        }
      });
      return valid;
    },
    duplicatePackageName() {
      packageName.error = "Package Name is exist";
    },
  };
}
