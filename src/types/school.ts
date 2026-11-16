import type { SubscriptionSummary } from './auth';

export interface Ref {
  uuid: string;
  name: string;
}

export interface SchoolClass {
  uuid: string;
  name: string;
  code: string | null;
  room: string | null;
  startsAt: string | null;
  endsAt: string | null;
  capacity: number | null;
  status: number;
  statusLabel: string | null;
  sortOrder: number;
  studentCount?: number;
  classTeacher?: Ref | null;
  createdAt: string;
}

export interface ClassInput {
  name?: string;
  code?: string | null;
  room?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  capacity?: number | null;
  classTeacherUuid?: string | null;
  status?: number;
}

export interface ParentLogin {
  email: string;
  status: number;
  statusLabel: string | null;
  passwordSet: boolean;
  lastLoginAt: string | null;
}

export interface Student {
  uuid: string;
  name: string;
  admissionNo: string | null;
  dateOfBirth: string | null;
  gender: number | null;
  genderLabel: string | null;
  bloodGroup: string | null;
  address: string | null;
  medicalNotes: string | null;
  guardianName: string | null;
  guardianRelation: string | null;
  guardianPhone: string | null;
  guardianEmail: string | null;
  secondGuardianName: string | null;
  secondGuardianPhone: string | null;
  admissionDate: string | null;
  photo: string | null;
  status: number;
  statusLabel: string | null;
  class?: Ref | null;
  classTeacher?: Ref | null;
  parentLogin?: ParentLogin | null;
  createdAt: string;
}

export interface StudentInput {
  name?: string;
  classUuid?: string | null;
  admissionNo?: string | null;
  dateOfBirth?: string | null;
  gender?: number | null;
  bloodGroup?: string | null;
  address?: string | null;
  medicalNotes?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
  guardianPhone?: string | null;
  guardianEmail?: string | null;
  admissionDate?: string | null;
  createParentLogin?: boolean;
}

export const STAFF_ATTENDANCE = {
  PRESENT: 1,
  ABSENT: 2,
  LATE: 3,
  ON_LEAVE: 4,
  HALF_DAY: 5,
} as const;

export interface AttendanceMark {
  status: number;
  label: string;
  note: string | null;
}

export interface MonthSummary {
  from: string;
  to: string;
  markedDays: number;
  present: number;
  late: number;
  absent: number;
  onLeave: number;
  halfDay: number;
  presentPercent: number | null;
}

export interface Teacher {
  uuid: string;
  name: string | null;
  email: string;
  phone: string | null;
  profileImage: string | null;
  status: number;
  statusLabel: string | null;
  passwordSet: boolean;
  lastLoginAt: string | null;
  designation: string;
  employeeCode: string | null;
  qualification: string | null;
  experienceYears: number | null;
  joiningDate: string | null;
  dateOfBirth: string | null;
  gender: number | null;
  genderLabel: string | null;
  emergencyContact: string | null;
  address: string | null;
  shiftStartsAt: string | null;
  shiftEndsAt: string | null;
  annualLeaveQuota: number | null;
  classes?: { uuid: string; name: string; room: string | null }[];
  todayAttendance?: AttendanceMark | null;
  monthSummary?: MonthSummary;
  createdAt: string;
}

export interface TeacherInput {
  name?: string;
  email?: string;
  phone?: string | null;
  designation?: string | null;
  qualification?: string | null;
  experienceYears?: number | null;
  joiningDate?: string | null;
  emergencyContact?: string | null;
  address?: string | null;
  shiftStartsAt?: string | null;
  shiftEndsAt?: string | null;
  annualLeaveQuota?: number | null;
  classUuids?: string[];
}

export interface SchoolDetails {
  uuid: string;
  name: string;
  logo: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  timezone: string;
  workingDays: number[];
  opensAt: string | null;
  closesAt: string | null;
  academicYearStartMonth: number;
  academicYear: string | null;
}

export interface Usage {
  used: number | null;
  limit: number | null;
}

export interface SchoolOverview {
  school: SchoolDetails;
  subscription: SubscriptionSummary;
  modules: string[];
  usage: { students: Usage; teachers: Usage; classes: Usage; storageMb: Usage };
}

export interface PrincipalDashboard {
  date: string;
  greetingName: string | null;
  school: { name: string };
  counts: { classes: number; students: number; teachers: number };
  staffToday: { present: number; absent: number; late: number; onLeave: number; notMarked: number };
  staffOnLeave: { uuid: string; name: string; designation: string; classes: string[] }[];
  newInquiries: number | null;
  pendingLeaveRequests: number | null;
  studentAttendanceToday: { present: number; total: number; percent: number } | null;
  feeCollection: { amountPaise: number; label: string } | null;
}
