"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProgressBar } from "@/components/waitlist/progress-bar";
import { StepOne, type StepOneValues } from "@/components/waitlist/step-one";
import { Interstitial } from "@/components/waitlist/interstitial";
import { StepTwo, type StepTwoValues } from "@/components/waitlist/step-two";
import { StepThree, type StepThreeValues } from "@/components/waitlist/step-three";
import { SuccessScreen } from "@/components/waitlist/success-screen";
import { submitWaitlistAnswers } from "@/lib/web3forms";
import type { WaitlistAnswers } from "@/lib/types";

type Phase = "step1" | "interstitial" | "step2" | "step3" | "success";

const EMPTY_STEP_ONE: StepOneValues = {
  fullName: "",
  workEmail: "",
  whatsappNumber: "",
  cityCountry: "",
};

const EMPTY_STEP_TWO: StepTwoValues = {
  businessType: "",
  propertiesManaged: "",
  propertyLocations: "",
};

const EMPTY_STEP_THREE: StepThreeValues = {
  guestContactChannels: [],
  weeklyCallVolume: "",
  timeConsumingTasks: [],
  currentCallHandler: "",
  biggestProblem: "",
  wantsDemo: "",
  preferredContactMethod: "",
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export function WaitlistWizard({ demoVideoUrl }: { demoVideoUrl: string }) {
  const [phase, setPhase] = useState<Phase>("step1");
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [stepOneValues, setStepOneValues] = useState<StepOneValues>(EMPTY_STEP_ONE);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues>(EMPTY_STEP_TWO);
  const [stepThreeValues, setStepThreeValues] =
    useState<StepThreeValues>(EMPTY_STEP_THREE);

  function go(next: Phase, dir: number) {
    setDirection(dir);
    setPhase(next);
  }

  async function finalizeSubmit(answers: WaitlistAnswers) {
    setSubmitting(true);
    setSubmitError(null);
    const { success } = await submitWaitlistAnswers(answers);
    setSubmitting(false);
    if (!success) {
      setSubmitError("Something went wrong sending your answers. Please try again.");
      return;
    }
    go("success", 1);
  }

  const stepNumber =
    phase === "step1" || phase === "interstitial"
      ? 1
      : phase === "step2"
        ? 2
        : phase === "step3"
          ? 3
          : 3;

  return (
    <div
      id="waitlist"
      className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      {phase !== "success" && phase !== "interstitial" && (
        <ProgressBar step={stepNumber} totalSteps={3} />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={phase}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          {phase === "step1" && (
            <StepOne
              initialValues={stepOneValues}
              onNext={(values) => {
                setStepOneValues(values);
                go("interstitial", 1);
              }}
            />
          )}

          {phase === "interstitial" && (
            <>
              <Interstitial
                submitting={submitting}
                onContinue={() => go("step2", 1)}
                onSkip={() => finalizeSubmit(stepOneValues)}
              />
              {submitError && (
                <p className="mt-2 text-center text-sm font-medium text-destructive">
                  {submitError}
                </p>
              )}
            </>
          )}

          {phase === "step2" && (
            <StepTwo
              initialValues={stepTwoValues}
              onBack={() => go("step1", -1)}
              onNext={(values) => {
                setStepTwoValues(values);
                go("step3", 1);
              }}
            />
          )}

          {phase === "step3" && (
            <>
              <StepThree
                initialValues={stepThreeValues}
                submitting={submitting}
                onBack={() => go("step2", -1)}
                onFinish={(values) => {
                  setStepThreeValues(values);
                  finalizeSubmit({ ...stepOneValues, ...stepTwoValues, ...values });
                }}
              />
              {submitError && (
                <p className="mt-4 text-center text-sm font-medium text-destructive">
                  {submitError}
                </p>
              )}
            </>
          )}

          {phase === "success" && <SuccessScreen demoVideoUrl={demoVideoUrl} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
