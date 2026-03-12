import { ServiceOptionsEnum, WorkPricingOptionsEnum } from "./enum-options";

export const serviceOptions = [
  {
    label: "Maintenance & Diagnostics",
    value: ServiceOptionsEnum.MaintenanceDiagnostics,
  },
  {
    label: "Transmission Repair",
    value: ServiceOptionsEnum.TransmissionRepair,
  },
  { label: "Engine Repair", value: ServiceOptionsEnum.EngineRepair },
  { label: "Suspension Repair", value: ServiceOptionsEnum.SuspensionRepair },
  {
    label: "Auto Electrical Services",
    value: ServiceOptionsEnum.AutoElectrical,
  },
  { label: "Air Conditioning Repair", value: ServiceOptionsEnum.ACRepair },
  { label: "Tire Service", value: ServiceOptionsEnum.TireService },
  { label: "Wheel Alignment", value: ServiceOptionsEnum.WheelAlignment },
  { label: "Body Repair", value: ServiceOptionsEnum.BodyRepair },
  {
    label: "Detailing & Polishing",
    value: ServiceOptionsEnum.DetailingPolishing,
  },
  { label: "Painting Services", value: ServiceOptionsEnum.PaintingServices },
  { label: "Chip Tuning", value: ServiceOptionsEnum.ChipTuning },
  {
    label: "Automotive Machining",
    value: ServiceOptionsEnum.AutomotiveMachining,
  },
  { label: "Electric Vehicle Repair", value: ServiceOptionsEnum.EVRepair },
];

export const workPricingOptions = [
  { label: "Fixed Pricing", value: WorkPricingOptionsEnum.FixedPricing },
  { label: "Starting From", value: WorkPricingOptionsEnum.StartingFrom },
  { label: "After Inspection", value: WorkPricingOptionsEnum.AfterInspection },
];

// export const estimatedTimeOptions = [
//   { label: "Same day", value: EstimatedTimeOptionsEnum.SameDay },
//   { label: "1–2 days", value: EstimatedTimeOptionsEnum.OneToTwoDays },
//   { label: "3–5 days", value: EstimatedTimeOptionsEnum.ThreeToFiveDays },
//   { label: "1 week", value: EstimatedTimeOptionsEnum.OneWeek },
//   { label: "2 weeks", value: EstimatedTimeOptionsEnum.TwoWeeks },
//   { label: "1 month+", value: EstimatedTimeOptionsEnum.OneMonthPlus },
// ];

// export const priceFromOptions = [
//   { label: "Up to 50$", value: PriceFromOptionsEnum.UpTo50 },
//   { label: "50$ – 100$", value: PriceFromOptionsEnum.UpTo100 },
//   { label: "100$ – 300$", value: PriceFromOptionsEnum.UpTo300 },
//   { label: "300$ – 500$", value: PriceFromOptionsEnum.UpTo500 },
//   { label: "Above 500$", value: PriceFromOptionsEnum.Above500 },
// ];
