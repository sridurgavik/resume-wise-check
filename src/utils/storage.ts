
export const STORAGE_KEY = 'greecode_ats_last_scan';

export function canScanToday(): boolean {
  const lastScanDate = localStorage.getItem(STORAGE_KEY);
  if (!lastScanDate) return true;
  
  const today = new Date().toDateString();
  return lastScanDate !== today;
}

export function markScanCompleted(): void {
  const today = new Date().toDateString();
  localStorage.setItem(STORAGE_KEY, today);
}

export function getNextScanDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString();
}
