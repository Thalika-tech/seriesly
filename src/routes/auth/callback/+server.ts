import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const sessionData = await supabase.auth.getSession();

  if (sessionData.data.session) {
    const userId = sessionData.data.session.user.id;
    const userName = sessionData.data.session.user.user_metadata.username;

    const { data: existingUser, error: selectError } = await supabase.from("user_names").select("username").eq("user_id", userId).single();

    if (selectError && selectError.code !== "PGRST116") {
      return new Response("Failed to check for existing user", { status: 500 });
    }

    if (!existingUser) {
      const { error: insertError } = await supabase.from("user_names").insert([{ user_id: userId, username: userName }]);

      if (insertError) {
        return new Response("Failed to insert user username", { status: 500 });
      }
    }

    throw redirect(303, "/private/myshows");
  }

  return new Response("Session data not found", { status: 400 });
};
