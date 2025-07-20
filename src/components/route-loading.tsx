"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { ClipLoader } from "react-spinners";

export default function RouteLoading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // show loader when pathname changes
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // adjust this as needed, simulating "route load"

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <ClipLoader color="black" size={35} />
    </div>
  );
}
