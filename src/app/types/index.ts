export type Role = 'ADMIN' | 'USER';
export type IssueStatus = 'reported' | 'in-review' | 'assigned' | 'in-progress' | 'resolved' | 'rejected';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface User { id: string; name: string; email: string; password: string; role: Role; area: string; phone: string; active: boolean; }
export interface Department { id: string; name: string; description: string; category: string; }
export interface IssueCategory { id: string; name: string; departmentId: string; departmentName: string; priority: Priority; }
export interface Comment { id: string; issueId: string; text: string; postedBy: string; createdAt: string; }
export interface Issue { id: string; title: string; description: string; category: string; location: string; photoReference: string; status: IssueStatus; priority: Priority; reporterId: string; reporterName: string; department: string; upvotes: number; createdAt: string; comments: Comment[]; }
export interface Announcement { id: string; title: string; content: string; postedBy: string; createdAt: string; }
