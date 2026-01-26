import { User } from '@/types';

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

export function isAdmin(user: User | null): boolean {
    if (!user || !user.email) return false;
    return ADMIN_EMAILS.includes(user.email);
}

export function requireAdmin(user: User | null): void {
    if (!isAdmin(user)) {
        throw new Error('Unauthorized: Admin access required');
    }
}

export function getAdminEmails(): string[] {
    return ADMIN_EMAILS;
}
