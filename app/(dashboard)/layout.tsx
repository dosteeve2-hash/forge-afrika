"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, ArrowLeft } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/performance", label: "Performance", icon: TrendingUp },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen" style={{ background: "#0A1628" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 shrink-0 sticky top-0 h-screen"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        {/* Logo */}
        <div
          className="p-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
              color: "#0A1628",
            }}
          >
            F
          </div>
          <div>
            <div className="font-bold text-white text-sm">FORGE Afrika</div>
            <div className="text-xs" style={{ color: "#00BCD4" }}>
              Centre de commande
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 py-2">
            Navigation
          </p>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={
                  active
                    ? {
                        background: "rgba(212,175,55,0.12)",
                        color: "#D4AF37",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }
                    : {
                        color: "#9CA3AF",
                        border: "1px solid transparent",
                      }
                }
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: active ? "#D4AF37" : "#6B7280" }}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
