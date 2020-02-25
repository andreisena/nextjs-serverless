import React from "react";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
