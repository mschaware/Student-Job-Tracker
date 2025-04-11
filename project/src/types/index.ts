export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  _id?: string;
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  link: string;
}

export interface JobStatusCount {
  Applied: number;
  Interview: number;
  Offer: number;
  Rejected: number;
}