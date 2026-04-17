export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}
