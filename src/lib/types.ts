export interface QuickSignupInput {
  fullName: string;
  workEmail: string;
  whatsappNumber: string;
  cityCountry: string;
}

export interface ProfileEnrichmentInput {
  businessType: string;
  propertiesManaged: string;
  propertyLocations: string;
  guestContactChannels: string[];
  weeklyCallVolume: string;
  timeConsumingTasks: string[];
  currentCallHandler?: string;
  biggestProblem?: string;
  wantsDemo: string;
  preferredContactMethod?: string;
}

export type WaitlistAnswers = QuickSignupInput & Partial<ProfileEnrichmentInput>;
