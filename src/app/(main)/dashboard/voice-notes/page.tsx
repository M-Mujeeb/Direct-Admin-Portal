import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
       <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="pending">
        <TabsList >
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <DataTable data={data} tab="pending" />
        </TabsContent>
         <TabsContent value="approved">
          <DataTable data={data} tab="approved" />
        </TabsContent>
        <TabsContent value="rejected">
          <DataTable data={data} tab="rejected" />
        </TabsContent>
      </Tabs>
    </div>
      
    </div>
  );
}
