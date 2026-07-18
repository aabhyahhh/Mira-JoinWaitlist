"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/waitlist/field";
import { MultiChipGroup, SinglePillGroup } from "@/components/waitlist/pill-group";
import {
  CURRENT_CALL_HANDLER,
  GUEST_CONTACT_CHANNELS,
  PREFERRED_CONTACT_METHOD,
  TIME_CONSUMING_TASKS,
  WANTS_DEMO,
  WEEKLY_CALL_VOLUME,
} from "@/lib/waitlist-options";

export interface StepThreeValues {
  guestContactChannels: string[];
  weeklyCallVolume: string;
  timeConsumingTasks: string[];
  currentCallHandler: string;
  biggestProblem: string;
  wantsDemo: string;
  preferredContactMethod: string;
}

export function StepThree({
  initialValues,
  submitting,
  onBack,
  onFinish,
}: {
  initialValues: StepThreeValues;
  submitting: boolean;
  onBack: () => void;
  onFinish: (values: StepThreeValues) => void;
}) {
  const [values, setValues] = useState<StepThreeValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof StepThreeValues>(
    key: K,
    value: StepThreeValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (values.guestContactChannels.length === 0)
      next.guestContactChannels = "Select at least one.";
    if (!values.weeklyCallVolume) next.weeklyCallVolume = "Please select one.";
    if (values.timeConsumingTasks.length === 0)
      next.timeConsumingTasks = "Select at least one.";
    if (!values.wantsDemo) next.wantsDemo = "Please select one.";
    if (values.wantsDemo === "Yes" && !values.preferredContactMethod)
      next.preferredContactMethod = "Please select a contact method.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onFinish(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-charcoal-900 sm:text-3xl">
          Guest communication
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
          Almost there — this helps us personalize your demo.
        </p>
      </div>

      <Field
        label="How do guests usually contact you?"
        error={errors.guestContactChannels}
        required
      >
        <MultiChipGroup
          options={GUEST_CONTACT_CHANNELS}
          values={values.guestContactChannels}
          onChange={(v) => update("guestContactChannels", v)}
        />
      </Field>

      <Field label="Guest calls per week" error={errors.weeklyCallVolume} required>
        <SinglePillGroup
          options={WEEKLY_CALL_VOLUME}
          value={values.weeklyCallVolume}
          onChange={(v) => update("weeklyCallVolume", v)}
        />
      </Field>

      <Field
        label="What takes up the most time?"
        error={errors.timeConsumingTasks}
        required
      >
        <MultiChipGroup
          options={TIME_CONSUMING_TASKS}
          values={values.timeConsumingTasks}
          onChange={(v) => update("timeConsumingTasks", v)}
        />
      </Field>

      <Field label="Who currently answers guest calls?">
        <SinglePillGroup
          options={CURRENT_CALL_HANDLER}
          value={values.currentCallHandler}
          onChange={(v) => update("currentCallHandler", v)}
        />
      </Field>

      <Field
        label="If Mira could solve one problem today, what would it be?"
        htmlFor="biggestProblem"
      >
        <Textarea
          id="biggestProblem"
          rows={2}
          placeholder="e.g. I miss calls when I'm showing another property"
          value={values.biggestProblem}
          onChange={(e) => update("biggestProblem", e.target.value)}
        />
      </Field>

      <Field label="Would you like a live demo?" error={errors.wantsDemo} required>
        <SinglePillGroup
          options={WANTS_DEMO}
          value={values.wantsDemo}
          onChange={(v) => update("wantsDemo", v)}
        />
      </Field>

      <AnimatePresence initial={false}>
        {values.wantsDemo === "Yes" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <Field
              label="Preferred contact method"
              error={errors.preferredContactMethod}
              required
            >
              <SinglePillGroup
                options={PREFERRED_CONTACT_METHOD}
                value={values.preferredContactMethod}
                onChange={(v) => update("preferredContactMethod", v)}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="shrink-0 px-4"
          onClick={onBack}
          aria-label="Back"
          disabled={submitting}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
}
