export interface Application {
    id?: number;
    vacancyId: number;
    userId: number;
    jobTitle?: string;
    companyName?: string;
    status?: string;
    appliedDate?: Date;
    price?: string; 
  }