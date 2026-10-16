import { useContext } from "react";
import { InvitationContext } from "../context/InvitationContext";
export function useInvitation() {
  const value = useContext(InvitationContext);
  if (!value) throw new Error("InvitationProvider is required");
  return value;
}
