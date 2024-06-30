import type { AppDefinition } from "./app_definition";

export interface IosAppDefinition extends AppDefinition {
  /** this id must use iOS app bundle ID */
  id: string;
}
