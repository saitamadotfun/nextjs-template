import { Api } from "saitamadotfun/sdk";
import { EditorPageClient } from "./page.client";

export default async function EditorPage() {
  const api = new Api(
    process.env.NEXT_SAITAMA_API_BASE_URL!,
    process.env.NEXT_SAITAMA_API_KEY!
  );

  const assets = await api.asset
    .list()
    .then(({ data }) => data)
    .catch(() => []);

  return <EditorPageClient assets={assets} />;
}
