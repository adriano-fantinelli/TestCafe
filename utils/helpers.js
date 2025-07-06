import axios from 'axios';
import config from './config';

export async function getToken() {
    const response = await axios.post(`${config.baseUrl}/api/auth/login`, {
        username: config.testUser.username,
        password: config.testUser.password
    });
    return response.data.token;
}

export function getTestUser() {
    const id = Math.floor(Math.random() * 1000000);
    return {
        email: `testuser${id}@example.com`,
        username: `testuser${id}`,
        password: 'Password123!'
    };
}

export async function resetDatabase() {
    await axios.post(`${config.baseUrl}/api/test/reset`, {}, {
        headers: {
            Authorization: `Bearer ${await getToken()}`
        }
    });
}
