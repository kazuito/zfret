import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "./query-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="system">
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
};

export default Providers;
