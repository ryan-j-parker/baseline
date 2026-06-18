import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/useAuthStore";

type Profile = {
  email: string | null;
  village_id: string | null;
  base: string | null;
  arrival_date: string | null;
  family_size: number | null;
};

const BASES = [
  "Camp Foster",
  "Kadena Air Base",
  "Camp Kinser",
  "Camp Courtney",
  "Camp Hansen",
  "Camp Schwab",
  "Torii Station",
  "Other",
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile>({
    email: user?.email ?? null,
    village_id: null,
    base: null,
    arrival_date: null,
    family_size: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);

    await supabase
      .from("profiles")
      .update({
        base: profile.base,
        arrival_date: profile.arrival_date,
        family_size: profile.family_size,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-4xl mb-4">👤</p>
        <p className="text-gray-600 mb-6">Sign in to view your profile</p>
        <button
          onClick={() => navigate("/sign-in")}
          className="px-6 py-3 rounded-2xl text-white font-medium"
          style={{ backgroundColor: "var(--color-brand)" }}
        >
          Sign In
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-gray-400 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button onClick={() => navigate("/settings")} className="text-blue-200 text-sm mb-2 active:opacity-70">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-blue-200 text-sm mt-1">{user.email}</p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 pb-12">

        {/* Base */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">Your Base</p>
          <div className="flex flex-col gap-2">
            {BASES.map((base) => (
              <button
                key={base}
                onClick={() => setProfile((p) => ({ ...p, base }))}
                className={`
                  w-full text-left px-5 py-3 rounded-2xl border transition-colors text-sm
                  ${profile.base === base
                    ? "border-transparent text-white"
                    : "bg-white border-gray-200 text-gray-800"
                  }
                `}
                style={profile.base === base ? { backgroundColor: "var(--color-brand)" } : {}}
              >
                <div className="flex items-center justify-between">
                  <span>{base}</span>
                  {profile.base === base && <span className="text-white">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Arrival date */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">Arrival Date</p>
          <input
            type="date"
            value={profile.arrival_date ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, arrival_date: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none"
          />
        </div>

        {/* Family size */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">Family Size</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setProfile((p) => ({ ...p, family_size: n }))}
                className={`
                  flex-1 py-3 rounded-xl text-sm font-medium border transition-colors
                  ${profile.family_size === n
                    ? "text-white border-transparent"
                    : "bg-white border-gray-200 text-gray-800"
                  }
                `}
                style={profile.family_size === n ? { backgroundColor: "var(--color-brand)" } : {}}
              >
                {n}{n === 6 ? "+" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 rounded-2xl text-white font-semibold active:scale-95 transition-transform disabled:opacity-50 mt-2"
          style={{ backgroundColor: "var(--color-brand)" }}
        >
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save Profile"}
        </button>

      </div>
    </div>
  );
}