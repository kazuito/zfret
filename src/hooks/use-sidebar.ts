import { atom, useAtom } from "jotai";

const sidebarAtom = atom(false);

export const useSidebar = () => {
  const [open, setOpen] = useAtom(sidebarAtom);

  const toggle = () => setOpen((prev) => !prev);

  return {
    open,
    setOpen,
    toggle,
  };
};
