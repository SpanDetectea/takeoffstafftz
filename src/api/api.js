import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3004/"
});
export const usersAPI = {
    getAuth() {
        return instance.get('auth').then(response => { return response.data });
    },
    getUsers() {
        return instance.get('users').then(response => { return response.data });
    }
}