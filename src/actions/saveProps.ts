"use server";
"use action";

import { writeFileSync } from "fs";
import { cookies } from "next/headers";
import { Api } from "saitamadotfun/sdk";

import { saitamaBaseApiUrl, siteId } from "@/config";

export const saveProps = async (props: object) => {
  "use action";
  const authToken = cookies().get("auth.token");
  if (authToken && authToken.value) {
    const api = new Api(saitamaBaseApiUrl, authToken.value);
    await api.site.sync(siteId, { document: props });
  }
  writeFileSync("./.saitama/saitama.json", JSON.stringify(props, undefined, 2));

  return { status: "success" };
};
