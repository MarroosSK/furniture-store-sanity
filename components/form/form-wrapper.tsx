"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-bold text-primary")}>New Review</h1>
          <p className="text-primary text-lg">reviewing product</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
