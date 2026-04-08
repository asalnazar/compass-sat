import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { testId } = await req.json();
    if (!testId || typeof testId !== "string") throw new Error("Invalid testId");

    // Verify the user actually paid for this test via Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });

    // Find completed checkout sessions for this user with this testId in metadata
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    });

    const validSession = sessions.data.find(
      (s) =>
        s.payment_status === "paid" &&
        s.metadata?.testId === testId &&
        s.metadata?.userId === user.id
    );

    if (!validSession) {
      throw new Error("No valid payment found for this test");
    }

    // Insert the purchase record using service role (bypasses RLS)
    const { error: insertError } = await supabaseClient
      .from("purchased_tests")
      .upsert(
        {
          user_id: user.id,
          test_id: testId,
          stripe_session_id: validSession.id,
        },
        { onConflict: "user_id,test_id" }
      );

    if (insertError) throw new Error(`Failed to record purchase: ${insertError.message}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
