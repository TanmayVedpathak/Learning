import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { SocialButtons } from "@/components/social-buttons";

import { configuredProviders } from "@/lib/auth-config";

import { auth } from "@/auth";

export async function AuthPage({ mode, error, registered }: {
  mode: "sign-in" | "sign-up";
  error?: string;
  registered?: boolean;
}) {
  if ((await auth())?.user) redirect("/dashboard");
  const isSignup = mode === "sign-up";
  const providers = configuredProviders();
  const errors: Record<string, string> = {
    Configuration:
      "This sign-in method is not configured yet. Check your authentication environment variables.",
    OAuthAccountNotLinked:
      "Use the sign-in method you originally used for this account.",
    AccessDenied: "Sign-in was denied. Please try another method.",
  };
  return (
    <main className="auth-shell">
      <aside className="brand-panel">
        <Link className="brand" href="/">
          <span className="brand-icon" aria-hidden="true">
            n.
          </span>
          nextspace<span className="brand-dot">●</span>
        </Link>
        <div className="brand-story">
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h1>
            A little space.
            <br />A lot of
            <br />
            <span>possibility.</span>
          </h1>
          <p>
            One account to make yourself at home.
            <br />
            Bring your ideas. We’ll save you a seat.
          </p>
          <div className="orbit-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core">n.</div>
            <span className="orbit-spark spark-one">✦</span>
            <span className="orbit-spark spark-two">✦</span>
            <div className="orbit-tag">A fresh start, together.</div>
          </div>
        </div>
        <div className="brand-footer">
          <span>A place for what comes next.</span>
          <span>© {new Date().getFullYear()} Nextspace</span>
        </div>
      </aside>
      <section className="form-panel" aria-labelledby="form-title">
        <div className="top-link">
          {isSignup ? "Already a member?" : "Don’t have an account?"}{" "}
          <Link href={isSignup ? "/sign-in" : "/sign-up"}>
            {isSignup ? "Sign in" : "Sign up"} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="auth-card">
          <span className="form-kicker">
            {isSignup ? "LET’S GET STARTED" : "GOOD TO SEE YOU AGAIN"}
          </span>
          <h2 id="form-title">
            {isSignup ? "Make yourself at home." : "Welcome back."}
          </h2>
          <p className="form-description">
            {isSignup
              ? "Create your account and start your next chapter."
              : "Sign in to pick up where you left off."}
          </p>
          {registered && (
            <p className="notice success" role="status">
              Your account is ready. Sign in to continue.
            </p>
          )}
          {error && (
            <p className="notice error" role="alert">
              {errors[error] ||
                "We couldn’t complete sign-in. Please try again."}
            </p>
          )}
          <SocialButtons providers={providers} />
          {(providers.google || providers.github) && (
            <div className="divider">
              <span>or continue with email</span>
            </div>
          )}
          <AuthForm mode={mode} />
          <p className="session-note">
            <span aria-hidden="true">◇</span> Your session is protected and
            stays private.
          </p>
        </div>
        <footer className="form-footer">Built for your next beginning.</footer>
      </section>
    </main>
  );
}
