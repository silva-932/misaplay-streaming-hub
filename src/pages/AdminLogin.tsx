import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/lib/siteData";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await adminLogin(username, password);
    setLoading(false);
    if (res.ok) {
      navigate("/admin/dashboard");
    } else {
      setError(res.error || "Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card-cinema p-8 max-w-md w-full">
        <img src="/images/logo.png" alt="MISAPLAY-TV" className="h-12 mx-auto mb-6" />
        <h2 className="text-xl font-bold text-foreground text-center mb-6">Painel Administrativo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-muted text-foreground border border-border focus:border-primary outline-none"
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-muted text-foreground border border-border focus:border-primary outline-none"
            autoComplete="current-password"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="gradient-btn w-full py-3 rounded-lg disabled:opacity-50">
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
