import { Archive, FileCheck, Database, HelpCircle, LogOut, Home, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 5, archives: 2, supportes: 3 });

  const menuItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: FileCheck, label: "Documents supportés", path: "/supported" },
    { icon: Archive, label: "Documents archivés", path: "/archived" },
    { icon: Database, label: "Base de données", path: "/database" },
  ];

  const secondaryItems = [
    { icon: HelpCircle, label: "Aide", path: "/aide" },
    { icon: Settings, label: "Paramètres", path: "/settings" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 flex flex-col">
      {/* Header avec logo */}
      <div className="p-6 space-y-1 bg-gradient-to-b from-primary/5 to-transparent border-b border-border/30">
        <h1 className="text-2xl font-bold text-foreground">Formulama</h1>
        <p className="text-xs text-muted-foreground font-medium">Gestion de documents</p>
      </div>

      {/* Statistiques - Compact et propre */}
      <div className="px-4 py-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Statistiques</p>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 rounded-md bg-primary/5 border border-primary/10 hover:border-primary/20 transition-colors">
            <p className="text-xs text-muted-foreground font-medium">Documents</p>
            <p className="text-xl font-bold text-primary mt-1">{stats.total}</p>
          </div>
          <div className="p-3 rounded-md bg-green-500/5 border border-green-500/10 hover:border-green-500/20 transition-colors">
            <p className="text-xs text-muted-foreground font-medium">Signés</p>
            <p className="text-xl font-bold text-green-600 mt-1">{stats.supportes}</p>
          </div>
          <div className="p-3 rounded-md bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/20 transition-colors">
            <p className="text-xs text-muted-foreground font-medium">Archivés</p>
            <p className="text-xl font-bold text-orange-600 mt-1">{stats.archives}</p>
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="px-4">
        <div className="h-px bg-border/30"></div>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 mb-2">Navigation</p>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground transition-all duration-150 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
          >
            <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sections secondaires */}
      <div className="px-3 py-3 space-y-1 border-t border-border/30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 mb-2">Compte</p>
        {secondaryItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground transition-all duration-150 hover:bg-primary/10 hover:text-primary"
          >
            <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Déconnexion */}
      <div className="p-3 border-t border-border/30">
        <Button
          onClick={() => navigate("/")}
          className="w-full justify-start gap-2 text-sm h-10 text-destructive hover:bg-destructive/10 hover:text-destructive"
          variant="ghost"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
