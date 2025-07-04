"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, 
  // FormProvider, 
  useFormContext, 
  // useForm, 
  // useFormState, 
  // useWatch 
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = ({ ...props }) => {
  // const methods = useForm(); // This line is problematic if Form is not a provider
  return (
    // <FormProvider {...methods}> // This line is problematic if Form is not a provider
      <form {...props} />
    // </FormProvider>
  );
};

const FormField = ({ ...props }) => {
  return (
    <Controller
      {...props}
      render={({ field, fieldState, formState }) =>
        props.render({ field, fieldState, formState })
      }
    />
  );
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormContext(); // This line is problematic if Form is not a provider

  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
      // id={formItemId} // This line is problematic if Form is not a provider
      // aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`} // This line is problematic if Form is not a provider
      // aria-invalid={!!error} // This line is problematic if Form is not a provider
    />
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormContext(); // This line is problematic if Form is not a provider

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { formDescriptionId, formItemId, formMessageId } = useFormContext(); // This line is problematic if Form is not a provider

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormContext(); // This line is problematic if Form is not a provider

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormContext(); // This line is problematic if Form is not a provider
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormContext,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
};
