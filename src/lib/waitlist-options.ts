export const BUSINESS_TYPES = [
  "Airbnb Host",
  "Property Manager",
  "Boutique Hotel",
  "Homestay Owner",
  "Villa Operator",
  "Vacation Rental Company",
  "Other",
] as const;

export const PROPERTIES_MANAGED = ["1", "2–5", "6–10", "11–25", "25+"] as const;

export const GUEST_CONTACT_CHANNELS = [
  "Airbnb Messages",
  "Phone Calls",
  "WhatsApp",
  "Instagram",
  "Booking.com",
  "Direct Website",
  "Email",
] as const;

export const WEEKLY_CALL_VOLUME = ["<10", "10–30", "30–60", "60+"] as const;

export const TIME_CONSUMING_TASKS = [
  "Repetitive FAQs",
  "Booking Enquiries",
  "Check-in & Directions",
  "Pricing Questions",
  "Guest Support",
  "Staff Coordination",
  "Late-night Calls",
  "Other",
] as const;

export const CURRENT_CALL_HANDLER = [
  "Just me",
  "Family member",
  "Property manager",
  "Receptionist",
  "Call center",
] as const;

export const WANTS_DEMO = ["Yes", "Maybe later", "Just keep me updated"] as const;

export const PREFERRED_CONTACT_METHOD = ["WhatsApp", "Phone", "Email"] as const;
