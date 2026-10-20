import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigin = "https://smadhihahamed.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Vary": "Origin",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.headers.get("origin") && req.headers.get("origin") !== allowedOrigin) {
    return json({ error: "Origin not allowed" }, 403);
  }
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authorization = req.headers.get("Authorization");

  if (!supabaseUrl || !anonKey || !authorization?.startsWith("Bearer ")) {
    return json({ error: "Sign in to Money Tracker before checking bank-connection status." }, 401);
  }

  const token = authorization.slice("Bearer ".length);
  const supabase = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return json({ error: "Your session is invalid or expired. Sign in again." }, 401);
  }

  // Intentionally status-only. UOB has not approved/configured production access here.
  // Do not add guessed API endpoints or accept bank credentials from the browser.
  return json({
    provider: "UOB Singapore",
    status: "not_configured",
    connected: false,
    requestedData: ["account_balances", "transaction_history"],
    reason: "UOB production access and approved authentication details have not been configured.",
    nextSteps: [
      "Confirm eligibility and obtain UOB approval for the intended use case.",
      "Use the official UOB developer portal sandbox and documentation.",
      "After approval, store provider secrets only as server-side Edge Function secrets.",
      "Implement the exact documented OAuth and account API flow, with user consent and token protection."
    ],
  });
});
