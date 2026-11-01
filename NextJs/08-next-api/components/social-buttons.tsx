"use client";

import { useFormStatus } from "react-dom";

import { socialLogin } from "@/app/actions/auth";

function ProviderButton({ provider, configured }: { provider: "google" | "github"; configured: boolean }) {
  const { pending } = useFormStatus();
  const label = provider === "google" ? "Google" : "GitHub";

  return (
    <button className="social-button" name="provider" value={provider} disabled={!configured || pending} title={configured ? `Continue with ${label}` : `${label} login requires OAuth configuration`}>
      {provider === "google" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.89-1.74 2.98-4.3 2.98-7.36Z" />
          <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.06.96-3.38.96-2.6 0-4.8-1.75-5.59-4.1H3.06v2.59A10 10 0 0 0 12 22Z" />
          <path fill="#FBBC05" d="M6.41 13.94a6 6 0 0 1 0-3.88V7.47H3.06a10 10 0 0 0 0 9.06l3.35-2.59Z" />
          <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.47l3.35 2.59A5.99 5.99 0 0 1 12 5.96Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .8a11.3 11.3 0 0 0-3.57 22c.57.1.78-.25.78-.55v-2.1c-3.16.69-3.83-1.34-3.83-1.34-.51-1.3-1.25-1.64-1.25-1.64-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.1-1.16 3.1-1.16.62 1.56.23 2.71.12 3a4.38 4.38 0 0 1 1.16 3.04c0 4.35-2.65 5.31-5.18 5.6.4.35.77 1.04.77 2.1v3.07c0 .3.2.66.78.55A11.3 11.3 0 0 0 12 .8Z" />
        </svg>
      )}
      {pending ? "Connecting…" : label}
    </button>
  );
}

export function SocialButtons({ providers, }: { providers: { google: boolean; github: boolean } }) {
  if (!providers.google && !providers.github) return null;

  return (
    <div className="social-options">
      {providers.google && (
        <form action={socialLogin}>
          <ProviderButton provider="google" configured={providers.google} />
        </form>
      )}
      {providers.github && (
        <form action={socialLogin}>
          <ProviderButton provider="github" configured={providers.github} />
        </form>
      )}
    </div>
  );
}
