export type TableItem = {
  id: string;
  firstName: string;
  midName?: string;
  lastName: string;
  email: string;
  age: number;
  phone: string; 
  telegram?: string;
  city?: string;
  registrationDate?: string;
  notifications?: boolean;  
  premiumMember?: boolean; 
  balance?: number; 
  universityEducation?: boolean;
  twoFactorEnabled?: boolean
};
