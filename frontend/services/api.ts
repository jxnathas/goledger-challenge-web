import axios from "axios";

const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;

export const api = axios.create({
    baseURL: "http://ec2-54-91-215-149.compute-1.amazonaws.com",
    auth: {
        username: username || '',
        password: password || ''
    },
})