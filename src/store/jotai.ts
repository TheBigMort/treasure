import { atom } from "jotai";

export const snackbarAtom = atom({
  isOpen: false,
  message: "",
  severity: "success",
});

export const navDrawerAtom = atom(false);
