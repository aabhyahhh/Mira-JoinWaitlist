import type { WaitlistAnswers } from "@/lib/types";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const NOTIFY_EMAIL = "miraoncall@gmail.com";

/**
 * Fires a single Web3Forms submission with everything the visitor filled
 * in across all steps. Web3Forms is fire-and-forget (no update-after-insert),
 * so this is only called once, at the true end of the flow.
 */
export async function submitWaitlistAnswers(
  answers: WaitlistAnswers
): Promise<{ success: boolean }> {
  if (!ACCESS_KEY) {
    console.warn(
      "[web3forms] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — skipping submission."
    );
    return { success: false };
  }

  const formData = new FormData();
  formData.append("access_key", ACCESS_KEY);
  formData.append("to", NOTIFY_EMAIL);
  formData.append("subject", `New Mira waitlist signup: ${answers.fullName}`);
  formData.append("from_name", "Mira Waitlist");

  formData.append("Full Name", answers.fullName);
  formData.append("Work Email", answers.workEmail);
  formData.append("WhatsApp Number", answers.whatsappNumber);
  formData.append("City / Country", answers.cityCountry);

  if (answers.businessType) formData.append("You are a", answers.businessType);
  if (answers.propertiesManaged)
    formData.append("Properties managed", answers.propertiesManaged);
  if (answers.propertyLocations)
    formData.append("Property location(s)", answers.propertyLocations);
  if (answers.guestContactChannels?.length)
    formData.append(
      "How guests contact them",
      answers.guestContactChannels.join(", ")
    );
  if (answers.weeklyCallVolume)
    formData.append("Guest calls per week", answers.weeklyCallVolume);
  if (answers.timeConsumingTasks?.length)
    formData.append(
      "What takes up the most time",
      answers.timeConsumingTasks.join(", ")
    );
  if (answers.currentCallHandler)
    formData.append("Who currently answers calls", answers.currentCallHandler);
  if (answers.biggestProblem)
    formData.append("Biggest problem to solve", answers.biggestProblem);
  if (answers.wantsDemo) formData.append("Wants a demo", answers.wantsDemo);
  if (answers.preferredContactMethod)
    formData.append("Preferred contact method", answers.preferredContactMethod);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return { success: Boolean(data.success) };
  } catch (err) {
    console.error("[web3forms] Submission failed:", err);
    return { success: false };
  }
}
