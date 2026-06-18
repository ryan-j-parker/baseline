import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Step = "enter-email" | "check-email";

export default function SignInScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("enter-email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendLink() {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: "https://onisland.io/auth/callback",
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setStep("check-email");
  }

  if (step === "check-email") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-5xl mb-6">📬</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h1>
        <p className="text-gray-500 text-sm mb-2">
          We sent a sign-in link to:
        </p>
        <p className="font-semibold text-gray-800 mb-6">{email}</p>
        <p className="text-gray-400 text-xs mb-8">
          Tap the link in the email to sign in. You can close this tab.
        </p>
        <button
          onClick={() => setStep("enter-email")}
          className="text-sm text-blue-500 active:opacity-70"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-200 text-sm mb-2 active:opacity-70"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
        <p className="text-blue-200 text-sm mt-1">No password needed</p>
      </div>

      <div className="px-6 py-8 flex flex-col gap-6">

        {/* Explainer */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-semibold text-gray-800 mb-1">How it works</p>
          <p className="text-gray-500 text-sm">
            Enter your email and we'll send you a sign-in link. No password to remember.
          </p>
        </div>

        {/* Email input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 uppercase tracking-wide px-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendLink()}
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "var(--color-brand)" } as React.CSSProperties}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSendLink}
          disabled={loading || !email.trim()}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base active:scale-95 transition-transform disabled:opacity-50"
          style={{ backgroundColor: "var(--color-brand)" }}
        >
          {loading ? "Sending..." : "Send Sign-In Link"}
        </button>

        <p className="text-center text-gray-400 text-xs">
          A sign-in link will be sent to your email. It expires in 1 hour.
        </p>
      </div>
    </div>
  );
}