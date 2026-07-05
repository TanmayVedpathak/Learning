import axios, { type AxiosResponse } from "axios";
import type { Post, UpdatePostPayload } from "../types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (pageNumber: number | string): Promise<Post[]> => {
  try {
    const res: AxiosResponse<Post[]> = await api.get<Post[]>(`/posts?_start=${pageNumber}&_limit=3`);

    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchInvPost = async (id: number | string): Promise<Post> => {
  try {
    const res: AxiosResponse<Post> = await api.get<Post>(`/posts/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// to delete the post
export const deletePost = async (id: number | string): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// to update the post
export const updatePost = async (id: number | string, payload: UpdatePostPayload = { title: "I have updated" }): Promise<Post> => {
  try {
    const res: AxiosResponse<Post> = await api.patch<Post>(`/posts/${id}`, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// infinity scrolling

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number | string }) => {
  try {
    const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
