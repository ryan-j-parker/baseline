import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthCallbackScreen() {
  const navigate = useNavigate();
  const { setUser, setSession } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        navigate("/", { replace: true });
      } else {
        navigate("/sign-in", { replace: true });
      }
    });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <p className="text-4xl mb-4">⏳</p>
      <p className="text-gray-500 text-sm">Signing you in...</p>
    </div>
  );
}