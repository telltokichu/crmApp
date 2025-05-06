import { supabase } from "@/lib/supabaseClient";

export async function getAllPolicies() {
    const { data, error } = await supabase.from("policies").select("*");
    if (error) {
        console.error("Failed to fetch policies:", error.message);
        return [];
    }

    return data;
}
