"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ClipLoader } from "react-spinners";
import { useUpdateCelebrityMutation } from "@/services/auth-api";
import { editCelebritySchema } from "./schema";
import CropperDialog from "@/components/CropperDialog";
import { blobUrlToFile } from "@/lib/utils";

interface EditCelebrityDialogProps {
  celebrity: z.infer<typeof editCelebritySchema> & { id: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCelebrityDialog({ celebrity, open, onOpenChange }: EditCelebrityDialogProps) {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [cropModalOpen, setCropModalOpen] = React.useState(false);
  const [imageToCrop, setImageToCrop] = React.useState<string | null>(null);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(celebrity.profile_image || null);
  const [hasImageChanged, setHasImageChanged] = React.useState(false);

  const [updateCelebrity, { isLoading: isUpdating }] = useUpdateCelebrityMutation();

  const form = useForm<z.infer<typeof editCelebritySchema>>({
    resolver: zodResolver(editCelebritySchema),
    defaultValues: {
      name: celebrity.name || "",
      email: celebrity.email || "",
      about: celebrity.about || "",
      type: celebrity.celebrity_type || "",
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
      setHasImageChanged(true);
    }
  };

  const onSubmit = async (values: z.infer<typeof editCelebritySchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("about", values.about || "");
      formData.append("type", values.type || "");
      if (values.password) {
        formData.append("password", values.password);
      }

      if (hasImageChanged && croppedImage) {
        const file = await blobUrlToFile(croppedImage, "profile.jpg");
        formData.append("profile_image", file);
      }

      const res = await updateCelebrity({ id: celebrity.id, formData }).unwrap();
      toast.success(res.message);
      onOpenChange(false);
      form.reset();
      setCroppedImage(null);
      setHasImageChanged(false);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update celebrity");
    }
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
        }}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Celebrity</DialogTitle>
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
                      <Input type="email" placeholder="email@example.com" readOnly {...field} />
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
                    <img
                      src={croppedImage}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg"; // Fallback image if URL fails
                      }}
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 cursor-pointer rounded-full text-red-500"
                      onClick={() => {
                        setCroppedImage(null);
                        setProfileImage(null);
                        setHasImageChanged(true);
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
                        <Input type="password" placeholder="New password (optional)" {...field} />
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
                        <Input type="password" placeholder="Confirm new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                {isUpdating ? <ClipLoader color="white" size={18} /> : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}