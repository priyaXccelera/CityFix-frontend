// MOCK DATA — placeholder records for local development only.
// Replace with real API data before production use.
import { Announcement, Department, Issue, IssueCategory, User } from '../types';

export const mockUsers: User[] = [
  // MOCK: local super-administrator account for role-based development and testing.
  { id: 'u0', name: 'Sam Morgan', email: 'superadmin@cityfix.test', password: 'password123', role: 'SUPER_ADMIN', area: 'Central Ward', phone: '555-0100', active: true },
  { id: 'u1', name: 'Avery Admin', email: 'admin@cityfix.test', password: 'password123', role: 'ADMIN', area: 'Central Ward', phone: '555-0101', active: true },
  { id: 'u2', name: 'Jordan Resident', email: 'user@cityfix.test', password: 'password123', role: 'USER', area: 'Central Ward', phone: '555-0102', active: true },
  { id: 'u3', name: 'Mina Patel', email: 'mina@cityfix.test', password: 'password123', role: 'USER', area: 'Sector 5', phone: '555-0103', active: true },
];
export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Roads & Transport', description: 'Street surfaces and traffic assets.', category: 'Roads' },
  { id: 'd2', name: 'Public Works', description: 'Lighting and neighborhood maintenance.', category: 'Electricity' },
  { id: 'd3', name: 'Water Services', description: 'Water supply and drainage.', category: 'Water' },
];
export const mockCategories: IssueCategory[] = [
  { id: 'c1', name: 'Pothole', departmentId: 'd1', departmentName: 'Roads & Transport', priority: 'high' },
  { id: 'c2', name: 'Streetlight', departmentId: 'd2', departmentName: 'Public Works', priority: 'medium' },
  { id: 'c3', name: 'Water leak', departmentId: 'd3', departmentName: 'Water Services', priority: 'high' },
];
export const mockIssues: Issue[] = [
  { id: 'i1', title: 'Large pothole near the library', description: 'The damaged surface is unsafe for cyclists and cars.', category: 'Pothole', location: 'Central Ward, Library Road', photoReference: '', status: 'in-progress', priority: 'high', reporterId: 'u2', reporterName: 'Jordan Resident', department: 'Roads & Transport', upvotes: 18, createdAt: '2026-09-11T09:00:00Z', comments: [] },
  { id: 'i2', title: 'Streetlight out on Oak Avenue', description: 'The entire corner is dark after sunset.', category: 'Streetlight', location: 'Central Ward, Oak Avenue', photoReference: '', status: 'reported', priority: 'medium', reporterId: 'u3', reporterName: 'Mina Patel', department: 'Public Works', upvotes: 7, createdAt: '2026-09-13T15:30:00Z', comments: [] },
  { id: 'i3', title: 'Water pooling by bus stop', description: 'Water is leaking from the curbside pipe.', category: 'Water leak', location: 'Sector 5, Market Street', photoReference: '', status: 'assigned', priority: 'high', reporterId: 'u2', reporterName: 'Jordan Resident', department: 'Water Services', upvotes: 12, createdAt: '2026-09-14T08:10:00Z', comments: [] },
];
export const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Water maintenance in Sector 5', content: 'Water supply maintenance will take place Monday from 9 AM to 2 PM.', postedBy: 'Avery Admin', createdAt: '2026-09-14T09:00:00Z' },
  { id: 'a2', title: 'Community clean-up day', content: 'Join neighborhood teams this Saturday at 10 AM.', postedBy: 'Avery Admin', createdAt: '2026-09-12T10:00:00Z' },
];
