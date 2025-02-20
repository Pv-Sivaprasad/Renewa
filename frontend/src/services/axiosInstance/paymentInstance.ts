import axios from "axios";
import { toast } from "react-toastify";
import store from '../../redux/store';
// import { resetDoc } from "../../redux/slices/doctorSlice";
import { resetUser } from "../../redux/slices/authSlice";
import { HttpStatus } from "../../enums/HttpStatus";


const API_URL=import.meta.env.VITE_PAYMENT_API_URL


export const paymentAxiosInstance=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

const controllerMap = new Map();



paymentAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
 
  
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
    
  }

 
  if (!config.signal) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controllerMap.set(config.url, controller);
  }

  return config;
});


paymentAxiosInstance.interceptors.response.use(
  (response) => {
    controllerMap.delete(response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url;

    if (error.response) {
      if (error.response.status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await getNewAccessToken();
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return paymentAxiosInstance(originalRequest);
        } catch (err) {
          toast.error("Session expired");
          store.dispatch(resetUser())
          return Promise.reject(err);
        }
      }

      if (error.response.status >=  HttpStatus.INTERNAL_SERVER_ERROR) {
        toast.error("Server error, please try again later.");
      }

      if (error.response.status >= HttpStatus.INTERNAL_SERVER_ERROR && error.response.status <  HttpStatus.INTERNAL_SERVER_ERROR && error.response.status !== HttpStatus.UNAUTHORIZED) {
        toast.error(`${error.response.data.error || 'An error occurred'}`);
      }
    } else if (error.request) {
      toast.error("Network error, please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    controllerMap.delete(url);
    return Promise.reject(error);
  }
);

async function getNewAccessToken() {
  const response = await axios.get(`${API_URL}/refresh-token`, {
    withCredentials: true,
  });
  return response.data.accessToken;
}