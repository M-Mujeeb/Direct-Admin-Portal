"use client"
import { useEffect } from "react";
import { DataTable } from "./_components/data-table";
import { useGetAllCelebritiesQuery } from "@/services/auth-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";


export default function Page() {
  useEffect(() => {
    const el = document.getElementById("page-title-slot");
    if (el) el.textContent = "Celebrities";
  }, []);

  const { data, isLoading, isError, refetch } = useGetAllCelebritiesQuery();

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
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Failed to load Celebrities</AlertTitle>
          <AlertDescription>
            Please check your connection or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const formattedData = data.data.users.map((celeb) => ({
    id: celeb._id,
    name: celeb.name,
    email: celeb.email,
    status: celeb.is_verified || false,
    celebrity_type: celeb.celebrity_type ?? "",
    profile_image: celeb.profile_image ?? "",
    about: celeb.about ?? "",
  }));

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={formattedData} refetch={refetch} />
    </div>
  );
}
