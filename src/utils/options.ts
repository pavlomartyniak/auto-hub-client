import {
  CarMakeEnum,
  ServiceOptionsEnum,
  WorkPricingOptionsEnum,
} from "./enum-options";

export const serviceOptions = [
  {
    label: "All services",
    value: ServiceOptionsEnum.AllServices,
  },
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

export const carMakeOptions = [
  { label: "Any Make", value: CarMakeEnum.Any },
  { label: "Acura", value: CarMakeEnum.Acura },
  { label: "Alfa Romeo", value: CarMakeEnum.AlfaRomeo },
  { label: "Audi", value: CarMakeEnum.Audi },
  { label: "BMW", value: CarMakeEnum.BMW },
  { label: "Buick", value: CarMakeEnum.Buick },
  { label: "Cadillac", value: CarMakeEnum.Cadillac },
  { label: "Chevrolet", value: CarMakeEnum.Chevrolet },
  { label: "Chrysler", value: CarMakeEnum.Chrysler },
  { label: "Citroën", value: CarMakeEnum.Citroen },
  { label: "Dodge", value: CarMakeEnum.Dodge },
  { label: "Ferrari", value: CarMakeEnum.Ferrari },
  { label: "Fiat", value: CarMakeEnum.Fiat },
  { label: "Ford", value: CarMakeEnum.Ford },
  { label: "Genesis", value: CarMakeEnum.Genesis },
  { label: "GMC", value: CarMakeEnum.GMC },
  { label: "Honda", value: CarMakeEnum.Honda },
  { label: "Hyundai", value: CarMakeEnum.Hyundai },
  { label: "Infiniti", value: CarMakeEnum.Infiniti },
  { label: "Jaguar", value: CarMakeEnum.Jaguar },
  { label: "Jeep", value: CarMakeEnum.Jeep },
  { label: "Kia", value: CarMakeEnum.Kia },
  { label: "Lamborghini", value: CarMakeEnum.Lamborghini },
  { label: "Land Rover", value: CarMakeEnum.LandRover },
  { label: "Lexus", value: CarMakeEnum.Lexus },
  { label: "Lincoln", value: CarMakeEnum.Lincoln },
  { label: "Maserati", value: CarMakeEnum.Maserati },
  { label: "Mazda", value: CarMakeEnum.Mazda },
  { label: "Mercedes-Benz", value: CarMakeEnum.MercedesBenz },
  { label: "MINI", value: CarMakeEnum.Mini },
  { label: "Mitsubishi", value: CarMakeEnum.Mitsubishi },
  { label: "Nissan", value: CarMakeEnum.Nissan },
  { label: "Opel", value: CarMakeEnum.Opel },
  { label: "Peugeot", value: CarMakeEnum.Peugeot },
  { label: "Pontiac", value: CarMakeEnum.Pontiac },
  { label: "Porsche", value: CarMakeEnum.Porsche },
  { label: "Ram", value: CarMakeEnum.Ram },
  { label: "Renault", value: CarMakeEnum.Renault },
  { label: "Rolls-Royce", value: CarMakeEnum.RollsRoyce },
  { label: "Skoda", value: CarMakeEnum.Skoda },
  { label: "Subaru", value: CarMakeEnum.Subaru },
  { label: "Suzuki", value: CarMakeEnum.Suzuki },
  { label: "Tesla", value: CarMakeEnum.Tesla },
  { label: "Toyota", value: CarMakeEnum.Toyota },
  { label: "Volkswagen", value: CarMakeEnum.Volkswagen },
  { label: "Volvo", value: CarMakeEnum.Volvo },
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
