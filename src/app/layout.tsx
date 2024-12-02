import "uno.css";
import "@unocss/reset/tailwind.css";

import clsx from "clsx";
import { Api } from "saitamadotfun/sdk";

import { Open_Sans } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";

import "@/globals.css";
import { saitamaApiKey, saitamaBaseApiUrl, siteId } from "@/config";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata(
  {}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
      </body>
    </html>
  );
}
