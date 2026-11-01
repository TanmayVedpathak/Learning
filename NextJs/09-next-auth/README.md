# Nextspace authentication

A TypeScript / Next.js App Router example with Auth.js v5 (`next-auth@beta`): email/password registration, Google and GitHub OAuth, JWT sessions, and a protected dashboard.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`, then fill in the values. You can keep an existing `MONGO_URL` in `.env`; `.env.local` takes precedence. Never commit secrets.
3. Generate `AUTH_SECRET`: run `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"` and paste the result into `.env.local`. Keep it stable across restarts and instances.
4. Start `npm run dev`, then open http://localhost:3000.

If `.env.local` already contains an AUTH_SECRET, preserve that value instead of overwriting it with the empty example.

MongoDB may be local or Atlas. For Atlas, allow the app server's IP and grant its database user read/write permissions. The app defaults to the `next_auth` database (set `MONGO_DB_NAME` to change it). On the first credentials request it creates a unique email index and a TTL index for attempt counters. Existing `users` documents must use this app's schema; use a separate database if another app already uses that collection.

## Google login

In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), configure the OAuth consent screen and create an OAuth client of type **Web application**:

- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Add your account to test users if the consent screen is in testing mode.
- Put the client ID in `AUTH_GOOGLE_ID` and client secret in `AUTH_GOOGLE_SECRET`.

## GitHub login

Create an OAuth App under [GitHub developer settings](https://github.com/settings/developers):

- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
- Put the client ID in `AUTH_GITHUB_ID` and client secret in `AUTH_GITHUB_SECRET`.

Restart the development server after changing provider credentials. Only configured providers appear on the authentication pages. Replace localhost with the production origin for deployment and configure production OAuth applications/callbacks accordingly. See the official [Auth.js installation](https://authjs.dev/getting-started/installation) and provider documentation for [Google](https://authjs.dev/getting-started/providers/google) and [GitHub](https://authjs.dev/getting-started/providers/github).

## How it works

- `/` redirects to `/sign-in` or `/dashboard` based on the server session.
- `/sign-up` validates name, email, password, and confirmation on the server using Zod. A live checklist shows the password requirements: 8 characters, a letter, a number, and at most 72 UTF-8 bytes. Both sign-up and sign-in enforce the byte limit on the server. Emails are normalized; a database unique index prevents duplicate registrations. Passwords are hashed with bcrypt (12 rounds). Successful registration redirects to sign-in.
- `/sign-in` authenticates email/password through the Credentials provider or redirects to Google/GitHub through Auth.js.
- `auth.ts` configures encrypted JWT sessions in Auth.js-managed HttpOnly cookies with a 7-day lifetime. No tokens or passwords are saved in localStorage.
- `/dashboard` checks `auth()` on the server before rendering account details. Apply the same authentication/authorization checks to every future protected action, route handler, and data query.
- Sign-out clears the Auth.js session and redirects to sign-in.
- MongoDB stores credentials users and shared attempt counters: 10 login attempts and 5 signup attempts per normalized email per 15-minute bucket. Unknown emails still trigger a password comparison.

OAuth identities live in JWT sessions; they are not persisted to MongoDB in this example. Email/password accounts and OAuth identities are separate, and matching emails are not automatically linked. Add an Auth.js database adapter and an explicit account-linking flow if your application needs persistent OAuth users.

## Before a public launch

This is an intermediate learning starter. Add email ownership verification and password reset with expiring, single-use tokens; apply infrastructure-level IP/global rate limits (the email limits do not stop attempts spread across different emails); and configure monitoring and recovery flows. JWT sessions remain valid until expiry or sign-out, so account-wide session revocation needs additional server-side state. Never place private credentials in `NEXT_PUBLIC_` variables.

## Checks

- `npm run lint`
- `npx tsc --noEmit` (run `npx next typegen` first on a fresh checkout)
- `npm run build`

Manual flow: register -> sign in -> view dashboard -> sign out -> confirm `/dashboard` redirects. Check invalid passwords, duplicate email, mismatched confirmation, provider cancellation, and Google/GitHub callback flows after configuring real OAuth credentials.

If Windows reports file locks (EPERM/ENOTEMPTY) for the generated .next folder, stop the development server and other processes holding it open, remove that generated cache, then rerun the command. 
