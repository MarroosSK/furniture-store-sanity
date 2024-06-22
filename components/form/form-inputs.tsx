"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

import { FormErrors } from "./form-errors";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { formSchema } from "@/utils/form-schema";
import { FormSuccess } from "./form-success";
import { sendReview } from "@/actions/send-review";

const FormInputs = ({ productId }: { productId: string }) => {
  const { toast } = useToast();
  //for pending when sending data
  const [isPending, startTransition] = useTransition();
  //states for error/success messages from server
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: productId,
      user: "",
      reviewText: "",
      userRating: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //reset error/success messages at start of every submit
    setError("");
    setSuccess("");

    startTransition(() => {
      sendReview(values).then((data) => {
        setError(data?.error);
        setSuccess("You may close form!");
      });
    });
    toast({
      variant: "default",
      title: "Review added",
      description: new Date().toString(),
    });
  };

  return (
    <FormWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Johnny"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="from 1 - 5"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Share your thoughts."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* error/ success */}
          <FormErrors message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full flex gap-2 bg-slate-500 hover:bg-slate-800"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default FormInputs;
