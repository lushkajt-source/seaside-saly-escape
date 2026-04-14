import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

type RequiredRole = "admin" | "employee" | false;

export function useAuth(requireAuth = false, requiredRole: RequiredRole = false) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkRoleAndRedirect = async (currentUser: User | null) => {
    if (!currentUser) {
      if (requireAuth || requiredRole) {
        navigate("/admin-login", { replace: true });
      }
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: adminData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", currentUser.id)
      .eq("role", "admin")
      .maybeSingle();
    const hasAdmin = !!adminData;
    setIsAdmin(hasAdmin);

    // Check employee role (user role = employee in our system)
    const { data: empData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", currentUser.id)
      .eq("role", "user")
      .maybeSingle();
    const hasEmployee = !!empData;
    setIsEmployee(hasEmployee);

    if (requiredRole === "admin" && !hasAdmin) {
      if (hasEmployee) {
        navigate("/employee", { replace: true });
      } else {
        navigate("/admin-login", { replace: true });
      }
    } else if (requiredRole === "employee" && !hasEmployee && !hasAdmin) {
      navigate("/admin-login", { replace: true });
    }

    setLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        await checkRoleAndRedirect(currentUser);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await checkRoleAndRedirect(currentUser);
    });

    return () => subscription.unsubscribe();
  }, [requireAuth, requiredRole, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login", { replace: true });
  };

  return { user, isAdmin, isEmployee, loading, signOut };
}
