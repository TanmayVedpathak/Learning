import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/actions/auth";

import { auth } from "@/auth";

export const metadata: Metadata = { title: "Your space | Nextspace" };

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/sign-in");
    const { user } = session;
    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <Link className="brand" href="/dashboard">
                    <span className="brand-icon">n.</span>nextspace
                </Link>
                <form action={logout}>
                    <button className="outline-button">
                        Sign out <span aria-hidden="true">↗</span>
                    </button>
                </form>
            </header>
            <section className="welcome-card">
                <span className="eyebrow">YOUR SPACE, YOUR PACE</span>
                <div className="avatar" aria-hidden="true">
                    {(user.name || user.email || "N").slice(0, 1).toUpperCase()}
                </div>
                <h1>You’re in, {user.name?.split(" ")[0] || "friend"}.</h1>
                <p>Welcome to your own little corner of Nextspace.</p>
                <div className="account-details">
                    <div>
                        <span>Account</span>
                        <strong>{user.email || "No email shared by provider"}</strong>
                    </div>
                    <div>
                        <span>Signed in with</span>
                        <strong>{session.provider === "credentials" ? "Email & password" : session.provider === "github" ? "GitHub" : session.provider === "google" ? "Google" : "Your account"}</strong>
                    </div>
                    <div>
                        <span>Session expires</span>
                        <strong>
                            {new Date(session.expires).toLocaleDateString("en", {
                                dateStyle: "medium",
                                timeZone: "UTC",
                            })}
                        </strong>
                    </div>
                </div>
                <div className="dashboard-note">
                    <span aria-hidden="true">✓</span> You’re securely signed in. This page is only available to authenticated users.
                </div>
            </section>
            <footer className="dashboard-footer">A fresh start. A space to call yours.</footer>
        </main>
    );
}
