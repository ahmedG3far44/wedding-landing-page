import posthogClient from "posthog-js";

const projectToken = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

if ((!projectToken || !host) && import.meta.env.DEV) {
  const missingVariable = !projectToken
    ? "VITE_POSTHOG_KEY"
    : "VITE_POSTHOG_HOST";

  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

export const posthog = projectToken && host ? posthogClient : undefined;

if (projectToken && host) {
  posthogClient.init(projectToken, { api_host: host });
}
