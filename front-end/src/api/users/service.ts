import axios from "axios";
import { API_BASE_URL } from "../config";
import type { User } from "./types";

async function addOne(user: User) {
  return axios.post(`${API_BASE_URL}/api/users/add`, {
    user,
  });
}

async function all() {
  const response = await axios.get<{ users: User[] }>(
    `${API_BASE_URL}/api/users/all`
  );
  return response.data.users;
}

export const UserService = {
  addOne,
  all,
} as const;
