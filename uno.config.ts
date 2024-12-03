import { variantMatcher } from "@unocss/preset-mini/utils";
import {
  defineConfig,
  presetUno,
  presetIcons,
  Variant,
  expandVariantGroup,
} from "unocss";

const deviceSelectors = ["phone", "tablet", "laptop", "desktop"] as const;
const deviceVariants = deviceSelectors.map((selector) =>
  variantMatcher(selector, (input) => ({
    prefix: `.${selector} ${input.prefix}`,
  }))
) as unknown as Variant[];

const prefix = ["page", "editor"] as const;
const prefixVariants = prefix.map((selector) =>
  variantMatcher(selector, (input) => ({
    prefix: `.${selector} ${input.prefix}`,
  }))
) as unknown as Variant[];

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  layers: {
    default: -1,
    components: -1,
    utilities: 1,
  },
  presets: [presetUno(), presetIcons()],
  theme: { colors: {} },
  safelist: [
    "i-fa-brands:twitter",
    "i-fa-brands:instagram",
    "i-fa-brands:tiktok",
    "i-fa-brands:facebook",
    "i-fa-brands:linkedin",
    "md:hidden",
    "lt-md:hidden",
    "!w-screen",
    "!lt-xl:w-7xl",
    "!w-lg",
  ],
  variants: [...deviceVariants, ...prefixVariants],
  transformers: [
    {
      name: "@saitama/transform-device-variant",
      enforce: "pre",
      async transform(code, _, { uno, tokens, invalidate }) {
        const matches = [
          ...code.original.matchAll(/(phone|tablet):([^\s"]+)/g),
        ];
        const size = uno.config.safelist.length;
        if (!matches.length) return;

        for (const match of matches) {
          const [original, deviceVariant] = match;

          let body =
            match.length === 4 && match.groups
              ? expandVariantGroup(match[3].trim())
              : expandVariantGroup(match[2].trim());

          const start = match.index!;
          const include: string[] = [];

          let className: string;

          switch (deviceVariant) {
            case "phone":
              className = "page:lt-md:" + body;
              include.push(className);
              break;
            case "tablet":
              className = "page:md:" + body;
              include.push(className);

              break;
          }

          include.push("editor:" + original);

          let clean = new Set(uno.config.safelist);

          include.forEach((include) => clean.add(include));
          uno.config.safelist = Array.from(clean.values());
          code.overwrite(start, start + original.length, include.join(" "));

          if (uno.config.safelist.length > size) invalidate();
        }
      },
    },
  ],
});
