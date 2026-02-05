import { Archive, FileCheck, HelpCircle, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getBaseUrl } from "@/lib/urlHelper";

interface Stats {
  total: number;
  signes: number;
  non_signes: number;
  archives: number;
  supportes: number;
}

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ 
    total: 0, 
    signes: 0, 
    non_signes: 0,
    archives: 0, 
    supportes: 0 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    // Rafraîchir les statistiques toutes les 5 secondes
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: FileCheck, label: "Documents supportés", path: "/dashboard?view=Documents supportés" },
    { icon: Archive, label: "Documents archivés", path: "/dashboard?view=Documents archivés" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card flex flex-col border-r border-border">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Formulama</h1>
        <p className="text-xs text-muted-foreground mt-1">Gestion de documents</p>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">Navigation</p>
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
            >
              <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Statistiques - Redesignées */}
      <div className="px-4 py-5 border-b border-border space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/15">
          <span className="text-xs font-semibold text-muted-foreground">Documents</span>
          <span className="text-2xl font-bold text-primary">{stats.total}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/15">
          <span className="text-xs font-semibold text-muted-foreground">Signés</span>
          <span className="text-2xl font-bold text-green-600">{stats.signes}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/15">
          <span className="text-xs font-semibold text-muted-foreground">Non Signés</span>
          <span className="text-2xl font-bold text-red-600">{stats.non_signes}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/15">
          <span className="text-xs font-semibold text-muted-foreground">Archivés</span>
          <span className="text-2xl font-bold text-orange-600">{stats.archives}</span>
        </div>
      </div>

      {/* Compte - En bas */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">Compte</p>
        <div className="space-y-1">
          <button
            onClick={() => navigate("/aide")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary"
          >
            <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium">Aide</span>
          </button>
          <button
            onClick={() => window.location.href = getBaseUrl()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
