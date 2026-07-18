"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/waitlist/field";
import { SinglePillGroup } from "@/components/waitlist/pill-group";
import { BUSINESS_TYPES, PROPERTIES_MANAGED } from "@/lib/waitlist-options";

export interface StepTwoValues {
  businessType: string;
  propertiesManaged: string;
  propertyLocations: string;
}

export function StepTwo({
  initialValues,
  onBack,
  onNext,
}: {
  initialValues: StepTwoValues;
  onBack: () => void;
  onNext: (values: StepTwoValues) => void;
}) {
  const [values, setValues] = useState<StepTwoValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof StepTwoValues>(key: K, value: StepTwoValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function handleNext() {
    const next: Record<string, string> = {};
    if (!values.businessType) next.businessType = "Please select one.";
    if (!values.propertiesManaged) next.propertiesManaged = "Please select one.";
    if (!values.propertyLocations.trim())
      next.propertyLocations = "Property location is required.";
    setErrors(next);
    if (Object.keys(next).length === 0) onNext(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title text-ink-900">About your business</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Helps us tailor what we show you.
        </p>
      </div>

      <Field label="You are a" error={errors.businessType} required>
        <SinglePillGroup
          options={BUSINESS_TYPES}
          value={values.businessType}
          onChange={(v) => update("businessType", v)}
        />
      </Field>

      <Field label="Properties managed" error={errors.propertiesManaged} required>
        <SinglePillGroup
          options={PROPERTIES_MANAGED}
          value={values.propertiesManaged}
          onChange={(v) => update("propertiesManaged", v)}
        />
      </Field>

      <Field
        label="Property location(s)"
        htmlFor="propertyLocations"
        error={errors.propertyLocations}
        required
      >
        <Input
          id="propertyLocations"
          placeholder="e.g. Goa, Jaipur, Dubai"
          value={values.propertyLocations}
          invalid={!!errors.propertyLocations}
          onChange={(e) => update("propertyLocations", e.target.value)}
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="shrink-0 px-4"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="soft"
          size="lg"
          className="flex-1"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
