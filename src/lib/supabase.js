import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvmfpvvnqhpulphhvtxe.supabase.co";

const supabasePublishableKey =
  "sb_publishable_dLomoCDya9Cc45nqKaaSMA_iOaViO81";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);