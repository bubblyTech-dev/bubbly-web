import { api } from '@/lib/api/client';
import type { Paginated } from '@/types/api';
import type { SchoolUser } from '@/types/auth';
import type {
  ClassInput,
  MonthSummary,
  PrincipalDashboard,
  Ref,
  SchoolClass,
  SchoolDetails,
  SchoolOverview,
  Student,
  StudentInput,
  Teacher,
  TeacherInput,
} from '@/types/school';

/** Every school workspace endpoint of Phase A (/api/v1/user/*). The school always comes from the login. */

const list = async <T, Extra = Record<string, never>>(
  path: string,
  query?: Record<string, string | number | undefined>,
): Promise<Paginated<T, Extra>> => {
  const response = await api.get<T[]>(path, { query });
  return { data: response.data, meta: response.meta as Paginated<T, Extra>['meta'] };
};

export const dashboardService = {
  principal: async () => (await api.get<PrincipalDashboard>('/user/dashboard/principal')).data,
};

export const classService = {
  list: (query: { search?: string; status?: string; page?: number; perPage?: number } = {}) =>
    list<SchoolClass, { totalStudents: number }>('/user/classes', { perPage: 100, ...query }),
  options: async () => (await api.get<Ref[]>('/user/classes/options')).data,
  get: async (uuid: string) => (await api.get<SchoolClass>(`/user/classes/${uuid}`)).data,
  create: async (body: ClassInput) => (await api.post<SchoolClass>('/user/classes', body)).data,
  update: async (uuid: string, body: ClassInput) =>
    (await api.patch<SchoolClass>(`/user/classes/${uuid}`, body)).data,
  remove: (uuid: string) => api.delete<null>(`/user/classes/${uuid}`),
};

export const studentService = {
  list: (
    query: {
      classUuid?: string;
      search?: string;
      status?: string;
      page?: number;
      perPage?: number;
    } = {},
  ) => list<Student>('/user/students', { perPage: 100, ...query }),
  get: async (uuid: string) => (await api.get<Student>(`/user/students/${uuid}`)).data,
  create: async (body: StudentInput) =>
    (await api.post<{ student: Student; setPasswordUrl: string | null }>('/user/students', body))
      .data,
  update: async (uuid: string, body: StudentInput) =>
    (await api.patch<Student>(`/user/students/${uuid}`, body)).data,
  changeStatus: async (uuid: string, status: number) =>
    (await api.patch<Student>(`/user/students/${uuid}/status`, { status })).data,
  parentLogin: async (uuid: string) =>
    (
      await api.post<{ student: Student; setPasswordUrl: string }>(
        `/user/students/${uuid}/parent-login`,
      )
    ).data,
  remove: (uuid: string) => api.delete<null>(`/user/students/${uuid}`),
};

export const teacherService = {
  list: (query: { search?: string; status?: string; page?: number; perPage?: number } = {}) =>
    list<Teacher, { date: string }>('/user/teachers', { perPage: 100, ...query }),
  options: async () => (await api.get<Ref[]>('/user/teachers/options')).data,
  get: async (uuid: string) => (await api.get<Teacher>(`/user/teachers/${uuid}`)).data,
  create: async (body: TeacherInput) =>
    (await api.post<{ teacher: Teacher; setPasswordUrl: string }>('/user/teachers', body)).data,
  update: async (uuid: string, body: TeacherInput) =>
    (await api.patch<Teacher>(`/user/teachers/${uuid}`, body)).data,
  changeStatus: async (uuid: string, status: number) =>
    (await api.patch<Teacher>(`/user/teachers/${uuid}/status`, { status })).data,
  loginLink: async (uuid: string) =>
    (
      await api.post<{ setPasswordUrl: string; expiresAt: string }>(
        `/user/teachers/${uuid}/login-link`,
      )
    ).data,
  markAttendance: async (
    uuid: string,
    body: { status: number; date?: string; note?: string | null },
  ) =>
    (
      await api.put<{
        date: string;
        status: number;
        label: string;
        note: string | null;
        monthSummary: MonthSummary;
      }>(`/user/teachers/${uuid}/attendance`, body)
    ).data,
};

export const schoolService = {
  get: async () => (await api.get<SchoolOverview>('/user/school')).data,
  update: async (body: Partial<Omit<SchoolDetails, 'uuid' | 'logo' | 'academicYear'>>) =>
    (await api.patch<SchoolDetails>('/user/school', body)).data,
};

export const profileService = {
  get: async () => (await api.get<SchoolUser>('/user/profile')).data,
  update: async (body: { name?: string; phone?: string | null }) =>
    (await api.patch<SchoolUser>('/user/profile', body)).data,
};
