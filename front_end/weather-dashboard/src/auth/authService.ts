import axios from 'axios';
import type { AuthRequest, LoginResponse } from '../types/authTypes';

/**
 * This file will hold all of the api calls for the auth functionality 
 */


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

const JWT_TOKEN = 'jwt_token'; 

export const authService = {
    async login(payload: AuthRequest): Promise<void> {
        // make requests here like: 
        const response = await api.post<LoginResponse>('/auth/LoginUser', payload);
        localStorage.setItem(JWT_TOKEN, response.data.JwtToken);
    },

    async signUp(payload: AuthRequest): Promise<void> {
        const response = await api.post<LoginResponse>('/auth/RegisterUser', payload);
        localStorage.setItem(JWT_TOKEN, response.data.JwtToken);
    }

}