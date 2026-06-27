import type { AdminUser, Post, Project } from './types.js';

const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

interface Envelope<T> {
  success: boolean;
  data: T;
  message: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include', // send/receive the httpOnly auth cookie
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  let body: Envelope<T>;
  try {
    body = (await res.json()) as Envelope<T>;
  } catch {
    throw new Error(`Request failed (${res.status})`);
  }

  if (!res.ok || !body.success) {
    throw new Error(body?.message || `Request failed (${res.status})`);
  }
  return body.data;
}

export const api = {
  // Public
  health: () => request<{ status: string }>('/api/health'),
  listProjects: () => request<Project[]>('/api/projects'),
  listPosts: () => request<Post[]>('/api/posts'),
  getPost: (slug: string) => request<Post>(`/api/posts/${slug}`),

  // Auth
  login: (email: string, password: string) =>
    request<AdminUser>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<null>('/api/auth/logout', { method: 'POST' }),
  me: () => request<AdminUser>('/api/auth/me'),

  // Admin — projects
  createProject: (p: Partial<Project>) =>
    request<Project>('/api/projects', { method: 'POST', body: JSON.stringify(p) }),
  updateProject: (id: string, p: Partial<Project>) =>
    request<Project>(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(p) }),
  deleteProject: (id: string) =>
    request<null>(`/api/projects/${id}`, { method: 'DELETE' }),

  // Admin — posts
  createPost: (p: Partial<Post>) =>
    request<Post>('/api/posts', { method: 'POST', body: JSON.stringify(p) }),
  updatePost: (id: string, p: Partial<Post>) =>
    request<Post>(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(p) }),
  deletePost: (id: string) =>
    request<null>(`/api/posts/${id}`, { method: 'DELETE' }),
};
