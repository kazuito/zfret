import { ClientOnly } from "../../components/client-only";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <ClientOnly>{children}</ClientOnly>;
};

export default Layout;
