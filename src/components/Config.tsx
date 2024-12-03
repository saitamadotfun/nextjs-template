"use client";
import { block } from "saitamadotfun/bunshi";
import { toCustomPropertiesString } from "object-to-css-variables";

export const Config = block(
  function Config({ theme }) {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `:root { ${toCustomPropertiesString(theme)} }`,
        }}
      />
    );
  },
  {
    title: "Config",
    argsType: {
      theme: {
        control: "map",
        keys: {},
      },
    },
    args: {
      theme: {},
    },
  }
);
