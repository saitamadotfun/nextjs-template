"use client";

import { useCookies } from "react-cookie";
import { Api, Asset } from "saitamadotfun/sdk";
import { Editor, toPlainObject } from "saitamadotfun/bunshi";

import { redirect } from "next/navigation"; 
import { useEffect, useMemo, useState } from "react";


import { layers } from "@/layers";
import { saveProps } from "@/actions/saveProps";

export function EditorPageClient({ assets: $assets }: { assets: Asset[] }) {
  const [cookies] = useCookies(["auth.token"]);
  const [assets, setAssets] = useState<Asset[]>($assets);
  const api = useMemo(
    () =>
      new Api(
        process.env.NEXT_PUBLIC_SAITAMA_API_BASE_URL!,
        cookies["auth.token"]
      ),
    [cookies]
  );

  useEffect(() => {}, [api]);

  return (
    <Editor
      layers={layers}
      onClose={() => redirect("/")}
      onExport={(props) => saveProps(toPlainObject(props))}
      assets={assets}
      onUpload={async (files) => {
        return api.asset.create(files).then(({ data }) =>
          setAssets((assets) => {
            return [...assets, ...data];
          })
        );
      }}
    />
  );
}
