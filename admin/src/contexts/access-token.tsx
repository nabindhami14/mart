import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  user: { id: string; role: string };
  setToken: (data: string) => void;
  setUser: (id: string, role: string) => void;
  removeUser: () => void;
}

export const useToken = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        user: { id: "", role: "" },
        setToken: (data: string) => set(() => ({ token: data })),
        setUser: (id: string, role: string) =>
          set(() => ({ user: { id, role } })),
        removeUser: () => set(() => ({ user: { id: "", role: "" } })),
      }),
      { name: "token-store" }
    )
  )
);
