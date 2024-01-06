"use client";

// this component is for making material ui right to left(farsi)
// i copy this
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export function MaterialRTLProvider(props: any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
