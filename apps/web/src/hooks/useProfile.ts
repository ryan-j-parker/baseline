import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/useAuthStore";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";

export function useProfile() {
  const { user } = useAuthStore();
  const { villageId, setVillageId } = useUserPrefsStore();

  // When user signs in, fetch their profile and sync village
  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("village_id")
        .eq("id", user!.id)
        .single();

      if (error) return;

      // If they have a saved village, use it
      if (data?.village_id) {
        setVillageId(data.village_id as any);
      }
    }

    fetchProfile();
  }, [user]);

  // When village changes, save to profile if signed in
  useEffect(() => {
    if (!user || !villageId) return;

    async function saveVillage() {
      await supabase
        .from("profiles")
        .update({ village_id: villageId, updated_at: new Date().toISOString() })
        .eq("id", user!.id);
    }

    saveVillage();
  }, [villageId, user]);
}