export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  role: 'Patient' | 'Nurse';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  lastActive: string;
  appointmentsCount: number;
  isPrime: boolean;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work';
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: string;
  totalAmount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
}

export interface Payment {
  id: string;
  userId: string;
  date: string;
  amount: number;
  method: 'Card' | 'UPI' | 'Cash';
  status: 'Success' | 'Failed' | 'Pending';
}

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  dob: string;
  phone: string;
}