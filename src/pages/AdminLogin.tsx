import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Authentication failed");
      setLoading(false);
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      toast.error("Access denied. Admin privileges required.");
      setLoading(false);
      return;
    }

    toast.success("Welcome back, Admin!");
    navigate("/admin-dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, hsl(30 10% 12%), hsl(30 10% 18%))" }}>
      <Card className="w-full max-w-md border-none shadow-2xl" style={{ background: "hsl(30 10% 15%)", color: "hsl(40 30% 90%)" }}>
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(38 55% 55%), hsl(38 45% 40%))" }}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(38 55% 55%)" }}>
            Admin Portal
          </CardTitle>
          <p className="text-sm" style={{ color: "hsl(30 10% 55%)" }}>Hotel Saly — Management System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: "hsl(38 55% 55%)" }}>Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hotelsaly.com"
                className="border-none"
                style={{ background: "hsl(30 10% 20%)", color: "hsl(40 30% 90%)" }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: "hsl(38 55% 55%)" }}>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-none"
                style={{ background: "hsl(30 10% 20%)", color: "hsl(40 30% 90%)" }}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white border-none"
              style={{ background: "linear-gradient(135deg, hsl(38 55% 55%), hsl(38 45% 40%))" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
