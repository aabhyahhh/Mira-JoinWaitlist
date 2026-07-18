"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/waitlist/field";
import type { QuickSignupInput } from "@/lib/types";

export interface StepOneValues extends QuickSignupInput {}

export function StepOne({
  initialValues,
  onNext,
}: {
  initialValues: StepOneValues;
  onNext: (values: StepOneValues) => void;
}) {
  const [values, setValues] = useState<StepOneValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof StepOneValues>(key: K, value: StepOneValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.workEmail.trim()) next.workEmail = "Work email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail.trim()))
      next.workEmail = "Enter a valid email address.";
    if (!values.whatsappNumber.trim())
      next.whatsappNumber = "WhatsApp number is required.";
    if (!values.cityCountry.trim())
      next.cityCountry = "City / country is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onNext(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h1 className="page-title text-ink-900">Join the Mira waitlist</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          20 seconds and you&apos;re on the list.
        </p>
      </div>

      <Field label="Full Name" htmlFor="fullName" error={errors.fullName} required>
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Priya Sharma"
          value={values.fullName}
          invalid={!!errors.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
      </Field>

      <Field label="Work Email" htmlFor="workEmail" error={errors.workEmail} required>
        <Input
          id="workEmail"
          type="email"
          autoComplete="email"
          placeholder="priya@example.com"
          value={values.workEmail}
          invalid={!!errors.workEmail}
          onChange={(e) => update("workEmail", e.target.value)}
        />
      </Field>

      <Field
        label="WhatsApp Number"
        htmlFor="whatsappNumber"
        error={errors.whatsappNumber}
        required
      >
        <Input
          id="whatsappNumber"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={values.whatsappNumber}
          invalid={!!errors.whatsappNumber}
          onChange={(e) => update("whatsappNumber", e.target.value)}
        />
      </Field>

      <Field
        label="City / Country"
        htmlFor="cityCountry"
        error={errors.cityCountry}
        required
      >
        <Input
          id="cityCountry"
          placeholder="Goa, India"
          value={values.cityCountry}
          invalid={!!errors.cityCountry}
          onChange={(e) => update("cityCountry", e.target.value)}
        />
      </Field>

      <Button type="submit" variant="soft" size="lg" className="w-full">
        Next
      </Button>
    </form>
  );
}
