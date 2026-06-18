import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export type SponsoredListing = {
  id: string;
  category: string;
  title: string;
  description: string;
  phone: string | null;
  website: string | null;
  map_url: string | null;
  english_friendly: boolean;
  location_id: string;
};

async function fetchListings(category: string): Promise<SponsoredListing[]> {
  const { data, error } = await supabase
    .from("sponsored_listings")
    .select("*")
    .eq("category", category)
    .eq("active", true)
    .eq("location_id", "okinawa");

  if (error) return [];
  return data ?? [];
}

export function useSponsoredListings(category: string) {
  return useQuery({
    queryKey: ["sponsored_listings", category],
    queryFn: () => fetchListings(category),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}