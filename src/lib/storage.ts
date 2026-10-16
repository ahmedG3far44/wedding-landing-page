import defaults from "../data/content.json";
import {
  invitationSchema,
  type InvitationContent,
} from "../types/invitation.types";
export const STORAGE_KEY = "wedding_invitation_content";
export const defaultContent = invitationSchema.parse(defaults);
export function loadContent(): InvitationContent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? invitationSchema.parse(JSON.parse(value)) : defaultContent;
  } catch {
    return defaultContent;
  }
}
export function saveContent(content: InvitationContent) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(invitationSchema.parse(content)),
  );
}
