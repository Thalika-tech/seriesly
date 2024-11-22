import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

interface Show {
  created_at: string;
  id: number;
  show_id: string;
  image: string;
  name: string;
  user_id: string;
}

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);
  userShows = $state<Show[]>([]);

  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
    this.fetchUserData();
  }

  async fetchUserData() {
    if (!this.user || !this.supabase) {
      return;
    }

    const { data, error } = await this.supabase.from("liked_shows").select("*").eq("user_id", this.user.id);

    if (error) {
      console.log("Error fetching all shows for user");
      console.log(error);
      return;
    }

    this.userShows = data;
  }

  // Add shows for user
  async addShows(show: any) {
    if (!this.user || !this.supabase) {
      return;
    }

    const { error } = await this.supabase
      .from("liked_shows")
      .insert({ show_id: show.id, name: show.name, image: show.image.medium, user_id: this.user.id });

    if (error) {
      console.log("Error adding show for user");
      console.log(error);
      return;
    }

    this.fetchUserData();
  }

  // remove show for user
  async removeShow(show: any) {
    if (!this.user || !this.supabase) {
      return;
    }

    let selectedShow = show;

    if (show.show_id === undefined) {
      selectedShow = this.userShows.find((userShow) => userShow.show_id == show.id.toString());
    }

    const { error } = await this.supabase.from("liked_shows").delete().eq("id", selectedShow.id).eq("user_id", this.user.id);

    if (error) {
      console.log("Error removing show");
      console.log(error);
      return;
    }

    this.fetchUserData();
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
