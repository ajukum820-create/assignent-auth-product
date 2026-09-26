import axios from "axios";
import { useAuthContext } from "../auth/context/authProvider";

export default function useApi() {
  const authContext = useAuthContext();

  const api = axios.create({
    baseURL: "https://assignent-auth-backend.vercel.app/api",
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (authContext.accessToken) {
      config.headers.Authorization = `Bearer ${authContext.accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const res = await axios.post(
            "https://assignent-auth-backend.vercel.app/api/auth/refresh",
            {},
            { withCredentials: true }
          );

          authContext.setAccessToken(res.data.accessToken);

          error.config.headers.Authorization =
            `Bearer ${res.data.accessToken}`;

          return api(error.config);
        } catch (refreshError) {
          authContext.setAccessToken(null);
          authContext.setUser(null);

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}