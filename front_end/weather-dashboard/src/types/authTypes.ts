

/**
 * This will house all of the types for auth 
 */

export interface AuthRequest {
    Email: string; 
    Password: string;
}

export interface LoginResponse {
    JwtToken: string;
}

export interface SignUpResponse {
    Email: string;
    JwtToken: string;
}