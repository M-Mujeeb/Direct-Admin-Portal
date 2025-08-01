"use client";

import { useGetAllCustomersQuery } from "@/services/auth-api";
import { DataTable } from "./_components/data-table";
import { FanUser } from "@/types/api.types";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Page() {
  const { data, isLoading, isError } = useGetAllCustomersQuery();

  useEffect(() => {
    const el = document.getElementById("page-title-slot");
    if (el) el.textContent = "Customers";
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Failed to load customers</AlertTitle>
          <AlertDescription>
            Please check your connection or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const tableData = data.data.users.map((user: FanUser) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role_id?.name,
    is_verified: user.is_verified,
    createdAt: user.createdAt,
    profile_image: user.profile_image || null,
  }));

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={tableData} />
    </div>
  );
}
