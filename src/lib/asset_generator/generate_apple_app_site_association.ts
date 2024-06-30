import type { AndroidAppDefinition } from "./android_app_definition";
import type { IosAppDefinition } from "./ios_app_definition";

export interface AppleAppSiteAssociation {
  applinks: {
    apps?: [];
    details: AppleAppSiteAssociationItem[];
  };
}

export interface AppleAppSiteAssociationItem {
  appID?: string;
  appIDs?: string[];
  paths?: string[];
  components: AppleAppSiteAssociationComponents[];
}

export interface AppleAppSiteAssociationComponents {
  "/"?: string;
  exclude?: boolean;
}

export function generateAppleAppSiteAssociation(
  apps: IosAppDefinition[],
  compatMode: boolean
): AppleAppSiteAssociation {
  if (compatMode) {
    return {
      applinks: {
        apps: [],
        details: apps.map((e) => ({
          appID: e.id,
          paths: ["NOT /_/*", "/*"],
          components: [
            {
              "/": "/_/*",
              exclude: true,
            },
            {
              "/": "/*",
            },
          ],
        })),
      },
    };
  }
  return {
    applinks: {
      details: [
        {
          appIDs: apps.map((e) => e.id),
          components: [
            {
              "/": "/_/*",
              exclude: true,
            },
            {
              "/": "/*",
            },
          ],
        },
      ],
    },
  };
}
