import { create } from 'zustand';

// Local type definitions (prevent dependency on external types module)
export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  role?: string;
  status?: 'Active' | 'Inactive' | string;
  joinedDate?: string;
  lastActive?: string;
  appointmentsCount?: number;
  isPrime?: boolean;
  addresses: Address[];
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: string;
  totalAmount: number;
  status: string;
  shippingAddress?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

export interface Payment {
  id: string;
  userId: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relationship?: string;
  dob?: string;
  phone?: string;
}

interface DashboardState {
  users: User[];
  orders: Order[];
  payments: Payment[];
  familyMembers: FamilyMember[];
  selectedUserId: string | null;
  selectedOrderId: string | null;
  currentScreen: 'LIST' | 'DETAIL' | 'ORDER_DETAIL';
  
  // Actions
  setScreen: (screen: 'LIST' | 'DETAIL' | 'ORDER_DETAIL') => void;
  setSelectedUser: (id: string | null) => void;
  setSelectedOrder: (id: string | null) => void;
  addUser: (user: Omit<User, 'id' | 'joinedDate' | 'lastActive' | 'appointmentsCount' | 'addresses'>) => void;
  togglePrime: (userId: string) => void;
  toggleStatus: (userId: string) => void;
  updateUserBio: (userId: string, data: Partial<User>) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  users: [
    { 
      id: 'USR001', 
      name: 'Eva Lopez', 
      email: 'eva.lopez@email.com', 
      phone: '+1 (555) 555-5555', 
      dob: '1990-05-15', 
      gender: 'Female', 
      bloodGroup: 'O+', 
      role: 'Patient', 
      status: 'Active', 
      joinedDate: '2025-07-18', 
      lastActive: '2026-03-21', 
      appointmentsCount: 8, 
      isPrime: false, 
      addresses: [
        { id: 'a1', type: 'Home', street: 'Flat 301, Sunshine Apartments, MG Road', city: 'Mumbai', state: 'Maharashtra', zip: '400001', isDefault: true }
      ] 
    },
    { 
      id: 'USR002', 
      name: 'Cecilia Smith', 
      email: 'cecilia.smith@email.com', 
      phone: '+1 (555) 333-3333', 
      dob: '1988-11-23', 
      gender: 'Female', 
      bloodGroup: 'A+', 
      role: 'Patient', 
      status: 'Inactive', 
      joinedDate: '2024-05-22', 
      lastActive: '2025-12-30', 
      appointmentsCount: 5, 
      isPrime: false, 
      addresses: [
        { id: 'a2', type: 'Work', street: '456 Tech Park, Sector 62', city: 'Noida', state: 'Uttar Pradesh', zip: '201301', isDefault: true }
      ] 
    },
    { 
      id: 'USR003', 
      name: 'David Kim', 
      email: 'david.kim@hospital.org', 
      phone: '+1 (555) 444-4444', 
      dob: '1982-03-12', 
      gender: 'Male', 
      bloodGroup: 'B+', 
      role: 'Nurse', 
      status: 'Active', 
      joinedDate: '2022-11-03', 
      lastActive: '2026-03-22', 
      appointmentsCount: 30, 
      isPrime: true, 
      addresses: [
        { id: 'a3', type: 'Home', street: '789 Medical Lane', city: 'Mumbai', state: 'Maharashtra', zip: '400002', isDefault: true }
      ] 
    }
  ],
  orders: [
    { id: 'ORD9921', userId: 'USR001', date: '2026-05-10', items: 'Paracetamol 500mg - 30 tablets', totalAmount: 150, status: 'Completed', shippingAddress: 'Flat 301, Sunshine Apartments, MG Road, Mumbai', paymentMethod: 'UPI', paymentStatus: 'Success' },
    { id: 'ORD9922', userId: 'USR001', date: '2026-05-24', items: 'Amoxicillin 250mg - 10 capsules', totalAmount: 80, status: 'Completed', shippingAddress: 'Flat 301, Sunshine Apartments, MG Road, Mumbai', paymentMethod: 'Card', paymentStatus: 'Success' }
  ],
  payments: [
    { id: 'TXN88301', userId: 'USR001', date: '2026-05-10', amount: 150, method: 'UPI', status: 'Success' },
    { id: 'TXN88302', userId: 'USR001', date: '2026-05-24', amount: 80, method: 'Card', status: 'Success' }
  ],
  familyMembers: [
    { id: 'FAM001', userId: 'USR001', name: 'John Williams', relationship: 'Son', dob: '1972-08-15', phone: '+1(555) 111-1112' },
    { id: 'FAM002', userId: 'USR001', name: 'Jane Williams', relationship: 'Daughter', dob: '1975-12-08', phone: '+1(555) 111-1113' },
    { id: 'FAM003', userId: 'USR002', name: 'Michael Smith', relationship: 'Son', dob: '1985-02-20', phone: '+1(555) 222-2222' }
  ],
  selectedUserId: null,
  selectedOrderId: null,
  currentScreen: 'LIST',

  setScreen: (screen) => set({ currentScreen: screen }),
  
  setSelectedUser: (id) => set((state) => ({ 
    selectedUserId: id, 
    currentScreen: id ? 'DETAIL' : 'LIST' 
  })),
  
  setSelectedOrder: (id) => set((state) => ({ 
    selectedOrderId: id, 
    currentScreen: id ? 'ORDER_DETAIL' : 'DETAIL' 
  })),
  
  addUser: (userData) => set((state) => {
    const nextId = state.users.length > 0 
      ? Math.max(...state.users.map(u => parseInt(u.id.replace('USR', '')))) + 1 
      : 1;
    
    const formattedId = `USR${String(nextId).padStart(3, '0')}`;
    const todayStr = new Date().toLocaleDateString('en-US');

    return {
      users: [...state.users, {
        ...userData,
        id: formattedId,
        joinedDate: todayStr,
        lastActive: todayStr,
        appointmentsCount: 0,
        addresses: []
      }]
    };
  }),
  
  togglePrime: (userId) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, isPrime: !u.isPrime } : u)
  })),
  
  toggleStatus: (userId) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u)
  })),
  
  updateUserBio: (userId, data) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, ...data } : u)
  })),
  
  addFamilyMember: (member) => set((state) => ({
    familyMembers: [...state.familyMembers, { ...member, id: `FAM00${state.familyMembers.length + 1}` }]
  })),
  
  removeFamilyMember: (id) => set((state) => ({
    familyMembers: state.familyMembers.filter(f => f.id !== id)
  }))
}));

export default useDashboardStore;