"use client";

import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/cropImageHelper"; 

interface Props {
  imageSrc: string;
  open: boolean;
  onClose: () => void;
  onCropComplete: (croppedImage: string) => void;
}

export default function CropperDialog({ imageSrc, open, onClose, onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCropComplete = async () => {
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(cropped);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <div className="relative w-full h-[400px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCropComplete}>Crop</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
