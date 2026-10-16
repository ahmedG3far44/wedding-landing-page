import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  defaultContent,
  loadContent,
  saveContent,
  STORAGE_KEY,
} from "../lib/storage";
import type { InvitationContent } from "../types/invitation.types";
export const InvitationContext = createContext<{
  content: InvitationContent;
  save: (v: InvitationContent) => void;
  reset: () => void;
} | null>(null);
export function InvitationProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(loadContent);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setContent(loadContent());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    document.title = `${content.site.title} | ${content.couple.groomName} و ${content.couple.brideName}`;
    document.documentElement.lang = content.site.language;
    document.documentElement.dir = content.site.direction;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.site.description);
  }, [content]);
  return (
    <InvitationContext.Provider
      value={{
        content,
        save: (v) => {
          saveContent(v);
          setContent(v);
        },
        reset: () => {
          localStorage.removeItem(STORAGE_KEY);
          setContent(defaultContent);
        },
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
