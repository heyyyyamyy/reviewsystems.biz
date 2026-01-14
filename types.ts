export interface Review {
  id: string;
  companyName: string;
  author: string;
  role: string;
  rating: number; // 1-5
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export enum PageView {
  HOME = 'HOME',
  CONTACT = 'CONTACT'
}

export interface CompanySummary {
  name: string;
  industry: string;
  logoInitial: string;
  color: string;
}