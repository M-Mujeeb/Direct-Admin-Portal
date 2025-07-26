"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { z } from "zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";
import CropperDialog from "@/components/CropperDialog";

const celebritySchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    about: z.string().optional(),
    type: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function DataTable({ data: initialData }: { data: z.infer<typeof sectionSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const [open, setOpen] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [cropModalOpen, setCropModalOpen] = React.useState(false);
  const [imageToCrop, setImageToCrop] = React.useState<string | null>(null);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof celebritySchema>>({
    resolver: zodResolver(celebritySchema),
    defaultValues: {
      name: "",
      email: "",
      about: "",
      type: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageToCrop(imageUrl);
      setCropModalOpen(true);
    }
  };

  const onSubmit = (values: z.infer<typeof celebritySchema>) => {
    const payload = {
      ...values,
      profileImage: croppedImage,
    };
    console.log("Payload to submit:", payload);
  };

  return (
    <>
      <CropperDialog
        imageSrc={imageToCrop!}
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={(cropped) => {
          setProfileImage(null);
          setCroppedImage(cropped);
          setProfileImage(cropped);
        }}
      />
      <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-end gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Add Celebrity</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Celebrity</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Celebrity Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Label className="mb-2">Profile Image</Label>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                    {croppedImage && (
                      <div className="relative mt-2 inline-block">
                        <img src={croppedImage} alt="Cropped" className="h-20 w-20 rounded-full object-cover" />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 rounded-full text-red-500 cursor-pointer"
                          onClick={() => {
                            setCroppedImage(null);
                            setProfileImage(null);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief about the celebrity" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Actor, Singer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
          </div>
          <DataTablePagination table={table} />
        </TabsContent>
      </Tabs>
    </>
  );
}
