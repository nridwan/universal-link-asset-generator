import type { AndroidAppDefinition } from "./android_app_definition";

export interface AssetlinksItem {
  relation: ["delegate_permission/common.handle_all_urls"];
  target: {
    namespace: "android_app";
    package_name: string;
    sha256_cert_fingerprints: string[];
  };
}

export function generateAsetlinks(
  apps: AndroidAppDefinition[],
  compatMode: boolean
): AssetlinksItem[] {
  if (compatMode) {
    return apps.flatMap((value) =>
      value.sha256_list.map((sha256) => ({
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: value.id,
          sha256_cert_fingerprints: [sha256],
        },
      }))
    );
  }
  return apps.map((value) => ({
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: value.id,
      sha256_cert_fingerprints: value.sha256_list,
    },
  }));
}
