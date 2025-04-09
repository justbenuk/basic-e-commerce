"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
};

export default function ProductImages({ images }: Props) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product Image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-center object-cover"
      />
      <div className="flex">
        {images.map((image, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === idx && "border-orange-500"
            )}
          >
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
