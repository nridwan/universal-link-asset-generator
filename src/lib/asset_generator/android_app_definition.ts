import type { AppDefinition } from "./app_definition";

export interface AndroidAppDefinition extends AppDefinition {
  /** android packageName must be used as ID */
  id: string;
  /** SHA256 obtained from keytool, ref: https://developer.android.com/training/app-links/verify-android-applinks#web-assoc */
  sha256_list: string[];
}
