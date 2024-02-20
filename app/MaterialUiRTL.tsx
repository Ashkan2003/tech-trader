"use client";

// this component is for making material ui right to left(farsi)
// i copy this
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = {
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
};

export function MaterialRTLProvider(props: any) {
  return (
    // <CacheProvider value={cacheRtl}>
    // to fix the css-preload issue mui doc recommanded to use this provider
    <AppRouterCacheProvider options={cacheRtl}>
      {props.children}
    </AppRouterCacheProvider>
    // </CacheProvider>
  );
}
