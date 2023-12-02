import axios from "axios";
import { User } from "../types/common";
import { _BASE_URL, _USER_URI } from "../config/config";

export const addUser = (user: User) => {
    return axios.post(`${_BASE_URL}${_USER_URI}`, user);
}

export const getUsers = () => {
    return axios.get(`${_BASE_URL}${_USER_URI}`);
}

export const updateUser = (userId: string, user: User) => {
    return axios.put(`${_BASE_URL}${_USER_URI}/${userId}`,user);
}

export const deleteUser = (userId: string) => {
    return axios.delete(`${_BASE_URL}${_USER_URI}/${userId}`);
}
