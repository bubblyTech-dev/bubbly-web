export const ROLE = { PRINCIPAL: 1, TEACHER: 2, STUDENT: 3 } as const;
export type Role = (typeof ROLE)[keyof typeof ROLE];

export interface SchoolUser {
  uuid: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: Role;
  roleName: string | null;
  status: number;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  profileImage: string | null;
  permissions?: string[];
}

export interface SchoolSummary {
  uuid: string;
  name: string;
  logo: string | null;
}

export interface SubscriptionSummary {
  status: number | null;
  allowed: boolean;
  message: string | null;
  planName: string | null;
  billingInterval: number | null;
  amountPaise: number | null;
  currency: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  nextChargeAt: string | null;
  cancelAtCycleEnd: boolean;
}

export interface MeResponse {
  user: SchoolUser;
  school: SchoolSummary;
  subscription: SubscriptionSummary;
  modules: string[];
  permissions: string[];
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: SchoolUser;
}
