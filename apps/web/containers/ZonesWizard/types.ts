export interface IFormData {
  step: number;
  age: string;
  restingHeartRate: string;
  maxHeartRate: string;
}

export type FieldError = { field: keyof IFormData; message: string };
