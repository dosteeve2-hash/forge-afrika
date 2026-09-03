import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieEntry = { name: string; value: string; options?: Record<string, unknown> };

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieEntry[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const store = cookieStore as unknown as {
                set: (name: string, value: string, opts?: Record<string, unknown>) => void;
              };
              store.set(name, value, options);
            });
          } catch {
            // Appelé depuis un Server Component — ignoré
          }
        },
      },
    }
  );
}
