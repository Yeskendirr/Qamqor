import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('image', file);
  const res = await api.post<{ url: string }>('/upload', fd);
  return res.data.url;
}

export const authApi = {
  login: (username: string, password: string) =>
    api.post<{ token: string; username: string }>('/auth/login', { username, password }),
};

export const aboutApi = {
  get: () => api.get('/about'),
  update: (data: object) => api.put('/about', data),
};

export const newsApi = {
  getAll: () => api.get('/news'),
  getById: (id: number) => api.get(`/news/${id}`),
  getAllAdmin: () => api.get('/news/admin/all'),
  create: (data: object) => api.post('/news', data),
  update: (id: number, data: object) => api.put(`/news/${id}`, data),
  delete: (id: number) => api.delete(`/news/${id}`),
};

export const projectsApi = {
  getAll: () => api.get('/projects'),
  create: (data: object) => api.post('/projects', data),
  update: (id: number, data: object) => api.put(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export const eventsApi = {
  getAll: () => api.get('/events'),
  create: (data: object) => api.post('/events', data),
  update: (id: number, data: object) => api.put(`/events/${id}`, data),
  delete: (id: number) => api.delete(`/events/${id}`),
};

export const galleryApi = {
  getAll: () => api.get('/gallery'),
  upload: (formData: FormData) => api.post('/gallery', formData),
  delete: (id: number) => api.delete(`/gallery/${id}`),
};

export const contactApi = {
  send: (data: object) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id: number) => api.put(`/contact/${id}/read`),
  delete: (id: number) => api.delete(`/contact/${id}`),
};

export const faqApi = {
  getAll: () => api.get('/faq'),
  create: (data: object) => api.post('/faq', data),
  update: (id: number, data: object) => api.put(`/faq/${id}`, data),
  delete: (id: number) => api.delete(`/faq/${id}`),
};

export default api;
