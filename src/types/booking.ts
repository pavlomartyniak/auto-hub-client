export type BookingPayload = {
  stoId: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  note?: string;
};

export type BookingResponse = {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
};
