import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);

  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
  }

  async logout() {
    await this.supabase?.auth.signOut();
    goto("/login");
  }
}

// Creating Context API to share the session accross all files (global state)
const USER_STATE_KEY = Symbol("USER_STATE");

// Set context funtion
export function setUserState(data: UserStateProps) {
  return setContext(USER_STATE_KEY, new UserState(data));
}

// Get context funtion
export function getUserState() {
  return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}