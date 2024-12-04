export interface Staff {
    id: number;
    fullName: string;
    department: string;
    role: 'doctor' | 'nurse';
  }
  
  export interface Doctor extends Staff {
    isHead: boolean;
  }
  
  export interface Nurse extends Staff {}
  