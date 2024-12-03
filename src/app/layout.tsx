import "uno.css";
import "@unocss/reset/tailwind.css";

import clsx from "clsx";
import { Api } from "saitamadotfun/sdk";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import props from "../../.saitama/saitama.json";

import "@/globals.css";
import { Config } from "@/components/Config";
import { saitamaApiKey, saitamaBaseApiUrl, siteId } from "@/config";

export async function generateMetadata(): Promise<Metadata> {
  const api = new Api(saitamaBaseApiUrl, saitamaApiKey);
  const site = await api.site
    .retrieve(siteId)
    .then(({ data }) => data)
    .catch(() => null);
  if (site)
    return {
      icons: [site.metadata.settings.favicon.uri],
      openGraph: {
        images: [site?.metadata.settings.socialPreview?.uri],
      },
      title: site?.metadata.title,
      description: site?.metadata.description,
    };
  return {
    title: "Saitama | Nextjs Template",
    description: "Build a reusable website with saitama",
  };
}

const defaultFont = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          defaultFont.className,
          "fixed inset-0 flex flex-col bg-black text-white antialiased"
        )}
      >
        {children}
        <Config {...props.HomePage.Config} />
      </body>
    </html>
  );
}
