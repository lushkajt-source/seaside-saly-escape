import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth(requireAdmin = false) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser && requireAdmin) {
          const { data } = await supabase
            .from("user_roles" as any)
            .select("role")
            .eq("user_id", currentUser.id)
            .eq("role", "admin")
            .maybeSingle();
          const hasAdmin = !!data;
          setIsAdmin(hasAdmin);
          if (!hasAdmin) {
            navigate("/admin-login", { replace: true });
          }
        } else if (!currentUser && requireAdmin) {
          navigate("/admin-login", { replace: true });
        }

        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser && requireAdmin) {
        const { data } = await supabase
          .from("user_roles" as any)
          .select("role")
          .eq("user_id", currentUser.id)
          .eq("role", "admin")
          .maybeSingle();
        const hasAdmin = !!data;
        setIsAdmin(hasAdmin);
        if (!hasAdmin) {
          navigate("/admin-login", { replace: true });
        }
      } else if (!currentUser && requireAdmin) {
        navigate("/admin-login", { replace: true });
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [requireAdmin, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login", { replace: true });
  };

  return { user, isAdmin, loading, signOut };
}
