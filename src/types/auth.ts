// Auth request/response types


export interface SendCredentialsRequest {
  /** Local number without the 222 country prefix, e.g. "6XXXXXXXX". */
  phone: string;
  /** 4-digit secret code. */
  codeSecret: string;
}

export interface SendCredentialsResponse {
  /** Opaque id used to verify the code later. */
  id: string;
  /** Epoch ms when the code expires. */
  expiresAt: number;
}

export interface SendOtpWithCredentialsRequest {
  phone: string;
  secretCode: string;
  otpCode: string;
}

export interface SendOtpWithCredentialsResponse {
  success: boolean;
}
