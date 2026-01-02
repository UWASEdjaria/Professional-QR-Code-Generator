"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

export function NavLink({ className = "text-blue-600 hover:text-blue-800 px-3 py-2 rounded transition-colors", activeClassName = "font-bold bg-blue-100", href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const classes = [className, isActive && activeClassName].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
