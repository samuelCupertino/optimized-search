import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(dark);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? dark : light);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setTheme(e.matches ? dark : light));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
